const router = require('express').Router();

const Journals = require('../models/Journals');
const User = require('../models/Users');

router.post('/', (req, res) => {
	Journals.find({}, (err, journals) => {
		if (err) return console.log(err);
		return res.json(journals);
	});
});

router.post('/write', (req, res) => {
	console.log('Hiting');
	console.log({
		msg: 'asdasd',
		user: req.user
	});
	return res.json({
		msg: 'asdasd',
		user: req.user
	});
});

module.exports = router;
