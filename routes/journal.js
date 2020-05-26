const router = require('express').Router();

const Journals = require('../models/Journals');
const User = require('../models/Users');
const Comment = require('../models/Comments');

const { isLoggedIn } = require('../middleware/index');

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

router.get('/:id', (req, res) => {
	Journals.findById(req.params.id)
		.populate('comments')
		.exec((err, journal) => {
			if (err) return console.log(err);
			return res.json(journal.comments);
		});
});

router.post('/:id/edit', (req, res) => {
	console.log('Editing');
	console.log(req.body);
	Journals.findById(req.params.id, (err, journal) => {
		if (err) return console.log(err);
		journal.title = req.body.title;
		journal.body = req.body.content;
		journal.prologue = req.body.prologue;
		journal.genre = req.body.genre;
		journal.save();
		return res.json({ msg: 'Content has been Edited!' });
	});
});

router.post('/:id/delete', (req, res) => {
	console.log(req.params.id);
	Journals.findByIdAndDelete(
		{ _id: req.params.id },
		{ useFindAndModify: false },
		(err, journal) => {
			if (err) return console.log(err);
			// console.log(journal.comments.length);
			if (journal.comments.length !== 0) {
				const arrComments = journal.comments;
				// console.log(arrComments);
				arrComments.forEach((arrComments) => {
					Comment.findByIdAndDelete(arrComment, (err) => {
						if (err) return console.log(err);
						return res.json({ msg: 'Content has been deleted!' });
					});
				});
			}
			return res.json({ msg: 'Content has been deleted!' });
		}
	);
});

module.exports = router;
