const Journal = require('../models/Journals');

module.exports = {
	isLoggedIn: function (req, res, next) {
		if (req.isAuthenticated()) return next();
		req.flash('error', 'Sorry, Wizzards Only!');
		res.redirect('/login');
	},

	checkUserJournal: function (req, res, next) {
		Journal.findById(req.params.journal_id, (err, journal) => {
			if (err || !journal) {
				req.flash('error', 'Sorry, that campground does not exists');
				res.redirect('/journals');
			} else if (journal.author.id.equals(req.user._id)) next();
			else {
				req.flash('error', "You don't have permission to do that");
				res.redirect('/journals' + req.params.id);
			}
		});
	}
};
