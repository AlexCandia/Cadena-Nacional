const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const subareaController = require('../controllers/subareasController');
router.use(auth.isAuthenticated);
router.post('/',auth.checkRole('administrador', 'profesor'), subareaController.createSubarea);
router.get('/', subareaController.getSubareas);
router.get('/:id', subareaController.getSubareaById);
router.get('/byArea/:areaId', subareaController.getSubareasByArea);
router.put('/:id',auth.checkRole('administrador', 'profesor'), subareaController.updateSubarea);
router.delete('/:id',auth.checkRole('administrador', 'profesor'), subareaController.deleteSubarea);

module.exports = router;