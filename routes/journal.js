const router = require('express').Router();
const Journals = require('../models/Journals');

const { isLoggedIn } = require('../middleware/index');

router.get('/', (req, res) => {
	Journals.find((err, journals) => {
		if (err) return console.log(err);
		res.render('journals/index', { journals });
		console.log(journals);
	});
});

//Journal GET Write Route
router.get('/write', isLoggedIn, (req, res) => {
	res.render('journals/write');
});

//Journal POST Write Route
router.post('/write', isLoggedIn, (req, res) => {
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

// Journal more info

router.get('/:journal_id', (req, res) => {
	console.log(req.params.journal_id);
	Journals.findById(req.params.journal_id)
		.populate('comments')
		.exec(function (err, journal) {
			if (err) return console.log('Error in accessing the DB' + err);
			res.render('journals/journal', { journal });
		});
});

module.exports = router;
