var request = require("request");
var cheerio = require("cheerio");
var mongoose = require("mongoose");
var RoomListing = require("../models/roomlisting.js");

module.exports = function(baseKijijiUrl){
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
        //ENTRY EXISTS,
        //TODO: UPDATE TIMESTAMPS.
        }else{
          console.log("Exists already. Title: %s", data[0].title);
        }
      });
    });
  });
};
