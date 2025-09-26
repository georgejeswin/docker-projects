const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  title: String,
  description: String,
  createdBy: String
}, { timestamps: true });

module.exports = mongoose.model("Product", ProductSchema);
