var mongoose = require("mongoose");

var articleSchema = mongoose.Schema({
  title: String,
  url: String,
  source: String
},  {timestamps: {
  createdAt: "created_at"
}});

module.exports = mongoose.model("Article", articleSchema);
