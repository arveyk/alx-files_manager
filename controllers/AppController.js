const redisClient = require('../utils/redis.js');
const dbClient = require('../utils/db.js');
const express = require('express')

const router = express.Router();

function getStatus(request, response) {
  if (redisClient.isAlive() === true && dbClient.isAlive() === true) {
    response.status(200).send({'redis': true, 'db': true});
  }
}
async function getStats(request, response) {
  if (dbClient.isAlive() === true) {
    const userCount = await dbClient.nbUsers();
    const fileCount = await dbClient.nbFiles();
    response.status(200).send({'users': userCount, 'files': fileCount});
  }
}

module.exports = {
  getStatus,
  getStats
};
