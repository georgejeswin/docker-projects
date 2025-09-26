const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// Routes
app.use("/users", createProxyMiddleware({ target: "http://user-service:3001", changeOrigin: true }));
app.use("/products", createProxyMiddleware({ target: "http://product-service:3002", changeOrigin: true }));

app.listen(5000, () => console.log("🚪 Gateway running on port 5000"));
