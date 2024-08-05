const redisClient = require('../utils/redis.js');
const dbClient = require('../utils/db.js');
const express = require('express')

const routes = express.Router();

routes.get('/status', (request, response) => {
  if (redisClient.isAlive && dbClient.isAlive) {
    response.status(200).send({'redis': true, 'db': true});
  }
});
routes.get('/stats', (request, response) => {
  const userCount = dbClient.nbUsers();
  const fileCount = dbClient.nbFiles();
  response.status(200).send({'users': userCount, 'files': fileCount});
});

module.exports = routes;
