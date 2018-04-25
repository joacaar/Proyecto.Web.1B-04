// Definimos en __dirname la direccion del directorio de views
// __dirname = 'C:/Users/Joan Calabuig Artes/desktop/Grado-Tecnologias/aProject/servidor/views'


// ----------------------------------------------------------------------------
// Funciones peticiones index.html
// ----------------------------------------------------------------------------

// ----------------------------------------------------------------------------
// Funciones peticiones login.html
// ----------------------------------------------------------------------------

//funcion de respuesta a la peticion de la pagina de login
function getPaginaLogin (peticion, respuesta){
   respuesta.sendFile(__dirname + '/views/login.html');
   // respuesta.render('login.html');
}

//funcion para buscar el usuario que se pasa por query y devolver un objeto con
// los datos de ese usuario que haya en la BD.
module.exports.login = function (peticion, respuesta) {
  function procesar_login2(err, fila) {
    console.log(err);
    console.log(fila);
    if (err !=null){
      respuesta.send('Error base de datos' + err);
    }else{
      if (fila == undefined){
        // console.log("undefined");
        // console.log(fila);
        respuesta.sendStatus(401);
      }else{
//			console.log(peticion.query.user);
            // console.log("correcto");
            // console.log(fila);
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
  console.log(typeof(peticion.query.id_usuario));
  var idUsuario = parseInt(peticion.query.id_usuario);
  console.log(typeof(idUsuario));

  baseDeDatos.get('SELECT * FROM datosUsuario WHERE id_usuario = ?',[idUsuario], getDatos);

    // funcion de callback en baseDeDatos.get
      function getDatos (error, fila){
        console.log(error);
        console.log(fila);
        if (error != null){
          respuesta.sendStatus(500);
        }else if(fila === undefined){
          respuesta.sendStatus(401)
        }else{
          respuesta.send(fila);
        }
      }
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
      respuesta.sendStatus(500);
    }else{
      if(fila === undefined){
        respuesta.sendStatus(401);
      }else{
        // respuesta.send(fila);
        console.log(fila);
        // console.log(fila[0].id_zona);
        idZona = fila[0].id_zona;
        baseDeDatos.all('SELECT * FROM datosVertices WHERE id_zona = ?',[idZona],
        function(error, fila2){
          if(error != null){
            respuesta.sendStatus(500);
          }else{
            if(fila2 === undefined){
              respuesta.sendStatus(401);
            }else{
              console.log(fila2);
            }
          }
        });
      }
    }
  });
}

// devuelve un objeto con los datos de la tabla vertices
// No esta en uso
module.exports.vertices = function (peticion, respuesta){
  baseDeDatos.all('SELECT * FROM datosVertices WHERE id_zona = 1',
  function(err, fila) {
    console.log('Holaaaa')
    console.log(err);
    console.log(fila);
    respuesta.send(fila);
  })
}
// ----------------------------------------------------------------------------
// Funciones peticiones sonda.html
// ----------------------------------------------------------------------------

// ----------------------------------------------------------------------------
// Funciones peticiones grafica.html
// ----------------------------------------------------------------------------

// comprueba si el usuario ha entrado por primera vez a la aplicación

// module.exports.activar = function (peticion, respuesta){
//   function comprobar (err, fila){
//     if (err != null){
//       respuesta.send('Error base de datos' + err);
//     }else{
//         if(fila.activo == 'false'){
//           baseDeDatos.all ('UPDATE datosUsuario SET activo = true');
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
  if('email' in peticion.cookies && 'contrasena' in peticion.cookies){
    baseDeDatos.get('SELECT * FROM usuarios WHERE email =? AND contrasena=?',
    [peticion.cookies.email, peticion.cookies.contrasena],
    function(error, fila){
      if(error != null){
        respuesta.sendStatus(500);
      }else if(fila === undefined){
        respuesta.sendFile(__dirname + '/views/login.html');
      }else{
        siguiente();
      }
    });
  }else{
    respuesta.sendFile(__dirname + '/views/login.html');
  }
}


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
