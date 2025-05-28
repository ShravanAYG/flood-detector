const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const port = process.env.PORT || 3000;

let latestMessage = "No message yet";

app.use(express.json());

// MongoDB connection URI (replace with your own)
const uri = "mongodb://mongo:NxwYBPEIEunJRPPkeVbGcBJAVphVMGOB@nozomi.proxy.rlwy.net:11982"; // or your remote connection string
const client = new MongoClient(uri);

let tempCollection;

async function connectDB() {
  try {
    await client.connect();
    const db = client.db("temp");
    tempCollection = db.collection("temp");
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
}

connectDB();

// Existing routes
app.post("/message", (req, res) => {
  const message = req.body.message;
  if (!message) {
    return res.status(400).send("Missing message");
  }
  latestMessage = message;
  res.send(`Message received: ${message}`);
});

app.get("/", (req, res) => {
  res.send(`<h1>Latest message:</h1><p>${latestMessage}</p>`);
});

// New route to get all documents from temp collection
app.get("/all-temp", async (req, res) => {
  if (!tempCollection) {
    return res.status(500).send("Database not connected");
  }
  try {
    const allDocs = await tempCollection.find({}).toArray();
    res.json(allDocs);
  } catch (err) {
    res.status(500).send("Failed to fetch documents");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

