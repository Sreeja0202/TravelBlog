const express = require("express");
const cors = require("cors");
const mongoose = require("./db.js");
const urouter = require("./routes/users.routes.js");
const desertRouter = require("./routes/deserts.routes.js");
const multer = require("multer");
const bodyparser = require("body-parser");
const path = require("path");
const seaRouter = require("./routes/seas.routes.js");
const valleyRouter = require("./routes/valleys.routes");

const app = new express();

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(express.json());
app.use(cors());

app.use("/users", urouter);
app.use("/deserts", desertRouter);
app.use("/valleys", valleyRouter);
app.use("/seas", seaRouter);

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
//   },
// });

// var upload = multer({ storage: storage }).single("file");

app.post("/file", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(req.file.path);
      res.send(res);
    }
  });
});

app.listen(3000, function () {
  console.log("Server ready @ PORT 3000");
});
