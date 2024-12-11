const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();

app.use(cors()); // Enable CORS
app.use(express.json()); // Middleware to parse JSON request bodies

const uri =
  "mongodb+srv://sumonmia4526:ry7cI7qFcAijgVKk@cluster0.xhl2h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const userCollections = client.db("usersDB").collection("userCollections");

    app.get("/users", async (req, res) => {
      const data = userCollections.find();
      const result = await data.toArray();
      res.send(result);
    });

    app.post("/users", async (req, res) => {
      const user = req.body;
      const result = await userCollections.insertOne(user);

      res.send(result);
    });

    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await userCollections.deleteOne(query);
      res.send(result);
    });

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
  }
}
run().catch(console.dir);

app.get("/users", (req, res) => {
  res.json(users);
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
