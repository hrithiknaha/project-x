const router = require('express').Router({ mergeParams: true });
const User = require('../models/Users');
const passport = require('passport');

router.post('/register', (req, res) => {
	const { username, password, email, name } = req.body;
	const newUser = new User({
		username,
		email,
		name
	});
	User.register(newUser, password, (err, user) => {
		if (err) return res.json({ err: err.message });
		return res.json({
			id: user._id,
			username: user.username,
			email: user.email,
			name: user.name,
			date: user.dateCreates
		});
	});
});

// router.post('/login', passport.authenticate('local'), function (req, res) {
// 	return res.json({
// 		username: req.user.username,
// 		email: req.user.email,
// 		name: req.user.name,
// 		date: req.user.dateCreates
// 	});
// });

router.post('/login', function (req, res) {
	console.log('Logged In');
	passport.authenticate('local', { session: true }, function (
		err,
		user,
		info
	) {
		if (err) return res.json({ err: err.message });
		if (!user) return res.json({ err: info.message }); //Sending unauthorized message

		req.logIn(user, function (err) {
			if (err) return res.json({ err: err.message });
			return res.json({
				id: req.user._id,
				username: req.user.username,
				email: req.user.email,
				name: req.user.name,
				date: req.user.dateCreated
			});
		});
	})(req, res);
});

router.get('/logout', (req, res) => {
	console.log('Loggin out');
	req.logout();
});

module.exports = router;
