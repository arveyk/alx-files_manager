import { createClient } from 'redis';

class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on('error', (error) => console.log(error));
    this.isOpen = false;
    (() => {
      try {
	this.isOpen = true;
        this.client.connect()
      } catch (error) {
          console.error('Connection error');
      }
    })();
  }

  isAlive () {
    return this.isOpen;
  }

  async get(key) {
    return await this.client.get(key);
  }
  async set(key, value, duration) {
    await this.client.set(key, value, { EX: duration });
  }
  async del(key) {
    this.client.del(key, function(err, reply) {
      if (err) {
        throw err;
      }
      console.log(reply);
    });
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;
