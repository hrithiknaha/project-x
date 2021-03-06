const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');

//Local Referencing
const User = require('./models/Users');
// const Journals = require('./models/Journals');
// const Comment = require('./models/Comments');

//Requiring routes
const authRoutes = require('./Routes/auth');
const profileRoutes = require('./Routes/profile');
const journalRoutes = require('./Routes/journal');
const commentRoute = require('./Routes/comment');

//App
const app = express();

// CORS
app.use(
	cors({
		credentials: true,
		origin: 'http://localhost:5000' || 'https://fow-x.herokuapp.com'
	})
);

//Dotenv file
dotenv.config();

// app.use(function (req, res, next) {
// 	res.header('Access-Control-Allow-Credentials', true);
// 	res.header('Access-Control-Allow-Origin', 'http://localhost:5000');
// 	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
// 	res.header(
// 		'Access-Control-Allow-Headers',
// 		'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'
// 	);
// 	if ('OPTIONS' == req.method) {
// 		res.send(200);
// 	} else {
// 		next();
// 	}
// });

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
app.use(express.json());

//Cookie Configuration
app.use(cookieParser('secret'));

//Session Configuration
app.use(
	session({
		cookie: {
			maxAge: 1000 * 60 * 60 * 60
			// secure: true
		},
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false
	})
);

//Flash Configuration
// app.use(flash());

//Passport Configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Setting up local variables
// app.use(function (req, res, next) {
// 	res.locals.currentUser = req.user;
// 	next();
// });

//Routes
app.use('/comments', commentRoute);
app.use('/', authRoutes);
app.use('/account', profileRoutes);
app.use('/journals', journalRoutes);

//Server Static Assets is in production
if (process.env.NODE_ENV === 'production') {
	// app.use(express.static('front-end/dist'));
	// app.get('*', (req, res) => {
	// 	res.sendFile(
	// 		path.resolve(__dirname, 'front-end', 'dist', 'index.html')
	// 	);
	// });
	res.send(hello);
}

//Server Configuration
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
