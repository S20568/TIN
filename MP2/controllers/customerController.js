const CustomerRepository = require('../repository/sequelize/CustomerRepository');

exports.showCustomerList = (req, res, next) => {
    CustomerRepository.getCustomers()
        .then(customers => {
            res.render('pages/customer/list', {
                customers: customers,
                navLocation: 'customer'
            });
        });
}

exports.showAddCustomerForm = (req, res, next) => {
    res.render('pages/customer/form', {
        customer: {},
        pageTitle: 'Nowy klient',
        formMode: 'createNew',
        btnLabel: 'Dodaj klienta',
        formAction: '/customers/add',
        navLocation: 'customer'
    });
}

exports.showRemoveCustomerForm = (req, res, next) => {
    const customerId = req.params.customerId;
    CustomerRepository.getCustomerById(customerId)
        .then(customer => {
            res.render('pages/customer/form', {
                customer: customer,
                pageTitle: 'Usuń klienta',
                formMode: 'delete',
                btnLabel: 'Usuń klienta',
                formAction: '/customers/delete',
                navLocation: 'customer'
            });
        });
}

exports.showEditCustomerForm = (req, res, next) => {
    const customerId = req.params.customerId;
    CustomerRepository.getCustomerById(customerId)
        .then(customer => {
            res.render('pages/customer/form', {
                customer: customer,
                pageTitle: 'Edycja klienta',
                formMode: 'edit',
                btnLabel: 'Edytuj klienta',
                formAction: '/customers/edit',
                navLocation: 'customer'
            });
        });
}

exports.showCustomerDetails = (req, res, next) => {
    const customerId = req.params.customerId;
    CustomerRepository.getCustomerById(customerId)
        .then(customer => {
            res.render('pages/customer/form', {
                customer: customer,
                pageTitle: 'Szczegóły klienta',
                formMode: 'showDetails',
                formAction: '',
                navLocation: 'customer'
            });
        });
}

exports.addCustomer = (req, res, next) => {
    const customerData = { ...req.body };
    CustomerRepository.createCustomer(customerData)
        .then( result => {
            res.redirect('/customers');
        });
};

exports.updateCustomer = (req, res, next) => {
    const customerId = req.body._id;
    const customerData = { ...req.body };
    CustomerRepository.updateCustomer(customerId, customerData)
        .then( result => {
            res.redirect('/customers');
        });
};

exports.deleteCustomer = (req, res, next) => {
    const customerId = req.params.customerId;
    CustomerRepository.deleteCustomer(customerId)
        .then( () => {
            res.redirect('/customers');
        });
};