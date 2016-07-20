"use strict";
var mongoose = require("mongoose");
var request = require("request");
var cheerio = require("cheerio");
var Article = require("../models/articlelisting.js");

var provinceLocalMainPageUrl = "http://theprovince.com/category/news/local-news";
var provinceLocalSubsequentPageUrl = "http://theprovince.com/category/news/local-news/page/2";


var getProvinceArticles = function(provinceUrl){

  request(provinceUrl, function(err, status, data){
    var $ = cheerio.load(data);
    $("article h4 a, article h2 a").each(function(){

      var currArtListing = new Article({
        title: $(this).text().trim(),
        url: $(this).attr("href").trim(),
        source: "The Province"
      });

      Article.find({title: currArtListing.title}, function(err, artData){
        if(err){
          console.log(err);
          throw err;
        }

        if(Object.keys(artData).length === 0){
          currArtListing.save(function(err, currArtData){
            if(err){
              console.log(err);
              throw err;
            }
            console.log("Province Art. Saved: \n %s\n", currArtData);
          });
        }else{
          console.log("Province Art. Exists Already. Title: %s", artData[0].title);
        }
      });
    });
  });
};

getProvinceArticles(provinceLocalMainPageUrl);

module.exports = getProvinceArticles;
