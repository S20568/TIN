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
                msg: "notEmprt"
            },
            isNumeric: {
                msg: "isNumeric"
            }
        }
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "notEmpty"
            },
            isDate: {
                msg: "isDate"
            }
        }
    },
    orderAmount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "notEmpty"
            },
            isNumeric: {
                msg: "isNumeric"
            }
        }
    }
});

module.exports = Order;