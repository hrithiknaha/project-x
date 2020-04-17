const router = require('express').Router();

router.get('/', (req, res) => {
	res.send('Landing Page');
});

router.get('/login', (req, res) => {
	res.send('Login Page');
});

router.get('/register', (req, res) => {
	res.send('Register Page');
});

module.exports = router;
