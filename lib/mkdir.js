var fs = require('fs');
// var src = require('../config/dirs');        // source define dir tree
// var pathKey = "id";                       // each leavel pathname
// var dest = "./view";               // mkdir to where


exports.mkdirFromJson = function(src, dest, pathKey){
	var paths = [];
	var getPath = function (arr,uppath){
		var uppath = uppath || '.';
		for(var i=0,l=arr.length;i<l;i++){
			if(arr[i].child){
				arguments.callee(arr[i].child, uppath+"/"+arr[i][pathKey])
			} else {
				paths.push(uppath+"/"+arr[i][pathKey])
			}
		}
	}
	getPath(src, dest);
	exports.mkdirs(paths);
}

// 输入Url 递归创建目录
exports.mkdir = function (url,mode,cb){
	var path = require("path"),
		arr = url.split("/"),
		mode = mode || 0755,
		cb = cb || function(){};
	if(arr[0]==="."){
		arr.shift();
	}
	if(arr[0]===".."){
		arr.splice(0,2,arr[0]+"/"+arr[1]);
	}
	var inner = function(cur){
		if(!fs.existsSync(cur)){
			fs.mkdirSync(cur, mode)
		}
		if(arr.length){
			inner(cur+"/"+arr.shift())
		}else{
			fs.writeFileSync(cur+"/index.html",cur, 'utf8');　　// 写入当前路径到index文件
			cb()		//callback
		}
	}
	arr.length && inner(arr.shift());
}

// 输入Url Array创建目录
exports.mkdirs = function (arr){
	for(var i=0,l=arr.length; i<l; i++){
		exports.mkdir(arr[i], 0755,function(){              // mode not work in windows??
			console.log("mkdir: "+arr[i])
		});
	}
}
