const router = require('express').Router();

const Journals = require('../models/Journals');
const User = require('../models/Users');

const { isLoggedIn } = require('../middleware/index');

router.post('/', isLoggedIn, (req, res) => {
	Journals.find({}, (err, journals) => {
		if (err) return console.log(err);
		return res.json(journals);
	});
});

router.post('/write', isLoggedIn, (req, res) => {
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

router.get('/:id', (req, res) => {
	Journals.findById(req.params.id)
		.populate('comments')
		.exec((err, journal) => {
			if (err) return console.log(err);
			return res.json(journal.comments);
		});
});

module.exports = router;
