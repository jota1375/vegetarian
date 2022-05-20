const endpoint="http://168.138.140.35:8080/api/vegetarian"

$(document).ready(function(){
    $("#alerta").hide()  
    getProducto()

    $("#guardar").click(function(){
        editarProducto()
    })
    
})

$("#alerta").click(function(){
    $("#alerta").hide()  
})

function getProducto(){

    $.ajax({

        url:endpoint+"/all",
        type:'GET',
        dataType:'json',
        success:function(data){            
        
            let registro=""
            $.each(data,function(index,producto){
                
                registro+="<tr>"+
                        "<td>"+(index+1)+"</td>"+
                        "<td>"+producto.reference+"</td>"+
                        "<td>"+producto.brand+"</td>"+
                        "<td>"+producto.category+"</td>"+
                        "<td>"+producto.description+"</td>"+
                        "<td>"+producto.availability+"</td>"+
                        "<td>"+producto.price+"</td>"+
                        "<td>"+producto.quantity+"</td>"+
                        "<td>"+producto.photography+"</td>"+
                        "<td>"+
                        "<button class='btn btn-warning mr-1' data-toggle='modal' data-target='#myModal'"+
                        "onclick=\"ver('"+producto.reference+"','"+producto.brand+"','"+producto.category+"','"+producto.description+
                        "','"+producto.availability+"','"+producto.price+"','"+producto.quantity+"','"+producto.photography+"')\""+
                        ">"+
                        
                        "Editar</button>"+
                        "<button class='btn btn-danger' "+
                        "onclick=\"eliminar('"+producto.reference+"')\">"+
                        "Eliminar</button>"+
                        "</td>"
            
            })
            $("#tbody").html(registro)


        }

    })


}

function editarProducto(){

    const producto={
        reference:$("#id_ref").val(),
        brand:$("#marca").val(),
        category:$("#categoria").val(),
        description:$("#descripcion").val(),
        availability:$("#disponibilidad").val(),
        price:$("#precio").val(),
        quantity:$("#stock").val(),
        photography:$("#fotografía").val()
    
    }
    datajson=JSON.stringify(producto)
    $.ajax({
        url:endpoint+"/update",
        type:'PUT',
        data:datajson,
        contentType:"application/json",
        complete:function(data){
            let mensaje=(data.status=="201")?"Edito Producto con Exito!!":"Problemas al Editar"
            $("#mensaje").html(mensaje)
            $("#alerta").show()  
            getProducto()
            
        }

    })
}


function eliminar(reference){
    $.ajax({
        

        url:endpoint+"/"+reference,
        type:'DELETE',
        dataType:'json',
        success:function(data){      
            getProducto()
        }    
    })        
}

function ver(reference,brand,category,description,availability,price,quantity,photography){
    
    $("#id_ref").val(reference)
    $("#marca").val(brand)
    $("#categoria").val(category)
    $("#descripcion").val(description)
    $("#disponibilidad").val(availability)
    $("#precio").val(price)
    $("#stock").val(quantity)
    $("#fotografía").val(photography)
  

}