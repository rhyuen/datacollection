/*NewsGenerate*/

var request = require("request");
var config = require("./config.js");
var cheerio = require("cheerio");
var mongoose = require("mongoose");
var Article = require("./models/articleListing.js");
var firstUrl = "http://vancouversun.com/category/news/page/3";
var mainUrl = "http://vancouversun.com/category/news";


/*
Add a check for duplicates of articles.
*/

function getNewsData(targetUrl){
  mongoose.connect(config.db, function(err){
    if(err)
      console.error("Something Went Wrong with the DB Conn.  Details: %s", err);

    request(targetUrl, function(err, status, data){
      var $ = cheerio.load(data);

      var urlContainer = [];

      $("article h2 a").each(function(){

        var currArticle = new Article({
          title: $(this).text(),
          url: $(this).attr("href"),
          source: "Vancouver Sun"
        });

        currArticle.save(function(err, data){
          if(err)
            console.error(err);
          console.log(data);
        });

        urlContainer.push(currArticle);
        console.log(currArticle);
      });

      $("article h3 a").each(function(){

        var currArticle = new Article({
          title: $(this).text(),
          url: $(this).attr("href"),
          source: "Vancouver Sun"
        });

        currArticle.save(function(err, data){
          if(err)
            console.error(err);
          console.log(data);
        });

        urlContainer.push(currArticle);
        console.log(currArticle);
      });

      $("article h4 a").each(function(){

        var currArticle = new Article({
          title: $(this).text(),
          url: $(this).attr("href"),
          source: "Vancouver Sun"
        });

        currArticle.save(function(err, data){
          if(err)
            console.error(err);
          console.log(data);
        });

        urlContainer.push(currArticle);
        console.log(currArticle);
      });
      console.log(urlContainer.length);

    });
  });
}


getNewsData(firstUrl);
