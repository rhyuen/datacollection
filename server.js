var express = require("express");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var favicon = require("serve-favicon");
var morgan = require("morgan");
var passport = require("passport");
var path = require("path");
var config = require("./config.js");
var compression = require("compression");
var app = express();

app.set("PORT", process.env.PORT || 9901);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public/docker.ico")));
app.set("views", path.join(__dirname, "public/views"));
app.engine(".hbs", exphbs({defaultLayout: "layout",
  layoutsDir: path.join(__dirname, "public/views/layouts"),
  partialsDir: path.join(__dirname, "public/views/partials"),
  extname: ".hbs"
}));
app.set("view engine", ".hbs");
app.use(morgan("dev"));
app.use(compression());
app.use(passport.initialize());


var mainrouter = require("./centralroutes.js");
var userrouter = require("./userroutes.js");
app.use("/", mainrouter);
app.use("/api/users", userrouter);

app.use(function(req, res, next){
  var err = new Error("404: Not Found");
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(err.status || 500);
  res.send(err.stack);
});

app.listen(app.get("PORT"), function(){
  console.log("Environment: %s", app.get("env"));
  console.log("Listening on port: %s", app.get("PORT"));
});
