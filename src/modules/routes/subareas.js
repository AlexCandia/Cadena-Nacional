const express = require('express');
const router = express.Router();
const subareaController = require('../controllers/subareasController');

router.post('/', subareaController.createSubarea);
router.get('/', subareaController.getSubareas);
router.get('/:id', subareaController.getSubareaById);
router.get('/byArea/:areaId', subareaController.getSubareasByArea);
router.put('/:id', subareaController.updateSubarea);
router.delete('/:id', subareaController.deleteSubarea);

module.exports = router;