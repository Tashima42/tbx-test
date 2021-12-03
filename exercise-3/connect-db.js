const { MongoClient } = require('mongodb');
const mysql = require("mysql2")

main()

async function main() {
  // MONGODB
  const mongoClient = await connectDb("mongodb://localhost", 27017, true)
  const db = mongoClient.db("test");
  const collection = db.collection("test");
  const result = await collection.find({}).toArray();
  console.log(result)
  // MYSQL
  const mySqlClient = await connectDb("127.0.0.1", 3306, false)
  mySqlClient.query(
    'SELECT * FROM plano;',
    (err, results, fields) => console.log(results)
  )
}

async function connectDb(ip, port, isMongoConnection) {
  if(isMongoConnection) {
    return await connectMongoDb(ip, port)
  }     
  return await connectMySql(ip, port)
}

async function connectMongoDb(ip, port = 27017) {
  const url = `${ip}:${port}` 
  const client = new MongoClient(url)
  await client.connect()
  return client
}

async function connectMySql(ip, port) {
  const client = mysql.createConnection({
    host: ip,
    port,
    user: "root",
    password: "root",
   database : 'netbaseofdata'
  })
  await client.connect()
  return client
}
