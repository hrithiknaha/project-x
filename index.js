const express = require('express');

const indexRoutes = require('./routes/index');

const app = express();

app.use('/', indexRoutes);

//Server Configuration
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
