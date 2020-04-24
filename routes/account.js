const router = require('express').Router({ mergeParams: true });
const User = require('../models/Users');
const Journals = require('../models/Journals');

const { isLoggedIn } = require('../middleware/index');

router.get('/', (req, res) => {
	Journals.find(
		{ 'author.id': '5e9c7e9b2c84836960c9d3b4' },
		(err, journals) => {
			res.render('account/index', { user: 'hrithik naha', journals });
		}
	);
});

module.exports = router;
