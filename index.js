require('dotenv').config();

// importamos los paquetes necesarios
const express = require('express'); // importamos express
const app = express(); // instanciamos una aplicación
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const port = process.env.PORT || 5000; // configuramos nuestro puerto

//Agregamos Morgan para que nos muestre los accesos de usuarios
app.use(logger('dev'));
// configuramos nuestra app para usar bodyParser()
// el cual nos permitirá obtener data enviada por POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuramos la carpeta estatica de React
app.use(express.static(path.join(__dirname, 'gui/build')));

// Implementamos nuestra conexión a la base de datos
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_STRING, { useNewUrlParser: true });
mongoose.connection.on('error', err => {
	console.error(`MongoDB connection error: ${err}`);
	process.exit(1);
});

app.use('/', function(req, res, next) {
	/*const domain = req.get('host');
	if(domain!=='see.conflux.pe'){
		console.error('creo que está redireccionando...')
		return res.status(301).redirect('http://conflux.pe');
	}*/
	res.header('Access-Control-Expose-Headers', 'X-Suggested-Filename');
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header(
		'Access-Control-Allow-Headers',
		'Content-Type, Authorization, Content-Length, X-Requested-With'
	);
	next();
});

app.options('/*', function(req, res, next) {
	res.sendStatus(200);
});

// Importamos las rutas. Cuando no damos un archivo en específico
// importará el archivo index.js dentro de la carpeta
require('./routes')(app);

app.use((req, res, next) => {
	// Devolvemos el index de React
	res.sendFile(path.join(__dirname, 'gui/build', 'index.html'));
});

app.listen(port, () => {
	console.log('La magia sucede en el puerto ' + port);
});
