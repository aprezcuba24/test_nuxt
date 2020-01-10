const MongoClient = require('mongodb').MongoClient

const url = 'mongodb://localhost:27017'

let dbName = 'ricardo_test'
if (process.env.NODE_ENV === 'test') {
  dbName = `${dbName}_test`
}

const client = new MongoClient(url)

module.exports = async (collection) => {
  await client.connect()
  const db = client.db(dbName)
  if (!collection) {
    return db
  }
  return db.collection(collection)
}
