const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

let todoCollection;
let usersCollection;

async function connetDB() {
  try {
    await client.connect();
    const db = client.db("my_todos");
    todoCollection = db.collection("todo");
    usersCollection = db.collection("users");
    console.log("mongodb connected");
  } catch (error) {
    console.error("mongodb connection error", error);
  }
}

function getTodoCollection() {
  return todoCollection;
}

function getUsersCollection() {
  return usersCollection;
}

module.exports = { connetDB, getTodoCollection, getUsersCollection };
