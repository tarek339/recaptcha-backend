import express from "express";
import dotenv from "dotenv";
import { createProxyMiddleware } from "http-proxy-middleware";
import { rateLimiter } from "./middlewares/rateLimiter";

// enable imports from .env file
dotenv.config();

// call express.js to use it
const app = express();
// import the env varibale
const port = process.env.PORT;

// Apply the rate limiting middleware to all requests.
app.use(rateLimiter);

// proxy middleware for each website a proxy is provided
app.use(
  "/",
  createProxyMiddleware({
    target: "https://www.npmjs.com/", // the website for which the middleware is provided
    changeOrigin: true,
  })
);
// for more information visit: https://www.npmjs.com/package/http-proxy-middleware

// function to run the server on the port
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
