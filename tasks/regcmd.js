// 注册cmd 命令集合
module.exports = function(grunt) {
  var cmds = require('../config/cmd');
  grunt.util._.forIn(cmds, function(value, key){
    (function(cmdName){
      grunt.registerTask(cmdName, "注册" + cmdName + "命令集合", function(type) {    
        grunt.log.writeln(("运行" + cmdName + "命令集合").warn);
        grunt.task.run(cmds[cmdName]);
      });
    })(key)
  })
  
};
