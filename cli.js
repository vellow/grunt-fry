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


colors.setTheme({silly:"rainbow",input:'grey',verbose:'cyan',prompt:'grey',info:'green',data:'grey',help:'cyan',warn:'yellow',debug:'blue',error:'red'});


Fry.command('new')
   .description(' - 新建一个项目,需要参数为新项目名称')
   .action(createProject);


Fry.command('build')
   .description(" - 打包压缩所有文件到 /dist 文件夹")
   .action(function () {
     cli.tasks = ["build"];
     grunt.cli();
   });


Fry.command('*')
   .description('分开执行内部定义的grunt命令')
   .action(function(){
     cli.tasks = grunt.util._(arguments).chain().toArray().initial().value();
     grunt.cli();
   });


Fry.version(require('./package').version);
Fry.parse(process.argv);

