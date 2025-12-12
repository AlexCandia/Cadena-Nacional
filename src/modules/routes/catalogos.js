const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const catalogoController = require('../controllers/catalogosController');
router.use(auth.isAuthenticated);
router.post('/',auth.checkRole('administrador'), catalogoController.createCatalogo);
router.get('/', catalogoController.getCatalogos);
router.put('/:id',auth.checkRole('administrador'), catalogoController.updateCatalogo);
router.delete('/:id',auth.checkRole('administrador'), catalogoController.deleteCatalogo); 

module.exports = router;