const MongoClient = require('mongodb').MongoClient

const url = 'mongodb://localhost:27017'

const dbName = 'ricardo_test'

const client = new MongoClient(url);

module.exports = async (collection) => {
  await client.connect()
  const db = client.db(dbName);
  if (!collection) {
    return db
  }
  return db.collection(collection)
}