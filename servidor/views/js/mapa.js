//Script para el mapeado
//mapa global
var map;
var zona;

function initMap() {
    // var Nombre = { lat: X, lng: X}

    var Gandia = {
        lat: 38.997482,
        lng: -0.172141
    }

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: Gandia,
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.SATELLITE
    });

    var puntos = [
      { lat: 38.997805,
        lng: -0.172096,
        nombre: "Patatas"
      },
      { lat: 38.997702,
        lng: -0.171823,
        nombre: "Tomates"
      },
      { lat: 38.997102,
        lng: -0.172567,
        nombre: "Plátanos"
      }
    ];
    var losVertices =[
      { lat: 38.996905,
        lng: -0.172952
      },
      { lat: 38.996629,
        lng: -0.172181
      },
      { lat: 38.997990,
        lng:  -0.171552
      },
      { lat: 38.998127,
        lng: -0.171987
      }

    ];

    for(var i = 0; i <= 2; i++){
      addMarker(puntos[i].lat, puntos[i].lng, puntos[i].nombre);
    }

    addZone(losVertices);


    /*
    Punto = new google.maps.Marker({
        position: Gandia,
        map: map,
        title: "Pizzeria Volare",
        draggable: false
    })
    */

    //funcion al hacer click en el marcador
    //            Volare.addListener('click', function() {
    //                map.setZoom(32);
    //                map.setCenter(Volare.getPosition());
    //            })
}

//------------------------------------------//
//-----Crear marcador, util para poner marcadores nuevos-----//
function addMarker(lat, lng, nombreSensor) {
    /*if (ObjetoNombre.outerHTML){
        nombre = ObjetoNombre.outerHTML;
    } else if(XMLSerializer) {
        nombre = new XMLSerializer().serializeToString(ObjetoNombre);
    }*/
    //console.log(nombre);

    var location = {
        lat: lat,
        lng: lng
    }

    marcador = new google.maps.Marker({
        position: location,
        map: map,
        title: nombreSensor,
        draggable: false
    });

    // string para introducir código HTML en InfoWindow
    var contentString = '<div id="Contenido">' + '<img src="#" alt="Temperatura" id="Gota">' + '<div id="Temperatura"> Temperatura ºC: </div>' + '<p id="Datos">25</p>' + '</div>' + '<div id="Contenido">' + '<img src="#" alt="Humedad" id="Gota">' + '<div id="Humedad"> Humedad %: </div>' + '<p id="Datos">20</p>' + '<a href="/graficas.html">Ver Grafica</a>' + '</div>';

    //Funcion para mostrar informacion
    var ventanaInfo = new google.maps.InfoWindow({
        content: contentString
    });

    marcador.addListener('click', function() {
        ventanaInfo.open(map, marcador)
    })
}

// Funcion para crear zonas
function addZone(listaVertices) {

    zona = new google.maps.Polygon({
        paths: listaVertices,
        map: map,
        fillColor: '#fff',
        strokeColor: '#fff',
    })
}

// var puntos = [
//   { lat: 38.999,
//     lng: -0.1629338,
//     nombre: "Patatas"
//   },
//   { lat: 38.995,
//     lng: -0.1629338
//     nombre: "Tomates"
//   },
//   { lat: 38.997,
//     lng: -0.1629338,
//     nombre: "Plátanos"
//   }
// ];

// }
// for(var i = 0; i <= 2; i++){
//   addMarker(puntos[i].lat, puntos[i].lng, puntos[i].nombre);
// }

/*
//////////main()////////
var vertices = [{
        lat: 39,
        lng: -0.16
    }, {
        lat: 39.3,
        lng: -0.17
    }, {
        lat: 39.7,
        lng: -0.18
    }, {
        lat: 39,
        lng: -0.18
    }, {
        lat: 39.4,
        lng: -0.15
    }
];
*/

/*
function editZone() {
    var botonGuardar = document.getElementById('Guardar')

    zona.setEditable(true);

    botonGuardar.style.display = 'block';
}

function noEditZone() {
    var botonGuardar = document.getElementById('Guardar')

    zona.setEditable(false);

    botonGuardar.style.display = 'none';
}
*/

/*
function testMarcador() {
    var lat = parseFloat(document.getElementById('LatMarcador').value);
    var lng = parseFloat(document.getElementById('LngMarcador').value);

    marcador = new google.maps.LatLng(lat, lng);
    addMarker(marcador, "Sin Nombre De Momento")
}
*/

/*
function moverMarcador() {
    var lat = parseFloat(document.getElementById('LatMarcador').value);
    var lng = parseFloat(document.getElementById('LngMarcador').value);

    var latlngNuevo = new google.maps.LatLng(lat, lng);
    Punto.setPosition(latlngNuevo);
}
*/

// var NombrePunto = new.google.maps.Marker({ position: Nombre, map: map})

//var NombreZona = new google.maps.Polygon({
//     paths: [{
//         lat: 39,
//         lng: -0.3
//     },
//     {
//         lat: 39,
//         lng: -0.0
//     },
//     {
//         lat: 38.8,
//         lng: -0.0
//     },
//     {
//         lat: 38.8,
//         lng: -0.3
//     }],
//     map: map, //mapa en el que está
//     editable: true, //si se puede editar
//     fillColor: "#00ff00", //color de relleno
//     strokeColor: "#00ff00" //color de borde
//});

//var limites = new google.maps.LatLngBounds();
//zona.getPath().getArray().forEach(function(vertice) {
//    limites.extend(vertice);
//});
//map.fitBounds(limites);
