// Definimos en __dirname la direccion del directorio de views
// __dirname = 'C:/Users/Joan Calabuig Artes/desktop/Grado-Tecnologias/aProject/servidor/views'
var path = require('path');
newDirname = path.join(__dirname, '../');

// ----------------------------------------------------------------------------
// Funciones peticiones index.html
// ----------------------------------------------------------------------------

// ----------------------------------------------------------------------------
// Funciones peticiones login.html
// ----------------------------------------------------------------------------

//funcion de respuesta a la peticion de la pagina de login
//hay un problema con __dirname, no esta en la ubicación servidor/views
// function getPaginaLogin (peticion, respuesta){
//    respuesta.sendFile(__dirname + '/views/login.html');
//    // respuesta.render('login.html');
// }

//funcion para buscar el usuario que se pasa por query y devolver un objeto con
// los datos de ese usuario que haya en la BD.
module.exports.login = function (peticion, respuesta) {
  function procesar_login2(err, fila) {
    if (err !=null){
      respuesta.send('Error base de datos' + err);
    }else{
      if (fila == undefined){
        console.log("error 401 en login");
        respuesta.sendStatus(401);
      }else{
          console.log("Envio del objeto con los datos para comprobar el login");
          respuesta.send(fila);// fila es un objeto que contiene como
            //propiedades las filas de la bd y sus valores segun el usuario.
        }
      }
  }
  baseDeDatos.get ('SELECT * FROM datosUsuario WHERE email=? AND contrasena=?',
   [peticion.query.user, peticion.query.pass], procesar_login2);
}

// ----------------------------------------------------------------------------
// Funciones peticiones perfil.html
// ----------------------------------------------------------------------------

// Devuelve los datos del usuario
// En la pagina de perfil, muestra los datos basicos de los clientes.
module.exports.getDatosCliente = function(peticion, respuesta){
  var idUsuario = parseInt(peticion.query.id_usuario);

  baseDeDatos.get('SELECT * FROM datosUsuario WHERE id_usuario = ?',[idUsuario], getDatos);

    // funcion de callback en baseDeDatos.get
      function getDatos (error, fila){
        if (error != null){
          console.log("error 500 en getDatosCliente");
          respuesta.sendStatus(500);
        }else if(fila === undefined){
          console.log("error 401 en getDatosCliente");
          respuesta.sendStatus(401)
        }else{
          console.log("envio del objeto con los datos del usuario en getDatosCliente");
          respuesta.send(fila);
        }
      }
}

module.exports.modificarPassword = function(peticion, respuesta){
  //hacer un update a la base de datos, verificando el email del usuario y la
  //contraseña actual.
  //cuando se haya modificaco, modificar la contraseña en las cookies y
  //devolver un 200 OK

  console.log(peticion.body);

  var usuario = peticion.body.user;
  var newPass = peticion.body.newpass;

  console.log(usuario + ' ' + newPass);

  baseDeDatos.all('UPDATE datosUsuario set contrasena=?, activo="true" where email=?;',
  [newPass, usuario],
  function(err){
    if(err != null){
      console.log(err);
      respuesta.sendStatus(500);
      return;
    }
    respuesta.sendStatus(200);
  })
}
// ----------------------------------------------------------------------------
// Funciones peticiones campos.html
// ----------------------------------------------------------------------------

// Devuelve un objeto con los datos de la zona donde hay otro objeto con
// los vertices
module.exports.campos = function (peticion, respuesta){
  var idUsuario = parseInt(peticion.query.id_usuario);
  // console.log(idUsuario);
  // console.log(typeof(idUsuario));
  baseDeDatos.all('SELECT * FROM datosZona WHERE id_usuario = ?',
  [idUsuario],
  function(err, fila){
    if(err != null){
      console.log("error 500 en campos");
      respuesta.sendStatus(500);
    }else{
      if(fila === undefined){
        console.log("error 401 en campos");
        respuesta.sendStatus(401);
      }else{
        // respuesta.send(fila);
        console.log("segunda consulta, datosVertices");
        // console.log(fila[0].id_zona);
        idZona = fila[0].id_zona;
        baseDeDatos.all('SELECT * FROM datosVertices WHERE id_zona = ?',[idZona],
        function(error, fila2){
          if(error != null){
            console.log("error 500 en la segunda consulta a bd");
            respuesta.sendStatus(500);
          }else{
            if(fila2 === undefined){
              console.log("error 401 en la segunda consulta a bd");
              respuesta.sendStatus(401);
            }else{
              console.log("envio del objeto con los datos de los vertices");
              console.log("falta implementar el envio de los datos");
            }
          }
        });
      }
    }
  });
}

// ----------------------------------------------------------------------------
// Funciones peticiones sonda.html
// ----------------------------------------------------------------------------

// ----------------------------------------------------------------------------
// Funciones peticiones grafica.html
// ----------------------------------------------------------------------------

//funcion que devuelve las medidas para representar en las gráficas

module.exports.getMedidas = function(peticion, respuesta){

  var sensor = peticion.query.id_sensor;
  var medida = peticion.query.medida;

  textoSQL = "SELECT " + medida + " FROM medidas WHERE id_sensor = ?;";

    baseDeDatos.all(textoSQL,
    [sensor], function (err, fila){
      if(err != null){
        respuesta.sendStatus(500);
      }else{
        if(fila == undefined || fila.length == 0){
          respuesta.sendStatus(401);
        }else{
          // console.log(fila.length);
          respuesta.send(fila);
        }//else
      }//else
    })//.all
}//function




// ----------------------------------------------------------------------------
// Funciones complementarias
// ----------------------------------------------------------------------------

// comprueba si el usuario ha entrado por primera vez a la aplicación

// module.exports.activar = function (peticion, respuesta){
//   function comprobar (err, fila){
//     if (err != null){
//       respuesta.send('Error base de datos' + err);
//     }else{
//         if(fila.activo == 'false'){
//           baseDeDatos.all('UPDATE datosUsuario SET activo = true');
//         }
//     }
//   }
//     baseDeDatos.get ('SELECT activo FROM datosUsuario WHERE email=?',
//     [peticion.cookies.email], comprobar);
// }





// module.exports.cookie = function(peticion, respuesta){
//   baseDeDatos.get('SELECT * FROM datosUsuarios WHERE email=?',
//   [peticion.cookies.email], function(){
//
//   })
// }

module.exports.comprobarLogin = function(peticion, respuesta, siguiente){
  console.log(peticion.cookies);
  if('email' in peticion.cookies && 'contrasena' in peticion.cookies){
    baseDeDatos.get('SELECT * FROM datosUsuario WHERE email =? AND contrasena=?',
    [peticion.cookies.email, peticion.cookies.contrasena],
    function(error, fila){
      if(error != null){
        console.log("error ?= null");
        respuesta.sendStatus(500);
      }else if(fila === undefined){
        console.log("fila = undefined");
        // location.href = "http://localhost:3000/sesion"
        respuesta.sendFile(newDirname + '/views/login.html');
      }else{
        console.log("llamada a siguiente()");
        siguiente();
      }
    });
  }else{
    // location.href = "www.google.com";
    // location.href = "http://localhost:3000/sesion"
    respuesta.sendFile(newDirname + '/views/login.html');
  }
}

// module.exports.medidas = function(peticion, respuesta){
//   baseDeDatos.all('SELECT * FROM medidas WHERE ')
// }


// module.exports.funciones = {
//   hola: function(){
//     console.log('Hola');
//   },
//   adios: function(){
//     console.log('Adios');
//   }
// }
// module.exports.directorio = function(){
//   console.log(__dirname);
// }
