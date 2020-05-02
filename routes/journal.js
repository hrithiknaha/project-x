const router = require('express').Router();
const Journals = require('../models/Journals');
const Comment = require('../models/Comments');

const { isLoggedIn, checkUserJournal } = require('../middleware/index');

router.get('/', (req, res) => {
	Journals.find((err, journals) => {
		if (err) return console.log(err);

		res.render('journals/index', { journals });
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
	const prologue = req.body.prologue;
	const genre = req.body.genre;
	const author = {
		id: req.user._id,
		username: req.user.username
	};

	const journal = new Journals({
		title,
		body,
		prologue,
		genre,
		author
	});

	journal.save((err, recentlyCreatedJournal) => {
		if (err) return console.log(err);
		console.log(recentlyCreatedJournal);
		res.redirect('/journals/' + recentlyCreatedJournal._id);
	});
});

// Journal more info
router.get('/:journal_id', (req, res) => {
	console.log('accessing id' + req.params.journal_id);
	Journals.findById(req.params.journal_id)
		.populate('comments')
		.exec(function (err, journal) {
			if (err) return console.log('Error in accessing the DB' + err);
			res.render('journals/journal', { journal });
		});
});

//Journal Edit route
router.get('/:journal_id/edit', isLoggedIn, checkUserJournal, (req, res) => {
	Journals.findById(req.params.journal_id, (err, journal) => {
		if (err) return console.log('Error in accessing the db');
		res.render('journals/edit', { journal });
	});
});

//Journal Edit post routes
router.post('/:journal_id/edit', isLoggedIn, checkUserJournal, (req, res) => {
	Journals.findById(req.params.journal_id, (err, journal) => {
		if (err) return console.log('Error in accessing the db');
		journal.title = req.body.title;
		journal.body = req.body.body;
		journal.prologue = req.body.prologue;
		journal.genre = req.body.genre;
		journal.save();
		res.redirect('/journals/' + journal.id);
	});
});

//Journal Delete Route - To add delete comments route
router.post('/:journal_id/delete', isLoggedIn, checkUserJournal, (req, res) => {
	Journals.findByIdAndDelete(
		req.params.journal_id,
		{ useFindAndModify: false },
		(err, journal) => {
			if (err) return console.log('Error in accessing the db');
			const arrComments = journal.comments;
			arrComments.forEach((arrComment) => {
				Comment.findByIdAndDelete(arrComment, (err) => {
					if (err) return console.log('Error in accrssing db');
				});
			});
			res.redirect('/journals');
		}
	);
});

module.exports = router;
