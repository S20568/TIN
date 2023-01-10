const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Customer = sequelize.define('Customer', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    customerFirstName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    customerLastName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    }
});

module.exports = Customer;