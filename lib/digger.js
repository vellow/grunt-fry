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
var endpoint, assets;

var digg = function(src) {
  var isEnd = true;
  fs.readdirSync( path.join(endpoint, src) ).forEach(function(filename) {
    if(filename.charAt(0) !== '.'){
      var pathname = path.join(src, filename);
      var file = fs.lstatSync( path.join(endpoint, pathname) );

      if ( file.isFile() ) {
        assets.files.push(pathname);
      } else if ( file.isDirectory() ) {
        isEnd = false;
        assets.dirs.push(pathname);
        if( digg(pathname) === true ){
          assets.edirs.push(pathname)
        }
      }      
    }
  });
  return isEnd
};

module.exports = function(src){
  if(fs.existsSync(src)){
    endpoint = src;
    assets = {
      dirs: [],
      edirs: [],
      files: []
    };
    digg('');
    return  assets;     
  } else {
    return -1
  }
};


