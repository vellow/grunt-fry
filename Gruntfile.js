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
    dig = require('./lib/digger.js');

var sysConf = {
      dist_dir: 'dist',
      dist_css: 'dist/css',
      dist_img: 'dist/img',
      dist_js: 'dist/js',
      src_dir: 'src',
      src_css: 'src/css',
      src_img: 'src/img',
      src_less: 'src/less',
      src_js: 'src/js',
    };

module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sysConf: sysConf,
    // compress js
    uglify: {
      main: {
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
        files: [{
          expand: true,
          cwd: 'dist',
          src: '**/*.js',
          dest: 'dist',
          ext: '.min.js',
          filter: 'isFile'
        }]
      }
    },

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
      all: {
        src: ['<%= sysConf.src_js %>/**/*.js']
      },
    },


    //  concat folder 'src/css/a'::{'a1.css', 'a2.css'} ==>> 'src/output.css'
    concat: {
      js: {
        options: {
          separator: '\n;'
        },
        files: (function(){
          var arr = [];
          var fileList = dig( sysConf.src_js );
          _.each(fileList.dirs, function(item){
            arr.push( {dest: '<%= sysConf.dist_js %>/' + item + '.js', src: ['<%= sysConf.src_js %>/' + item + '/*.js']} );
          });
          return arr
        })(),
      },
      css: {
        options: {
          separator: '\n'
        },
        files: (function(){
          var arr = [];
          var fileList = dig( sysConf.src_css );
          _.each(fileList.dirs, function(item){
            arr.push( {dest: '<%= sysConf.dist_css %>/' + item + '.css', src: ['<%= sysConf.src_css %>/' + item + '/*.css']} );
          });
          return arr
        })(),      
      },      
    },

    copy: {
      css: {
        files: [
          // copy src/css/*.css ==> dist/css/
          {
            expand: true,
            cwd: '<%= sysConf.src_css %>',
            src: ['*.css'],
            dest: '<%= sysConf.dist_css %>/',
            filter: 'isFile'
          }
        ],
      },
      js: {
        files: [
          // copy src/js/*.js ==> dist/js/
          {
            expand: true,
            cwd: '<%= sysConf.src_js %>',
            src: ['*.js'],
            dest: '<%= sysConf.dist_js %>/',
            filter: 'isFile'
          }
        ],
      },
      img: {
        files: [
          // copy src/img/* ==> dist/img/
          {
            expand: true,
            cwd: '<%= sysConf.src_img %>',
            src: ['*'],
            dest: '<%= sysConf.dist_img %>/',
            filter: 'isFile'
          },

        ],
      },
    },
    // compile less to css
    less: {
      main: {
        files: [{
          expand: true,
          cwd: '<%= sysConf.src_less %>',
          src: ['*.less'],
          dest: '<%= sysConf.dist_css %>/',
          ext: '.less.css',
          filter: 'isFile'
        }]
      },
      sub: {
        files: (function(){
          var arr = [];
          var fileList = dig( sysConf.src_less );
          _.each(fileList.dirs, function(item){
            arr.push( {dest: '<%= sysConf.dist_css %>/' + item + '.less.css', src: ['<%= sysConf.src_less %>/' + item + '/*.less']} );
          });
          return arr
        })(),
      }
    },

    // clean dist/* 
    clean: {
      dist: ['dist/*']
    },

    cssmin: {
      my_target: {
        files: [{
          expand: true,
          cwd: 'dist',
          src: ['**/*.css', '!*.min.css'],
          dest: 'dist',
          ext: '.min.css'
        }]
      }
    },

    imagemin: {                          
      dynamic: {                         
        options: {                       // Target options
          optimizationLevel: 3,
          svgoPlugins: [{ removeViewBox: false }],
          // use: [mozjpeg()]
        },
        files: [{
          expand: true,                  // Enable dynamic expansion
          cwd: 'src/',                   // Src matches are relative to this path
          src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
          dest: 'dist/'                  // Destination path prefix
        }]
      }
    },
    // watch less, js
    watch: {
      scripts: {
        files: ['<%= sysConf.src_js %>/**/*.js'],
        tasks: ['newer:jshint', 'newer:copy:js', 'newer:concat:js', 'newer:uglify'],
        options: {
          spawn: false,
          livereload: true,
        },
      },
      css: {
        files: ['<%= sysConf.src_css %>/**/*.css'],
        tasks: ['newer:copy:css', 'newer:concat:css'],
        options: {
          spawn: false,
        },
      },
      less: {
        files: ['<%= sysConf.src_less %>/**/*.less'],
        tasks: ['newer:less'],
        options: {
          spawn: false,
        },
      },       
    },  
});

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-newer');

  // Default task(s).
  grunt.registerTask('default', ['concat']);
  grunt.registerTask('run', ['clean', 'copy', 'concat', 'less', 'uglify']);
  grunt.registerTask('dev', ['clean', 'less', 'uglify', 'watch']);
  grunt.registerTask('nless', ['new:less']);

};
