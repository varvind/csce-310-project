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
  user: 'fcuztxukmokemk',
  host: 'ec2-54-80-122-11.compute-1.amazonaws.com',
  database: 'ddk0vf1jvu1bja',
  password: '7cd4efee07b148e1dee422269c3ebc0dfab92623a0e44caecf60dd1c3ff13bd8',
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
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
