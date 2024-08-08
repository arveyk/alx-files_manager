const assert = require('assert');
const redisClient = require('../utils/redis.js');

describe('redisClient', function() {
  it('Check if connection is alive', function () {
    assert.equal(redisClient.isAlive(), true);
  });
});
