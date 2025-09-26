const express = require("express");
const mongoose = require("mongoose");
const User = require("./user.model");

const app = express();
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/users";
mongoose.connect(MONGO_URI).then(() => console.log("User DB connected"));

app.post("/users", async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.listen(3001, () => console.log("User service running on 3001"));
