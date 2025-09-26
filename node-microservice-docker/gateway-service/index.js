const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// Routes → map to backend services
app.use("/users", createProxyMiddleware({
  target: "http://user-service:3001", // user-service container
  changeOrigin: true
}));

app.use("/products", createProxyMiddleware({
  target: "http://product-service:3002", // product-service container
  changeOrigin: true
}));

app.listen(4000, () => {
  console.log("API Gateway running at http://localhost:4000");
});
