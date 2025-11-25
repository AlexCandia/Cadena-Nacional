const express = require('express');
const router = express.Router();
const areaController = require('../controllers/areasController');

router.post('/areas', areaController.createArea);
router.get('/areas', areaController.getAreas);
router.get('/areas/:id', areaController.getAreaById);
router.get('/catalogos/:catalogoId/areas', areaController.getAreasByCatalogo);

module.exports = router;