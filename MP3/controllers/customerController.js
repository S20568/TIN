const CustomerRepository = require('../repository/sequelize/CustomerRepository');

exports.showCustomerList = (req, res, next) => {
    CustomerRepository.getCustomers()
        .then(customers => {
            res.render('pages/customer/list', {
                customers: customers,
                navLocation: 'customer',
                validationErrors: []
            });
        });
}

exports.showAddCustomerForm = (req, res, next) => {
    res.render('pages/customer/form', {
        customer: {},
        pageTitle: req.__('customer.form.add.pageTitle'),
        formMode: 'createNew',
        btnLabel: req.__('customer.form.add.btnLabel'),
        formAction: '/customers/add',
        navLocation: 'customer',
        validationErrors: []
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
                navLocation: 'customer',
                validationErrors: []
            });
        });
}

exports.showEditCustomerForm = (req, res, next) => {
    const customerId = req.params.customerId;
    CustomerRepository.getCustomerById(customerId)
        .then(customer => {
            res.render('pages/customer/form', {
                customer: customer,
                pageTitle: req.__('customer.form.edit.pageTitle'),
                formMode: 'edit',
                btnLabel: req.__('customer.form.edit.btnLabel'),
                formAction: '/customers/edit',
                navLocation: 'customer',
                validationErrors: []
            });
        });
}

exports.showCustomerDetails = (req, res, next) => {
    const customerId = req.params.customerId;
    CustomerRepository.getCustomerById(customerId)
        .then(customer => {
            res.render('pages/customer/form', {
                customer: customer,
                pageTitle: req.__('customer.form.details.pageTitle'),
                formMode: 'showDetails',
                formAction: '',
                navLocation: 'customer',
                validationErrors: []
            });
        });
}

exports.addCustomer = (req, res, next) => {
    const customerData = { ...req.body };
    CustomerRepository.createCustomer(customerData)
        .then( result => {
            res.redirect('/customers');
        }).catch(err => {
            res.render('pages/customer/form', {
                customer: {},
                pageTitle: req.__('customer.form.add.pageTitle'),
                formMode: 'createNew',
                btnLabel: req.__('customer.form.add.btnLabel'),
                formAction: '/customers/add',
                navLocation: 'customer',
                validationErrors: err.errors
        });
    });
};

exports.updateCustomer = (req, res, next) => {
    const customerId = req.body._id;
    const customerData = { ...req.body };
    let tmpCustomer;
    return CustomerRepository.getCustomerById(customerId)
        .then(returned => {
            tmpCustomer = returned;
            return CustomerRepository.updateCustomer(customerId, customerData)
                .then( result => {
                    res.redirect('/customers');
                }).catch(err => {
                    res.render('pages/customer/form', {
                        customer: tmpCustomer,
                        pageTitle: req.__('customer.form.edit.pageTitle'),
                        formMode: 'edit',
                        btnLabel: req.__('customer.form.edit.btnLabel'),
                        formAction: '/customers/edit',
                        navLocation: 'customer',
                        validationErrors: err.errors
                    });
                });
        });
};

exports.deleteCustomer = (req, res, next) => {
    const customerId = req.params.customerId;
    CustomerRepository.deleteCustomer(customerId)
        .then( () => {
            res.redirect('/customers');
        });
};