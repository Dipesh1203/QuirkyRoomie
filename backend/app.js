const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
require("dotenv").config();
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const mongoose = require("mongoose");
const { error, log } = require("console");

const app = express();

const url = process.env.MONGO_URL;

async function main() {
  await mongoose.connect(url);
}

main()
  .then(() => {
    console.log("Connection Established");
  })
  .catch((error) => {
    console.log(error);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// require("./loaders/routes")(app);

app.listen({ port: process.env.PORT || 8000 }, () => {
  console.log(`Listening On ${process.env.PORT}`);
});

module.exports = app;
