/*NewsGenerate*/

var request = require("request");
var config = require("./config.js");
var cheerio = require("cheerio");
var mongoose = require("mongoose");
var Article = require("./models/articleListing.js");
var firstUrl = "http://www.vancouversun.com/news/latest_news.html";
var secondUrl = "http://www.vancouversun.com/news/latest_news_02.html";
var rooturl = "http://www.vancouversun.com";


function getNewsData(targetUrl){
  request(targetUrl, function(err, status, data){
    var $ = cheerio.load(data);

    //For console output
    var urlContainer = [];


    $(".col_620 .featurecontent h3 a").each(function(){
      //console.log($(this).text().trim() + "\n");
      var relUrl = $(this).attr("href");
      var fullUrl = "";

      if(relUrl.indexOf("http") > -1){
        urlContainer.push(relUrl);
        fullUrl = relUrl;
      }else if(relUrl.charAt(0) !== "/"){
        urlContainer.push(rooturl + "/news/" + relUrl);
        fullUrl = rooturl + "/news/" + relUrl;
      }else{
        urlContainer.push(rooturl + relUrl);
        fullUrl = rooturl + relUrl;
      }

      var currArticle = new Article({
        title: $(this).text().trim(),
        url: fullUrl,
        source: rooturl
      });

      currArticle.save(function(err, data){
        if(err)
          console.error(err);
        console.log(data);
      });
    });
  });
}


mongoose.connect(config.db, function(err){
  if(err)
    console.error(err);
  console.log("DB CONN");
  getNewsData(firstUrl);
  getNewsData(secondUrl);
  //mongoose.disconnect();
  //or
  //mongoose.connection.close();
  /*
  Figure out a way to disconnect ater it's done writing.
  */

});
