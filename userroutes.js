var express = require("express");
var User = require("./models/user.js");
var router = express.Router();

router.get("/", function(req, res){
  User.find(function(err, users){
    if(err)
      res.send(err);
    res.json(users);
  });
});

router.post("/", function(req, res){
  var user = new User({
    username: req.body.username,
    password: req.body.password
  });

  user.save(function(err, newbie){
    if(err)
      res.send(err);
    res.json({message: "New User added.", userDetails: newbie});
  });
});


module.exports = router;
