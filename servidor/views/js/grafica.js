
// Objetos de configuracion
datosMedidasTemperatura = {
  nombreColumnaBD: 'temperatura',
  labelString: "Temperatura ºC",
  min: -10,
  max: 50,
  stepSize: 10,
  backgroundColor: '#FF0000',
  borderColor: '#FF0000',
}
datosMedidasHumedad = {
  nombreColumnaBD: 'humedad',
  labelString: "Humedad %",
  min: 0,
  max: 100,
  stepSize: 10,
  backgroundColor: '#0040FF',
  borderColor: '##0040FF'
}
datosMedidasSalinidad = {
  nombreColumnaBD: 'salinidad',
  labelString: "Salinidad %",
  min: 0,
  max: 100,
  stepSize: 10,
  backgroundColor: '#6E6E6E',
  borderColor: '#6E6E6E'
}
datosMedidasIluminacion = {
  nombreColumnaBD: 'iluminacion',
  labelString: "Iluminación",
  min: 6350,
  max: 6450,
  stepSize: 10,
  backgroundColor: '#ffab00',
  borderColor: '#ffab00'
}
datosMedidasPresion = {
  nombreColumnaBD: 'presion',
  labelString: "Presion hPa",
  min: 990,
  max: 1040,
  stepSize: 5,
  backgroundColor: '#ffab00',
  borderColor: '#ffab00'
}

var todosLosDatos = {};

//-----------------------------------------------------------------------------
// Funcion que hace la peticion al servidor para obtener los datos de las
// medidas de los sensores.
// ----------------------------------------------------------------------------

function pedirDatos (){
  //tipo string
  var medida = document.getElementById("selector").value;
  if(medida != ""){
    fetch("http://localhost:3000/grafica/medidas?id_sensor=" + "363234"
    +"&medida=" + medida).then(function(respuesta){
      respuesta.json().then(function(datos){
        ultimosDatos(datos, function(listaDatos){
          // console.log(listaDatos);
          if(medida == "humedad"){
            var datoshumedad = [];
            for(var i=0; i<= listaDatos.length-1; i++){
              datoshumedad.push(listaDatos[i].humedad);
            }
            var opcionesHumedad = modificarParametrosGrafica(datosMedidasHumedad);
            var lineaGrafica = {
                label: 'Humedad',//titolo de la leyenda de la grafica
                backgroundColor: '#ffab00', //color de fondo de la linea
                borderColor: '#ffab00',// color del borde de la linea
                fill: false,// rellena desde la base de la grafica hasta la linea
                data: datoshumedad// datos a representar
            };
            var datos = {
                labels: ['00: 00', '02:00', '04:00', '06: 00', '08:00', '10: 00', '12:00', '14:00', '16: 00', '18:00', '20:00', '22:00', '24:00'],
                datasets: []
            };
            datos.datasets = [lineaGrafica];

            var ctx = document.getElementById('grafica').getContext('2d');

            var chart = new Chart(ctx, {
                type: 'line',
                data: datos,
                options: opcionesHumedad
            });
          }

          if(medida == "temperatura"){
            var datostemperatura = [];
            for(var i=0; i<= listaDatos.length-1; i++){
              datostemperatura.push(listaDatos[i].temperatura);
            }
            var opcionesTemperatura = modificarParametrosGrafica(datosMedidasTemperatura);
            var lineaGrafica = {
                label: 'Temperatura',//titolo de la leyenda de la grafica
                backgroundColor: '#ffab00', //color de fondo de la linea
                borderColor: '#ffab00',// color del borde de la linea
                fill: false,// rellena desde la base de la grafica hasta la linea
                data: datostemperatura// datos a representar
            };
            var datos = {
                labels: ['00: 00', '02:00', '04:00', '06: 00', '08:00', '10: 00', '12:00', '14:00', '16: 00', '18:00', '20:00', '22:00', '24:00'],
                datasets: []
            };
            datos.datasets = [lineaGrafica];

            var ctx = document.getElementById('grafica').getContext('2d');

            var chart = new Chart(ctx, {
                type: 'line',
                data: datos,
                options: opcionesTemperatura
            });
          }

          if(medida == "salinidad"){
            var datosSalinidad = [];
            for(var i=0; i<= listaDatos.length-1; i++){
              datosSalinidad.push(listaDatos[i].salinidad);
            }
            var opcionesSalinidad = modificarParametrosGrafica(datosMedidasSalinidad);
            var lineaGrafica = {
                label: 'Salinidad',//titolo de la leyenda de la grafica
                backgroundColor: '#ffab00', //color de fondo de la linea
                borderColor: '#ffab00',// color del borde de la linea
                fill: false,// rellena desde la base de la grafica hasta la linea
                data: datosSalinidad// datos a representar
            };
            var datos = {
                labels: ['00: 00', '02:00', '04:00', '06: 00', '08:00', '10: 00', '12:00', '14:00', '16: 00', '18:00', '20:00', '22:00', '24:00'],
                datasets: []
            };
            datos.datasets = [lineaGrafica];

            var ctx = document.getElementById('grafica').getContext('2d');

            var chart = new Chart(ctx, {
                type: 'line',
                data: datos,
                options: opcionesSalinidad
            });
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
  return opcionesGrafica = {
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
function modificarDatosGrafica(datosMedidas, valores){
  return lineaGrafica = {
      label: datosMedidas.labelString,//titolo de la leyenda de la grafica
      backgroundColor: datosMedidas.backgroundColor, //color de fondo de la linea
      borderColor: datosMedidas.borderColor,// color del borde de la linea
      fill: false,// rellena desde la base de la grafica hasta la linea
      data: []// datos a representar
  };
}
var opciones = {
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
                labelString: 'Medida'
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

var chart = new Chart(ctx, {
    type: 'line',
    data: datos,
    options: opciones
});
