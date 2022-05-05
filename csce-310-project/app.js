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
var adminPagesRouter = require('./routes/adminPages');
var adminEventsRouter = require('./routes/adminEvents');

var app = express();

app.set('trust proxy', 1) // trust first proxy


app.use(cors())


const Pool = require('pg').Pool
global.pool = new Pool({
  user: 'cvljeupgtzffuh',
  host: 'ec2-44-194-117-205.compute-1.amazonaws.com',
  database: 'd5ap5tsdtu1a7c',
  password: '83d5861c5f75ea59a2ba6d1111a1f4f8eee837d20a8d74d0640fd41f98b2f361',
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
app.use('/adminEvents', adminEventsRouter);
app.use('/pages', adminPagesRouter);

// catch 404 and forward to error handler
app.listen(port, function(error) {
  if (error) {
    console.log('Something went wrong', error)
  } else {
    console.log(`App running on port ${port}`)
  }
})

module.exports = app;
