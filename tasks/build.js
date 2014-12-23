module.exports = function(grunt) {
  grunt.registerTask("build", "注册build命令集合", function(type) {    
    var cmd = require('../config/cmd');

    grunt.log.writeln('运行build命令集合'.warn);

    grunt.task.run(cmd.build);
  });
};
