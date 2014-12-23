var path =  require('path');

module.exports = function(grunt) {
  // load build-in npm tasks
  var npmTasks = [
             "grunt-contrib-clean",
             "grunt-contrib-concat",
             "grunt-contrib-jshint",
             "grunt-contrib-less",
             "grunt-contrib-uglify",
             "grunt-contrib-watch",
             "grunt-contrib-cssmin"
  ];
  grunt.util._(npmTasks).each(function(module) {
    grunt.loadNpmTasks(path.join( "grunt-fry", "node_modules", module) );
  });

  // load custom install npm tasks
  var exNpmTasks = require( path.join(process.cwd(), 'engine', 'config', 'npmtasks') );
  grunt.util._(exNpmTasks).each(function(module) {
    grunt.loadNpmTasks( module );
  });

};
