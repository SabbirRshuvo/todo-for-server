require("dotenv").config();
const experss = require("express");
const cors = require("cors");
const app = experss();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
// middleware
app.use(cors());
app.use(experss.json());

const uri = process.env.MONGO_URL;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    const database = client.db("my_todos");
    const todoCollection = database.collection("todo");
    console.log("mongodb connected");

    app.get("/", (req, res) => {
      res.send("todo app is started");
    });

    app.post("/todos", async (req, res) => {
      const todo = req.body;
      if (Array.isArray(todo)) {
        const result = await todoCollection.insertMany(todo);
        res.send(result);
      } else {
        const result = await todoCollection.insertOne(todo);
        res.send(result);
      }
    });

    app.get("/todos", async (req, res) => {
      const result = await todoCollection.find().toArray();
      res.send(result);
    });
    app.put("/todos/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updatedDoc = {
        $set: req.body,
      };
      const result = await todoCollection.updateOne(filter, updatedDoc);
      res.send(result);
    });

    app.delete("/todos/:id", async (req, res) => {
      const id = req.params.id;
      const result = await todoCollection.deleteOne({ _id: new ObjectId(id) });
      res.send(result);
    });

    app.listen(port, () => {
      console.log(`server is running on the port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
run();
