var express = require("express");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var favicon = require("serve-favicon");
var request = require("request");
var morgan = require("morgan");
var passport = require("passport");
var path = require("path");
var Article = require("./models/articlelisting.js");
var RoomListing = require("./models/roomlisting.js");
var config = require("./config.js");
var app = express();

app.set("PORT", process.env.PORT || 9901);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(favicon(path.join(__dirname, "public/docker.ico")));
app.set("views", path.join(__dirname, "public/views"));
app.engine(".hbs", exphbs({defaultLayout: "layout",
  layoutsDir: path.join(__dirname, "public/views/layouts"),
  partialsDir: path.join(__dirname, "public/views/partials"),
  extname: ".hbs"
}));
app.set("view engine", ".hbs");
app.use(morgan("dev"));
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, "public")));



app.get("/", function(req, res){
  //User Story: I can see the weather in my current location.
        //Navigator.agent.get...
  //User Story: I can see a different icon or background image (e.g. snowy mountain, hot desert) depending on the weather.
  //ser Story: I can push a button to toggle between Fahrenheit Celsius Kelvin.


  var weatherurl = "http://api.openweathermap.org/data/2.5/forecast/city?id=6173331&units=metric&APPID=" + config.weather_api;
  request(weatherurl, function(err, status, data){
    if(err)
      console.error(err);
    var content  = JSON.parse(data);

    res.render("index", {
      projectContent: content.city.name,
      time: content.list[0].dt_txt,
      temp: content.list[0].main.temp,
      cloudCoverage: content.list[0].clouds.all,
      rain: ""//content.list[0].rain["3h"] //breaks if there's no rain...
    });
  });
});


app.post("/", function(req, res){
  var userLat = req.body.lat;
  var userLng = req.body.long;

  var userGpsUrl = "http://api.openweathermap.org/data/2.5/weather?lat=" + userLat + "&lon=" + userLng + "&units=metric&APPID=" + config.weather_api;
  request(userGpsUrl, function(err, status, data){
    if(err)
      console.error(err);
    var content = JSON.parse(data);
    console.log(content);

    res.send({
      temp: content.main,
      weather: content.weather,
      wind: content.wind,
      cloud: content.clouds,
      solar: content.sys
    });
  });
});


app.get("/news", function(req, res){
  mongoose.connect(config.db, function(err){
    if(err)
      console.error(err);

    Article.find()
    .sort({"updatedAt": -1})
    .limit(10)
    .exec(function(err, result){
      if(err)
        console.error(err);
      console.log(result);
      res.send(result);

    });
  });
});

app.get("/cl", function(req, res){
  mongoose.connect(config.db, function(err){
    if(err)
      console.error(err);

  });
});

app.get("/login", function(req, res){
  res.render("login");
});

var userrouter = require("./userroutes.js");
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
