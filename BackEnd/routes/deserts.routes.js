const express = require("express");
const cors = require("cors");
const multer = require("multer");
const desertRouter = express.Router();
const app = express();
const Desert = require("../models/deserts.models");
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
desertRouter.post("/", (req, res) => {
  let desert = new Desert({
    location: req.body.location,
    desc: req.body.desc,
    geoMap: req.body.geoMap,
    photourl: req.body.photourl,
    pemail: req.body.pemail,
  });

  desert.save((err, doc) => {
    if (err) {
      console.log("Error in posting data", err);
    } else {
      res.send(doc);
    }
  });
});

// GET by id/salary/name

desertRouter.get("/:id", (req, res) => {
  if (objectId.isValid(req.params.id)) {
    Desert.findById(req.params.id, (err, doc) => {
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
desertRouter.get("/", (req, res) => {
  Desert.find((err, doc) => {
    if (err) {
      console.log("Error in getting data", +err);
    } else {
      res.send(doc);
    }
  });
});

desertRouter.put("/:id", (req, res) => {
  if (objectId.isValid(req.params.id)) {
    let desert = {
      location: req.body.location,
      desc: req.body.desc,
      geoMap: req.body.geoMap,
      photourl: req.body.photourl,
      pemail: req.body.pemail,
    };
    Desert.findByIdAndUpdate(
      req.params.id,
      { $set: desert },
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

desertRouter.delete("/:id", (req, res) => {
  if (objectId.isValid(req.params.id)) {
    Desert.findByIdAndRemove(req.params.id, (err, doc) => {
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

module.exports = desertRouter;
