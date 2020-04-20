const router = require('express').Router({ mergeParams: true });
const User = require('../models/Users');

router.get('/', (req, res) => {
	console.log(req.params.username);
});

module.exports = router;
