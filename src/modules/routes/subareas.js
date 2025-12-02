const express = require('express');
const router = express.Router();
const subareaController = require('../controllers/subareasController');

router.post('/', subareaController.createSubarea);
router.get('/', subareaController.getSubareas);
router.get('/:id', subareaController.getSubareaById);
router.get('/byArea/:areaId', subareaController.getSubareasByArea);

module.exports = router;