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
    dig = require('./lib/digger.js'),
    sysConf = require('./config/files.js');

module.exports = (function(_, grunt) {
  // Project configuration.
  return _({
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
        src: ['<%= sysConf.js.src %>/**/*.js']
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
          cwd: '<%= sysConf.js.src %>',
          src: '*.js',
          dest: '<%= sysConf.js.dest %>',
          ext: '.min.js',
          filter: 'isFile'
        }];
        var fileList = dig( sysConf.js.src );
        _.each(fileList.dirs, function(item){
          arr.push( {dest: '<%= sysConf.js.dest %>/' + item + '.min.js', src: ['<%= sysConf.js.src %>/' + item + '/*.js']} );
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
            cwd: '<%= sysConf.less.src %>',
            src: ['*.less'],
            dest: '<%= sysConf.less.dest %>/',
            ext: '.less.css',
            filter: 'isFile'
          }];
          var fileList = dig( sysConf.less.src );
          _.each(fileList.dirs, function(item){
            arr.push( {dest: '<%= sysConf.css.dest %>/' + item + '.less.min.css', src: ['<%= sysConf.less.src %>/' + item + '/*.less']} );
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
            cwd: '<%= sysConf.css.src %>',
            src: ['*.css'],
            dest: '<%= sysConf.css.dest %>',
            ext: '.min.css',
            filter: 'isFile'
          }];
          var fileList = dig( sysConf.less.src );
          _.each(fileList.dirs, function(item){
            arr.push( {dest: '<%= sysConf.css.dest %>/' + item + '.min.css', src: ['<%= sysConf.css.src %>/' + item + '/*.css']} );
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
          cwd: '<%= sysConf.img.src %>',                   // Src matches are relative to this path
          src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
          dest: '<%= sysConf.img.dest %>'                  // Destination path prefix
        }]
      }
    },

    // clean dist/* 
    clean: {
      dist: ['<%= sysConf.root.dest %>/*']
    },


    //  concat folder src/css/a/{'a1.css', 'a2.css'} ==>> 'src/css/output.css'
    concat: {
      js: {
        options: {
          separator: '\n;'
        },
        files: (function(){
          var arr = [];
          var fileList = dig( sysConf.js.src );
          _.each(fileList.dirs, function(item){
            arr.push( {dest: '<%= sysConf.js.dest %>/' + item + '.js', src: ['<%= sysConf.js.src %>/' + item + '/*.js']} );
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
          var fileList = dig( sysConf.css.src );
          _.each(fileList.dirs, function(item){
            arr.push( {dest: '<%= sysConf.css.dest %>/' + item + '.css', src: ['<%= sysConf.css.src %>/' + item + '/*.css']} );
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
            cwd: '<%= sysConf.css.src %>',
            src: ['*.css'],
            dest: '<%= sysConf.css.dest %>/',
            filter: 'isFile'
          }
        ],
      },
      js: {
        files: [
          // copy src/js/*.js ==> dist/js/
          {
            expand: true,
            cwd: '<%= sysConf.js.src %>',
            src: ['*.js'],
            dest: '<%= sysConf.js.dest %>/',
            filter: 'isFile'
          }
        ],
      },
      img: {
        files: [
          // copy src/img/* ==> dist/img/
          {
            expand: true,
            cwd: '<%= sysConf.img.src %>',
            src: ['*'],
            dest: '<%= sysConf.img.dest %>/',
            filter: 'isFile'
          },

        ],
      },
    },

    watch: {
      // watch javascript
      scripts: {
        files: ['<%= sysConf.js.src %>/**/*.js'],
        tasks: ['jshint', 'uglify'],
        options: {
          spawn: false,
          livereload: true,
        },
      },
      // watch css
      css: {
        files: ['<%= sysConf.css.src %>/**/*.css'],
        tasks: ['cssmin'],
        options: {
          spawn: false,
          livereload: true,
        },
      },
      less: {
        files: ['<%= sysConf.less.src %>/**/*.less'],
        tasks: ['less'],
        options: {
          spawn: false,
          livereload: true,
        },
      },
      images: {
        files: ['<%= sysConf.img.src %>/**/*'],
        tasks: ['imagemin'],
        options: {
          spawn: false,
          livereload: true,
        },
      }       
    },  
  });

  // grunt.event.on('watch', function(action, filepath, target) {
  //   grunt.log.writeln(target + ': ' + filepath + ' has ' + action);

  //   /* watch less */
  //   if(target === 'less'){
  //     // {{sysConf.less.src}}/a/footer.css ==>> a/footer.css
  //     var filename = filepath.replace(sysConf.less.src + '/', '');
  //     var isRootFile = path.dirname(filename) === '.';
  //     var conf;
  //     if( isRootFile ) {
  //       conf = [{
  //               expand: true,
  //               cwd: '<%= sysConf.less.src %>',
  //               src: [filename],
  //               dest: '<%= sysConf.css.dest %>',
  //               ext: '.less.min.css',
  //               filter: 'isFile'
  //         }];
  //     } else {
  //       var dirname = path.dirname(filename);
  //       conf = [{
  //                 src: '<%= sysConf.less.src %>/' + dirname + '/*.less',
  //                 dest: '<%= sysConf.css.dest %>/' + dirname + '.less.min.css',
  //           }];
  //     }

  //     grunt.config(['less', 'main', 'files'], conf);
  //   /* watch javascripts */    
  //   } else if(target === 'scripts'){
  //     // jshint
  //     grunt.config(['jshint', 'main'], {
  //             src: [filepath],   
  //       });
  //     // copy src/js/*.js to dist/
  //     var filename = filepath.replace(sysConf.js.src + '/', '');
  //     var isRootFile = path.dirname(filename) === '.';
  //     var conf;
  //     if( isRootFile ){
  //       conf = [{
  //         expand: true,
  //         cwd: '<%= sysConf.js.src %>',
  //         src: [filename],
  //         dest: '<%= sysConf.js.dest %>',
  //         ext: '.min.js',
  //         filter: 'isFile'              
  //       }];
  //     } else {
  //       var dirname = path.dirname(filename);
  //       conf = [{
  //         src: ['<%= sysConf.js.src %>/' + dirname +'/*.js'],
  //         dest: '<%= sysConf.js.dest %>/' + dirname +'.min.js',      
  //       }]
  //     }
  //     grunt.config(['uglify', 'main', 'files'], conf); 

  //   // watch css
  //   } else if (target === 'css') {
  //     var filename = filepath.replace(sysConf.css.src + '/', '');
  //     var isRootFile = path.dirname(filename) === '.';
  //     var conf;
  //     if( isRootFile ){
  //       conf = [{
  //         expand: true,
  //         cwd: '<%= sysConf.css.src %>',
  //         src: [filename],
  //         dest: '<%= sysConf.css.dest %>',
  //         ext: '.min.css',
  //         filter: 'isFile'      
  //       }];
  //     } else {
  //       var dirname = path.dirname(filename);
  //       conf = [{
  //         src: ['<%= sysConf.css.src %>/' + dirname +'/*.css'],
  //         dest: '<%= sysConf.css.dest %>/' + dirname +'.min.css',      
  //       }]        
  //     }

  //     grunt.config(['cssmin', 'css', 'files'], conf);
 
  //   } else if (target === 'images') {
  //     var filename = filepath.replace(sysConf.img.src + '/', '');
  //     var conf = [{
  //         expand: true,                  
  //         cwd: '<%= sysConf.img.src %>',                   
  //         src: [filename],   
  //         dest: '<%= sysConf.img.dest %>'               
  //       }];
  //     grunt.config(['imagemin', 'main', 'files'], conf);
  //   };
  // });

  // Default task(s).
  // grunt.registerTask('default', ['concat']);
  // grunt.registerTask('run', ['clean', 'copy', 'concat', 'less', 'uglify']);
  // grunt.registerTask('dev', ['clean', 'less', 'uglify', 'watch']);


}(_, grunt));
