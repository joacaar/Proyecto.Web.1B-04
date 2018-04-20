//
//  Codigo JS de la pagina de perfil
//

// Cuadros de alertas
// cuadro de alerta de cambio correcto
var cuadroVerde = document.getElementById("cuadroAlertaVerde");
cuadroVerde.style.display = 'none';

// cuadro de alerta de error de datos
var cuadro = document.getElementById("cuadroAlerta");
cuadro.style.display = 'none';
var aviso = document.getElementById("alerta");

// obtenemos el elemento html donde se mostraran los datos
var nombre = document.getElementById("nombre");
var apellidor = document.getElementById("apellidos");
var correo = document.getElementById("correo");
var telefono = document.getElementById("telefono");

var boxContraActual = document.getElementById("contraActual");
var boxNewContra = document.getElementById("nuevaContra");
var boxRepContra = document.getElementById("repetirContra");

var miContra;
var activa;

function mostrarDatos(){

// var listaCookie = document.cookie.split(";");
// console.log(document.cookie);
// var valor = leerCookie("id_usuario");
// console.log(listaCookie);
// console.log(valor);

  fetch("http://localhost:3000/perfil/datos?id_usuario=" + leerCookie("id_usuario")).then(function(respuesta){
    respuesta.json().then(function(datos){
      console.log(datos);
      miContra = datos.contrasena;
      activa = datos.activo;
      console.log(activa);
      nombre.innerHTML = datos.nombre;
      apellidos.innerHTML = datos.apellidos;
      correo.innerHTML = datos.email;
      telefono.innerHTML = datos.telefono;
    });
  });
}// mostrarDatos()

function modificarContrasena(){
  var contraActual = document.getElementById("contraActual").value;

  if(contraActual == miContra){
      var newPass = document.getElementById("nuevaContra").value;
      var repPass = document.getElementById("repetirContra").value;

      if(newPass != "" && newPass == repPass){

          cuadro.style.display = "none";

          miContra = newPass;
          activa = "true";

          cuadroVerde.style.display = "block";
          document.getElementById("correcto").innerHTML = "La contraseña se modifico correctamente";

      }else{
          cuadro.style.display = "block";
          aviso.innerHTML = "La nueva contraseña no coincide o no es correcta";
      }
  }else{
      cuadro.style.display = "block";
      aviso.innerHTML = "La contraseña actual no es correcta";
  }
}

function continuar(){
  if(activa == "true"){
     location.href="http://localhost:3000/campos"
  }
  else{
    cuadro.style.display = "block";
    aviso.innerHTML = "Debe modificar la contraseña para continuar";
  }
}

function leerCookie(nombre) {
         var lista = document.cookie.split(";");
         for (i in lista) {
               var busca = lista[i].search(nombre);
               if (busca > -1) {micookie=lista[i]}
             }
         var igual = micookie.indexOf("=");
         var valor = micookie.substring(igual+1);
         return valor;
         }
