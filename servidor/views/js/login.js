
// const utilidades = require('./utilidades.js');

var cuadro = document.getElementById("cuadroAlerta");
cuadro.style.display = 'none';
var aviso = document.getElementById("alerta");

// cuadro.style.display = 'block';
// aviso.innerHTML = "Los datos introducidos no son correctos";

// funcion para comprobar si las dos celdas de datos estan llenas
function comprobar_casillas (){
  //obtenemos los valores de las casillas
  var usuario = document.getElementById("user").value;
  var contrasena = document.getElementById("password").value;

  if(usuario == "" || contrasena == ""){
    cuadro.style.display = 'block';
    aviso.innerHTML = "Falta introducir datos";
    console.log('dentro de aviso')
    return false
  }
  return true;
}

//funcion que realiza la peticion al servidor para comprobar los datos del logeo
//si los datos son correctos nos redirige a otra pagina
//si no, muestra un error en la pantalla
function comprobar_login(){

  //obtenemos los valores de las casillas
  var usuario = document.getElementById("user").value;
  var contrasena = document.getElementById("password").value;
  console.log(usuario);
  console.log(contrasena);
  var casillasCompletas = comprobar_casillas();
  console.log(casillasCompletas);
  if(casillasCompletas){
    //hacemos la peticion al servidor con los datos
    fetch("/sesion/acceso?user=" + usuario + "&pass=" + contrasena).then(function(respuesta){

      // comparamos la respuesta para saber si el usuario existe o no
        if(respuesta.status == 200){//si todo va correcto, respuesta.ok seria
                                    //equivalente pero devolveria true o false
          cuadro.style.display = 'none';

          respuesta.json().then(function (datos){

            document.cookie = 'email=' + datos.email;//añadimos el correo a la cookie, tienen la funcion de nombre de usuario
            document.cookie = 'contrasena=' + datos.contrasena;//añadimos la contraseña a la cookie
            document.cookie = 'id_usuario=' + datos.id_usuario;//anyadimos el id del usuario a las cookies

            if(datos.activo == 'false'){// si el usuario no ha activado la cuenta todavia
                location.href = "/perfil"//va a la pagina de perfil
            }else{//por el contrario, si activo vale true, la cuenta esta activa y va directamente a campos
                location.href = "/mapa" // va a la pagina de campos
            }
          });
        }else if(respuesta.status == 401){//si el estado es 401, muestra un mensaje al usuario
          cuadro.style.display = 'block';
          aviso.innerHTML = "Error en los datos";
        }else{// si no es ninguno de los dos estados anteriores debera ser el 500 debido a un error con la base de datos.
          //tambien puede tratarse de un error de red.
          cuadro.style.display = 'block';
          aviso.innerHTML = "Error en el servidor, inténtelo mas tarde";
        }
    });
  }
}
