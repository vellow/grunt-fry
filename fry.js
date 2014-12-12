var extend = require('./lib/cloneextend');

module.exports = {
  config: {
    app: require("./config/app"),
    files: require("./config/files"),
    grunt: require("./config/grunt"),
  },
  extend:function (key,newOBJ) {
    return extend.replace(module.exports.config[key],newOBJ);
  }
}