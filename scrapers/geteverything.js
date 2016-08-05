"use strict";
var mongoose = require("mongoose");
var config = require("../nconf.js");


var cl_room = require("./generate.js");
var kijiji_room = require("./kijijigenerate.js");
var genericNews = require("./genericarticlescraper");

var craigslist_room_url = "http://vancouver.craigslist.ca/search/roo";
var kijiji_room_Url = "http://www.kijiji.ca/b-room-rental-roommate/vancouver/c36l1700287?ad=offering";




var pollingRate = process.argv[2];
var dbOptions = {server: {socketOptions: {connectTimeoutMS: pollingRate || 30000}}};

mongoose.connect(config.db, function(err){
  //TODO: If Timeout.ERROR, Retry
  if(err){
    console.error(err);
    mongoose.disconnect();
  }
  console.log("DB Connection attempted at %s.", new Date().toLocaleTimeString());
});

mongoose.connection.on("connected", function(){
  console.log("DB Conn success.");
  setInterval(executeScrapers, 60000);
});

mongoose.connection.on("disconnected", function(){
  console.log("Disconnection occurred.");
  mongoose.connect(config.db);
})

var cyclesRun = 0;
function executeScrapers(){
  genericNews();  
  cl_room(craigslist_room_url);
  kijiji_room(kijiji_room_Url);
  console.log(++cyclesRun);
}

//write api access layer
