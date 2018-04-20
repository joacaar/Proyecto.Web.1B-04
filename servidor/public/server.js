//-----------------------------------------------------------------------------
//importamos los paquetes de express y sqlite para obtener todas las 
//funcionalidades
//-----------------------------------------------------------------------------
const sqlite3 = require('sqlite3');

const express = require('express');
const app = express();

const path = require('path');
//En la variable express se obtiene una función con todas las funciones, 
//que las guardaremos en la variable servidor, para su fácil y entendible codificación


//__dirname = __dirname + '/views';


// Definimos carpeta de las vistas
app.set('views', __dirname + '/views');

app.use(express.static(path.join(__dirname, '/views')));

// Definimos motor de renderizado
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

//-----------------------------------------------------------------------------
//  RUTAS
//-----------------------------------------------------------------------------

// Inicio
app.get('/', function (req, res)
{
    res.render('index.html');
});

// Login
app.get('/login', function (req, res){
    res.render('login.html');
});


//-----------------------------------------------------------------------------
//  Código para utilizar bases de datos SQLite3
//-----------------------------------------------------------------------------
// Funcion para abrir la base de datos
baseDeDatos = new sqlite3.Database('base_datos.db',//abrimos esta base de datos
    (err) => {
      if (err != null) {
        console.log("Error al abrir BD");
      }
    });





//-----------------------------------------------------------------------------
//  Código del servidor
//-----------------------------------------------------------------------------

// Procesar datos
app.get('/api/login', procesar_login);


// Login
function procesar_login(peticion, respuesta) {
  function procesar_login2(err, row) {
    if (err !=null){
      respuesta.send('Error base de datos' + err);
    }else{
      if (row === undefined){
        respuesta.send('Este usuario no existe');
        }else{
          if (row.pass == peticion.query.pass){
            respuesta.send('Login correcto');
          }else{
            respuesta.send('Usuario o contaseña incorrectos');
          }
        }
      }
  }
  baseDeDatos.get ('SELECT password FROM datosUsuario WHERE user=?' , [peticion.query.user], procesar_login2);
}

//res.status(500).send({ message: "El usuario no existe" });

app.listen(3000, () => console.log('En marcha'));