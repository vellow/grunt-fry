/*
 * copy :: src/js/*.js ==> dist/js/  && css
 * concat :: 'src/js/a/{'a1.js', 'a2.js'} ==>> 'dist/js/a.js'  && css
 * cssmin  css
 * uglify  js
 * 
 */

var grunt = require('grunt'),
    _ = grunt.util._,
    path = require('path'),
    dig = require('../lib/digger.js'),
    files = require('./files.js');

module.exports = (function(_, grunt) {
  // Project configuration.
  return {
    pkg: grunt.file.readJSON('package.json'),

    files: files,

    // js hint
    jshint: {
      options: {
        force: true,
        undef: false,
        unused: false,
        // ignore "^ Unnecessary semicolon"
        // '-W032': false,
        asi: true,
        // ignore "console undefined"
        devel: ['console'],

      },
      main: {
        src: ['<%= files.js.src %>/**/*.js']
      },
    },

    // compress js
    uglify: {
      options: {
        banner: '/*uglify*/',
        sourceMap: true,
        compress:{
          sequences     : true,  // join consecutive statemets with the “comma operator”
          properties    : true,  // optimize property access: a["foo"] → a.foo
          dead_code     : true,  // discard unreachable code
          drop_debugger : true,  // discard “debugger” statements
          unsafe        : false, // some unsafe optimizations (see below)
          conditionals  : true,  // optimize if-s and conditional expressions
          comparisons   : true,  // optimize comparisons
          evaluate      : true,  // evaluate constant expressions
          booleans      : true,  // optimize boolean expressions
          loops         : true,  // optimize loops
          unused        : false,  // drop unused variables/functions
          hoist_funs    : true,  // hoist function declarations
          hoist_vars    : false, // hoist variable declarations
          if_return     : true,  // optimize if-s followed by return/continue
          join_vars     : true,  // join var declarations
          cascade       : true,  // try to cascade `right` into `left` in sequences
          side_effects  : true,  // drop side-effect-free statements
          warnings      : true,  // warn about potentially dangerous optimizations/code
          global_defs   : {}     // global definitions
        }
      },
      main: {
        files: (function(){
          var arr = [{
          expand: true,
          cwd: '<%= files.js.src %>',
          src: '*.js',
          dest: '<%= files.js.dest %>',
          ext: '.min.js',
          filter: 'isFile'
        }];
        var fileList = dig( files.js.src );
        _.each(fileList.dirs, function(item){
          arr.push( {dest: '<%= files.js.dest %>/' + item + '.min.js', src: ['<%= files.js.src %>/' + item + '/*.js']} );
        });
        return arr      
        })(),
      },
    },

    // compile less to css
    less: {
      options: {
        compress: true,
      },
      main: {
        files: (function(){
          var arr = [{
            expand: true,
            cwd: '<%= files.less.src %>',
            src: ['*.less'],
            dest: '<%= files.less.dest %>/',
            ext: '.less.css',
            filter: 'isFile'
          }];
          var fileList = dig( files.less.src );
          _.each(fileList.dirs, function(item){
            arr.push( {dest: '<%= files.css.dest %>/' + item + '.less.min.css', src: ['<%= files.less.src %>/' + item + '/*.less']} );
          });
          return arr
        })(),
      }
    },

    cssmin: {
      main: {
        files: (function(){
          var arr = [{
            expand: true,
            cwd: '<%= files.css.src %>',
            src: ['*.css'],
            dest: '<%= files.css.dest %>',
            ext: '.min.css',
            filter: 'isFile'
          }];
          var fileList = dig( files.css.src );
          _.each(fileList.dirs, function(item){
            arr.push( {dest: '<%= files.css.dest %>/' + item + '.min.css', src: ['<%= files.css.src %>/' + item + '/*.css']} );
          });
          return arr
        })(),
      }
    },

    // imagemin: {                          
    //   options: {                       // Target options
    //     optimizationLevel: 3,
    //     svgoPlugins: [{ removeViewBox: false }],
    //     // use: [mozjpeg()]
    //   },
    //   main: {                         
    //     files: [{
    //       expand: true,                  // Enable dynamic expansion
    //       cwd: '<%= files.img.src %>',                   // Src matches are relative to this path
    //       src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
    //       dest: '<%= files.img.dest %>'                  // Destination path prefix
    //     }]
    //   }
    // },

    // clean dist/* 
    clean: {
      dist: {
        src: '<%= files.root.dest %>'
      },
    },


    //  concat folder src/css/a/{'a1.css', 'a2.css'} ==>> 'src/css/output.css'
    concat: {
      js: {
        options: {
          separator: '\n;'
        },
        files: (function(){
          var arr = [];
          var fileList = dig( files.js.src );
          _.each(fileList.dirs, function(item){
            arr.push( {dest: '<%= files.js.dest %>/' + item + '.js', src: ['<%= files.js.src %>/' + item + '/*.js']} );
          });
          return arr
          })(),          
      },

      // css sub
      css: {
        options: {
          separator: '\n'
        },
        files: (function(){
          var arr = [];
          var fileList = dig( files.css.src );
          _.each(fileList.dirs, function(item){
            arr.push( {dest: '<%= files.css.dest %>/' + item + '.css', src: ['<%= files.css.src %>/' + item + '/*.css']} );
          });
          return arr
        })(),      
      },      
    },

    watch: {
      // watch javascript
      scripts: {
        files: ['<%= files.js.src %>/**/*.js'],
        tasks: ['uglify'],
        options: {
          spawn: false
        },
      },
      // watch css
      // css: {
      //   files: ['<%= files.css.src %>/**/*.css'],
      //   tasks: ['cssmin'],
      //   options: {
      //     spawn: false,
      //     livereload: true,
      //   },
      // },
      less: {
        files: ['<%= files.less.src %>/**/*.less'],
        tasks: ['less'],
        options: {
          spawn: false
        },
      }       
    },  
  };

}(_, grunt));
