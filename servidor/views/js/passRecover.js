

//-----------------------------------------------------------------------------
//  funcion para enviar el correo de recuperacion de contraseña
//-----------------------------------------------------------------------------

function passRecover (){
  var correo = document.getElementById('correo').value;

  fetch('/recuperar/password',
        {
          headers: {/*'Content-Type': 'application/json',*/
                    'passrecover': correo},
          // 'Content-Type': 'application/json', //cambia por application/json y utilizar esta forma
          method: "POST",
        }).then(function(respuesta){
          console.log(respuesta);
          if (respuesta.status == 200) {
            console.log("Todo Correcto, codigo = 200");
          }else{
            console.log("Algo falla, codigo /= 200");
          }
        })
}
