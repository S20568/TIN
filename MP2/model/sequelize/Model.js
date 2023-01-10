const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Client = sequelize.define('Model', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    modelName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    modelManufacturer: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    modelScale: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    modelPrice: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = Client;