const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
require("dotenv").config();
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

// Routes
app.use(`/api/auth`, require("./routes/user.routes"));
app.use(`/api/complaints`, require("./routes/complain.routes"));
app.use(`/api`, require("./routes/stat.routes"));
app.use(`/api/flat`, require("./routes/flat.routes"));

app.listen({ port: process.env.PORT || 8000 }, () => {
  console.log(`Listening On ${process.env.PORT}`);
});

module.exports = app;
