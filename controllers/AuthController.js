const redisClient = require('../utils/redis.js');

app.get('/status', (request, response) => {
  response.status(200).send({'redis': true, 'db': true});
});
app.get('/stats', (request, response) => {
  response.status(200).send({'users': 12, 'files': 1231});
});
