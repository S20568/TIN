var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

const session = require('express-session');

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

const i18n = require('i18n');
i18n.configure({
    locales: ['pl', 'en'],
    directory: path.join(__dirname, 'locales'),
    objectNotation: true,
    cookie: 'acme-hr-lang',
});
app.use(i18n.init);


const customerRouter = require('./routes/customerRoute');
const modelRouter = require('./routes/modelRoute');
const orderRouter = require('./routes/orderRoute');
const sequelizeInit = require('./config/sequelize/init');
sequelizeInit()
    .catch(err => {
        console.log(err);
    });
const customerApiRouter = require('./routes/api/CustomerApiRoute');
const modelApiRouter = require('./routes/api/ModelApiRoute');
const orderApiRouter = require('./routes/api/OrderApiRoute');
const authUtils = require("./utils/authUtils");

app.use('/customers', authUtils.permitAuthenticatedUser, customerRouter);
app.use('/models', authUtils.permitAuthenticatedUser, modelRouter);
app.use('/orders', authUtils.permitAuthenticatedUser, orderRouter);
app.use('/api/customers', customerApiRouter);
app.use('/api/models', modelApiRouter);
app.use('/api/orders', orderApiRouter);

module.exports = app;