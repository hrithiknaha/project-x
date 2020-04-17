const express = require('express');

const app = express();

//Server Configuration
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
