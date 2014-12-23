module.exports = function(grunt) {

    grunt.registerTask("configure", "初始化grunt配置", function() {

        var app = require("../config/app");
        var watch = require("../config/watch");
        grunt.initConfig(app);
        grunt.event.on('watch', watch());
    });
};