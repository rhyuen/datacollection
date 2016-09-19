var express = require("express");
var router = express.Router();
var RoomListing = require("./models/roomlisting.js");
var Article = require("./models/articlelisting.js");

router.get("/news", function(req, res){
  Article
    .find({})
    .sort({"updatedAt": -1})
    .limit(30)
    .exec(function(err, art_results){
      if(err){
        console.error("ERROR @ %s: %s", new Date().toLocaleTimeString, err);
        return res.render("error");
      }
      res.json({result: "success", notes: "FILTER: NEWS,VSUN", art_results: art_results});
    });
});

//WORKS
router.get("/news/vsun", function(req, res){
  Article
    .find({"url": /^http:\/\/www.vancouversun.com/})
    .sort({"updatedAt": -1})
    .limit(30)
    .exec(function(err, art_results){
      if(err){
        console.error("ERROR @ %s: %s", new Date().toLocaleTimeString, err);
        return res.render("error");
      }
      res.json({result: "success", notes: "FILTER: NEWS,VSUN", art_results: art_results});
    });
});

//WORKS
router.get("/news/province", function(req, res){
  Article
  .find({"url": /^http:\/\/www.theprovince.com/})
  .sort({"updatedAt": -1})
  .limit(30)
  .exec(function(err, art_results){
    if(err){
      console.error("ERROR @ %s: %s", new Date().toLocaleTimeString, err);
      return res.render("error");
    }
    res.json({result: "success", notes: "FILTER: NEWS,PROVINCE", art_results: art_results});
  });
});

//WORKS
router.get("/housing", function(req, res){
  RoomListing
    .find({})
    .sort({"updatedAt": -1})
    .limit(30)
    .exec(function(err, rl_results){
      if(err){
        console.log("Error: %s", err);
        return res.render("error");
      }
      res.json({result: "success", listings: rl_results});
    });
});

//WORKS
router.get("/housing/cl", function(req, res){
  RoomListing
    .find({"url": /^https:\/\/vancouver.craigslist.ca/})
    .sort({"updatedAt": -1})
    .limit(30)
    .exec(function(err, cl_results){
      if(err){
        console.log("Error: %s", err);
        res.render("error");
      }
      res.json({result: "success", listings: cl_results});
    });
});

//TODO: GET THE AVERAGE
router.get("/housing/cl/average", function(req, res){

  res.send("find the cl average");
});

//WORKS
router.get("/housing/kijiji", function(req, res){
  RoomListing
    .find({url: /www.kijiji.ca/})
    .sort({"updatedAt": -1})
    .limit(30)
    .exec(function(err, kijiji_results){
      if(err){
        console.log("Error: %s", err);
        return res.render("error");
      }
      res.json({result: "success", listings: kijiji_results});
    });
});



module.exports = router;
