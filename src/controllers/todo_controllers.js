const { ObjectId } = require("mongodb");
const { getTodoCollection } = require("../models/todo_models");

const getAllTodos = async (req, res) => {
  const todos = await getTodoCollection().find().toArray();
  res.send(todos);
};

const createTodo = async (req, res) => {
  const todo = req.body;
  const result = await getTodoCollection().insertOne(todo);
  res.send(result);
};

const updateTodo = async (req, res) => {
  const { id } = req.params;
  const updatedTodo = req.body;

  const result = await getTodoCollection().updateOne(
    { _id: new ObjectId(id) },
    { $set: updatedTodo }
  );
  res.send(result);
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;
  const result = await getTodoCollection().deleteOne({ _id: new ObjectId(id) });
  res.send(result);
};

module.exports = { getAllTodos, createTodo, updateTodo, deleteTodo };
