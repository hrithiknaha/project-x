const passport = require('passport');
const router = require('express').Router();

const User = require('../models/Users');

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

		//Redirecting to home page after successful login and registration
		passport.authenticate('local')(req, res, () => {
			console.log('Successful registration welcome ' + username);
			res.redirect('/journals');
		});
	});
});

router.get('/login', (req, res) => {
	res.render('login');
});

router.post(
	'/login',
	passport.authenticate('local', {
		failureRedirect: '/login',
		failureFlash: true,
		successFlash: 'Welcome to YelpCamp!'
	}),
	function (req, res) {
		res.redirect('/journals');
	}
);

router.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/');
});

module.exports = router;
