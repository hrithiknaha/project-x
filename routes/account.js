const router = require('express').Router({ mergeParams: true });
const User = require('../models/Users');

router.get('/', (req, res) => {
	console.log('Hello');
	res.send('hello');
});

module.exports = router;
