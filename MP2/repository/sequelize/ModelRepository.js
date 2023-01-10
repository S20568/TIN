const Customer = require('../../model/sequelize/Customer');
const Model = require('../../model/sequelize/Model');
const Order = require('../../model/sequelize/Order');

exports.getModels = () => {
    return Model.findAll();
};

exports.getModelById = (modelId) => {
    return Model.findByPk(modelId, {
        include: [{
            model: Order,
            as: 'orders',
            include: [{
                model: Customer,
                as: 'customer'
            }]
        }]
    });
};

exports.createModel = (newModelData) => {
    return Model.create({
        modelName: newModelData.modelName,
        modelManufacturer: newModelData.modelManufacturer,
        modelScale: newModelData.modelScale,
        modelPrice: newModelData.modelPrice
    });
};

exports.updateModel = (modelId, modelData) => {
    const modelName = modelData.modelName;
    const modelManufacturer = modelData.modelManufacturer;
    const modelScale = modelData.modelScale;
    const modelPrice = modelData.modelPrice;
    return Model.update(modelData, {
        where: { _id: modelId }
    });
};

exports.deleteModel = (modelId) => {
    return Model.destroy({
        where: { _id: modelId }
    });
};