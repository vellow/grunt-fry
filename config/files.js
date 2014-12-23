module.exports = (function(){
    var extend = require('../lib/cloneextend');
    var outerFiles = require(process.cwd() + "/engine/config/files");
    var innerFiles = {
        root: {
            dest: 'app/dist'
        },
        js: {
            src: 'app/js',
            dest: 'app/dist/js',
            sub: []
        },
        css: {
            src: 'app/css',
            dest: 'app/dist/css',
            sub: []
        },
        less: {
            src: 'app/css',
            dest: 'app/dist/css',
            sub: []
        },
        img: {
            src: 'app/img',
            dest: 'app/dist/img'
        } 
    };
    var allFiles = extend.extend(innerFiles, outerFiles);
    return allFiles
})();