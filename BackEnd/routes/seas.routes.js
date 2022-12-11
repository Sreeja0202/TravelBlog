const express = require("express");
const cors = require("cors");
const multer = require("multer");
const seaRouter = express.Router();
const app = express();
const Sea = require("../models/sea.models");
const objectId = require("mongoose").Types.ObjectId;

app.use(cors());
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
//   },
// });
// var upload = multer({ storage: storage }).single("file");

// app.use(express.static("uploads"));

// desertRouter.post("/file", (req, res) => {
//   upload(req, res, (err) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log(req.file.path);
//   });
// });

// desert post add
seaRouter.post("/", (req, res) => {
  let sea = new Sea({
    location: req.body.location,
    desc: req.body.desc,
    geoMap: req.body.geoMap,
    photourl: req.body.photourl,
    pemail: req.body.pemail,
  });

  sea.save((err, doc) => {
    if (err) {
      console.log("Error in posting data", err);
    } else {
      res.send(doc);
    }
  });
});

// GET by id/salary/name

seaRouter.get("/:id", (req, res) => {
  if (objectId.isValid(req.params.id)) {
    Sea.findById(req.params.id, (err, doc) => {
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
seaRouter.get("/", (req, res) => {
  Sea.find((err, doc) => {
    if (err) {
      console.log("Error in getting data", +err);
    } else {
      res.send(doc);
    }
  });
});

// edit
seaRouter.put("/:id", (req, res) => {
  if (objectId.isValid(req.params.id)) {
    let sea = {
      location: req.body.location,
      desc: req.body.desc,
      geoMap: req.body.geoMap,
      photourl: req.body.photourl,
      pemail: req.body.pemail,
    };
    Sea.findByIdAndUpdate(
      req.params.id,
      { $set: sea },
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
      .send(`No record found with Employee with id ${req.params.id}`);
  }
});

// DELETE by id/salary/name

seaRouter.delete("/:id", (req, res) => {
  if (objectId.isValid(req.params.id)) {
    Sea.findByIdAndRemove(req.params.id, (err, doc) => {
      if (err) {
        console.log("Error in Deleting data by id", +err);
      } else {
        res.send(doc);
      }
    });
  } else {
    return res
      .status(400)
      .send(`No record found with Desert with id ${req.params.id}`);
  }
});

module.exports = seaRouter;
