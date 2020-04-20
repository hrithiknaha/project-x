const router = require('express').Router({ mergeParams: true });
const Journals = require('../models/Journals');

router.get('/', (req, res) => {
	Journals.find((err, journals) => {
		if (err) return console.log('Error in Accessing DB');
		console.log(journals);
	});
});

router.get('/write', (req, res) => {
	const title = req.body.title;
	const body = req.body.body;
	const author = {
		id: req.user._id,
		username: req.user.username
	};

	const journal = new Journals({
		title,
		body,
		author
	});

	journal.save((err, recentlyCreatedJournal) => {
		if (err) return console.log(err);
		console.log(recentlyCreatedJournal);
	});
});

module.exports = router;
