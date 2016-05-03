var gulp = require("gulp");
var browserSync = require("browser-sync").create();

gulp.task("browser-sync", function(){
  browserSync.init({
    proxy: "localhost:9901"
  });
});

gulp.task("watch", ["browser-sync"], function(){
  gulp.watch("./public/views/**/*.hbs").on("change", browserSync.reload);
});
