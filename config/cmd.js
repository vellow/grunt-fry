/*
 * command integer
 */

module.exports = (function() {
  var extend = require('../lib/cloneextend');
  var outerCmd = require(process.cwd() + "/engine/config/cmd");
  var innerCmd = {
    build: ["less", "uglify"]
  }

  var allCmd = extend.extend(innerCmd, outerCmd);
  return allCmd
})();