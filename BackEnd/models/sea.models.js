const mongoose = require("mongoose");
const Sea = mongoose.model("sea", {
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

module.exports = Sea;
