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
                msg: "notEmpty"
            },
            len: {
                args: [2,50],
                msg: "len_2_50"
            },
        }
    },
    modelManufacturer: {
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
    modelScale: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "notEmpty"
            },
            is: {
                args: /1:[0-9]{2}$/,
                msg: "inputError"
            }
        }
    },
    modelPrice: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "notEmpty"
            },
            isNumeric: {
                msg: "isNumeric"
            },
            min: {
                args: 80,
                msg: "min_80"
            },
            max: {
                args: 1500,
                msg: "max_1500"
            }
        }
    }
});

module.exports = Model;