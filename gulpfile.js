var gulp = require("gulp");
var mocha = require("gulp-mocha");
var bkgd= require("gulp-bg");
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


gulp.task("browser-sync", function(){
  browserSync.init({
    proxy: "localhost:9901"
  });
});

gulp.task("watch", ["browser-sync"], function(){
  gulp.watch("./public/views/**/*.hbs").on("change", browserSync.reload);
});

gulp.task("default", ["start", "test", "watch"]);
