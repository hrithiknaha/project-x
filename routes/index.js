const router = require('express').Router({ mergeParams: true });

router.get('/', (req, res) => {
	res.send('Landing Page');
});

module.exports = router;
