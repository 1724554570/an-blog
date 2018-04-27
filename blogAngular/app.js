var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

let session = require('express-session');
let MongoStore = require('connect-mongo')(session);
let flash = require('connect-flash');
// let settings = require('./core/db/db-cofig');

// import { useLogger, getLogger } from './lib/log-config';
import { mongdb } from './core/db/db-cofig';


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// 
app.use(flash());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 提供mongdb会话支持
// app.use(session({
//   secret: mongdb.cookieSecret,
//   key: mongdb.db,
//   cookie: { maxAge: 1000 * 60 * 60 * 24 },
//   store: new MongoStore({ url: mongdb.urlConnection })
// }));

app.use('/', indexRouter);
app.use('/apis', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// useLogger(app, getLogger());

module.exports = app;
