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
	const { title, prologue, content, genre } = req.body;
	const author = {
		id: req.user._id,
		username: req.user.username
	};

	const journal = new Journals({
		title,
		prologue,
		body: content,
		genre,
		author
	});

	journal.save((err, recentlyCreatedJournal) => {
		if (err) return console.log(err);
		return res.json({
			msg: 'Content has been added!',
			id: recentlyCreatedJournal._id
		});
	});
});

module.exports = router;
