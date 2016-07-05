var mongoose = require("mongoose");

var roomListingSchema = mongoose.Schema({
  title: String,
  price: String,
  roomDim: String,
  area: String,
  date: String,
  url: String,
  desc: {type: String, required: false},
  detailedDesk: {type: String, required: false},
  address: {type: String, required: false},
  furnished: {type: String, required: false},
  pets: {type: String, required: false}


}, {timestamps: {
  createdAt: "created_at"
}});

module.exports = mongoose.model("RoomListing", roomListingSchema);
