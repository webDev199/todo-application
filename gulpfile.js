var gulp = require('gulp');
const { series } = require('gulp');
const concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass')(require('sass'));

function styles() {
	console.log('starting styles task');
	return gulp.src('./src/styles/main.scss')
		.pipe(plumber(function (err) {
			console.log('Styles task error');
			console.log(err);
			this.emit('end');
		}))
		.pipe(sourcemaps.init())
		.pipe(autoprefixer())
		.pipe(sass({
			outputStyle: 'expanded'
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./dist/css'))
}

function minifyCss(done) {
	gulp.src('./src/styles/main.scss')
		.pipe(autoprefixer())
		.pipe(sass({
			errLogToConsole: true,
			outputStyle: 'compressed',
		}))
		.pipe(concat('./css/styles.min.css'))
		.pipe(gulp.dest('./dist'))
	done();
}

const watchChanges = function (done) {
	console.log('Starting watch task');
	gulp.watch('./src/**/*.scss', styles);
	gulp.watch('./src/**/*.scss', minifyCss);
}

exports.default = series(styles, minifyCss, watchChanges);

