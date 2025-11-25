// routes/userRoutes.js
const express = require('express');
const { createUser } = require('../controllers/userController');
const router = express.Router();

// Define una ruta POST para crear usuarios
router.post('/', createUser);

module.exports = router;