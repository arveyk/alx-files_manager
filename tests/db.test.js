const assert = require('assert');
const dbClient = require('../utils/db.js');

describe('dbClient', function () {
  it('checl connection', function() {
    assert.equal(dbClient.isAlive(), true);
  )};
});
