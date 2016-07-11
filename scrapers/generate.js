var path = require("path");
var fs = require("fs");
var request = require("request");
var cheerio = require("cheerio");
var RoomListing = require("../models/roomlisting.js");
var mongoose = require("mongoose");

module.exports = function(url){
  request(url, function(err, res, html){
    if(err)
      console.log(err);
    var $ = cheerio.load(html);
    var listingList = [];
    var count =0;

    $(".txt").each(function(){

      var currTitle = "";
      var currPrice = "";
      var currRoomDim = "";
      var currArea = "";
      var currDate = "";
      var currLink = "https://vancouver.craigslist.ca";

      //Posting Date
      $(this).find(".pl time").each(function(){
        currDate = $(this).attr("datetime");
      });

      //Post Title
      $(this).find(".pl a").each(function(){
        currTitle = $(this).text();
        //LISTING URL
        currLink += $(this).attr("href");
      });

      $(this).find(".l2").each(function(){
        //PRICE
        currPrice = ($(this).find(".price").text() === "") ? "NO PRICE": $(this).find(".price").text();

        //ROOM DIMENSIONS
        currRoomDim = ($(this).find(".housing").text() === "") ? "EMPTY DIMENSIONS": $(this).find(".housing").text().split(" ")[1];

        //NEIGHBOURHOOD
        currArea = ($(this).find(".pnr small").text() === "") ? "EMPTY NEIGHBOURHOOD" : $(this).find(".pnr small").text().trim();
      });

      var currListing = new RoomListing({
        title: currTitle,
        price: currPrice,
        roomDim: currRoomDim,
        area: currArea,
        date: currDate,
        url: currLink
      });

      RoomListing.find({title: currListing.title}, function(err, existingData){
        if(err)
          throw err;
        if(Object.keys(existingData).length === 0){
          currListing.save(function(err, data){
            if(err)
              console.log(err);
            console.log("Entry Saved.  Title: %s", data.title);
          });
        }else{
          console.log("CL exists already. Title: %s", existingData[0].title);
        }
      });

      listingList.push(currListing);

      count++;
    });
    console.log(listingList);
  });
};
