const express = require('express');
const dbClient = require('../utils/db.js');
const crypto = require('crypto');

const userRouter = express.Router();

function postNew(request, response) {
  const { email, password } = request.body;
  if (!email) {
    response.status(400).send({'error': 'Missing email'});
  }
  if (!password) {
    response.status(400).send({'error': 'Missing password'});
  }
  if (dbClient.isAlive) {
    try {
      const users = dbClient.db.collection('users');
      (async () => {
        const generator = crypto.createHash('sha1');
        let hashPwd = generator.update(password, 'utf-8').digest('hex');
        const stat = await users.findOne({ email: email });
	if (stat) {
	  console.error(stat);
	  response.status(400).send({'error': 'Already exists'});
	} else {
          const result = await dbClient.db.collection('users').insertOne(
            {email: email},
            {password: hashPwd}
          );
          response.status(201).send({
            'id': result.insertedId,
            'email': email
	   });
	}
      })();
    } catch (error) {
      console.log(error);
      response.status(500).send({'error': 'somethings off'});
    }
  }
  //const generator = crypto.createHash('sha1');
  //let hashPwd = generator.update(password, 'utf-8').digest('hex');
  /*
   * try {
    (async () => {
      const result = await dbClient.db.collection('users').insertOne(
        {email: email},
        {password: hashPwd}
      );
      response.status(201).send({
        'id': result.insertedId,
        'email': email
      });
    })();
  } catch (error) {
    response.status(500)
  }
  */
}

function getMe(request, response) {
  const token = request.header.X-Token;
  const user_id = redisClient.get(token);
  const collection = dbClient.db.collection('users');
  
  const user = collection.findOne({insertedId: user_id});
  if (!user) {
    response.status(401).send({'error': 'Unauthorized'});
  }
  response.send({'id': user._id, 'email': user.email});
}

module.exports = { postNew, getMe };
