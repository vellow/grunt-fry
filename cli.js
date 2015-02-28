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

Fry.command('help')
  .description(' - 帮助 ')
  .action(function(){
    grunt.log.writeln('\n--------- Fry 参数说明 ---------\n'.info);
    grunt.log.writeln('new <项目名称>'.verbose);
    grunt.log.writeln('新建一个项目\n'.yellow);
    grunt.log.writeln('build'.verbose);
    grunt.log.writeln('编译打包到发布目录\n'.yellow);
    grunt.log.writeln('watch'.verbose);
    grunt.log.writeln('实时增量编译文件\n'.yellow);
  });

Fry.command('new')
  .description(' - 新建一个项目,需要参数为新项目名称')
  .action(createProject);

Fry.command('*')
  .description(' - 内部定义的grunt命令 \n' +
    'less    - 链接编译压缩less 文件\n' +
    'uglify  - 链接压缩js 文件\n' +
    'jshint  - 检查js 文件\n' +
    'cssmin  - 链接压缩css 文件\n' +
    'concat  - 链接css js 至发布目录\n' +
    'copy    - 复制css js 至发布目录\n' +
    'clean   - 清空发布目录\n'
    )
  .action(function() {
    cli.tasks = grunt.util._(arguments).chain().toArray().initial().value();
    grunt.cli();
  });

Fry.version(require('./package').version);
Fry.parse(process.argv);