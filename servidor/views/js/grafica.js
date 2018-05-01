
function pedirDatos (){
  //tipo string
  var medida = document.getElementById("selector").value;
  if(medida != ""){
    fetch("http://localhost:3000/grafica/medidas?id_sensor=" + "363234"
    +"&medida=" + medida).then(function(respuesta){
      respuesta.json().then(function(datos){
        console.log(datos);
      })
    })
  }else{
    return;
  }
}
























// var inicio = moment('00:00');
//
// var opciones = {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//         xAxes: [{
//             display: true,
//             scaleLabel: {
//                 display: true,
//                 labelString: 'Horas'
//             }
//         }],
//         yAxes: [{
//             display: true,
//             scaleLabel: {
//                 display: true,
//                 labelString: 'Temperatura ºC'
//             },
//             ticks: {
//                 min: 0,
//                 max: 40,
//                 stepSize: 2
//             }
//         }]
//     }
// };
//
//
// var datos = {
//     labels: ['00: 00', '02:00', '04:00', '06: 00', '08:00', '10: 00', '12:00', '14:00', '16: 00', '18:00', '20:00', '22:00', '24:00'],
//     datasets: []
// };
//
// var avanceReal = {
//     label: 'Temperatura sonda',
//     backgroundColor: '#ffab00',
//     borderColor: '#ffab00',
//     fill: false,
//     data: [15, 17, 17, 18, 20, 20, 21, 19, 19, 16, 15, 14, 14]
// };
//
//
//
// datos.datasets = [avanceReal];
//
// var ctx = document.getElementById('grafica').getContext('2d');
//
// var chart = new Chart(ctx, {
//     type: 'line',
//     data: datos,
//     options: opciones
// });
