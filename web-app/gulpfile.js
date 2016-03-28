var gulp = require("gulp");
var rename = require("gulp-rename");
var mocha = require("gulp-spawn-mocha");
var del = require("del");
var less = require("gulp-less");
var cssMinify = require("gulp-minify-css");
var webserver = require("gulp-webserver");
var ts = require("gulp-typescript");
var tslint = require("gulp-tslint");
var tsify = require("tsify");
var browserify = require("browserify");
var debowerify = require("debowerify");
var deamdify = require("deamdify");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
var tsconfig = require("./tsconfig.json");

var FOLDER_DIST        = "./dist";
var FOLDER_SRC         = "./src";
var FOLDER_TS          = FOLDER_SRC + "/scripts";
var FOLDER_LESS        = FOLDER_SRC + "/less";
var FOLDER_CSS         = FOLDER_DIST + "/css";
var FOLDER_JS          = FOLDER_DIST + "/scripts";
var FOLDER_JS_EXTERNAL = FOLDER_JS + "/external";
var FOLDER_TESTS       = "./temp";

gulp.task("typescript", ["clean-scripts"], function() { 
    var bundle = browserify({
            basedir: FOLDER_TS,
            entries: "main.tsx",
            debug: true
        })
        .plugin(tsify, tsconfig.compilerOptions)
        .transform(debowerify)
        .transform(deamdify)
        .bundle();

    return bundle
        .pipe(source("main.js"))
        .pipe(buffer())
        .pipe(gulp.dest(FOLDER_JS));
});

gulp.task("pure-css", ["clean-css"], function () {
    return gulp.src("./bower_components/pure/pure-min.css")
        .pipe(rename("pure.min.css"))
        .pipe(gulp.dest(FOLDER_CSS));
});

gulp.task("less", ["clean-css"], function() {
    return gulp.src(FOLDER_LESS + "/main.less")
        .pipe(less())
        .pipe(cssMinify())
        .pipe(gulp.dest(FOLDER_CSS));
});

gulp.task("html", ["clean-html"], function() {
    return gulp.src(FOLDER_SRC + "/**/*.html")
        .pipe(gulp.dest(FOLDER_DIST));
});

gulp.task("external-scripts", ["clean-external-scripts"], function() {
    return gulp.src([
            "./bower_components/react/react.js"
        ])
        .pipe(gulp.dest(FOLDER_JS + "/external"));
});

gulp.task("tslint", function () {
    return gulp.src([FOLDER_TS + "/**/*.{ts,tsx}"])
        .pipe(tslint())
        .pipe(tslint.report('verbose'));
});

gulp.task("test", ["compile-tests"], function() {
    return gulp.src(FOLDER_TESTS + "/tests/**/*.js", { read: false })
        .pipe(mocha({
            reporter: 'progress',
            env: { 'NODE_ENV': 'test' }
        }));
});

gulp.task("compile-tests", ["clean-tests"], function () {
    return gulp.src([FOLDER_SRC + "/**/*.{ts,tsx}"])
        .pipe(ts(Object.assign(tsconfig.compilerOptions, { typescript: require("typescript") })))
        .pipe(gulp.dest("./temp"));
});

gulp.task("webserver", function() {
    return gulp.src(FOLDER_DIST)
        .pipe(webserver({
            livereload: false,
            directoryListing: false,
            open: true
        }));
});

gulp.task("clean-css", function(cb) {
    return del([FOLDER_CSS], cb);
});

gulp.task("clean-html", function(cb) {
    return del([FOLDER_DIST + "/*/**.html"], cb);
});

gulp.task("clean-scripts", function(cb) {
    return del([FOLDER_JS + "/**/*", "!" + FOLDER_JS_EXTERNAL, "!" + FOLDER_JS_EXTERNAL + "/**/*"], cb);
});

gulp.task("clean-external-scripts", function(cb) {
    return del([FOLDER_JS_EXTERNAL + "/**/*"], cb);
});

gulp.task("clean-tests", function(cb) {
    return del([FOLDER_TESTS], cb);
});

gulp.task("run", ["webserver"]);
gulp.task("default", ["html", "typescript", "external-scripts", "pure-css", "less"]);