const Customer = require('../../model/sequelize/Customer');
const Model = require('../../model/sequelize/Model');
const Order = require('../../model/sequelize/Order');

exports.getCustomers = () => {
    return Customer.findAll();
};

exports.getCustomerById = (customerId) => {
    return Customer.findByPk(customerId, {
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

exports.createCustomer = (newCustomerData) => {
    return Customer.create(newCustomerData);
};

exports.updateCustomer = (customerId, customerData) => {
    return Customer.update(customerData, {
        where: { _id: customerId }
    });
};

exports.deleteCustomer = (customerId) => {
    return Customer.destroy({
        where: { _id: customerId }
    });
};

exports.findByEmail = (email) => {
    return Customer.findOne({
        where: {customerEmail: email}
    });
}