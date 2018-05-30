const gulp = require('gulp');
const sass = require('gulp-sass');

const sassFiles = [
    "./node_modules/bootstrap/scss/bootstrap.scss",
    "src/styles/*.scss"
];

const vendorJsFiles = [
    "./node_modules/jquery/dist/jquery.min.js",
    "./node_modules/tether/dist/js/tether.min.js",
    "./node_modules/bootstrap/dist/js/bootstrap.min.js"
];

gulp.task("sass", () => {
    gulp.src(sassFiles)
        .pipe(gulpSASS())
        .pipe(concatenate("styles.css"))
        .pipe(gulp.dest("./public/css/"))
        .pipe(
          autoPrefix({
            browsers: ["last 2 versions"],
            cascade: false
          })
        )
        .pipe(cleanCSS())
        .pipe(rename("styles.min.css"))
        .pipe(gulp.dest("./public/css/"));
  });
  
  gulp.task("js:vendor", () => {
    gulp
      .src(vendorJsFiles)
      .pipe(concatenate("vendor.min.js"))
      .pipe(gulp.dest("./public/js/"));
  });
  
  gulp.task("build", ["sass", "js:vendor"]);
  
  gulp.task("watch", () => {
    gulp.watch(sassFiles, ["sass"]);
  });
  
  gulp.task("default", ["watch"]);