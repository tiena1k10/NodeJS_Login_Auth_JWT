const express = require("express");
const mongoose = require("mongoose");
const db = require("./config/database");
const router = require("./routes/indexRoutes");
const cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
const app = express();

// middleware

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(express.static("public"));
app.use(cookieParser());
// view engine
app.set("view engine", "ejs");

//connect db

db.connect();
app.listen(3000, () => {
  console.log("server is running on port http://localhost:3000/");
});

// routes
router.router(app);
