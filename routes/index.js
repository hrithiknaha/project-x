const passport = require('passport');
const router = require('express').Router();

const User = require('../models/Users');

router.get('/', (req, res) => {
	res.send('Landing Page');
});

router.get('/login', (req, res) => {
	res.render('login');
});

router.get('/register', (req, res) => {
	res.render('register');
});

router.post('/register', (req, res) => {
	const { username, password, name, email } = req.body;
	console.log(req.body);
	const newUser = new User({
		username,
		name,
		email
	});
	User.register(newUser, password, (err, user) => {
		if (err) return console.log('Error in registraion', err);
	});

	//Redirecting to home page after successful login and registration
	passport.authenticate('local')(req, res, () => {
		console.log('Successful registration welcome ' + username);
	});
});

module.exports = router;
