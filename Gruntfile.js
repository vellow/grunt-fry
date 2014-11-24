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
        src: ['<%= sysConf.src_js %>/**/*.js']
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
          cwd: '<%= sysConf.src_js %>',
          src: '*.js',
          dest: '<%= sysConf.dist_js %>',
          ext: '.min.js',
          filter: 'isFile'
        }];
        var fileList = dig( sysConf.src_js );
        _.each(fileList.dirs, function(item){
          arr.push( {dest: '<%= sysConf.dist_js %>/' + item + '.min.js', src: ['<%= sysConf.src_js %>/' + item + '/*.js']} );
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
            cwd: '<%= sysConf.src_less %>',
            src: ['*.less'],
            dest: '<%= sysConf.dist_css %>/',
            ext: '.less.css',
            filter: 'isFile'
          }];
          var fileList = dig( sysConf.src_less );
          _.each(fileList.dirs, function(item){
            arr.push( {dest: '<%= sysConf.dist_css %>/' + item + '.less.min.css', src: ['<%= sysConf.src_less %>/' + item + '/*.less']} );
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
            cwd: '<%= sysConf.src_css %>',
            src: ['*.css'],
            dest: '<%= sysConf.dist_css %>',
            ext: '.min.css',
            filter: 'isFile'
          }];
          var fileList = dig( sysConf.src_less );
          _.each(fileList.dirs, function(item){
            arr.push( {dest: '<%= sysConf.dist_css %>/' + item + '.min.css', src: ['<%= sysConf.src_css %>/' + item + '/*.css']} );
          });
          return arr
        })(),
      }
    },

    imagemin: {                          
      options: {                       // Target options
        optimizationLevel: 3,
        svgoPlugins: [{ removeViewBox: false }],
        // use: [mozjpeg()]
      },
      main: {                         
        files: [{
          expand: true,                  // Enable dynamic expansion
          cwd: '<%= sysConf.src_img %>',                   // Src matches are relative to this path
          src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
          dest: '<%= sysConf.dist_img %>'                  // Destination path prefix
        }]
      }
    },

    // clean dist/* 
    clean: {
      dist: ['<%= sysConf.dist_dir %>/*']
    },


    //  concat folder src/css/a/{'a1.css', 'a2.css'} ==>> 'src/css/output.css'
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

      // css sub
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

    watch: {
      // watch javascript
      scripts: {
        files: ['<%= sysConf.src_js %>/**/*.js'],
        tasks: ['jshint', 'uglify'],
        options: {
          spawn: false,
          livereload: true,
        },
      },
      // watch css
      css: {
        files: ['<%= sysConf.src_css %>/**/*.css'],
        tasks: ['cssmin'],
        options: {
          spawn: false,
          livereload: true,
        },
      },
      less: {
        files: ['<%= sysConf.src_less %>/**/*.less'],
        tasks: ['less'],
        options: {
          spawn: false,
          livereload: true,
        },
      },
      images: {
        files: ['<%= sysConf.src_img %>/**/*'],
        tasks: ['imagemin'],
        options: {
          spawn: false,
          livereload: true,
        },
      }       
    },  
  });

  grunt.event.on('watch', function(action, filepath, target) {
    grunt.log.writeln(target + ': ' + filepath + ' has ' + action);

    /* watch less */
    if(target === 'less'){
      // {{sysConf.src_less}}/a/footer.css ==>> a/footer.css
      var filename = filepath.replace(sysConf.src_less + '/', '');
      var isRootFile = path.dirname(filename) === '.';
      var conf;
      if( isRootFile ) {
        conf = [{
                expand: true,
                cwd: '<%= sysConf.src_less %>',
                src: [filename],
                dest: '<%= sysConf.dist_css %>',
                ext: '.less.min.css',
                filter: 'isFile'
          }];
      } else {
        var dirname = path.dirname(filename);
        conf = [{
                  src: '<%= sysConf.src_less %>/' + dirname + '/*.less',
                  dest: '<%= sysConf.dist_css %>/' + dirname + '.less.min.css',
            }];
      }

      grunt.config(['less', 'main', 'files'], conf);
    /* watch javascripts */    
    } else if(target === 'scripts'){
      // jshint
      grunt.config(['jshint', 'main'], {
              src: [filepath],   
        });
      // copy src/js/*.js to dist/
      var filename = filepath.replace(sysConf.src_js + '/', '');
      var isRootFile = path.dirname(filename) === '.';
      var conf;
      if( isRootFile ){
        conf = [{
          expand: true,
          cwd: '<%= sysConf.src_js %>',
          src: [filename],
          dest: '<%= sysConf.dist_js %>',
          ext: '.min.js',
          filter: 'isFile'              
        }];
      } else {
        var dirname = path.dirname(filename);
        conf = [{
          src: ['<%= sysConf.src_js %>/' + dirname +'/*.js'],
          dest: '<%= sysConf.dist_js %>/' + dirname +'.min.js',      
        }]
      }
      grunt.config(['uglify', 'main', 'files'], conf); 

    // watch css
    } else if (target === 'css') {
      var filename = filepath.replace(sysConf.src_css + '/', '');
      var isRootFile = path.dirname(filename) === '.';
      var conf;
      if( isRootFile ){
        conf = [{
          expand: true,
          cwd: '<%= sysConf.src_css %>',
          src: [filename],
          dest: '<%= sysConf.dist_css %>',
          ext: '.min.css',
          filter: 'isFile'      
        }];
      } else {
        var dirname = path.dirname(filename);
        conf = [{
          src: ['<%= sysConf.src_css %>/' + dirname +'/*.css'],
          dest: '<%= sysConf.dist_css %>/' + dirname +'.min.css',      
        }]        
      }

      grunt.config(['cssmin', 'css', 'files'], conf);
 
    } else if (target === 'images') {
      var filename = filepath.replace(sysConf.src_img + '/', '');
      var conf = [{
          expand: true,                  
          cwd: '<%= sysConf.src_img %>',                   
          src: [filename],   
          dest: '<%= sysConf.dist_img %>'               
        }];
      grunt.config(['imagemin', 'main', 'files'], conf);
    };
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

  // Default task(s).
  grunt.registerTask('default', ['concat']);
  grunt.registerTask('run', ['clean', 'copy', 'concat', 'less', 'uglify']);
  grunt.registerTask('dev', ['clean', 'less', 'uglify', 'watch']);


};
