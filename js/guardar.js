const endpoint="http://168.138.140.35:8080/api/vegetarian"


$(document).ready(function(){
    $("#alerta").hide()  
    $("#guardar").click(function(){
        guardarProducto()
    })

  $("#alerta").click(function(){
    $("#alerta").hide()  
  })
           
})
function guardarProducto(){

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
        url:endpoint+"/new",
        type:'POST',
        data:datajson,
        contentType:"application/json",
        
        complete:function(data){
            let mensaje=(data.status=="201")?"Registro Producto con Exito!!":"Problemas al Guardar"
            $("#mensaje").html(mensaje)
            $("#alerta").show() 
             
             
            
        }

    })



}    
