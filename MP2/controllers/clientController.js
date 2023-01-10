const ClientRepository = require('../repository/sequelize/ClientRepository');

exports.showClientList = (req, res, next) => {
    ClientRepository.getClients()
        .then(clients => {
            res.render('pages/client/list', {
                clients: clients,
                navLocation: 'client'
            });
        });
}

exports.showAddClientForm = (req, res, next) => {
    res.render('pages/client/form', {
        customer: {},
        pageTitle: 'Nowy klient',
        formMode: 'createNew',
        btnLabel: 'Dodaj klienta',
        formAction: '/clients/add',
        navLocation: 'client'
    });
}

exports.showRemoveClientForm = (req, res, next) => {
    const clientId = req.params.clientId;
    ClientRepository.getClientById(clientId)
        .then(customer => {
            res.render('pages/client/form', {
                customer: customer,
                pageTitle: 'Usuń klienta',
                formMode: 'delete',
                btnLabel: 'Usuń klienta',
                formAction: '/clients/delete',
                navLocation: 'client'
            });
        });
}

exports.showEditClientForm = (req, res, next) => {
    const clientId = req.params.clientId;
    ClientRepository.getClientById(clientId)
        .then(customer => {
            res.render('pages/client/form', {
                customer: customer,
                pageTitle: 'Edycja klienta',
                formMode: 'edit',
                btnLabel: 'Edytuj klienta',
                formAction: '/clients/edit',
                navLocation: 'client'
            });
        });
}

exports.showClientDetails = (req, res, next) => {
    const clientId = req.params.clientId;
    ClientRepository.getClientById(clientId)
        .then(customer => {
            res.render('pages/client/form', {
                customer: customer,
                pageTitle: 'Szczegóły klienta',
                formMode: 'showDetails',
                formAction: '',
                navLocation: 'client'
            });
        });
}

exports.addClient = (req, res, next) => {
    const clientData = { ...req.body };
    ClientRepository.createClient(clientData)
        .then( result => {
            res.redirect('/clients');
        });
};

exports.updateClient = (req, res, next) => {
    const clientId = req.body._id;
    const clientData = { ...req.body };
    ClientRepository.updateClient(clientId, clientData)
        .then( result => {
            res.redirect('/clients');
        });
};

exports.deleteClient = (req, res, next) => {
    const clientId = req.params.clientId;
    ClientRepository.deleteClient(clientId)
        .then( () => {
            res.redirect('/clients');
        });
};