/* This is the code according to the video. It does not work. */
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";

MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
  console.log("Connected to MongoDB");
}); 

/* I tried this code and it also does not connect.
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/badbank";

MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
  if (err) {
    console.log("Failed to connect to MongoDB:", err);
  } else {
    console.log("Connected to MongoDB");
  }
}); */

