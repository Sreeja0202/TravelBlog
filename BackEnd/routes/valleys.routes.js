const express = require("express");
const cors = require("cors");
const multer = require("multer");
const valleyRouter = express.Router();
const app = express();
const Valley = require("../models/valleys.models");
const objectId = require("mongoose").Types.ObjectId;

app.use(cors());
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
  },
});
var upload = multer({ storage: storage }).single("file");

app.use(express.static("uploads"));

valleyRouter.post("/file", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
    }
    console.log(req.file.path);
  });
});

// desert post add
valleyRouter.post("/", (req, res) => {
  let valley = new Valley({
    location: req.body.location,
    desc: req.body.desc,
    geoMap: req.body.geoMap,
    photourl: req.body.photourl,
    pemail: req.body.pemail,
  });

  valley.save((err, doc) => {
    if (err) {
      console.log("Error in posting data", err);
    } else {
      res.send(doc);
    }
  });
});

// GET by id/salary/name

valleyRouter.get("/:id", (req, res) => {
  if (objectId.isValid(req.params.id)) {
    Valley.findById(req.params.id, (err, doc) => {
      if (err) {
        console.log("Error in getting data by id", +err);
      } else {
        res.send(doc);
      }
    });
  } else {
    return res
      .status(400)
      .send(`No record found with desert with id ${req.params.id}`);
  }
});

// GET
valleyRouter.get("/", (req, res) => {
  Valley.find((err, doc) => {
    if (err) {
      console.log("Error in getting data", +err);
    } else {
      res.send(doc);
    }
  });
});

// edit
valleyRouter.put("/:id", (req, res) => {
  if (objectId.isValid(req.params.id)) {
    let valley = {
      location: req.body.location,
      desc: req.body.desc,
      geoMap: req.body.geoMap,
      photourl: req.body.photourl,
      pemail: req.body.pemail,
    };
    Valley.findByIdAndUpdate(
      req.params.id,
      { $set: valley },
      { new: true },
      (err, doc) => {
        if (err) {
          console.log("Error in updating data", +err);
        } else {
          res.send(doc);
        }
      }
    );
  } else {
    return res
      .status(400)
      .send(`No record found with post with id ${req.params.id}`);
  }
});

// DELETE by

valleyRouter.delete("/:id", (req, res) => {
  if (objectId.isValid(req.params.id)) {
    Valley.findByIdAndRemove(req.params.id, (err, doc) => {
      if (err) {
        console.log("Error in Deleting data by id", +err);
      } else {
        res.send(doc);
      }
    });
  } else {
    return res
      .status(400)
      .send(`No record found with post with id ${req.params.id}`);
  }
});

module.exports = valleyRouter;
