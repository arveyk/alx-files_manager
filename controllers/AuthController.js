const express = require('express');
const dbClient = require('../utils/db.js');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

const hashGen = crypto.createHash('sha1');
const authRouter = express.Router();

function getConnect(request, response) {
  const header = request.headers.Authorization;
  const passwd = request.email;
  const email = request.email;
  let token = '';

  const collection = dbClient.db.collection('users');
  try {
    const user = collection.findOne({email: email})
    if (!user) {
      response.status(401).send({'error': 'Unauthorized'});
    }
    let hashPwd = hashGen.update(passwd);
    hashPwd.digest('hex');
    // hashPwd = crypto.createHash('sha1').
    // update(JSON.stringify(input)).digest('hex');
    token = uuidv4();
    const key = `auth_${token}`;
    redisClient.set(key, user._id, {'EX': 24*60*60});
    response.status(200).send({'token': token});
  } catch {
    response.status(500).send({'error': 'query error'});
  }
}

function getDisconnect(request, response) {
  if (!request.headers.X-Token) {
    response.status(401).send({'error': 'Missing token'});
  }
  const token = request.headers.X-Token;
  try {
    const user = redisClient.get(token);
    if (!user) {
      response.status(401).send({'error': 'Unauthorized'});
    }
    redisClient.del(token);
    response.status(204);
  } catch (error) {
    console.log('redis_error');
  }
  response.status(200).send({'users': email, 'userid': user.id});
}

module.exports = { getConnect, getDisconnect };
