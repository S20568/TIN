const ModelRepository = require('../repository/sequelize/ModelRepository');

exports.showModelList = (req, res, next) => {
    ModelRepository.getModels()
        .then(models => {
            res.render('pages/model/list', {
                models: models,
                navLocation: 'model',
                validationErrors: []
            });
        });
}

exports.showAddModelForm = (req, res, next) => {
    res.render('pages/model/form', {
        model: {},
        pageTitle: 'Nowy model',
        formMode: 'createNew',
        btnLabel: 'Dodaj model',
        formAction: '/models/add',
        navLocation: 'model',
        validationErrors: []
    });
}

exports.showRemoveModelForm = (req, res, next) => {
    const modelId = req.params.modelId;
    ModelRepository.getModelById(modelId)
        .then(model => {
            res.render('pages/model/form', {
                model: model,
                pageTitle: 'Usuń model',
                formMode: 'delete',
                btnLabel: 'Usuń model',
                formAction: '/models/delete',
                navLocation: 'model',
                validationErrors: []
            });
        });
}

exports.showEditModelForm = (req, res, next) => {
    const modelId = req.params.modelId;
    ModelRepository.getModelById(modelId)
        .then(model => {
            res.render('pages/model/form', {
                model: model,
                pageTitle: 'Edycja modela',
                formMode: 'edit',
                btnLabel: 'Edytuj model',
                formAction: '/models/edit',
                navLocation: 'model',
                validationErrors: []
            });
        });
}

exports.showModelDetails = (req, res, next) => {
    const modelId = req.params.modelId;
    ModelRepository.getModelById(modelId)
        .then(model => {
            res.render('pages/model/form', {
                model: model,
                pageTitle: 'Szczegóły modelu',
                formMode: 'showDetails',
                formAction: '',
                navLocation: 'model',
                validationErrors: []
            });
        });
}

exports.addModel = (req, res, next) => {
    const modelData = { ...req.body };
    ModelRepository.createModel(modelData)
        .then( result => {
            res.redirect('/models');
        });
};

exports.updateModel = (req, res, next) => {
    const modelId = req.body._id;
    const modelData = { ...req.body };
    ModelRepository.updateModel(modelId, modelData)
        .then( result => {
            res.redirect('/models');
        });
};

exports.deleteModel = (req, res, next) => {
    const modelId = req.params.modelId;
    ModelRepository.deleteModel(modelId)
        .then( () => {
            res.redirect('/models');
        });
};