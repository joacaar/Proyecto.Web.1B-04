
var cuadro = document.getElementById("cuadroAlerta");
cuadro.style.display = 'none';
var aviso = document.getElementById("alerta");



// cuadro.style.display = 'block';
// aviso.innerHTML = "Los datos introducidos no son correctos";

// function comprobar_casillas (){
//   //obtenemos los valores de las casillas
//   var usuario = document.getElementById("user").value;
//   var contrasena = document.getElementById("password").value;
//
//   if(usuario == )
// }

function comprobar_login(){

  //obtenemos los valores de las casillas
  var usuario = document.getElementById("user").value;
  var contrasena = document.getElementById("password").value;

  //hacemos la peticion al servidor con los datos
  fetch("http://localhost:3000/login/access?user=" + usuario + "&&pass=" + contrasena).then(function(respuesta){
    // comparamos la respuesta para saber si el usuario existe o no

      // console.log(respuesta);
       // console.log(respuesta.status);
      if(respuesta.status == 200){//si todo va correcto, respuesta.ok seria
                                  //equivalente pero devolveria true o false
        cuadro.style.display = 'none';

        respuesta.json().then(function (datos){
          // console.log(datos);
          document.cookie = 'id_usuario=' + datos.id_usuario;//anyadimos el id del usuario a las cookies
          console.log(document.cookie);
          if(datos.activo != true){// si el usuario no ha activado la cuenta todavia
              location.href = "http://localhost:3000/perfil"//va a la pagina de perfil
          }else{
              location.href = "http://localhost:3000/campos" // va a la pagina de campos
          }

        });
      }else{//si el estado es 401, muestra un mensaje al usuario
        cuadro.style.display = 'block';
        aviso.innerHTML = "Los datos introducidos no son correctos";
      }
      // return respuesta.json().then(function (datos){
      //   console.log(datos);
      // });
  })
  // .then(function (datos){
  //   console.log(datos);
  //   // console.log(datos.status);
  // });
}
