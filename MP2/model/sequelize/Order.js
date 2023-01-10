const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Client = sequelize.define('Order', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    clientId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    modelId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    orderAmount: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = Client;