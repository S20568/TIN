const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');
const scaleRegex = /1:[0-9]+/

const Model = sequelize.define('Model', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    modelName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [2,50],
                msg: "Pole powinno zawierać od 2 do 50 znaków"
            },
        }
    },
    modelManufacturer: {
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
    modelScale: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            is: {
                args: /1:[0-9]+/,
                msg: "Wprowadź poprawną wartość"
            }
        }
    },
    modelPrice: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            isNumeric: {
                msg: "Pole powinno zawierać wyłącznie cyfry"
            },
            min: {
                args: 80,
                msg: "Podana wartość jest mniejsza niż 80"
            },
            max: {
                args: 1500,
                msg: "Podana wartość jest większa niż 1500"
            }
        }
    }
});

module.exports = Model;