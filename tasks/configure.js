module.exports = function(grunt) {

  var application = require('grunt-fry').config.app;

  grunt.registerTask("configure", "扩展配置文件, 初始化grunt配置", function() {
    grunt.initConfig(app);
  });
};
