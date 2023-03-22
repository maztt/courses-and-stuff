const { MongoClient } = require('mongodb')

const uri = "mongodb://127.0.0.1:27017/mongocourse"

const client = new MongoClient(uri)

async function run() {
  try {
    await client.connect()
    console.log("Conectando ao MongoDB!")
  } catch (error) {
    console.error(error)
  }
}

run()

module.exports = client