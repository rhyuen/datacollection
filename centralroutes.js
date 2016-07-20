var express = require("express");
var request = require("request");
var mongoose = require("mongoose");
var nconf = require("./nconf.js");
var Article = require("./models/articlelisting.js");
var RoomListing = require("./models/roomlisting.js");
var router = express.Router();



router.get("/", function(req, res){
  //User Story: I can see the weather in my current location.
        //Navigator.agent.get...
  //User Story: I can see a different icon or background image (e.g. snowy mountain, hot desert) depending on the weather.
  //ser Story: I can push a button to toggle between Fahrenheit Celsius Kelvin.


  var weatherurl = "http://api.openweathermap.org/data/2.5/forecast/city?id=6173331&units=metric&APPID=" + nconf.weather_api;
  request(weatherurl, function(err, status, data){
    if(err)
      console.error(err);
    var content  = JSON.parse(data);

    res.render("index", {
      projectContent: content.city.name,
      time: "Busted",
      temp: "Broken",
      cloudCoverage: "Doth not work",
      rain: "Le Sigh"
    });
  });
});


router.post("/", function(req, res){
  var userLat = req.body.lat;
  var userLng = req.body.long;

  var userGpsUrl = "http://api.openweathermap.org/data/2.5/weather?lat=" + userLat + "&lon=" + userLng + "&units=metric&APPID=" + nconf.weather_api;
  request(userGpsUrl, function(err, status, data){
    if(err)
      console.error(err);
    var content = JSON.parse(data);
    //console.log(content);

    res.send({
      temp: content.main,
      weather: content.weather,
      wind: content.wind,
      cloud: content.clouds,
      solar: content.sys
    });
  });
});


router.get("/news", function(req, res){
  Article.find()
    .sort({"updatedAt": -1})
    .limit(10)
    .exec(function(err, result){
      if(err)
        console.error(err);
      //console.log(result);
      res.send(result);
  });
});

router.get("/cl", function(req, res){
  RoomListing.find()
    .sort({"updatedAt": -1})
    .limit(10)
    .exec(function(err, rooms){
      if(err)
        console.error(err);
      console.log(rooms);
      res.send(rooms);
    });
});

router.get("/kijiji", function(req, res){
  RoomListing.find()
    .sort({"updatedAt": -1})
    .limit(10)
    .exec(function(err, rooms){
      if(err)
        console.error(err);
      console.log(rooms);
      res.send(rooms);
    });
  res.send("kijijiroute");
});

router.get("/reddit", function(req, res){
  var url = "http://www.reddit.com/r/worldnews/.json";
  request(url, function(err, status, content){
    var json = JSON.parse(content);

    var processedData = json.data.children.map(function(item){
      return {
        domain: item.data.domain,
        subreddit: item.data.subreddit,
        thread_score: item.data.score,
        num_comments: item.data.num_comments,
        thread_link: item.data.permalink,
        time_created: item.data.created,
        source_url: item.data.url,
        thread_title: item.data.title
      };
    });
    res.send(processedData);
  });
});


router.get("/login", function(req, res){
  res.render("login");
});


module.exports = router;
