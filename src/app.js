require('dotenv').config();

const express = require('express');
const spdy = require('spdy');
const fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const connectDB = require('./utils/database');
const Role = require('./models/Role');

const areaRoutes = require('./modules/routes/areas');
const catalogoRoutes = require('./modules/routes/catalogos')
const subareaRoutes = require('./modules/routes/subareas')
const authRoutes = require('./modules/routes/auth'); 

var app = express();

const initializeRoles = async () => {
  try {
    await Role.initializeRoles();
  } catch (error) {
    console.error('Error al inicializar roles:', error);
  }
};

connectDB().then(() => {
  initializeRoles();
}).catch((error) => {
  console.error('Error al conectar a MongoDB:', error);
});

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Rutas

app.get('/', (req, res) => {
  res.json({ 
    message: 'HTTP/2 con SPDY',
    protocol: req.httpVersion 
  });
});

app.use('/api/areas', areaRoutes);
app.use('/api/catalogos', catalogoRoutes);
app.use('/api/subareas', subareaRoutes);
app.use('/api/auth', authRoutes);

//prueba de health
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'API funcionando',
    timestamp: new Date().toISOString()
  });
});

//Error
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});   

const options = {
  key: fs.readFileSync('./server.key'),
  cert: fs.readFileSync('./server.crt'),
  
};

spdy.createServer(options, app)
  .listen(3443, (error) => {
    if (error) {
      console.error(error);
      return process.exit(1);
    }
    console.log("Server HTTP2 corriendo en puerto 3443");
});

module.exports = app;