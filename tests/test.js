var expect = require("chai").expect;
var chai = require("chai");
var chaiHttp = require("chai-http");
var should = reuqire("chai").should();

var request = require("request");
var rootUrl = "http://localhost:9901/";

describe("Root Server Response", function(){
  it("should return 200", function(done){
    request(rootUrl, function(err, res, body){
      if(err)
        throw err;
      expect(res.statusCode).equal(200);
      done();
    });
  });
});

//News, REddit, Cl
describe("Vancouver Sun Data", function(){
  it("should return 200", function(done){
    request(rootUrl + "news", function(err, res, body){
      if(err)
        throw err;
      expect(res.statusCode).equal(200);
      done();
    });
  });
});

describe("Craigslist Data", function(){
  it("should return 200", function(done){
    request(rootUrl + "cl", function(err, res, body){
      if(err)
        throw err;
      expect(res.statusCode).equal(200);
      done();
    });
  });
});

describe("Reddit Data", function(){
  it("should return 200", function(done){
    request(rootUrl + "reddit", function(err, res, body){
      if(err)
        throw err;
      expect(res.statusCode).equal(200);
      done();
    });
  });
});
