var express = require("express");
var router = express.Router();
var RoomListing = require("./models/roomlisting.js");
var Article = require("./models/articlelisting.js");

router.get("/news", function(req, res){
  //Return all news articles regardless of source
  res.send("news");
});

router.get("/news/articles", function(req, res){
  //expect source in query param?
  res.send("news/articles");
});

router.get("/housing", function(req, res){
  RoomListing.find({}, function(err, rl_results){
    if(err){
      console.log("Error: %s", err);
      res.render("error");
    }
    res.json({result: "success", listings: rl_results});
  });
  res.send("housing with no filter on source.");
});

router.get("/housing/cl", function(req, res){
  RoomListing.find({"url": /^https:\/\/vancouver.craigslist.ca/}, function(err, cl_results){
    if(err){
      console.log("Error: %s", err);
      res.render("error");
    }
    res.json({result: "success", listings: cl_results});
  });
});

router.get("/housing/kijiji", function(req, res){
  RoomListing.find({url: /www.kijiji.ca/}, function(err, kijiji_results){
    if(err){
      console.log("Error: %s", err);
      res.render("error");
    }
    res.json({result: "success", listings: kijiji_results});
  });
});



module.exports = router;
