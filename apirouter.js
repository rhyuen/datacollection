var express = require("express");
var router = express.Router();
var RoomListing = require("./models/roomlisting.js");
var Article = require("./models/articlelisting.js");

router.get("/news", function(req, res){
  res.send("news");
});

router.get("/news/articles", function(req, res){
  res.send("news/articles");
});

router.get("/housing", function(req, res){
  res.send("housing");
});

router.get("/housing/cl", function(req, res){
  RoomListing.find({url: "cl"}, function(err, cl_results){
    if(err){
      console.log("Error: %s", err);
      res.render("error");
    }
    res.json({result: "success", listings: cl_results});
  });
  res.send("housing/cl");
});

router.get("/housing/kijiji", function(req, res){
  RoomListing.find({url: "kijiji"}, function(err, kijiji_results){
    if(err){
      console.log("Error: %s", err);
      res.render("error");
    }
    res.json({result: "success", listings: kijiji_results});
  });
  res.send("housing/kijiji");
});



module.exports = router;
