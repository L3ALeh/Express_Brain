var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users'); // login/logout + routes protégées
var authRouter = require('./routes/auth');   // routes publiques éventuelles

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Sessions
app.use(session({
    secret: 'secret_key_super_safe',
    resave: true,
    saveUninitialized: false,
    cookie: { secure: false } // important pour HTTP local
}));

// rendre user disponible dans toutes les vues
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

// Static
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter); // login/logout + routes protégées
app.use('/', authRouter);        // routes publiques éventuelles

// catch 404
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
