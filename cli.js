#!/usr/bin/env node
/*
 * Data: 2014-11-24
 * It's distributed under the MIT license(http://mit-license.org).
 */

var Fry = require('./lib/commander'),
    createProject = require('./lib/createProject'),
    colors = require('colors'),
    grunt = require('grunt'),
    cli = require('grunt/lib/grunt/cli'),
    path = require('path');

//colors 全局设置所处可用
colors.setTheme({silly:"rainbow",input:'grey',verbose:'cyan',prompt:'grey',info:'green',data:'grey',help:'cyan',warn:'yellow',debug:'blue',error:'red'});
// 初始化项目信息
Fry.command('new')
   .description(' - 新建一个项目,需要参数为新项目名称')
   .option('-s,--server','是否需要建立后台支持')
   .action(createProject);

Fry.command("run")
   .description(" - 监控less，coffee文件实时编译。开启服务器在" + "http://localhost:".warn)
   .action(function () {
     // cli.tasks = ["common"];
     // grunt.cli();
     // grunt.tasks.run()
   });

Fry.command('common')
   .description(" - 打包压缩所有文件到 /dist 文件夹")
   .action(function () {
     cli.tasks = ["common"];
     grunt.cli();
     // grunt.task.run(["clean", "uglify"]);
   });

Fry.command('clean')
   .description(" - 清除dist/*")
   .action(function () {
     grunt.task.run(['clean']);
   });

Fry.command('test')
  .description("test command works or not")
  .action(function(){
    console.log('test command work');
  });

Fry.command('*')
   .description('分开执行内部定义的grunt命令')
   .action(function(){
      console.log('hello Fry!');
     //watch插件是基于再次调用grunt任务来进行继续.so...
     //run 不能重复执行
     // cli.tasks = grunt.util._(arguments).chain().toArray().initial().without('run').value();
     // grunt.cli();
   });


Fry.version(require('./package').version);
Fry.parse(process.argv);

