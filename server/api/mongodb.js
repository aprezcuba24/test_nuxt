const MongoClient = require('mongodb').MongoClient

const url = 'mongodb://localhost:27017'

const dbName = 'ricardo_test'

const client = new MongoClient(url);

module.exports = async () => {
  await client.connect()
  const db = client.db(dbName);
  return db
}