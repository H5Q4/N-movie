var express = require('express');
var serveStatic = require('serve-static');
var config = require('./config');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var app = express();

app.set('views', path.join(__dirname, 'app/views/pages'));
app.set('view engine', 'jade');

if ('development' == config.env) {
  app.use(require('morgan')('dev'));
  mongoose.set('debug', true);
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: config.secret,
  saveUninitialized: true,
  resave: true,
  cookie: {
    maxAge: 3 * 24 * 60 * 60 * 1000  //3 days
  },
  store: new MongoStore({
    url: config.dbUrl
  })
}));

app.use(serveStatic(path.join(__dirname, 'public')));

require('./app/routes/core_routes')(app);

mongoose.connect(config.dbUrl, function(err) {
  if (err) {
    return console.log(err);
  }
  console.log('MongoDB: connected successfully!');
});

app.locals.moment = require('moment');

app.listen(config.port);
console.log('Server is listening on port: ' + config.port);

var disconnectMongodb = function() {
  mongoose.connection.close(function() {
    process.exit(0);
  })
};

//close the mongoose connection when the Node process ends
process.on('SIGINT', disconnectMongodb).on('SIGTERM', disconnectMongodb);