const Journal = require('../models/Journals');

module.exports = {
	isLoggedIn: function (req, res, next) {
		if (req.isAuthenticated()) return next();
		else return res.json({ err: "Sorry, you're not logged in" });
	},

	checkUserJournal: function (req, res, next) {
		Journal.findById(req.body.journal._id, (err, journal) => {
			if (err || !journal) {
				return res.json({ err: 'Sorry, No Content was found!' });
			} else if (journal.author.id.equals(req.user._id)) next();
			else {
				return res.json(
					'error',
					"You don't have permission to do that"
				);
			}
		});
	}
};
