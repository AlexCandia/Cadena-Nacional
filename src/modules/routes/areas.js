const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const areaController = require('../controllers/areasController');
router.use(auth.isAuthenticated);
router.post('/',auth.checkRole('administrador'), areaController.createArea);
router.get('/', areaController.getAreas);
router.get('/:id', areaController.getAreaById);
router.get('/byCatalogo/:catalogoId', areaController.getAreasByCatalogo);
router.put('/:id',auth.checkRole('administrador'), areaController.updateArea);
router.delete('/:id',auth.checkRole('administrador'), areaController.deleteArea);

module.exports = router;