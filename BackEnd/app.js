const express = require("express");
const cors = require("cors");
const mongoose = require("./db.js");
const urouter = require("./routes/users.routes.js");

const app = new express();

app.use(express.json());
app.use(cors());

app.use("/users", urouter);

app.listen(3000, function () {
  console.log("Server ready @ PORT 3000");
});
