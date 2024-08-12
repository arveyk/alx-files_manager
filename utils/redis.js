// import { createClient } from 'redis';
import * as redis from 'redis';

class RedisClient {
  constructor() {
    this.client = redis.createClient();
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
    if (this.client.isOpen === true) {
      const value = await this.client.get(key);
      return value;
    }
  }

  async set(key, value, duration) {
    await this.client.set(key, value, { EX: duration }, (err, reply) => {
      if (err) {
	return null;
      }
    });
  }

  async del(key) {
    try {
      await this.client.del(key, function(err, response) {
        if (response == 1) {
          console.log(response);
        } else {
          console.log('error');
        }
      }); 
    } catch (error) {
	 return null;
    }
  }
}
const redisClient = new RedisClient();
module.exports = redisClient;
