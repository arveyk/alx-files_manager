const { MongoClient } = require('mongodb');
class DBClient {
  constructor() {
    this.host = process.env['DB_HOST'];
    this.port = process.env['DB_PORT'];
    this.database = process.env['DB_DATABASE'];
    
    if (this.host === undefined) {
      this.host = 'localhost';
    }
    if (this.port === undefined) {
      this.port = 27017;
    }
    if (this.database === undefined) {
      this.database = 'files_manager';
    }
    const url = `mongodb:\/\/${this.host}:${this.port}`;
    this.client = new MongoClient(url);
  }

  isAlive() {
    try {
     this.client.connect();
     return true;
    } catch {
      return false;
    }
  }
  async nbUsers() {
    db = this.client.db(this.database);
    return db.collection(users).count();
  }
  async nbFiles() {
    db = this.client.db(this.database);
    return db.collection(files).count();
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
