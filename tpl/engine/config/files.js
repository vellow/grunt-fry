/**
 * 自定义编译路径
 * @sub 子板块，根目录下文件不被合并
 */
var path = require('path');

module.exports = {
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
}