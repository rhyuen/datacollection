var mongoose = require("mongoose");

var newsListingSchema = mongoose.Schema({
  headline: {type: String, required: true},
  dateOfHeadLine: {type: String, required: true},
  siteSource: {type: String, required: true},
  url: {type: String, required: true}
});

module.exports = mongoose.model("NewsListing", newsListingSchema);
