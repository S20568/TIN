const sequelize = require('./sequelize');

const Client = require('../../model/sequelize/Client');
const Model = require('../../model/sequelize/Model');
const Order = require('../../model/sequelize/Order');

module.exports = () => {
    Client.hasMany(Order, {as: 'orders', foreignKey: {name: 'clientId', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    Order.belongsTo(Client, {as: 'client', foreignKey: {name: 'clientId', allowNull: false}});
    Model.hasMany(Order, {as: 'orders', foreignKey: {name: 'modelId', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    Order.belongsTo(Model, {as: 'model', foreignKey: {name: 'modelId', allowNull: false}});

    let allClients, allModels;
    return sequelize
        .sync({force: true})
        .then( () => {
            return Client.findAll();
        })
        .then(clients => {
            if(!clients || clients.length == 0) {
                return Client.bulkCreate([
                    {clientFirstName: 'Jakub', clientLastName: 'Slusarski', phoneNumber: '+48578964315'},
                    {clientFirstName: 'Jan', clientLastName: 'Kowalski', phoneNumber: '+48123456789'},
                    {clientFirstName: 'Piotr', clientLastName: 'Nowak', phoneNumber: '+48745896123'},
                ])
                .then( () => {
                    return Client.findAll();
                });
            } else {
                return clients;
            }
        })
        .then( clients => {
            allClients = clients;
            return Model.findAll();
        })
        .then( models => {
            if(!models || models.length == 0) {
                return Model.bulkCreate([
                    {modelName: 'Oracle Red Bull Racing RB18', modelManufacturer: 'Bburago', modelScale: '1:18', modelPrice: 340},
                    {modelName: 'Scuderia Ferrari SF-75', modelManufacturer: 'Bburago', modelScale: '1:18', modelPrice: 360},
                    {modelName: 'Mercedes-AMG Petronas F1 W13', modelManufacturer: 'Spark', modelScale: '1:18', modelPrice: 400},
                ])
                .then( () => {
                    return Model.findAll();
                });
            } else {
                return models;
            }
        })
        .then( models => {
            allModels = models;
            return Order.findAll();
        })
        .then(orders => {
            if(!orders || orders.length == 0) {
                return Order.bulkCreate([
                    {clientId: allClients[0]._id, modelId: allModels[0]._id, quantity: 2, date: '2022-11-03', orderAmount: 680},
                    {clientId: allClients[0]._id, modelId: allModels[1]._id, quantity: 1, date: '2022-11-03', orderAmount: 360},
                    {clientId: allClients[1]._id, modelId: allModels[2]._id, quantity: 1, date: '2022-11-04', orderAmount: 400},
                    {clientId: allClients[2]._id, modelId: allModels[1]._id, quantity: 2, date: '2022-11-04', orderAmount: 720},
                ]);
            } else {
                return orders;
            }
        });
};