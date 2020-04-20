const router = require('express').Router({ mergeParams: true });
const Journals = require('../models/Journals');

router.get('/', (req, res) => {
	res.send('Landing Page');
});

module.exports = router;
