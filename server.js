const express = require('express');
const routes = require('./routes/index.js');

const app = express();
const router = express.Router();
let port = process.env['PORT'];

if (port === undefined) {
  port = 5000;
}

app.listen(port);
app.use(routes);
