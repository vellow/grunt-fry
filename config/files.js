
module.exports = (function() {
  var path = require('path');
  var extend = require('../lib/cloneextend');
  var outerFiles = require(process.cwd() + "/engine/config/files");
  var innerFiles = {
    root: {
      dest: path.join('app', 'dist')
    },
    js: {
      src: path.join('app', 'js'),
      dest: path.join('app', 'dist', 'js'),
      sub: []
    },
    css: {
      src: path.join('app', 'css'),
      dest: path.join('app', 'dist', 'css'),
      sub: []
    },
    less: {
      src: path.join('app', 'css'),
      dest: path.join('app', 'dist', 'css'),
      sub: []
    },
    img: {
      src: path.join('app', 'img'),
      dest: path.join('app', 'dist', 'img')
    }
  };

  var allFiles = extend.extend(innerFiles, outerFiles);
  return allFiles
})();