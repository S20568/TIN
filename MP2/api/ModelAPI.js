const ModelRepository = require('../repository/sequelize/ModelRepository');

exports.getModels = (req, res, next) => {
    ModelRepository.getModels()
        .then(models => {
            res.status(200).json(models);
        })
        .catch(err => {
            console.log(err);
        })
}

exports.getModelById = (req, res, next) => {
    const modelId = req.params.modelId;
    ModelRepository.getModelById(modelId)
        .then(model => {
            if(!model) {
                res.status(404).json({
                    message: 'Model with id: '+modelId+' not found'
                })
            } else {
                res.status(200).json(model);
            }
        });
};

exports.createModel = (req, res, next) => {
    ModelRepository.createModel(req.body)
        .then(newModel => {
            res.status(201).json(newModel);
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}

exports.updateModel = (req, res, next) => {
    const modelId = req.params.modelId;
    ModelRepository.updateModel(modelId, req.body)
        .then(result => {
            res.status(200).json({
                message: 'Model updated', model: result
            });
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteModel = (req, res, next) => {
    const modelId = req.params.modelId;
    ModelRepository.deleteModel(modelId)
        .then(result => {
            res.status(200).json({
                message: 'Model removed', model: result
            });
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};