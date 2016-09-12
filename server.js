var express = require("express");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var favicon = require("serve-favicon");
var morgan = require("morgan");
var passport = require("passport");
var path = require("path");
var helmet = require("helmet");
var compression = require("compression");
var nconf = require("./nconf.js");
var app = express();

app.set("PORT", process.env.PORT || 9901);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(helmet());
app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public/favi_v2.png")));
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

mongoose.connect(nconf.db, function(err){
  if(err) throw(err);
  console.log("DB Connection Attempted at %s.", new Date().toLocaleTimeString());
});
mongoose.connection.on("connected", function(err){
  if(err) console.log(err);
  console.log("Connection established. %s", new Date().toLocaleTimeString());
});


var mainrouter = require("./centralroutes.js");
app.use("/", mainrouter);
var apirouter = require("./apirouter.js");
app.use("/api", apirouter);



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
