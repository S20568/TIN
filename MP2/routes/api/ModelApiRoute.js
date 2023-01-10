const express = require('express');
const router = express.Router();

const modelApiController = require('../../api/ModelAPI');

router.get('/', modelApiController.getModels);
router.get('/:modelId', modelApiController.getModelById);
router.post('/', modelApiController.createModel);
router.put('/:modelId', modelApiController.updateModel);
router.delete('/:modelId', modelApiController.deleteModel);

module.exports = router;