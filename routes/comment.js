const router = require('express').Router();

const Comment = require('../models/Comments');
const Journals = require('../models/Journals');

router.post('/edit', (req, res) => {
	Comment.findById(req.body.id, (err, comment) => {
		if (err) return console.log(err);
		comment.text = req.body.text;
		comment.save();
		return res.json({ msg: 'Comment has been updated!' });
	});
});

router.post('/delete', (req, res) => {
	Journals.findByIdAndUpdate(
		req.body.journal_id,
		{ $pull: { comments: req.params._id } },
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
