module.exports = function(grunt) {
  grunt.registerTask("uglifi", "定制 uglify 命令行参数", function(arg) {    

    grunt.log.writeln('运行 uglify 命令集合'.warn);

    if(arg){
        console.log(arg);
    }

    grunt.task.run('uglify');
  });
};
