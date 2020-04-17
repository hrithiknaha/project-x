const express = require('express');

const indexRoutes = require('./routes/index');
const writeRoutes = require('./routes/write');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRoutes);
app.use('/', writeRoutes);

//Server Configuration
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
