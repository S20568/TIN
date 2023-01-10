const Sequelize = require('sequelize');

const Client = require('../../model/sequelize/Client');
const Model = require('../../model/sequelize/Model');
const Order = require('../../model/sequelize/Order');

exports.getOrders = () => {
    return Order.findAll({
        include: [{
            model: Client,
            as: 'client'
        },
        {
            model: Model,
            as: 'model'
        }]
    });
};

exports.getOrderById = (orderId) => {
    return Order.findByPk(orderId, {
        include: [{
            model: Client,
            as: 'client'
        },
        {
            model: Model,
            as: 'model'
        }]
    });
};

exports.createOrder = (data) => {
    console.log(JSON.stringify(data));

    return Order.create({
        clientId: data.clientId,
        modelId: data.modelId,
        quantity: data.quantity,
        date: data.date,
        orderAmount: data.orderAmount
    });
};

exports.updateOrder = (orderId, data) => {
    return Order.update(data, {
        where: { _id: orderId }
    });
}

exports.deleteOrder = (orderId) => {
    return Order.destroy({
        where: { _id: orderId }
    });
}

exports.deleteManyOrders = (orderIds) => {
    return Order.find({ _id: { [Sequelize.Op.in]: orderIds }})
}