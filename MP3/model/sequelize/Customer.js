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
                msg: "error.emptyString"
            },
            len: {
                args: [2,20],
                msg: "error.stringLen_2_20"
            },
        }
    },
    customerLastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "error.emptyString"
            },
            len: {
                args: [2,30],
                msg: "error.stringLen_2_30"
            },
        }
    },
    customerEmail: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: "error.emptyString"
            },
            len: {
                args: [5,60],
                msg: "error.stringLen_5_60",
            },
            isEmail: {
                msg: "Pole powinno zawierać prawidłowy adres email"
            }
        }
    },
    phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            is: {
                args: /^(\+([0-9]{2})\)?)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})?[-. ]?([0-9]{3})$/,
                msg: "Wprowadź poprawną wartość"
            }
        },
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Customer;