const mongoose = require("mongoose");
const Valley = mongoose.model("valley", {
  location: {
    type: String,
  },
  desc: {
    type: String,
  },
  geoMap: {
    type: String,
  },
  photourl: {
    type: String,
  },
  pemail: {
    type: String,
  },
});

module.exports = Valley;
