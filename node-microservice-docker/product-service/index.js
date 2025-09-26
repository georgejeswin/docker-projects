const express = require("express");
const mongoose = require("mongoose");
const Product = require("./product.model");

const app = express();
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/products";
mongoose.connect(MONGO_URI).then(() => console.log("Product DB connected"));

app.post("/products", async (req, res) => {
  const product = await Product.create(req.body);
  res.json(product);
});

app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.listen(3002, () => console.log("Product service running on 3002"));
