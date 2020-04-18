const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');

//Local Referencing
const Users = require('./models/Users');

//Requiring routes
const indexRoutes = require('./routes/index');
const writeRoutes = require('./routes/write');

//App
const app = express();

//Dotenv file
dotenv.config();

//DB Connection
mongoose.connect(
	process.env.DB_CONNECT,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	(err) => {
		if (err) return console.log('Can not connect to the database');
		console.log('DB Connected');
	}
);

//Express Configuration
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));

//Session Configuration
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false
	})
);

//Passport Configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(Users.authenticate()));
passport.serializeUser(Users.serializeUser());
passport.deserializeUser(Users.deserializeUser());

//Routes
app.use('/', indexRoutes);
app.use('/', writeRoutes);

//Server Configuration
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
