const CustomerRepository = require('../repository/sequelize/CustomerRepository');
const authUtil = require('../utils/authUtils');

exports.login = (req, res, next) => {
    const email = req.body.customerEmail;
    const password = req.body.password;
    CustomerRepository.findByEmail(email)
        .then(customer => {
            if(!customer) {
                res.render('index', {
                    navLocation: '',
                    loginError: 'Nieprawidłowy adres email lub hasło'
                })
            } else if (authUtil.comparePasswords(password, customer.password) === true) {
                req.session.loggedUser = customer;
                res.redirect('/');
            } else {
                res.render('index', {
                    navLocation: '',
                    loginError: 'Nieprawidłowy adres email lub hasło'
                })
            }
        })
        .catch(err => {
            console.log(err);
        });
}

exports.logout = (req, res, next) => {
    res.session.loggedUser = undefined;
    res.redirect('/');
}