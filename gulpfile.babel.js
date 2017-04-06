'use strict';

import gulp             from 'gulp';
import sass             from 'gulp-sass';
import autoprefixer     from 'gulp-autoprefixer';
import uglify           from 'gulp-uglify';
import jshint           from 'gulp-jshint';
import cssnano          from 'gulp-cssnano';
import babel            from 'gulp-babel';
import concat           from 'gulp-concat';
import imagemin         from 'gulp-imagemin';
import cmq              from 'gulp-combine-mq';
import rename           from 'gulp-rename';
import add              from 'gulp-add-src';


const dirs = {
        src:    './resources/assets',
        build:  '.'
    },

    styles = {
        src:    `${dirs.src}/sass`,
        build:  `${dirs.build}/styles`
    },

    scripts = {
        src:    `${dirs.src}/scripts`,
        build:  `${dirs.build}/scripts`
    },

    images = {
      src:    `${dirs.src}/images`,
      build:  `${dirs.build}/images`
    };



/*
 *  CSS task
 */
gulp.task('styles', function () {

    console.log('starting task: [styles]');

    gulp.src(`${styles.src}/app.scss`)
        .pipe(sass({errLogToConsole: true}))
        .pipe(autoprefixer('last 8 version'))
        .pipe(cmq())
        .pipe(gulp.dest(styles.build))
        .pipe(cssnano())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(styles.build));
});

/*
 *  JS task
 */
gulp.task('scripts',function(){

    console.log('starting task: [scripts]');

    // Custom JS
    gulp.src([
        `${scripts.src}/polyfills/*.js`,
        `${scripts.src}/libs/jquery-3.1.1.min.js`,
        `${scripts.src}/libs/tween-max.js`,
        `${scripts.src}/libs/morph.js`,
        `${scripts.src}/libs/scroll-to.js`,
        `${scripts.src}/libs/picture-fill.js`,
        `${scripts.src}/modules/*.js`,
        `${scripts.src}/app.js`
        ])
        .pipe(babel({presets: ['es2015']}))
        .pipe(add.prepend(`${scripts.src}/libs/ajax.js`))
        .pipe(add.append(`${scripts.src}/libs/ScrollMagic.min.js`))
        .pipe(add.append(`${scripts.src}/libs/animation.gsap.min.js`))
        .pipe(concat('app.js'))
        //.pipe(jshint('.jshintrc'))
        //.pipe(jshint.reporter('default'))
        .pipe(gulp.dest(scripts.build))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(scripts.build));

});

/*
 *  WATCH tasks to serve up
 */
gulp.task('watch', ['styles'], function () {
    gulp.watch(`${styles.src}/**/*.scss`, ['styles']);
  //gulp.watch(`${scripts.src}/**/*.js`, ['scripts']);
});


/*
 *  DEFAULT tasks to serve up
 */
gulp.task('default', ['styles', 'scripts']);
