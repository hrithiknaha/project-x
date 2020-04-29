const router = require('express').Router({ mergeParams: true });

const Journals = require('../models/Journals');
const Comment = require('../models/Comments');

const { isLoggedIn } = require('../middleware/index');

router.get('/write', isLoggedIn, (req, res) => {
	Journals.findById(req.params.journal_id, (err, journal) => {
		if (err) return console.log('Error in accessing the DB');
		res.render('comments/write', { journal });
	});
});

router.post('/write', isLoggedIn, (req, res) => {
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

//Comment Edit route
router.get('/:comment_id/edit', isLoggedIn, (req, res) => {
	console.log(req.params.journal_id);
	Comment.findById(req.params.comment_id, (err, comment) => {
		if (err) return console.log('Error in accessing the db');
		res.render('comments/edit', {
			comment,
			journal_id: req.params.journal_id
		});
	});
});

//Comment Edit post routes
router.post('/:comment_id/edit', isLoggedIn, (req, res) => {
	Comment.findById(req.params.comment_id, (err, comment) => {
		if (err) return console.log('Error in accessing the db');
		comment.text = req.body.text;
		comment.save();
		res.redirect('/journals/' + req.params.journal_id);
	});
});

//Comment delete route
router.post('/:comment_id', isLoggedIn, (req, res) => {
	Journals.findByIdAndUpdate(
		req.params.journal_id,
		{ $pull: { comments: req.params.comment_id } },
		(err) => {
			if (err) return console.log('Error in accessing the db');
		}
	);
	Comment.findByIdAndDelete(req.params.comment_id, (err) => {
		if (err) return console.log('Comment deleted');
	});
	res.redirect('/journals/' + req.params.journal_id);
});
module.exports = router;
