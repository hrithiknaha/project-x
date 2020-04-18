const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const indexRoutes = require('./routes/index');
const writeRoutes = require('./routes/write');

const app = express();
dotenv.config();

mongoose.connect(
	process.env.DB_CONNECT,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	(err) => {
		if (err) return console.log('Can not connect to the database');
		console.log('DB Connected');
	}
);

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRoutes);
app.use('/', writeRoutes);

//Server Configuration
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
