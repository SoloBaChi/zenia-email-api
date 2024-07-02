// CORE MODULES
const express = require("express");
const cors = require("cors");
const { json, urlencoded } = require("body-parser");
const morgan = require("morgan");
const router = require("./router/route");

// // Third Party Modules
// const { body } = require("express-validator");

// Custom Modules

// configure dot env
require("dotenv").config();

// Create the APP
const app = express();

//** Core Midddlewares
app.use(cors({ origin: "*" }));
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(morgan("tiny"));
app.disable("x-powered-by"); //less hacker know about our stack

// APP ROUTES
/*** Default Route */
app.get("/", (req, res) => {
  return res.status(200).json({
    message: `Welcome to Zenia Email API`,
    statusCode: 200,
    status: "success",
  });
});

///////////////////////
//Other Middlewares
app.use("/api/v1", router);

/***Not Found Route */
app.use("*", (req, res) => {
  return res.status(400).json({
    message: `Page Not Found`,
    statusCode: 400,
    status: "error",
  });
});

// create a Port
const port = process.env.PORT || 4000;
// Start the Server
const start = async () => {
  // connect to the database
  app.listen(port, () => {
    console.log(`server runs at localhost:${port} `);
  });
};

module.exports = start;
