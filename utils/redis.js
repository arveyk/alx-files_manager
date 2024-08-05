//import { createClient } from 'redis';
//import { promisify } from 'util';
const createClient = require('redis').createClient;
const promisify = require('util').promisify;

class RedisClient {
  constructor(){
    this.client = createClient();
    this.client.connect().catch('error', (error) => {
      console.error(error);
    });
  }

  isAlive () {
    //this.client.on('connect', () => {
    //  return true;
    //});
    return this.client.isOpen
  }

  async get(key) {
    //const getAsync = promisify(this.client.get).bind(this.client);
    //return getAsync(key);
    return await this.client.get(key);
  }
  async set(key, value, duration) {
    await this.client.set(key, value, {'EX': duration})
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
