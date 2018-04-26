// ----------------------------------------------------------------------------
// Autor: Grupo 04 GTI 2017/2018
// Fecha: 13-04-18
// Descripción: Servidor en node.js con una base de datos enlazada que podra
// hacer consultas para que los usuarios puedan iniciar sesión y mostrar datos
// en unagrafica.

// TO-DO:
//

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
servidor.get('/perfil',  function(peticion , respuesta){
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
servidor.get('/campos/datos', procesar.vertices);

servidor.get('/grafica', function(peticion, respuesta){
  respuesta.sendFile(__dirname + '/views/graficas.html');
});

// peticiones POST

servidor.post('/perfil/modfpass', function (peticion, respuesta){

  console.log(peticion.body);
  // baseDeDatos.all("SELECT * FROM datosUsuario WHERE email=? & contrasena=?", [peticion.cookies.email, peticion.cookies.contrasena],
  // function(err, fila){
  //   if(err != null){
  //     respuesta.sendStatus(500);
  //   }else{
  //     if(fila === undefined || fila.length == 0){
  //       respuesta.sendStatus(401);
  //     }else{
  //       if(fila.contrasena == peticion.body.contrasenaActual){
  //         respuesta.sendStatus(200);
  //       }else{
  //         respuesta.sendStatus(401);
  //       }
  //     }
  //   }
  // })
})

//-----------------------------------------------------------------------------
//  Código de escucha de servidor
//-----------------------------------------------------------------------------

servidor.listen(3000, function(){
  console.log(' --- Servidor Fucionando en http://localhost:3000 ---');
});
