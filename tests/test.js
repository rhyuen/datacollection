var expect = require("chai").expect;
var chai = require("chai");
var chaiHttp = require("chai-http");
var should = require("chai").should();

chai.use(chaiHttp);

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

//API TESTS START

describe("API: Vancouver Sun", function(){
  it("should return 200", function(done){
    request(rootUrl + "api/news/vsun", function(req, res, body){
      res.statusCode.should.equal(200);
      res.should.be.a("Object");
      done();
    });
  });
});

describe("API: Province", function(){
  it("should return 200", function(done){
    request(rootUrl + "api/news/province", function(req, res, body){
      res.statusCode.should.equal(200);
      res.should.be.a("Object");
      done();
    });
  });
});

describe("API: CL", function(){
  it("should return 200", function(done){
    request(rootUrl + "api/housing/cl", function(req, res, body){
      res.statusCode.should.equal(200);
      // res.body.should.be.a("object");
      // res.should.be.json;
      // res.body.should.have.property("result");
      // res.body.should.have.property("listings");
      done();
    });
  });
});

describe("API: KJJ", function(){
  it("should return 200", function(done){
    request(rootUrl + "api/housing/kijiji", function(req, res, body){
      res.statusCode.should.equal(200);
      //expect(res.type).to.equal("application/json");
       res.should.be.json;
      // res.body.should.be.a("object");
      // res.body.should.have.property("result");
      // res.body.should.have.property("listings");
      done();
    });
  });
});


//API TESTS END
