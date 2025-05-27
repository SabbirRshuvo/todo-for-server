const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connetDB } = require("./src/models/todo_models");
const todo_route = require("./src/routes/todo_route");
const users = require("./src/routes/usersRoute");

const app = express();
const port = 3000;

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/todos", todo_route);
app.use("/users", users);

app.get("/", (req, res) => {
  res.send("Hello developers, welcome to my todo application !");
});

connetDB().then(() => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});
