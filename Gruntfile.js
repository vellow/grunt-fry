var grunt = require('grunt'),
    _ = grunt.util._,
    path = require('path'),
    assetsFormat = require('./lib/assets.js');

module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // compress js
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
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
      dist: {
        files: (function(){
          var obj = {};
          var js = assetsFormat('src/js', {});
          _.each(js.files,function(item){
            var filename = path.basename(item,'.js');
            obj['dist/js/' + filename + '.min.js'] = ['src/js/' + filename + '.js'];
          });
          return obj;
        })()
      },
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
      conf: ['Gruntfile.js'],
      src: ['src/js/*.js'],
      dist: ['dist/js/*.js'],
    },

    // concat js, css
    concat: {
      options: {
        separator: ';',
      },
      js: {
        src: ['src/js/*.js'],
        dest: 'dist/<%= pkg.name %>.js',
      },
      css: {
        src: ['src/css/*.css'],
        dest: 'dist/<%= pkg.name %>.css',
      },
    },

    // compile less to css
    less: {
      development: {
        options: {      
          paths: ["src/less"]   
        },
        files: (function(){
          var obj = {};
          var less = assetsFormat('src/less', {});
          _.each(less.files,function(item){
            var filename = path.basename(item,'.less');
            obj['dist/css/' + filename + '.css'] = ['src/less/' + filename + '.less'];
          });
          return obj;
        })()       
      },
      production: {
        options: {
          paths: ['src/less'],
          compress: true
        },      
        files: {}
      }
    },

    // clean dist/* 
    clean: {
      dist: ['dist/*']
    },

    // watch less, js
    watch: {
      scripts: {
        files: ['src/js/**.js'],
        tasks: ['jshint', 'uglify'],
        options: {
          spawn: false,
        },
      },
      css: {
        files: 'src/less/*.less',
        tasks: ['less'],
        options: {
          livereload: true,
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



  // Default task(s).
  grunt.registerTask('default', ['uglify']);

  grunt.registerTask('build', ['clean', 'concat', 'less', 'uglify']);

  grunt.registerTask('dev', ['clean', 'less', 'uglify', 'watch']);

};
