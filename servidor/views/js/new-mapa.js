//Script para el mapeado
//mapa global
var map;
var zona;
var contadorSensores = 0; //cambiar por 0 cuando no tengamos ninguno de cero

function getZonas(){

  // obtenemos los datos del usuario de las cookies
    // var email = leerCookie('email');
    // var contrasena = leerCookie('contrasena');
    var idUsuario = leerCookie('id_usuario');

  // hacemos la peticion de los datos de las zonas, los vertices y los sensores
    fetch("/mapa/datosZonas?id_usuario=" + idUsuario).then(function(respuesta){
      respuesta.json().then(function(datosRecibidos){
        console.log(datosRecibidos);
      })//then
    })//fetch
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
