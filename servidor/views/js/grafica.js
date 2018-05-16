
// Objetos de configuracion
datosMedidahumedad= {
  nombreColumnaBD: 'humedad',
  labelString: "Humedad %",
  min: 0,
  max: 100,
  stepSize: 10,
  backgroundColor: '#0040FF',
  borderColor: '##0040FF'
}

datosMedida = {
  temperatura: {
    nombreColumnaBD: 'temperatura',
    labelString: "Temperatura ºC",
    min: -10,
    max: 50,
    stepSize: 10,
    backgroundColor: '#FF0000',
    borderColor: '#FF0000',
  },
  humedad: {
    nombreColumnaBD: 'humedad',
    labelString: "Humedad %",
    min: 0,
    max: 100,
    stepSize: 10,
    backgroundColor: '#0040FF',
    borderColor: '##0040FF'
  },
  salinidad: {
    nombreColumnaBD: 'salinidad',
    labelString: "Salinidad %",
    min: 0,
    max: 100,
    stepSize: 10,
    backgroundColor: '#6E6E6E',
    borderColor: '#6E6E6E'
  },
  iluminacion: {
    nombreColumnaBD: 'iluminacion',
    labelString: "Iluminación",
    min: 6350,
    max: 6450,
    stepSize: 10,
    backgroundColor: '#ffab00',
    borderColor: '#ffab00'
  },
  presion: {
    nombreColumnaBD: 'presion',
    labelString: "Presion hPa",
    min: 990,
    max: 1040,
    stepSize: 5,
    backgroundColor: '#04B404',
    borderColor: '#04B404'
  }
}


//-----------------------------------------------------------------------------
//  Creamos la grafica al principio sin valores
//-----------------------------------------------------------------------------
var opciones = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
        xAxes: [{
            display: true,
            scaleLabel: {
                display: true,
                labelString: 'Horas'
            }
        }],
        yAxes: [{
            display: true,
            scaleLabel: {
                display: true
            },
            ticks: {
                min: 0,
                max: 100,
                stepSize: 10
            }
        }]
    }
};

var datos = {
    labels: ['00: 00', '02:00', '04:00', '06: 00', '08:00', '10: 00', '12:00', '14:00', '16: 00', '18:00', '20:00', '22:00', '24:00'],
    datasets: []
};

var lineaGrafica = {
    label: 'Medida',//titolo de la leyenda de la grafica
    backgroundColor: '#ffab00', //color de fondo de la linea
    borderColor: '#ffab00',// color del borde de la linea
    fill: false,// rellena desde la base de la grafica hasta la linea
    data: []// datos a representar
};

datos.datasets = [lineaGrafica];

var ctx = document.getElementById('grafica').getContext('2d');

// var chart = new Chart(ctx, {
//     type: 'line',
//     data: datos,
//     options: opciones
// });

// console.log(chart.options);





//-----------------------------------------------------------------------------
// Funcion para mostrar los primeros datos en la graficas
//  (ejecutar al cargar la pagina graficas.html)
// ----------------------------------------------------------------------------
function mostrarPrimerosDatos(){
    var medida = obtenerValorMedida();
    var tipomedida = document.getElementById("selector");
    console.log(tipomedida);
    fetch("/grafica/medidas?id_sensor=" + "363234"
    +"&medida=" + medida).then(
      function(respuesta){
        respuesta.json().then(
          function(losDatos){

            switch (medida) {
              case "humedad":
                lineaGrafica = modificarDatosGrafica(datosMedida.humedad, losDatos);
                lasOpciones = modificarParametrosGrafica(datosMedida.humedad);
                datos.datasets = [lineaGrafica];
                console.log(datos);
                var chart = new Chart(ctx, {
                  type: 'line',
                  data: datos,
                  options:lasOpciones
                })
                tipomedida.selectedIndex=0;
                break;
              case "temperatura":
                lineaGrafica = modificarDatosGrafica(datosMedida.temperatura, losDatos);
                lasOpciones = modificarParametrosGrafica(datosMedida.temperatura);
                datos.datasets = [lineaGrafica];
                console.log(datos);
                var chart = new Chart(ctx, {
                  type: 'line',
                  data: datos,
                  options:lasOpciones
                })
                tipomedida.selectedIndex=1;
                break;
              case "salinidad":
                lineaGrafica = modificarDatosGrafica(datosMedida.salinidad, losDatos);
                lasOpciones = modificarParametrosGrafica(datosMedida.salinidad);
                datos.datasets = [lineaGrafica];
                var chart = new Chart(ctx, {
                  type: 'line',
                  data: datos,
                  options:lasOpciones
                })
                tipomedida.selectedIndex=2;
                break;
              case "iluminacion":
                lineaGrafica = modificarDatosGrafica(datosMedida.iluminacion, losDatos);
                lasOpciones = modificarParametrosGrafica(datosMedida.iluminacion);
                datos.datasets = [lineaGrafica];
                var chart = new Chart(ctx, {
                  type: 'line',
                  data: datos,
                  options:lasOpciones
                })
                tipomedida.selectedIndex=3;
                break;
              default:
                lineaGrafica = modificarDatosGrafica(datosMedida.presion, losDatos);
                lasOpciones = modificarParametrosGrafica(datosMedida.presion);
                datos.datasets = [lineaGrafica];
                var chart = new Chart(ctx, {
                  type: 'line',
                  data: datos,
                  options:lasOpciones
                })
                tipomedida.selectedIndex=4;
            }
          })
      })
  }
//-----------------------------------------------------------------------------
// Funcion que hace la peticion al servidor para obtener los datos de las
// medidas de los sensores.
// ----------------------------------------------------------------------------

function pedirDatos (michart){

  //tipo string
  var medida = document.getElementById("selector").value;
  if(medida != ""){
    fetch("/grafica/medidas?id_sensor=" + "363234"
    +"&medida=" + medida).then(function(respuesta){
      respuesta.json().then(function(datos){
        ultimosDatos(datos, function(listaDatos){
          console.log(listaDatos);
          switch (medida) {
            case "humedad":
              lineaGrafica = modificarDatosGrafica(datosMedida.humedad, listaDatos);
              lasOpciones = modificarParametrosGrafica(datosMedida.humedad);
              datos.datasets = [lineaGrafica];
              datos.labels = ['00: 00', '02:00', '04:00', '06: 00', '08:00', '10: 00', '12:00', '14:00', '16: 00', '18:00', '20:00', '22:00', '24:00'];
              console.log(datos.datasets);
              var chart = new Chart(ctx, {
                type: 'line',
                data: datos,
                options:lasOpciones
              })
              history.pushState(null, "", "grafica?sensor=humedad");
              break;
            case "temperatura":
              lineaGrafica = modificarDatosGrafica(datosMedida.temperatura, listaDatos);
              lasOpciones = modificarParametrosGrafica(datosMedida.temperatura);
              datos.datasets = [lineaGrafica];
              datos.labels = ['00: 00', '02:00', '04:00', '06: 00', '08:00', '10: 00', '12:00', '14:00', '16: 00', '18:00', '20:00', '22:00', '24:00'];
              var chart = new Chart(ctx, {
                type: 'line',
                data: datos,
                options:lasOpciones
              })
              history.pushState(null, "", "grafica?sensor=temperatura");
              break;
            case "salinidad":
              lineaGrafica = modificarDatosGrafica(datosMedida.salinidad, listaDatos);
              lasOpciones = modificarParametrosGrafica(datosMedida.salinidad);
              datos.datasets = [lineaGrafica];
              datos.labels = ['00: 00', '02:00', '04:00', '06: 00', '08:00', '10: 00', '12:00', '14:00', '16: 00', '18:00', '20:00', '22:00', '24:00'];
              var chart = new Chart(ctx, {
                type: 'line',
                data: datos,
                options:lasOpciones
              })
              history.pushState(null, "", "grafica?sensor=salinidad");
              break;
            case "iluminacion":
              lineaGrafica = modificarDatosGrafica(datosMedida.iluminacion, listaDatos);
              lasOpciones = modificarParametrosGrafica(datosMedida.iluminacion);
              datos.datasets = [lineaGrafica];
              datos.labels = ['00: 00', '02:00', '04:00', '06: 00', '08:00', '10: 00', '12:00', '14:00', '16: 00', '18:00', '20:00', '22:00', '24:00'];
              var chart = new Chart(ctx, {
                type: 'line',
                data: datos,
                options:lasOpciones
              })
              history.pushState(null, "", "grafica?sensor=iluminacion");
              break;
            default:
              lineaGrafica = modificarDatosGrafica(datosMedida.presion, listaDatos);
              lasOpciones = modificarParametrosGrafica(datosMedida.presion);
              datos.datasets = [lineaGrafica];
              datos.labels = ['00: 00', '02:00', '04:00', '06: 00', '08:00', '10: 00', '12:00', '14:00', '16: 00', '18:00', '20:00', '22:00', '24:00'];
              var chart = new Chart(ctx, {
                type: 'line',
                data: datos,
                options:lasOpciones
              })
              history.pushState(null, "", "grafica?sensor=presion");
          }
        })
      })
    })
  }else{
    return;
  }
}


//-----------------------------------------------------------------------------
// Funcion que obtiene, del array que devuelve la consulta, la ultima fecha de
// las medidas.
// ----------------------------------------------------------------------------

function ultimaHora (losDatos){
  return losDatos[losDatos.length-1].tiempo;
}

function ultimosDatos (losDatos, callback){
  var listaDatos = [];
  for(var i = losDatos.length-1; i>=losDatos.length-13; i--){
    listaDatos.unshift(losDatos[i]);
  }
  callback(listaDatos);
}
function valoresMedidas (lista, medida){
  var nuevaLista = [];
  for(var i = 0; i<=lista.length-1; i++){
    nuevaLista.push(lista[i])
    console.log(nueva);
  }
}


// var inicio = moment('00:00');


//-----------------------------------------------------------------------------
// Funcion que modifica las opciones de la gráfica
// ----------------------------------------------------------------------------

function modificarParametrosGrafica(datosMedidas){
   opciones = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
          xAxes: [{
              display: true,
              scaleLabel: {
                  display: true,
                  labelString: 'Horas'
              }
          }],
          yAxes: [{
              display: true,
              scaleLabel: {
                  display: true,
                  labelString: datosMedidas.labelString
              },
              ticks: {
                  min: datosMedidas.min,
                  max: datosMedidas.max,
                  stepSize: datosMedidas.stepSize
              }
          }]
      }
  };
}
function modificarDatosGrafica(datosMedidas, losDatos){
  var lista=[];
  for(var i = 0; i<=12; i++){
    lista.push(Object.values(losDatos[i])[0]);
  }
  console.log(datosMedidas);
  return lineaGrafica = {
      label: datosMedidas.labelString,//titolo de la leyenda de la grafica
      backgroundColor: datosMedidas.backgroundColor, //color de fondo de la linea
      borderColor: datosMedidas.borderColor,// color del borde de la linea
      fill: false,// rellena desde la base de la grafica hasta la linea
      data: lista// datos a representar
  };
}

//-----------------------------------------------------------------------------
// Funcion para obtener la eleccion del tipo de medida de la pagina de mapa
// (todavia con campos)
// ----------------------------------------------------------------------------
function obtenerValorMedida(){
  query = window.location.search;
  valor = query.split("=");
  return valor[1];
}

//-----------------------------------------------------------------------------
// Funcion para actualizar los valores de las graficas
// ----------------------------------------------------------------------------
function updateConfigAsNewObject(chart) {
    chart.options = {
        responsive: true,
        title:{
            display:true,
            text: 'Chart.js'
        },
        scales: {
            xAxes: [{
                display: true
            }],
            yAxes: [{
                display: true
            }]
        }
    }
    chart.update();
}
