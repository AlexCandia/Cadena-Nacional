const express = require('express');
const router = express.Router();
const subareaController = require('../controllers/subareasController');

router.post('/areas', subareaController.createSubarea);
router.get('/areas', subareaController.getSubareas);
router.get('/areas/:id', subareaController.getSubareaById);
router.get('/catalogos/:catalogoId/areas', subareaController.getSubareasByArea);

module.exports = router;