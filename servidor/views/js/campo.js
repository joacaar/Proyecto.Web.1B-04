//
// Codigo JS de la página del campo
//

// var paragraf = document.getElementById()

// function mostrarCampos(){
//   fetch("http://localhost:3000/campos/datos?id_usuario=" + leerCookie("id_usuario")).then(function(respuesta){
//     respuesta.json().then(function(datos){
//
//     });
//   })
// }

function mostrarSensor (){
  var sensor = document.getElementById('listaSensores').value;
  console.log(sensor);
  location.href = "/grafica?sensor=" + sensor;
  //fetch("/grafica?sensor=" + sensor);
}
function continuar(){
  location.href="/grafica";
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
