const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

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
    app.get("/usersData", async (req, res) => {
      const cursor = userCollections.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/usersData/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await userCollections.findOne(query);
      res.send(result);
    });
    app.post("/users", async (req, res) => {
      const user = req.body;
      const result = await userCollections.insertOne(user);
      res.send(result);
      // console.log();
    });

    app.put("/usersData/:id", async (req, res) => {
      const id = req.params.id;
      const user = req.body;
      // console.log(user);
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateUser = {
        $set: {
          name: user.name,
          email: user.email,
        },
      };

      const result = await userCollections.updateOne(
        filter,

        updateUser,
        options
      );
      res.send(result);
    });

    app.delete("/usersData/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await userCollections.deleteOne(query);
      res.send(result);
    });

    console.log("Server Site is Running parfectly");
  } finally {
  }
}
run().catch(console.log);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
