var mongoose = require("mongoose");

var roomListingSchema = mongoose.Schema({
  title: String,
  price: String,
  roomDim: String,
  area: String,
  date: String,
  url: String
});

module.exports = mongoose.model("RoomListing", roomListingSchema);
