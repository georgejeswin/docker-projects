const express = require("express");
const mongoose = require("mongoose");
const amqp = require("amqplib");
const Product = require("./models/Product");

const app = express();
app.use(express.json());

const { MONGO_URI, RABBITMQ_URI } = process.env;

mongoose.connect(MONGO_URI).then(() => console.log("✅ Product Mongo connected"));

async function startConsumer() {
  const connection = await amqp.connect(RABBITMQ_URI);
  const channel = await connection.createChannel();
  await channel.assertQueue("user_created");

  channel.consume("user_created", async (msg) => {
    const user = JSON.parse(msg.content.toString());
    console.log("📦 Product service received user:", user);

    // Example: create default product when new user is created
    const product = new Product({
      title: `Welcome pack for ${user.name}`,
      description: `Starter kit for ${user.email}`,
      price: 100,
      createdBy: user._id
    });
    await product.save();

    channel.ack(msg);
  });
}

startConsumer();

app.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.post("/products", async (req, res) => {
  const product = await Product.create({...req.body, createdBy: 'admin'});
  res.json(product);
});

app.listen(3002, () => console.log("📦 Product service running on 3002"));
