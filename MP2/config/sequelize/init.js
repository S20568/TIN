const sequelize = require('./sequelize');

const Customer = require('../../model/sequelize/Customer');
const Model = require('../../model/sequelize/Model');
const Order = require('../../model/sequelize/Order');

module.exports = () => {
    Customer.hasMany(Order, {as: 'orders', foreignKey: {name: 'customerId', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    Order.belongsTo(Customer, {as: 'customer', foreignKey: {name: 'customerId', allowNull: false}});
    Model.hasMany(Order, {as: 'orders', foreignKey: {name: 'modelId', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    Order.belongsTo(Model, {as: 'model', foreignKey: {name: 'modelId', allowNull: false}});

    let allCustomers, allModels;
    return sequelize
        .sync({force: true})
        .then( () => {
            return Customer.findAll();
        })
        .then(customers => {
            if(!customers || customers.length == 0) {
                return Customer.bulkCreate([
                    {customerFirstName: 'Jakub', customerLastName: 'Slusarski', phoneNumber: '+48578964315'},
                    {customerFirstName: 'Jan', customerLastName: 'Kowalski', phoneNumber: '+48123456789'},
                    {customerFirstName: 'Piotr', customerLastName: 'Nowak', phoneNumber: '+48745896123'},
                ])
                .then( () => {
                    return Customer.findAll();
                });
            } else {
                return customers;
            }
        })
        .then( customers => {
            allCustomers = customers;
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
                    {customerId: allCustomers[0]._id, modelId: allModels[0]._id, quantity: 2, date: '2022-11-03', orderAmount: 680},
                    {customerId: allCustomers[0]._id, modelId: allModels[1]._id, quantity: 1, date: '2022-11-03', orderAmount: 360},
                    {customerId: allCustomers[1]._id, modelId: allModels[2]._id, quantity: 1, date: '2022-11-04', orderAmount: 400},
                    {customerId: allCustomers[2]._id, modelId: allModels[1]._id, quantity: 2, date: '2022-11-04', orderAmount: 720},
                ]);
            } else {
                return orders;
            }
        });
};