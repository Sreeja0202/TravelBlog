const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const oid = require("mongoose").Types.ObjectId;
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
          };
          let token = jwt.sign(payload, "secretKey");
          res.status(200).send({ token });
        }
      }
    }
  );
});

module.exports = urouter;
