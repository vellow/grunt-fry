module.exports = function(grunt) {
    var _ = grunt.util._,
        apporigin = require('../config/app'),
        files = require('../config/files'),
        path = require('path');

    grunt.registerTask("configure", "扩展配置文件, 初始化grunt配置", function() {

        // var app = require(process.cwd() + "/engine/config/app");
        // var files = require(process.cwd() + "/engine/config/files");

        // console.log(apporigin);
        // console.log(app);

        grunt.initConfig(apporigin);

        // grunt.initConfig(_(app).extend({
        //     files: files
        // }));

        grunt.event.on('watch', function(action, filepath, target) {
            grunt.log.writeln(target + ': ' + filepath + ' has ' + action);

            /* watch less */
            if (target === 'less') {
                // {{files.less.src}}/a/footer.css ==>> a/footer.css
                var filename = filepath.replace(files.less.src + '/', '');
                var isRootFile = path.dirname(filename) === '.';
                var conf;
                if (isRootFile) {
                    conf = [{
                        expand: true,
                        cwd: '<%= files.less.src %>',
                        src: [filename],
                        dest: '<%= files.css.dest %>',
                        ext: '.less.min.css',
                        filter: 'isFile'
                    }];
                } else {
                    var dirname = path.dirname(filename);
                    conf = [{
                        src: '<%= files.less.src %>/' + dirname + '/*.less',
                        dest: '<%= files.css.dest %>/' + dirname + '.less.min.css',
                    }];
                }

                grunt.config(['less', 'main', 'files'], conf);
                /* watch javascripts */
            } else if (target === 'scripts') {
                // jshint
                grunt.config(['jshint', 'main'], {
                    src: [filepath],
                });
                // copy src/js/*.js to dist/
                var filename = filepath.replace(files.js.src + '/', '');
                var isRootFile = path.dirname(filename) === '.';
                var conf;
                if (isRootFile) {
                    conf = [{
                        expand: true,
                        cwd: '<%= files.js.src %>',
                        src: [filename],
                        dest: '<%= files.js.dest %>',
                        ext: '.min.js',
                        filter: 'isFile'
                    }];
                } else {
                    var dirname = path.dirname(filename);
                    conf = [{
                        src: ['<%= files.js.src %>/' + dirname + '/*.js'],
                        dest: '<%= files.js.dest %>/' + dirname + '.min.js',
                    }]
                }
                grunt.config(['uglify', 'main', 'files'], conf);

                // watch css
            } else if (target === 'css') {
                var filename = filepath.replace(files.css.src + '/', '');
                var isRootFile = path.dirname(filename) === '.';
                var conf;
                if (isRootFile) {
                    conf = [{
                        expand: true,
                        cwd: '<%= files.css.src %>',
                        src: [filename],
                        dest: '<%= files.css.dest %>',
                        ext: '.min.css',
                        filter: 'isFile'
                    }];
                } else {
                    var dirname = path.dirname(filename);
                    conf = [{
                        src: ['<%= files.css.src %>/' + dirname + '/*.css'],
                        dest: '<%= files.css.dest %>/' + dirname + '.min.css',
                    }]
                }

                grunt.config(['cssmin', 'css', 'files'], conf);

            } else if (target === 'images') {
                var filename = filepath.replace(files.img.src + '/', '');
                var conf = [{
                    expand: true,
                    cwd: '<%= files.img.src %>',
                    src: [filename],
                    dest: '<%= files.img.dest %>'
                }];
                grunt.config(['imagemin', 'main', 'files'], conf);
            };
        });

    });
};