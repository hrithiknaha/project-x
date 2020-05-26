const router = require('express').Router();

const Journals = require('../models/Journals');
const User = require('../models/Users');

const { isLoggedIn } = require('../middleware/index');

router.post('/:username', (req, res) => {
	Journals.find(
		{ 'author.username': req.params.username },
		(err, journals) => {
			if (err) return console.log(err);
			User.findOne({ username: req.params.username }, (err, user) => {
				if (err) return console.log(err);
				if (!user)
					return res.json({ err: 'No user found of that username' });
				return res.json({ journals, user });
			});
		}
	);
});

module.exports = router;
