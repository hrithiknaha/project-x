const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');

//Local Referencing
const User = require('./models/Users');
const Journals = require('./models/Journals');
const Comment = require('./models/Comments');

//Requiring routes
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const accountRoutes = require('./routes/account');
const journalRoutes = require('./routes/journal');
const commentsRoutes = require('./routes/Comments');

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
app.use(express.urlencoded({ extended: true }));

//Cookie Configuration
app.use(cookieParser('secret'));

//Session Configuration
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false
	})
);

//Flash Configuration
app.use(flash());

//Passport Configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Setting up local variables
app.use(function (req, res, next) {
	res.locals.currentUser = req.user;
	res.locals.success = req.flash('success');
	res.locals.error = req.flash('error');
	next();
});

//Routes
app.use('/', indexRoutes);
app.use('/', authRoutes);
app.use('/journals', journalRoutes);
app.use('/:username', accountRoutes);
app.use('/journals/:journal_id/comments', commentsRoutes);

//Server Configuration
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
