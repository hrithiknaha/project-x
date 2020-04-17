const router = require('express').Router();

router.get('/:username/write', (req, res) => {
	res.render('write');
});

router.post('/:username/write', (req, res) => {
	console.log(req.body);
});

module.exports = router;
