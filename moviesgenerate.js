var mongoose = require("mongoose");
var request = require("request");
var cheerio = require("cheerio");
var today = new Date();
var year = today.getUTCFullYear();
var day = today.getUTCDate();
var month = today.getUTCMonth() + 1;
var rootMoviesUrl = "http://cineplex.com/Showtimes/any-movie/vancouver-bc?Date=";
var completeUrl = rootMoviesUrl + month + "/" + day + "/" + year;

request(completeUrl, function(err, status, data){
  if(err)
    console.log(err);
  var $ = cheerio.load(data);
  $(".grid.grid--full.theatre-infoV2").each(function(){
    console.log($(this).text().trim());

  });
//#showtimes-partial-update > div:nth-child(5) > div.grid.grid--full.theatre-infoV2
//#showtimes-partial-update > div:nth-child(5) >
//div.grid.showtime-theatre--body.toggle-container.toggle-hidden
});
