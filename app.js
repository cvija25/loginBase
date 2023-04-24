const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const { initializePassport } = require('./controllers/auth');

const app = express(); //initialize app

//set up view engine
app.set('view engine', 'ejs');
app.set('views', 'views/')
//use static files
app.use(express.static(path.join(__dirname,'public')));

//set up body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


//set up cookies
app.use(cookieParser());

//Set up session
//todo? store?
app.use(session({
  secret: `${process.env.SESSION_SECRET}`,
  resave: false,
  saveUninitialized: false
}));

//passport set-up
//kako ovo radi???
initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());  

app.use('/', pocetnaRoutes);
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

//error handling
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send(err.stack);
  });
module.exports = app;