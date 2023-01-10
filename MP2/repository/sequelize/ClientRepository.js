const Client = require('../../model/sequelize/Client');
const Model = require('../../model/sequelize/Model');
const Order = require('../../model/sequelize/Order');

exports.getClients = () => {
    return Client.findAll();
};

exports.getClientById = (clientId) => {
    return Client.findByPk(clientId, {
        include: [{
            model: Order,
            as: 'orders',
            include: [{
                model: Model,
                as: 'model'
            }]
        }]
    });
};

exports.createClient = (newClientData) => {
    return Client.create({
        clientFirstName: newClientData.clientFirstName,
        clientLastName: newClientData.clientLastName,
        phoneNumber: newClientData.phoneNumber
    });
};

exports.updateClient = (clientId, clientData) => {
    const clientFirstName = clientData.clientFirstName;
    const clientLastName = clientData.clientFirstName;
    const phoneNumber = clientData.phoneNumber;
    return Client.update(clientData, {
        where: { _id: clientId }
    });
};

exports.deleteClient = (clientId) => {
    return Client.destroy({
        where: { _id: clientId }
    });
};