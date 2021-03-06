var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var Handlebars = require('handlebars');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');
var hbs = require('hbs');
hbs.registerHelper('dateFormat', require('handlebars-dateformat'));

//const config = require('./config/database');
mongoose.connect('mongodb://anujsri:anuj123@ds113003.mlab.com:13003/assignment'); //it provide local connection with database
var db = mongoose.connection;

mongoose.connection.on('error', (err) => {
    console.log('Database error ' + err);
});

var profile = require('./routes/profile');
var users = require('./routes/users');
var award = require('./routes/award');
var certificate = require('./routes/certificate');
var education = require('./routes/education');
var experience = require('./routes/experience');
var routes = require('./routes/index');


// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('html', exphbs({ defaultLayout: 'layout' }));
app.set('view engine', 'html');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
    errorFormatter: (param, msg, value) => {
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

// Connect Flash
app.use(flash());

// Global Vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});



app.use('/profile', profile);
app.use('/users', users);
app.use('/award', award);
app.use('/certificate', certificate);
app.use('/education', education);
app.use('/experience', experience)
app.use('/', routes);

// Set Port
http.listen(process.env.PORT || 3000, function() {
    console.log('listening on', http.address().port);
});