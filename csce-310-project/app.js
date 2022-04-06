var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'arvind',
  host: 'localhost',
  database: 'maroonlink',
  password: 'arvind00',
  port: 5432,
})


port = 4000

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.listen(port, () => {
  console.log(`App running on port ${port}`)
})

module.exports = app;
