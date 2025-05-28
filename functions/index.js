const functions = require("firebase-functions");

exports.echoMessage = functions.https.onRequest((req, res) => {
  const message = req.body.message || "No message received.";
  res.send(`Current message: ${message}`);
});

