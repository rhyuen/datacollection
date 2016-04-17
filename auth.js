var passport = require("passport");
var BasicStrategy = require("passport-http").BasicStrategy;
var User = require("./models/user.js");

passport.use(new BasicStrategy(function(username, password, callback){
  //Find user with afforementioned username.
  User.findOne({username: username}, function(err, user){
    if(err)
      return callback(err);
    //User with username not found.
    if(!user)
      return callback(null, false);
    //User found.  Check PW
    user.verifyPassword(password, function(err, isMatch){
      if(err)
        return callback(err);
      //Wrong password
      if(!isMatch)
        return callback(null, false);
      //Right password
      return callback(null, user);
    });
  });
}));

exports.isAuthenticated = passport.authenticate("basic", {session: false});
