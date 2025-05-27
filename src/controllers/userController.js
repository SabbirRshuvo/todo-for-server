const { ObjectId } = require("mongodb");
const { getUsersCollection } = require("../models/todo_models");

const createUser = async (req, res) => {
  const user = req.body;
  const usersCollection = getUsersCollection();

  const existing = await usersCollection.findOne({ email: user.email });

  if (existing) {
    return res.status(400).send({ message: "user is already exits" });
  }
  const result = await usersCollection.insertOne(user);
  res.send(result);
};

const getAllUsers = async (req, res) => {
  const usersCollection = getUsersCollection();
  const users = await usersCollection.find().toArray();
  res.send(users);
};

const deleteUsers = async (req, res) => {
  const usersCollection = getUsersCollection();

  const { id } = req.params;
  const result = await usersCollection.deleteOne({ _id: new ObjectId(id) });
  res.send(result);
};

module.exports = { createUser, getAllUsers, deleteUsers };
