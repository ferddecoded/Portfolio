const gulp = require("gulp");
const sass = require("gulp-sass");
const concat = require("gulp-concat");
const babel = require("gulp-babel");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();
const reload = browserSync.reload;

gulp.task("styles", () => {
    return gulp
      .src("./styles/**/*.scss")
      .pipe(sass().on("error", sass.logError))
      .pipe(autoprefixer())
      .pipe(concat("style.css"))
      .pipe(gulp.dest("./styles"))
      .pipe(reload({ stream: true }));
});

gulp.task("scripts", () => {
    return gulp.src("./js/script.js")
        .pipe(babel({
            presets: ["env"]
        }))
        .pipe(concat("main.js"))
        .pipe(gulp.dest("./js"))
        .pipe(reload({stream: true}));;
})

gulp.task("browser-sync", () => {
    browserSync.init({
        server: "."
    });
});

gulp.task("default", ["styles", "scripts", "browser-sync"], () => {
    gulp.watch("./styles/**/*.scss", ["styles"]);
    gulp.watch("./js/scripts.js", ["scripts"]);
    gulp.watch("*.html", reload);
})