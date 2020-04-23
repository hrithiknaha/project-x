const router = require('express').Router({ mergeParams: true });
const User = require('../models/Users');
const Journals = require('../models/Journals');

const { isLoggedIn } = require('../middleware/index');

router.get('/', isLoggedIn, (req, res) => {
	Journals.find({ 'author.id': req.user._id }, (err, journals) => {
		res.render('account/index', { user: req.user, journals });
	});
});

module.exports = router;
