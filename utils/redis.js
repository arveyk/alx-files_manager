import redis from 'redis';

class RedisClient {
  constructor(){
    this.client = redis.createClient().on('error', (error) => {
      console.error(error);
    });
  }

  isAlive () {
    this.client.on('connect', () => {
      return true;
      //return this.client.isReady;
    });
  }

  async get(key) {
    return await this.client.get(key);
  }
  async set(key, value, duration) {
    this.client.set(key, value, 'EX', duration)
  }
  async del(key) {
    this.client.del(key, function(err, response) {
      if (err) {
        throw err;
      }
    });
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;
