"use strict";
var mongoose = require("mongoose");
var request = require("request");
var cheerio = require("cheerio");
var Article = require("../models/articlelisting.js");

var sourceDictionary = {
    "VancouverSun": {
      name: "Vancouver Sun",
      mainUrl: "http://vancouversun.com/category/news",
      subUrl: "http://vancouversun.com/category/news/page/2",
      cssSelector: "article h2 a, article h3 a, article h4 a"
    },

    "Province": {
      name: "Province",
      mainUrl: "http://theprovince.com/category/news/local-news",
      subUrl: "http://theprovince.com/category/news/local-news/page/2",
      cssSelector: "article h4 a, article h2 a"
    }
};


var getAllArticles = function(){
  for(var scopekey in sourceDictionary){

    (function(){

      var srckey = scopekey;
      request(sourceDictionary[srckey].mainUrl, function(err, status, data){
        if(err) throw err;

        var $ = cheerio.load(data);

        $(sourceDictionary[srckey].cssSelector).each(function(){

          var currArtListing = new Article({
            title: $(this).text().trim(),
            url: $(this).attr("href").trim(),
            source: sourceDictionary[srckey].name //POI
          });
          console.log(currArtListing);

          Article.find({title: currArtListing.title}, function(err, artData){
            if(err) throw err;

            if(Object.keys(artData).length === 0){
              currArtListing.save(function(err, currArtData){
                if(err) throw err;
                console.log("%s. Saved: \n %s\n", sourceDictionary[srckey].name, currArtData);
              });
            }else{
              console.log("%s. Exists Already. Title: %s", sourceDictionary[srckey].name, artData[0].title);
            }
          });
        });
      });

    })();

  }
};

getAllArticles();

module.exports = getAllArticles;
