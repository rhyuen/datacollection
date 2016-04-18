var mongoose = require("mongoose");

var listingSchema = mongoose.Schema({
  title: String,
  price: String,
  roomDim: String,
  area: String,
  date: String
});

module.exports = mongoose.model("RoomListing", listingSchema);
