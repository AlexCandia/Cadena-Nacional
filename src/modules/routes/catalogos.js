const express = require('express');
const router = express.Router();
const catalogoController = require('../controllers/catalogosController');

router.post('/', catalogoController.createCatalogo);
router.get('/', catalogoController.getCatalogos);

module.exports = router;