const express = require('express');
const routes = require('./routes/index.js');

const app = express();
const router = express.Router();
const port = process.env['PORT'] || 5000;

app.use(express.json());
app.use('/', routes);
app.listen(port);
