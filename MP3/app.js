var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');

const customerRouter = require('./routes/customerRoute');
const modelRouter = require('./routes/modelRoute');
const orderRouter = require('./routes/orderRoute');
const sequelizeInit = require('./config/sequelize/init');
const customerApiRouter = require('./routes/api/CustomerApiRoute');
const modelApiRouter = require('./routes/api/ModelApiRoute');
const orderApiRouter = require('./routes/api/OrderApiRoute');
const authUtils = require('./utils/authUtils');

var app = express();
var cors = require('cors');

const i18n = require('i18n');
const session = require('express-session');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

i18n.configure({
    locales: ['pl', 'en'],
    directory: path.join(__dirname, 'locales'),
    objectNotation: true,
    cookie: 'acme-hr-lang',
});

app.use(cookieParser('secret'));
app.use(i18n.init);
app.use((req, res, next) => {
    if(!res.locals.lang) {
        res.locals.lang = req.cookies['acme-hr-lang'];
    }
    next();
});

app.use(session({
    secret: 'my_secret_password',
    resave: false
}));

app.use((req, res, next) => {
    res.locals.loggedUser = req.session.loggedUser;
    if(!res.locals.loginError) {
        res.locals.loginError = undefined;
    }
    next();
});
app.use(cors());

app.use('/', indexRouter);
app.use('/customers', authUtils.permitAuthenticatedUser, customerRouter);
app.use('/models', authUtils.permitAuthenticatedUser, modelRouter);
app.use('/orders', authUtils.permitAuthenticatedUser, orderRouter);
app.use('/api/customers', customerApiRouter);
app.use('/api/models', modelApiRouter);
app.use('/api/orders', orderApiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
sequelizeInit()
    .catch(err => {
        console.log(err);
    });

module.exports = app;