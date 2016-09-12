var gulp = require("gulp");
var mocha = require("gulp-mocha");
var imagemin = require("gulp-imagemin");
var cache = require("gulp-cache");
var bkgd= require("gulp-bg");
var del = require("del");
var runSequence = require("run-sequence");
var browserSync = require("browser-sync").create();


var bkgdgstart;

gulp.task("start", bkgdstart = bkgd("node", "./server.js"));

gulp.task("test", ["start"], function(){
  return gulp.src("./tests/test.js", {read: false})
    .pipe(mocha({reporter: "nyan"}))
    .once("end", function(){
      bkgdstart.setCallback(function(){
        process.exit(0);
      });
      bkgdstart.stop(0);
    })
    .once("error", function(){
      bkgdstart.setCallback(function(){
        process.exit(0);
      });
      bkgdstart.stop(0);
    });
});

gulp.task("images", function(){
  return gulp.src("public/images/**/*.+(png|jpg|gif|svg)")
    .pipe(cache(imagemin()))
    .pipe(gulp.dest("dist/images"));
});

gulp.task("build", function(cb){
  runSequence("cleandist", ["images"], cb);
});

gulp.task("cleandist", function(){
  return del.sync("dist");
});

gulp.task("browser-sync", function(){
  browserSync.init({
    proxy: "localhost:9901"
  });
});


gulp.task("watch", ["browser-sync"], function(){
  gulp.watch("./public/views/**/*.+(js|hbs|css|html)").on("change", browserSync.reload);
});

gulp.task("default", ["build", "start", "test", "watch"]);
