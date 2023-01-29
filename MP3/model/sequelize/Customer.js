const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');
const phoneRegex = /^\+?([0-9]{2})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})?[-. ]?([0-9]{3})$/

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
        validate: {
            notEmpty: {
                msg: "notEmpty"
            },
            len: {
                args: [2,20],
                msg: "len_2_20"
            },
        }
    },
    customerLastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "notEmpty"
            },
            len: {
                args: [2,30],
                msg: "len_2_30"
            },
        }
    },
    customerEmail: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: "notEmpty"
            },
            len: {
                args: [5,60],
                msg: "len_5_60",
            },
            isEmail: {
                msg: "isEmail"
            }
        }
    },
    phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: "notEmpty"
            },
            is: {
                args: /^(\+([0-9]{2})\)?)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})?[-. ]?([0-9]{3})$/,
                msg: "inputError"
            }
        },
    },
    password: {
        type: Sequelize.STRING,
        allowNull: true
    }
});

module.exports = Customer;