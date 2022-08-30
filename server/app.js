const {setUpRoutes} = require('./routes');
const express = require('express');

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());

setUpRoutes(app);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
