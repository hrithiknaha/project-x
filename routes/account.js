const router = require('express').Router({ mergeParams: true });
const User = require('../models/Users');

router.get('/', (req, res) => {
	res.render('account/index', { user: req.params.username });
});

module.exports = router;
