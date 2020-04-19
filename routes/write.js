const router = require('express').Router({ mergeParams: true });

router.get('/', (req, res) => {
	console.log(req.params.id);
	res.send('Welcome');
});

module.exports = router;
