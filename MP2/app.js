const clientRouter = require('./routes/clientRoute');
const modelRouter = require('./routes/modelRoute');
const orderRouter = require('./routes/orderRoute');
const sequelizeInit = require('./config/sequelize/init');
sequelizeInit()
    .catch(err => {
      console.log(err);
    })
const clientApiRouter = require('./routes/api/ClientApiRoute');
const modelApiRouter = require('./routes/api/ModelApiRoute');
const orderApiRouter = require('./routes/api/OrderApiRoute');

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
app.use('/clients', clientRouter);
app.use('/models', modelRouter);
app.use('/orders', orderRouter);
app.use('/api/clients', clientApiRouter);
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

module.exports = app;
