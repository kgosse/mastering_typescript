var gulp = require("gulp");
var mocha = require("gulp-spawn-mocha");
var del = require("del");
var merge = require("merge2");
var sourcemaps = require("gulp-sourcemaps");
var ts = require("gulp-typescript");
var tslint = require("gulp-tslint");
var header = require("gulp-header");
var exec = require("child_process").exec;
var serverBridge = require("server-bridge");
var fs = require("fs");
var path = require("path");

var FOLDER_SERVER  = "./../web-app/src/scripts/server";
var FOLDER_TYPINGS = "./typings";
var FOLDER_SRC     = "./src";
var FOLDER_DIST    = "./dist";
var FOLDER_TESTS   = "./dist/tests";

gulp.task("copy-server-files", ["generate-client-side-code"], function() {
    return gulp.src(["./src/models/**/*.ts"])
        .pipe(header("// do not edit - file copied from server-app" + require("os").EOL))
        .pipe(gulp.dest(FOLDER_SERVER));
});

gulp.task("generate-client-side-code", ["clean-server"], function(cb) {
    var filesToGenerateCodeFrom = [
        "./src/routes/food-item-routes.ts",
        "./src/routes/order-routes.ts"
    ];
    var code = serverBridge.getGeneratedCode({
        classMapping: {
            "FoodItemRoutes": "ServerFoodItems",
            "OrderRoutes": "ServerOrders"
        },
        importMapping: {
            "FoodItem": "./food-item",
            "Order": "./order"
        }
    }, filesToGenerateCodeFrom);

    fs.writeFile(path.join(__dirname, FOLDER_SERVER, "server.ts"), code, function(err) {
        if (err) throw err;
        cb();
    });
});

gulp.task("typescript", ["clean"], function() {
    var tsProject = ts.createProject("tsconfig.json", {
        typescript: require("typescript")
    });

    var tsResult = gulp.src([FOLDER_TYPINGS + "/**/*.d.ts", FOLDER_SRC + "/**/*.ts"])
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject));

    return merge([
        tsResult.dts.pipe(gulp.dest(FOLDER_DIST)),
        tsResult.js.pipe(sourcemaps.write("./")).pipe(gulp.dest(FOLDER_DIST))
    ]);
});

gulp.task("initialize-default-database-files", ["typescript"], function() {
    return gulp.src(["./resources/*.db"])
        .pipe(gulp.dest(FOLDER_DIST + "/storage/data"));
});

gulp.task("tslint", function() {
    return gulp.src([FOLDER_SRC + "/**/*.ts"])
        .pipe(tslint())
        .pipe(tslint.report("verbose"));
});

gulp.task("test", ["typescript"], function() {
    return gulp.src(FOLDER_TESTS + "/**/*.js", { read: false })
        .pipe(mocha({
            reporter: "progress",
            env: { "NODE_ENV": "test" }
        }));
});

gulp.task("start-server", function(cb) {
    exec("node dist/app.js", function(err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task("clean-server", function (cb) {
    return del([FOLDER_SERVER + "/**/*"], { force: true }, cb);
});

gulp.task("clean", function (cb) {
    return del([FOLDER_DIST + "/**/*"], cb);
});

gulp.task("default", ["typescript", "initialize-default-database-files"]);
