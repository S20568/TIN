const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Order = sequelize.define('Order', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    customerId: {
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
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            isNumeric: {
                msg: "Pole powinno zawierać wyłącznie cyfry"
            }
        }
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            isDate: {
                msg: "Pole powinno zawierać date"
            }
        }
    },
    orderAmount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            isNumeric: {
                msg: "Pole powinno zawierać wyłącznie cyfry"
            }
        }
    }
});

module.exports = Order;