/*
* 
* dig('src/css', {}) 
* 
* --src/css
*      |---header
*            |----- a.css
*      |---footer
*            |----- b.css
*      |---all.css
* 
* =====>>
* 
* {
*  dirs: ['header', 'footer'],
*  files: ['header/a.css', 'footer/b.css', 'all.css']
* }
* 
*/


// var grunt = require('grunt');
var fs = require('fs');
var path = require('path');
var endpoint = '';

var digg = function(src, assets) {
  assets.dirs = assets.dirs || [];
  assets.files = assets.files || [];
  fs.readdirSync( path.join(endpoint, src) ).forEach(function(filename) {
    if(filename.charAt(0) !== '.'){
      var pathname = path.join(src, filename);
      var file = fs.lstatSync( path.join(endpoint, pathname) );

      if (!file.isDirectory()) {
        assets.files.push(pathname);
      } else {
        assets.dirs.push(pathname);
        digg(pathname, assets);
      }      
    }
  });
  return assets
};

// (function(src){
//   endpoint = src;
//   if(path.existsSync(src))
//   console.log(digg('', {}));
// })('dist')

module.exports = function(src){
  if(fs.existsSync(src)){
    endpoint = src;
    return  digg('', {});     
  } else {
    return -1
  }
};


