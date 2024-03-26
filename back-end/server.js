const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const router = require("./router/route.js");
require("dotenv").config();
const app = express();

// middlewares

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

const port = 3000;

// get home request

app.get("/", (req, res) => {
  res.status(201).json("hello world");
});

// api routes

app.use("/api", router);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(
        "data base conncetect successfully and server started on port",
        port
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });
