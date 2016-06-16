"use strict";

var nconf = require("nconf");

nconf.file("./config.json");

module.exports = nconf;
