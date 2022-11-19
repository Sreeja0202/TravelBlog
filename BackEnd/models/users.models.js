const mongoose = require("mongoose");
const User = mongoose.model("user", {
  ufname: {
    type: String,
  },
  ulname: {
    type: String,
  },
  umobile: {
    type: Number,
  },
  uemail: {
    type: String,
  },
  upassword: {
    type: String,
  },
  // ucpassword: {
  //   type: String,
  // },
});

module.exports = User;
