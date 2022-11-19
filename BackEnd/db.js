const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://sreejamohan444:cluster0@cluster0.mwlsecd.mongodb.net/TravelBlogDB",
  (err) => {
    if (!err) {
      console.log("DB Connection Successfull");
    } else {
      console.log("Error in Connection", +err);
    }
  }
);

module.exports = mongoose;
