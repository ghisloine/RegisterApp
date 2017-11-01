var express = require('express');
var path = require('path');
var expressValidator = require('express-validator');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bodyParser = require('body-parser');
var flash = require('connect-flash');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

//view Engines

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Static Folder

app.use(express.static(path.join(__dirname, 'views')));
app.use('/css',express.static(__dirname + '/node_modules/bootstrap/dist/css'))
app.use('/css',express.static(__dirname + '/public/css'))

//Body Parser

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

//Express/ session MiddleWare Standart Baslangic

app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

//Password MiddleWare Kullanimi

app.use(passport.initialize());
app.use(passport.session());

//Express Validator Kullanimi
//adi uzerinde Giriste Kontriol Amacli
//

app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
    var namespace = param.split('.'),
      root = namespace.shift(),
      formParam = root;

    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));
app.use(flash());
app.use(function(req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});
//Defıne Routers
app.use('/', routes);
app.use('/users', users);

app.listen(3000);
console.log("Server Started ON port 3000");
