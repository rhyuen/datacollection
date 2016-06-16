var request = require("request");
var cheerio = require("cheerio");

var url = "http://www.kijiji.ca/b-room-rental-roommate/vancouver/c36l1700287?ad=offering";

request(url, function(err, status, data){
  if(err)
    throw err;
  var $ = cheerio.load(data);
  $("a.title.enable-search-navigation-flag").each(function(){
    console.log($(this).text());
  });
  //console.log(data);
});
