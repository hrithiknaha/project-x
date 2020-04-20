module.exports = {
	isLoggedIn: function (req, res, next) {
		if (req.isAuthenticated()) return next();
		console.log('You need to be singed in to do that');
	}
};
