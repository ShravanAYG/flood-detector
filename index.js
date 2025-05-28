const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

let latestMessage = "No message yet";

app.use(express.json());

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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

