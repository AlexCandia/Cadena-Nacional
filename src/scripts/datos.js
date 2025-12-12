const axios = require('axios');
const https = require('https');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const Catalogo = require('../models/Catalogo');
const Area = require('../models/Area');
const Subarea = require('../models/Subarea');
const axiosInstance = axios.create({
  httpsAgent: new https.Agent({  
    rejectUnauthorized: false
  })
});

const BASE_URL = `https://localhost:3000/api`;
const ADMIN_CREDENTIALS = {
  "email": "administrador@cadenanacional.com",
  "password": "fghijk123!" 
};

let authToken = '';

const sampleData = {
  catalogos: [
    { "titulo":"Ciencias" },
    { "titulo":"Ingenieria" }
  ],
  
  areas: [
    { "nombre_area": "Matematicas" },
    { "nombre_area": "Fisica" },
    { "nombre_area": "Ingenieria Civil" },
    { "nombre_area": "Ingenieria Sistemas" }
  ],
  
  subareas: [
    { "nombre_subarea": "Calculo Diferencial" },
    { "nombre_subarea": "Algebra Lineal" },
    { "nombre_subarea": "Programacion" },
    { "nombre_subarea": "Bases Datos" }
  ]
};

async function loginAndGetToken() {
  try {
    const response = await axiosInstance.post(`${BASE_URL}/auth/login`, {
      email: ADMIN_CREDENTIALS.email,
      password: ADMIN_CREDENTIALS.password
    });

    if (response.data.success && response.data.token) {
      authToken = response.data.token;
      return true;
    }
  } catch (error) {
    console.log('Error en login:', error.message);
  }
  return false;
}

function setupAxiosHeaders() {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
  axiosInstance.defaults.headers.common['Content-Type'] = 'application/json';
}

async function connectDB() {
  await mongoose.connect(process.env.MONGODB_URI);
}

async function clearDatabase() {
  await Catalogo.deleteMany({});
  await Area.deleteMany({});
  await Subarea.deleteMany({});
}

async function populateCatalogos() {
  setupAxiosHeaders();
  const createdCatalogos = [];
  
  for (const catalogoData of sampleData.catalogos) {
    try {
      const response = await axiosInstance.post(`${BASE_URL}/catalogos`, catalogoData);
      createdCatalogos.push(response.data);
      console.log('Catálogo creado:', catalogoData.titulo);
    } catch (error) {
      console.log('Error creando catálogo:', error.message);
    }
  }
  
  return createdCatalogos;
}

async function populateAreas(catalogos) {
  setupAxiosHeaders();
  const createdAreas = [];
  
  for (let i = 0; i < sampleData.areas.length; i++) {
    const catalogoIndex = i < 2 ? 0 : 1;
    const areaData = {
      "nombre_area": sampleData.areas[i].nombre_area,
      "id_catalogo": catalogos[catalogoIndex].data._id
    };
    
    try {
      const response = await axiosInstance.post(`${BASE_URL}/areas`, areaData);
      createdAreas.push(response.data);
      console.log('Área creada:', areaData.nombre_area);
    } catch (error) {
      console.log('Error creando área:', error.message);
    }
  }
  
  return createdAreas;
}

async function populateSubareas(areas) {
  setupAxiosHeaders();
  
  for (let i = 0; i < sampleData.subareas.length; i++) {
    const areaIndex = i < 2 ? 0 : 1;
    
    const subareaData = {
      "nombre_subarea": sampleData.subareas[i].nombre_subarea,
      "id_area": areas[areaIndex].data._id
    };
    
    try {
      await axiosInstance.post(`${BASE_URL}/subareas`, subareaData);
      console.log('Subárea creada:', subareaData.nombre_subarea);
    } catch (error) {
      console.log('Error creando subárea:', error.message);
    }
  }
}

async function populateDatabase() {
  try {
    await connectDB();
    await clearDatabase();
    await mongoose.disconnect();
    
    const loggedIn = await loginAndGetToken();
    if (!loggedIn) {
      throw new Error('No se pudo autenticar');
    }
    
    const catalogos = await populateCatalogos();
    if (catalogos.length === 0) {
      throw new Error('No se pudieron crear catálogos');
    }
    
    const areas = await populateAreas(catalogos);
    if (areas.length === 0) {
      throw new Error('No se pudieron crear áreas');
    }
    
    await populateSubareas(areas);
    
    console.log('Base de datos poblada exitosamente');
    
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  populateDatabase()
    .then(() => {
      process.exit(0);
    })
    .catch((error) => {
      console.error('Error:', error);
      process.exit(1);
    });
}

module.exports = { populateDatabase };