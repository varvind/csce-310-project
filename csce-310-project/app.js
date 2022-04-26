var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
var cors = require('cors')



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var friendsRouter = require('./routes/friends');
var adminRouter = require('./routes/admin');
var membersRouter = require('./routes/members');
var commentsRouter = require('./routes/comments');
var eventsRouter = require('./routes/events');

var app = express();

app.set('trust proxy', 1) // trust first proxy


app.use(cors())


const Pool = require('pg').Pool
global.pool = new Pool({
  /*
  user: 'jason',
  host: 'localhost',
  database: 'maroonlink',
  password: 'arvind00',
  port: 5432,
  */
  user: 'me',
  host: 'localhost',
  database: 'maroonlink',
  password: 'password',
  port: 5433,
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
app.use('/friends', friendsRouter);
app.use('/admin', adminRouter);
app.use('/members', membersRouter);
app.use('/comments', commentsRouter);
app.use('/events', eventsRouter);

// catch 404 and forward to error handler
app.listen(port, function(error) {
  if (error) {
    console.log('Something went wrong', error)
  } else {
    console.log(`App running on port ${port}`)
  }
})

module.exports = app;
