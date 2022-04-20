var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
var express_session = require('express-session')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var membersRouter = require('./routes/members');

var app = express();
app.set('trust proxy', 1) // trust first proxy
app.use(express_session({
  secret: 'keyboard cat',
}))

global.loggedIn = null
app.use("*", (req, res, next) => {
  loggedIn = req.session.userId;
  next()
})


const Pool = require('pg').Pool
global.pool = new Pool({
  user: 'jason',
  host: 'localhost',
  database: 'maroonlink',
  password: 'tomatobad',
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
app.use('/user', usersRouter);
app.use('/admin', adminRouter);
app.use('/members', membersRouter);

// catch 404 and forward to error handler
app.listen(port, () => {
  console.log(`App running on port ${port}`)
})

module.exports = app;
