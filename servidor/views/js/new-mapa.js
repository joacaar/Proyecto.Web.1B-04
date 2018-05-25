//Script para el mapeado
//mapa global
var map;
var zona;
var contadorSensores = 0; //cambiar por 0 cuando no tengamos ninguno de cero

function getZonas(){

  // obtenemos los datos del usuario de las cookies
    var idUsuario = leerCookie('id_usuario');

  // hacemos la peticion de los datos de las zonas, los vertices y los sensores
    fetch("/mapa/datosZonas?id_usuario=" + idUsuario).then(function(respuesta){
      respuesta.json().then(function(datosRecibidos){

        localStorage.setItem('datos', JSON.stringify(datosRecibidos));
        // var ejemplo = JSON.parse(localStorage.datos);


        var query = obtenerValorMedida();
        // console.log(query);

        // console.log(datosRecibidos);
        initMap(datosRecibidos);

        // si hay algo en la query mostramos la zona indicada
        if(query !== undefined){
          console.log("hay algo en la query, muestro esa zona");
        }

      })//then
    })//fetch
} // getZonas()

function initMap (datos){

  console.log(datos);

  var ubicacionInicial = {
    lat: datos.datosDeZona[0].lat,
    lng: datos.datosDeZona[0].lng
  }

  map = new google.maps.Map(document.getElementById('map'), {
      zoom: 16,
      center: ubicacionInicial,
      disableDefaultUI: true,
      mapTypeId: google.maps.MapTypeId.SATELLITE
  });

// bucle para dibujar todas las zonas del usuario
  for(var i = 0; i <= datos.datosDeZona.length-1; i++ ){
    var losVertices = [];
    for (var j = 0; j <= datos.datosDeZona[i].vertices.length-1; j++) {
      var vertice = {
        lng: datos.datosDeZona[i].vertices[j].lng,
        lat: datos.datosDeZona[i].vertices[j].lat
      }
      losVertices.push(vertice);
    }
    addZone(losVertices);
  }

  // bucle para dibujar las posiciones de los datosSensores
  for (var i = 0; i <= datos.datosDeSensores.length-1; i++) {
    addMarker(datos.datosDeSensores[i].lat, datos.datosDeSensores[i].lng,
              datos.datosDeSensores[i].nombre);
  }

  añadirListaZonas(datos);

  // for(var i = 0; i <= 2; i++){
  //   addMarker(puntos[i].lat, puntos[i].lng, puntos[i].nombre);
  // }
} //initMap()


//-----------------------------------------------------------------------------
// Funcion para añadir las marcas de los sensores
//-----------------------------------------------------------------------------
function addMarker(lat, lng, nombreSensor) {

    var location = {
        lat: lat,
        lng: lng
    }

    var marcador = new google.maps.Marker({
        position: location,
        map: map,
        title: nombreSensor,
        draggable: false
    });

    // string para introducir código HTML en InfoWindow
    var contentString =
    '<div id=ventanaInfo>'+
      '<a href="/grafica?sensor=temperatura">' +
        '<div id="temperatura"> Temperatura ºC: </div>' +
        '<p id="Datos">21</p>' +
      '</a>'+
      '<a href="/grafica?sensor=humedad">' +
        '<div id="humedad"> Humedad %: </div>' +
        '<p id="Datos">52</p>' +
      '</a>'+
    '</div>';

    //Funcion para mostrar informacion
    var ventanaInfo = new google.maps.InfoWindow({
        content: contentString
    });

    marcador.addListener('click', function() {
        ventanaInfo.open(map, marcador)
    })

    addDropdownLink(lat, lng)
}

// Funcion para crear zonas
function addZone(listaVertices) {

    zona = new google.maps.Polygon({
        paths: listaVertices,
        map: map,
        // fillColor: '#fff',
        strokeColor: '#fff',
    })
}

//--------Funcion para centrar el mapa en unas coordenadas exactas, vease un sensor------------------//
//-----------Utilizada por la funcion addDropdownLink-----------//
        function centerMap(lat, lng) {
            var newCenter = new google.maps.LatLng(lat, lng);
            map.panTo(newCenter);
        }
//----------Permite añadir un link al dropdown que al pulsarlo sea centrado en las coordenadas de X punto----//
        //FALTA POR HACER QUE SE PUEDAN BORRAR
  function addDropdownLink(lat, lng) {
    var link = document.createElement('a');
    contadorSensores = contadorSensores + 1;
    link.innerHTML = 'Sensor' + ' ' + contadorSensores;
    link.className = 'dropdown-item';
    //link.href = '#!'; //sustituir por centrar mapa
    //link.onclick = 'centerMap(lat, lng)';
    link.addEventListener("click", () => centerMap(lat, lng))
    document.getElementById("dropdown").appendChild(link);
  }

//-----------------------------------------------------------------------------
// Funcion para añadir las zonas al dropdown
//-----------------------------------------------------------------------------
function añadirListaZonas (datos){
  var x = document.getElementById("dropdownMenu1");
  for (var i = 0; i < datos.datosDeZona.length; i++) {
    var option = document.createElement("option");
    option.text = datos.datosDeZona[i].nombre_zona;
    option.value = datos.datosDeZona[i].id_zona;
    x.add(option);
  }
}

//-----------------------------------------------------------------------------
// Funcion para que al seleccionar una opcion de la lista de zonas, se muestre
// en el mapa
//-----------------------------------------------------------------------------

function showZone (){

  var datos = JSON.parse(localStorage.datos);
  var idSeleccionado = document.getElementById('dropdownMenu1').value;
  var ubicacion;

  for (var i = 0; i < datos.datosDeZona.length; i++) {
    if(idSeleccionado == datos.datosDeZona[i].id_zona){
      ubicacion = {
        lat: datos.datosDeZona[i].lat,
        lng: datos.datosDeZona[i].lng
      }
    }//if
  }//for

map.panTo(ubicacion);
  // map.setCenter(ubicacion);

}//showZone()

//---------Funcion para pasar parametros a la pagina de grafica ---------------
function mostrarSensor (){
  var sensor = document.getElementById('Contenido1').value;
  console.log(sensor);
  //location.href = "/grafica?sensor=" + sensor;
  //fetch("/grafica?sensor=" + sensor);
}

//-----------------------------------------------------------------------------
// Funcion para obtener la eleccion del tipo de medida de la pagina de mapa
// ----------------------------------------------------------------------------
function obtenerValorMedida(){
  query = window.location.search;
  valor = query.split("=");
  return valor[1];
}

//-----------------------------------------------------------------------------
// Funcion para obtener los valores almacenados en las cookies
// ----------------------------------------------------------------------------
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
