module.exports = createProject;

var fileUtils = require('./fileUtils'),
    npmUtils = require('./npmUtils'),
    path = require('path');
    

function createProject (project_name,options) {

  var src = path.join(__dirname,"../tpl"),
  dest = process.cwd() + "/" + project_name,
  ignore_path = process.cwd();

  //todo 项目初始化描述
  console.log("  项目路径:  " + dest + "\n\n  项目生成中...\n");

  fileUtils.copyDir(src,dest,ignore_path);

  //为模版生成新的PKG文件
  fileUtils.overwritePackageJson(dest + "/package.json", project_name);

  npmUtils.installFrom(dest,function (error,stdout) {
    if (error) {
      console.error("出错了.".error);
      console.trace();
    }else{
      console.error("  cd `" + project_name + '` 开始编写您的项目。' + "\n" + "  帮助请运行 `fry -h`");
    }
  });
}
