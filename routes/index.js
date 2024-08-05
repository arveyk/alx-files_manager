const express = require('express');
const routes = require('../controllers/AppController.js');
const app = express();

app.use('/status/', routes);
app.use('/stats', routes);

module.exports = app;
