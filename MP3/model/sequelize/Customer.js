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
                msg: "Pole jest wymagane"
            },
            len: {
                args: [2,50],
                msg: "Pole powinno zawierać od 2 do 20 znaków"
            },
        }
    },
    customerLastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [2,50],
                msg: "Pole powinno zawierać od 2 do 30 znaków"
            },
        }
    },
    customerEmail: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [5,60],
                msg: "Pole powinno zawierać od 5 do 60 znaków",
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