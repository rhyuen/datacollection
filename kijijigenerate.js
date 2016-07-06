var request = require("request");
var cheerio = require("cheerio");
var mongoose = require("mongoose");
var config = require("./nconf.js");
var RoomListing = require("./models/roomlisting.js");

var baseKijijiUrl = "http://www.kijiji.ca/b-room-rental-roommate/vancouver/c36l1700287?ad=offering";


mongoose.connect(config.db, function(err){
  if(err)
    console.log(err);
  console.log("Mongoose conn attempted.");
});
mongoose.connection.on("connected", function(){
  console.log("Mongoose connection open to %s", config.db);
});

request(baseKijijiUrl, function(err, status, data){
  if(err)
    throw err;
  var $ = cheerio.load(data);

  $(".info-container").each(function(){
    var currRoomListing = new RoomListing();

     currRoomListing.title = $(this).find(".title a").text().trim();
     currRoomListing.price = $(this).find(".price").text().trim();
     currRoomListing.area = $(this).find(".location").clone().children().remove().end().text().trim();     //Often just Vancouver
     currRoomListing.date = $(this).find(".date-posted").text().trim();
     currRoomListing.url = baseKijijiUrl + $(this).find(".title a").attr("href").trim();
     currRoomListing.desc = $(this).find(".description").text().trim();

    //Figure out how to make an async call on a value that isn't initialized at runtime
    //  Something to do with require("child_process").exec;
    //  request(currRoomListing.url, function(subErr, status, subData){
    //    if(subErr){throw subErr}
    //     var jquery = cheerio.load(subData);
    //     console.log(jquery);
    //  });


    //TODO:
    //  Drill Deeper for more info-container

    RoomListing.find({title: currRoomListing.title}, function(err, data){
      if(err)
        throw err;

      //EXISTING ENTRY NOT FOUND, MAKE ONE
      if(Object.keys(data).length === 0){
        currRoomListing.save(function(err, data){
          if(err)
            throw err;
          console.log("Kijiji Room Listing Saved.\n %s\n", data);
        });
      //ENTRY EXISTS, UPDATE TIMESTAMPS.
      }else{
        console.log("Exists already. Title: %s", data[0].title);
      }
    });


  });
});
