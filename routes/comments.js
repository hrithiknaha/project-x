const router = require('express').Router({ mergeParams: true });

const Journals = require('../models/Journals');
const Comment = require('../models/Comments');

router.get('/write', (req, res) => {
	Journals.findById(req.params.journal_id, (err, journal) => {
		if (err) return console.log('Error in accessing the DB');
		res.render('comments/write', { journal });
	});
});

router.post('/write', (req, res) => {
	Journals.findById(req.params.journal_id, (err, journal) => {
		if (err) return console.log('Error in accessing the Db');

		const { text } = req.body;
		const author = {
			id: req.user._id,
			username: req.user.username
		};

		const comment = new Comment({
			text,
			author
		});

		comment.save(err, () => {
			if (err) return console.log('Error is accesing DB');
			journal.comments.push(comment);
			journal.save();
		});
	});
});

module.exports = router;
