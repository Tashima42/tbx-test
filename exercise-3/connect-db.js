const { MongoClient } = require('mongodb');
const mysql = require("mysql2")

/**
 * Connects to a MongoDB or MySQL Database.
 * @param {String} ip - Ip where the database is open to connections
 * @param {String} port - Port where the database is open to connections
 * @param {Boolean} isMongoConnection - If true, the function will try to connect to 
 * 	a MongoDB database, if false, it will try to connect to a MySQL Database
 * @return {Object} - The client that accepts commands to execute in the database
 */
async function connectDb(ip, port, isMongoConnection) {
  if(isMongoConnection) {
    return await connectMongoDb(ip, port)
  }     
  return await connectMySql(ip, port)
}

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
    'SELECT * FROM x$waits_global_by_latency;',
    (err, results, fields) => console.log(results)
  )
}

/**
 * Connects to a MongoDB Database.
 * @param {String} ip - Ip where the database is open to connections
 * @param {String} port - Port where the database is open to connections
 * @return {Object} - The client that accepts commands to execute in the database
 */
async function connectMongoDb(ip, port = 27017) {
  const url = `${ip}:${port}` 
  const client = new MongoClient(url)
  await client.connect()
  return client
}

/**
 * Connects to a MySQL Database.
 * @param {String} ip - Ip where the database is open to connections
 * @param {String} port - Port where the database is open to connections
 * @return {Object} - The client that accepts commands to execute in the database
 */
async function connectMySql(ip, port) {
  const client = mysql.createConnection({
    host: ip,
    port,
    user: "root",
    password: "root",
   database : 'sys'
  })
  await client.connect()
  return client
}
