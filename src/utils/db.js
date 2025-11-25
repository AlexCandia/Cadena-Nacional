const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
const dbName = process.env.MONGODB_DBNAME || process.env.MONGO_DBNAME || undefined;

let client;
let db;

async function connect() {
  if (client && client.topology && client.topology.isConnected()) return db;

  if (!uri) {
    throw new Error('MONGODB_URI environment variable is not set. See .env.example');
  }

  client = new MongoClient(uri);
  await client.connect();

  db = (dbName && client.db(dbName)) || client.db();

  console.log('✅ MongoDB connected');
  return db;
}

function getDb() {
  if (!db) throw new Error('MongoDB not connected. Call connect() first.');
  return db;
}

function close() {
  if (!client) return Promise.resolve();
  return client.close();
}

module.exports = { connect, getDb, close, client: () => client };
