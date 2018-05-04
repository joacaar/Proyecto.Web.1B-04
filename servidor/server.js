// ----------------------------------------------------------------------------
// Autor: Grupo 04 GTI 2017/2018
// Fecha: 13-04-18
// Descripción: Servidor en node.js con una base de datos enlazada que podra
// hacer consultas para que los usuarios puedan iniciar sesión y mostrar datos
// en unagrafica.

/* TO-DO:
  - Implementar, utilizar y probar la peticion para devolver los datos de las medidad
  - Implementar, utilizar y probar la peticion post de cambio de contraseña
  - Implementar, utilizar y probar la funcion para activar la cuenta.
  - Implementat, utilizar y probar la peticion de los vertices para el mapa
*/

// cd desktop/grado-tecnologias/aProject/Proyecto.Web.1B-04/Servidor

//-----------------------------------------------------------------------------
//importamos los paquetes de express y sqlite para obtener todas las
//funcionalidades
//-----------------------------------------------------------------------------
const sqlite3 = require('sqlite3');

const express = require('express');
const servidor = express();

const cookiesParse = require('cookie-parser');
servidor.use(cookiesParse());

const body_parser = require('body-parser');
// hacemos uso del middleware body-parser
servidor.use(body_parser.urlencoded({extended:true}));
servidor.use(body_parser.json());

const url = require('url');

const path = require('path');

const procesar = require("./jsBackend/procesar.js");

//En la variable express se obtiene una función con todas las funciones,
//que las guardaremos en la variable servidor, para su fácil y entendible codificación

//-----------------------------------------------------------------------------
//  Código para utilizar bases de datos SQLite3
//-----------------------------------------------------------------------------
// Funcion para abrir la base de datos
baseDeDatos = new sqlite3.Database('baseDeDatos.db',//abrimos esta base de datos
    (err) => {
      if (err != null) {
        console.log("Error al abrir BD");
        process.exit();// Si hay un error termina el proceso
      }
    });


//__dirname = __dirname + '/views';


// // Definimos carpeta de las vistas
// servidor.set('views', __dirname + '/views');
//
// servidor.use(express.static(path.join(__dirname, '/views/')));
servidor.use(express.static(__dirname + '/views'));
//
// // Definimos motor de renderizado
// servidor.engine('html', require('ejs').renderFile);
// servidor.set('view engine', 'ejs');



//-----------------------------------------------------------------------------
//  RUTAS
//-----------------------------------------------------------------------------

// definimos la carpeta donde estan los archivos html
//__dirname = __dirname + '/views';

// Inicio
servidor.get('/', function (peticion, respuesta)
{
    respuesta.sendFile(__dirname + '/views/index.html');
});

// Login
// peticion de la pagina de login
servidor.get('/sesion', function getPaginaLogin (peticion, respuesta){
   respuesta.sendFile(__dirname + '/views/login.html');
   // respuesta.render('login.html');
});

// Procesar Login
servidor.get('/sesion/acceso', procesar.login);

// Perfil
// servidor.get('/perfil/modificar', procesar.activar);
servidor.get('/perfil', function(peticion , respuesta){
    respuesta.sendFile(__dirname + '/views/perfil.html');
});
//peticion de los datos de usuarios
servidor.get('/perfil/datos', procesar.getDatosCliente);


// Campo
// Muestra la página
servidor.get('/campos', function(peticion, respuesta){
    respuesta.sendFile(__dirname + '/views/campo.html');
});
// peticion de los datos de los campos
servidor.get('/campos/datos', function(peticion, respuesta){
  console.log("En desarrollo");
});

servidor.get('/grafica', function(peticion, respuesta){
  respuesta.sendFile(__dirname + '/views/graficas.html');
});

servidor.get('/grafica/medidas', procesar.getMedidas);

servidor.get('/mapa', function(peticion, respuesta){
  respuesta.sendFile(__dirname + '/views/mapa.html');
})

// peticiones POST

servidor.post('/perfil/modfpass', procesar.modificarPassword);

//-----------------------------------------------------------------------------
//  Código de escucha de servidor
//-----------------------------------------------------------------------------

servidor.listen(3000, function(){
  console.log(' --- Servidor Fucionando en http://localhost:3000 ---');
});
