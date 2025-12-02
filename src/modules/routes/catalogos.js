const express = require('express');
const router = express.Router();
const catalogoController = require('../controllers/catalogosController');

router.post('/', catalogoController.createCatalogo);
router.get('/', catalogoController.getCatalogos);
router.put('/:id', catalogoController.updateCatalogo);
router.delete('/:id', catalogoController.deleteCatalogo); 

module.exports = router;