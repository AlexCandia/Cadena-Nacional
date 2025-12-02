require('dotenv').config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const connectDB = require('./utils/database')

const areaRoutes = require('./modules/routes/areas');
const catalogoRoutes = require('./modules/routes/catalogos')

connectDB();

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

//Rutas
app.use('/api/areas', areaRoutes);
app.use('/api/catalogos', catalogoRoutes);

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

module.exports = app;
