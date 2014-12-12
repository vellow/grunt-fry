module.exports = {
  run: function(grunt) {
    grunt.loadTasks('engine/tasks');
    grunt.loadNpmTasks('grunt-fry');
    grunt.task.run('configure');
  }
};