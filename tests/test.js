var expect = require("chai").expect;
var request = require("request");

describe("Root Server Response", function(){
  it("should return 200", function(done){
    request("http://localhost:9901", function(err, res, body){
      if(err)
        throw err;
      expect(res.statusCode).equal(200);
      done();
    });
  });
});
