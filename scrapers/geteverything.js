"use strict";

var mongoose = require("mongoose");
var config = require("../nconf.js");

var vansun_news = require("./newsgeneratetwo.js");
var cl_room = require("./generate.js");
var kijiji_room = require("./kijijigenerate.js");


var vancouverSun_mainPageUrl = "http://vancouversun.com/category/news";
var vancouverSun_subsequentUrl = "http://vancouversun.com/category/news/page/3";

var craigslist_room_url = "http://vancouver.craigslist.ca/search/roo";
var kijiji_room_Url = "http://www.kijiji.ca/b-room-rental-roommate/vancouver/c36l1700287?ad=offering";


var pollingRate = process.argv[2];
var dbOptions = {server: {socketOptions: {connectTimeoutMS: pollingRate || 30000}}};

mongoose.connect(config.db, function(err){
  if(err)
    throw err;
  console.log("DB Connection attempted at %s.", new Date().toLocaleTimeString());
});

mongoose.connection.on("connected", function(){
  console.log("DB Conn success.");
  setInterval(executeScrapers, 300000);
});

var cyclesRun = 0;
function executeScrapers(){
  vansun_news(vancouverSun_mainPageUrl);
  cl_room(craigslist_room_url);
  kijiji_room(kijiji_room_Url);
  console.log(++cyclesRun);
}

//write api access layer
