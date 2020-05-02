const router = require('express').Router({ mergeParams: true });
const User = require('../models/Users');
const Journals = require('../models/Journals');

const { isLoggedIn } = require('../middleware/index');

router.get('/', (req, res) => {
	console.log(req.params);
	Journals.find(
		{ 'author.username': req.params.username },
		(err, journals) => {
			User.findOne({ username: req.params.username }, (err, user) => {
				//res.send(user);
				//res.send(journals);
				res.render('account/index', { user, journals });
			});
		}
	);
});

module.exports = router;
