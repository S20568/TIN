const express = require('express');
const router = express.Router();

const modelController = require('../controllers/modelController');

router.get('/', modelController.showModelList);
router.get('/add', modelController.showAddModelForm);
// router.get('/delete', modelController.showRemoveModelForm);
router.get('/edit/:modelId', modelController.showEditModelForm);
router.get('/details/:modelId', modelController.showModelDetails);
router.post('/add', modelController.addModel);
router.post('/edit', modelController.updateModel);
router.get('/delete/:modelId', modelController.deleteModel);

module.exports = router;