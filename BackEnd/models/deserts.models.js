const mongoose = require("mongoose");
const Desert = mongoose.model("desert", {
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

module.exports = Desert;
