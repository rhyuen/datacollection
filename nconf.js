"use strict";

var nconf = require("nconf");

nconf.file("./config.json");

module.exports = {
  db: process.env.db || nconf.get("db"),
  weather_api: process.env.weather_api || nconf.get("weather_api")
};
