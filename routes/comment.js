const router = require('express').Router();

const Comment = require('../models/Comments');
const Journals = require('../models/Journals');

const { isLoggedIn } = require('../middleware/index');

router.post('/write', isLoggedIn, (req, res) => {
	console.log(req.body.journal._id);
	Journals.findById(req.body.journal._id, (err, journal) => {
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
			if (err) return console.log(err);
			journal.comments.push(comment);
			journal.save();
			console.log(comment);
			return res.json({ msg: 'Comment has been added!' });
		});
	});
});

router.post('/edit', isLoggedIn, (req, res) => {
	Comment.findById(req.body.id, (err, comment) => {
		if (err) return console.log(err);
		comment.text = req.body.text;
		comment.save();
		return res.json({ msg: 'Comment has been updated!' });
	});
});

router.post('/delete', isLoggedIn, (req, res) => {
	Journals.findByIdAndUpdate(
		req.body.journal_id,
		{ $pull: { comments: req.body.id } },
		(err) => {
			if (err) return console.log(err);
		}
	);

	Comment.findByIdAndDelete(req.body.id, (err) => {
		if (err) return console.log(err);
		return res.json({ msg: 'Comment has been deleted!' });
	});
});
module.exports = router;
