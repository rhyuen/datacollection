var mongoose = require("mongoose");

var roomListingSchema = mongoose.Schema({
  title: String,
  price: String,
  roomDim: String,
  area: String,
  date: String,
  url: String
}, {timestamps: {
  createdAt: "created_at"
}});

module.exports = mongoose.model("RoomListing", roomListingSchema);
