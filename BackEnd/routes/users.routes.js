const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const objectId = require("mongoose").Types.ObjectId;
const urouter = express.Router();
const User = require("../models/users.models.js");

const app = express();

app.use(express.json());
app.use(cors());

// registeration or sign up or post
urouter.post("/", (req, res) => {
  let pass = req.body.upassword;
  let hash = bcrypt.hashSync(pass, 10);

  let user = new User({
    ufname: req.body.ufname,
    ulname: req.body.ulname,
    umobile: req.body.umobile,
    uemail: req.body.uemail,
    upassword: hash,
    uDate: req.body.uDate,
    urole: req.body.urole,
  });

  user.save((err, doc) => {
    if (err) {
      console.log("Error in posting data", err);
    } else {
      res.send(doc);
    }
  });
});

// login
urouter.post("/login", (req, res) => {
  let userData = req.body;
  User.findOne(
    {
      uemail: userData.uemail,
    },
    (err, user) => {
      if (err) {
        console.log(err);
      } else {
        if (!user) {
          res.status(401).send("Invalid Email");
        } else if (!bcrypt.compareSync(userData.upassword, user.upassword)) {
          console.log(userData.upassword);
          console.log(user.upassword);
          res.status(401).send("Invalid Password");
        } else {
          let payload = {
            id: user.ObjectId,
            firstName: user.ufname,
            lastName: user.ulname,
            mobileNumber: user.umobile,
            email: user.uemail,
            role: user.urole,
          };
          let token = jwt.sign(payload, "secretKey");
          res.status(200).send({ token });
        }
      }
    }
  );
});

// get
urouter.get("/", (req, res) => {
  User.find((err, doc) => {
    if (err) {
      console.log("Error in getting data", +err);
    } else {
      res.send(doc);
    }
  });
});

// update
urouter.put("/:id", (req, res) => {
  if (objectId.isValid(req.params.id)) {
    let user = {
      ufname: req.body.ufname,
      ulname: req.body.ulname,
      umobile: req.body.umobile,
      uemail: req.body.uemail,
      upassword: req.body.upassword,
      uDate: req.body.uDate,
      urole: req.body.urole,
    };
    User.findByIdAndUpdate(
      req.params.id,
      { $set: user },
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
      .send(`No record found with User with id ${req.params.id}`);
  }
});

// DELETE by id/salary/name

urouter.delete("/:id", (req, res) => {
  if (objectId.isValid(req.params.id)) {
    User.findByIdAndRemove(req.params.id, (err, doc) => {
      if (err) {
        console.log("Error in Deleting data by id", +err);
      } else {
        res.send(doc);
      }
    });
  } else {
    return res
      .status(400)
      .send(`No record found with User with id ${req.params.id}`);
  }
});

module.exports = urouter;
