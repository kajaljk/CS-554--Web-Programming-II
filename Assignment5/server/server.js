const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const configRoutes = require('./route');

app.use(bodyParser.json());
configRoutes(app);

app.listen(3000, () => {
    console.log("Server has started");
    console.log("Your routes will be running on http://localhost:3000");
});