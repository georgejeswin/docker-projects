const express = require("express");
const mongoose = require("mongoose");
const Redis = require("ioredis");
const amqp = require("amqplib");
const User = require("./models/User");

const app = express();
app.use(express.json());

const { MONGO_URI, REDIS_URI, RABBITMQ_URI } = process.env;

mongoose.connect(MONGO_URI).then(() => console.log("✅ User Mongo connected"));

const redis = new Redis(REDIS_URI);

let channel;
async function connectRabbit() {
  const connection = await amqp.connect(RABBITMQ_URI);
  channel = await connection.createChannel();
  await channel.assertQueue("user_created");
}
connectRabbit();

app.post("/", async (req, res) => {
  const { name, email } = req.body;

  const user = new User({ name, email });
  await user.save();

  // cache
  await redis.set(`user:${user._id}`, JSON.stringify(user), "EX", 60);

  // publish event
  channel.sendToQueue("user_created", Buffer.from(JSON.stringify(user)));

  res.json(user);
});

app.get("/:id", async (req, res) => {
  const { id } = req.params;

  const cached = await redis.get(`user:${id}`);
  if (cached) return res.json(JSON.parse(cached));

  const user = await User.findById(id);
  if (!user) return res.status(404).json({ error: "User not found" });

  await redis.set(`user:${id}`, JSON.stringify(user), "EX", 60);
  res.json(user);
});

app.listen(3001, () => console.log("👤 User service running on 3001"));
