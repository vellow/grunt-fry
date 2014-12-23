#!/usr/bin/env node

/*
 * Data: 2014-11-24
 * It's distributed under the MIT license(http://mit-license.org).
 */

var Fry = require('./lib/commander'),
  createProject = require('./lib/createProject'),
  colors = require('colors'),
  grunt = require('grunt'),
  cli = require('grunt/lib/grunt/cli');


colors.setTheme({
  silly: "rainbow",
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  yellow: 'yellow',
  debug: 'blue',
  red: 'red',
  error: 'red'
});


Fry.command('new')
  .description(' - 新建一个项目,需要参数为新项目名称')
  .action(createProject);

Fry.command('help')
  .description(' Grunt Fry 帮助 ')
  .action(function(){
    grunt.log.writeln('\n--------- Fry 参数说明 ---------\n'.info);
    grunt.log.writeln('new <项目名称>'.verbose);
    grunt.log.writeln('新建一个项目\n'.yellow);
    grunt.log.writeln('build'.verbose);
    grunt.log.writeln('编译打包到发布目录\n'.yellow);
    grunt.log.writeln('watch'.verbose);
    grunt.log.writeln('实时增量编译文件\n'.yellow);
  });

Fry.command('*')
  .description('分开执行内部定义的grunt命令')
  .action(function() {
    cli.tasks = grunt.util._(arguments).chain().toArray().initial().value();
    grunt.cli();
  });

Fry.version(require('./package').version);
Fry.parse(process.argv);