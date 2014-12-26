/*
 * app config
 * 
 */

var grunt = require('grunt'),
    _ = grunt.util._,
    dig = require('../lib/digger.js'),
    extend = require('../lib/cloneextend.js'),
    path = require('path'),
    files = require('./files.js');

module.exports = (function(_, grunt) {
  // Project configuration.
  // 
  var outerApp = require( path.join(process.cwd(), 'engine', 'config', 'app') );

  var innerApp = {
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
        _.each(fileList.edirs, function(item){
          arr.push( {dest: path.join('<%= files.js.dest %>', item + '.min.js'), src: [ path.join('<%= files.js.src %>/', item, '*.js') ]} );
        });
        // sub source directory
        _.each(files.js.sub, function(item){
          arr.push({
            expand: true,
            cwd: path.join('<%= files.js.src %>', item),
            src: '*.js',
            dest: path.join('<%= files.js.dest %>', item),
            ext: '.min.js',
            filter: 'isFile'
          })
        });

        return arr      
        })(),
      },

    },

    // compile less to css
    less: {
      options: {
        compress: true,
        syncImport: false
      },
      main: {
        files: (function(){
          var arr = [{
            expand: true,
            cwd: '<%= files.less.src %>',
            src: ['*.less'],
            dest: '<%= files.less.dest %>',
            ext: '.less.min.css',
            filter: 'isFile'
          }];
          var fileList = files.less.sub ;
          _.each(fileList, function(item){
            arr.push({
              expand: true,
              cwd: path.join('<%= files.less.src %>', item),
              src: ['*.less'],
              dest: path.join('<%= files.less.dest %>', item),
              ext: '.less.min.css',
              filter: 'isFile'
            });
          });
          return arr
        })(),
      },
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
          _.each(fileList.edirs, function(item){
            arr.push( {dest: path.join('<%= files.css.dest %>', item + '.min.css'), src: [path.join('<%= files.css.src %>', item, '*.css')]} );
          });

          // sub source directory
          _.each(files.css.sub, function(item){
            arr.push({
              expand: true,
              cwd: path.join('<%= files.css.src %>', item),
              src: '*.css',
              dest: path.join('<%= files.css.dest %>', item),
              ext: '.min.css',
              filter: 'isFile'
            })
          });
          return arr
        })(),
      }
    },


    // clean dist/* 
    clean: {
      dist: {
        src: '<%= files.root.dest %>/*'
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
          _.each(fileList.edirs, function(item){
            arr.push( {dest: path.join('<%= files.js.dest %>', item + '.js'), src: [path.join('<%= files.js.src %>', item, '*.js')]} );
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
          _.each(fileList.edirs, function(item){
            arr.push( {dest: path.join('<%= files.css.dest %>', item + '.css'), src: [path.join('<%= files.css.src %>', item, '*.css')]} );
          });
          return arr
        })(),      
      },      
    },

    //  copy folder src/{js, css}/* ==>> dist/{js, css}/*
    copy: {
      css: {
        files: (function(){
          var arr = [{
            expand: true,
            cwd: '<%= files.css.src %>',
            src: ['*.css'],
            dest: '<%= files.css.dest %>',
            filter: 'isFile'
          }];
          var fileList = files.css.sub ;
          _.each(fileList, function(item){
            arr.push({
              expand: true,
              cwd: path.join('<%= files.css.src %>', item),
              src: ['*.css'],
              dest: path.join('<%= files.css.dest %>', item),
              filter: 'isFile'
            });
          });
          return arr
        })(),          
      },

      js: {
        files: (function(){
          var arr = [{
            expand: true,
            cwd: '<%= files.js.src %>',
            src: ['*.js'],
            dest: '<%= files.js.dest %>',
            filter: 'isFile'
          }];
          var fileList = files.js.sub ;
          _.each(fileList, function(item){
            arr.push({
              expand: true,
              cwd: path.join('<%= files.js.src %>', item),
              src: ['*.js'],
              dest: path.join('<%= files.js.dest %>', item),
              filter: 'isFile'
            });
          });
          return arr
        })(),          
      },
    
    },


    watch: {
      // watch javascript
      scripts: {
        files: ['<%= files.js.src %>/**/*.js'],
        tasks: ['jshint', 'uglify'],
        options: {
          spawn: false
        },
      },
      // watch css
      css: {
        files: ['<%= files.css.src %>/**/*.css'],
        tasks: ['cssmin'],
        options: {
          spawn: false
        },
      },
      less: {
        files: ['<%= files.less.src %>/**/*.less'],
        tasks: ['less'],
        options: {
          spawn: false
        },
      }       
    },  
  };

  var allApp = extend.extend(innerApp, outerApp);

  return allApp;
}(_, grunt));
