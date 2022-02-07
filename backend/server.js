require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const sessionRoute = require("./routes/session-route");
const { deserializeUser } = require("./middlewares/deserializeUser");

const PORT = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;
const origin = process.env.ORIGIN_URL;

const app = express();

// Config server
app.use(cookieParser());
app.use(express.json());
app.use(deserializeUser);
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: origin,
  })
);

app.use("/auth", sessionRoute);

// Database connection

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Connection to mongoDB has been established successfully");
});

app.listen(PORT, () => {
  console.log(`Listening to port:${PORT}`);
});
