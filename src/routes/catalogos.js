const express = require('express');
const router = express.Router();
const catalogoController = require('../controllers/catalogoController');

router.post('/catalogos', catalogoController.createCatalogo);
router.get('/catalogos', catalogoController.getCatalogos);

module.exports = router;