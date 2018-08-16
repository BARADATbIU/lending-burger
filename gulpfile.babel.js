"use strict";

import gulp from "gulp";
import del from "del";
import gulpif from "gulp-if";
import ghPages from "gulp-gh-pages";

import sass from "gulp-sass";
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";
import presetEnv from "postcss-preset-env";
import pxtorem from "postcss-pxtorem";
import cleancss from "gulp-clean-css";

import rollup from "gulp-better-rollup";
import concat from "gulp-concat";
import babel from "gulp-babel";
import uglify from "gulp-uglify";

import sourcemaps from "gulp-sourcemaps";
import plumber from "gulp-plumber";
import rename from "gulp-rename";
import replace from "gulp-replace";

import svgsprite from "gulp-svg-sprite";
import svgmin from "gulp-svgmin";
import cheerio from "gulp-cheerio";
import imagemin from "gulp-imagemin";

import browserSync from "browser-sync";

const server = browserSync.create();

function reload(done) {
  server.reload();
  done();
}

function serve(done) {
  server.init({
    server: {
      baseDir: "./dist"
    }
  });
  done();
}

const paths = {
  styles: {
    src: "src/styles/scss/main.scss",
    watch: "src/styles/scss/**/*.scss",
    dest: "dist/styles/"
  },
  stylesFound: {
    src: "node_modules/normalize.css/normalize.css",
    dest: "dist/styles/found"
  },
  scripts: {
    src: "src/scripts/main.js",
    watch: "src/scripts/**/*.js",
    dest: "dist/scripts/"
  },
  scriptsLibs: {
    src: "node_modules/jquery/dist/jquery.min.js",
    dest: "dist/scripts/libs"
  },
  html: {
    src: "src/*.html",
    dest: "dist/"
  },
  images: {
    src: "src/images/**/*.*",
    dest: "dist/images/"
  },
  svgSprite: {
    src: "src/sprite/*.svg",
    dest: "dist/images/"
  },
  fonts: {
    src: "src/fonts/**/*.*",
    dest: "dist/fonts/"
  }
};
const isDev = !process.env.NODE_ENV || process.env.NODE_ENV == "development";

const clean = () => del(["dist"]);

function scripts() {
  return gulp
    .src(paths.scripts.src)
    .pipe(plumber())
    .pipe(gulpif(isDev, sourcemaps.init()))
    .pipe(rollup({}, "iife"))
    .pipe(babel())
    .pipe(
      rename({
        basename: "main",
        suffix: ".min"
      })
    )
    .pipe(gulpif(!isDev, uglify()))
    .pipe(gulpif(isDev, sourcemaps.write(".")))
    .pipe(gulp.dest(paths.scripts.dest));
}

function scriptsLibs() {
  return gulp
    .src(paths.scriptsLibs.src)
    .pipe(concat("libs.min.js"))
    .pipe(gulp.dest(paths.scriptsLibs.dest));
}

function styles() {
  let plugins = [
    autoprefixer({
      browsers: ["last 10 version", "IE 11", "Firefox ESR"]
    }),
    presetEnv(),
    pxtorem({
      propList: ["*"],
      selectorBlackList: [":root"],
      minPixelValue: 7
    })
  ];
  return gulp
    .src(paths.styles.src)
    .pipe(plumber())
    .pipe(gulpif(isDev, sourcemaps.init()))
    .pipe(sass())
    .pipe(postcss(plugins))
    .pipe(gulpif(!isDev, cleancss()))
    .pipe(
      rename({
        basename: "main",
        suffix: ".min"
      })
    )
    .pipe(gulpif(isDev, sourcemaps.write(".")))
    .pipe(gulp.dest(paths.styles.dest));
}

function stylesFound() {
  return gulp
    .src(paths.stylesFound.src)
    .pipe(cleancss())
    .pipe(
      rename({
        suffix: ".min"
      })
    )
    .pipe(gulp.dest(paths.stylesFound.dest));
}

function html() {
  return gulp
    .src(paths.html.src)
    .pipe(plumber())
    .pipe(gulp.dest(paths.html.dest));
}

function images() {
  return gulp
    .src(paths.images.src)
    .pipe(
      imagemin([
        imagemin.jpegtran({ progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo()
      ])
    )
    .pipe(gulp.dest(paths.images.dest));
}

function fonts() {
  return gulp.src(paths.fonts.src).pipe(gulp.dest(paths.fonts.dest));
}

function svgSprite() {
  return gulp
    .src(paths.svgSprite.src)
    .pipe(
      svgmin({
        js2svg: {
          pretty: true
        }
      })
    )
    .pipe(
      cheerio({
        run: $ => {
          $("[fill]").removeAttr("fill");
          $("[stroke]").removeAttr("stroke");
          $("[style]").removeAttr("style");
        },
        parserOptions: { xmlMode: true }
      })
    )
    .pipe(replace("&gt;", ">"))
    .pipe(
      svgsprite({
        mode: {
          symbol: {
            sprite: "sprite.svg"
          }
        }
      })
    )
    .pipe(gulp.dest(paths.svgSprite.dest));
}

function watch() {
  gulp.watch(paths.html.src, gulp.series(html, reload));
  gulp.watch(paths.fonts.src, gulp.series(fonts, reload));
  gulp.watch(paths.styles.watch, gulp.series(styles, reload));
  gulp.watch(paths.scripts.watch, gulp.series(scripts, reload));
  gulp.watch(paths.images.src, gulp.series(images, reload));
  gulp.watch(paths.svgSprite.src, gulp.series(svgSprite, reload));
}

gulp.task("deploy", () => {
  return gulp.src("./dist/**/*").pipe(ghPages());
});

gulp.task(
  "build",
  gulp.series(
    clean,
    gulp.parallel(
      html,
      styles,
      stylesFound,
      scripts,
      scriptsLibs,
      fonts,
      images,
      svgSprite
    )
  )
);

gulp.task(
  "default",
  gulp.series(
    clean,
    gulp.parallel(
      html,
      styles,
      stylesFound,
      scripts,
      scriptsLibs,
      fonts,
      images,
      svgSprite
    ),
    gulp.parallel(serve, watch)
  )
);
