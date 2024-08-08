const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    this.host = process.env['DB_HOST'] || 'localhost';
    this.port = process.env['DB_PORT'] || 27017;
    this.database = process.env['DB_DATABASE'] || 'file_manager';
    
    this.url = `mongodb://${this.host}:${this.port}`;
    this.client = new MongoClient(this.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this.connection = false;
    this.connect().catch((error) => {
      console.error(error);
    });
    this.db = null;
  }
  async connect() {
    try {
      await this.client.connect();
      this.connection = true;
      this.db = this.client.db(this.database);
    } catch (error) {
      console.log('connection failed');
    }
  }
  isAlive() {
    return this.connection;
  }
  async nbUsers() {
    try {
      const db = this.client.db(this.database);
      const userCount = await db.collection('users').countDocuments();
      return userCount;
    } catch (error) {
      return false;
    }
  }
  async nbFiles() {
    try {
      const db = this.client.db(this.database);
      const fileCount = await db.collection('files').countDocuments();
      return fileCount;
    } catch (error) {
      return false;
    }
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
