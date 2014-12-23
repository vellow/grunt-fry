module.exports = function() {
    var grunt = require('grunt');
    var _ = grunt.util._,
        path = require('path'),
        files = require("./files");

    return function(action, filepath, target) {
        grunt.log.writeln(target + ': ' + filepath + ' has ' + action);

        /* watch less, excute [less]*/
        if (target === 'less') {
            // @filepath      {{files.less.src}}/sub1/common/footer.css
            // @reFilepath    sub1/common/footer.css
            // @reDirname     sub1/common
            // @filename      footer.css
            var reFilepath = filepath.replace(files.less.src + '/', '');
            var reDirname = path.dirname(reFilepath);
            var filename = path.basename(filepath);
            var conf;
            // changed file in {{files.less.src}}/*

            if (reDirname === '.') {
                conf = [{
                    expand: true,
                    cwd: '<%= files.less.src %>',
                    src: reFilepath,
                    dest: '<%= files.css.dest %>',
                    ext: '.less.min.css',
                    filter: 'isFile'
                }];
                // changed file in {{files.less.src}}/{{sub}}/*
            } else if (files.less.sub.indexOf(reDirname) !== -1) {
                conf = [{
                    expand: true,
                    cwd: '<%= files.less.src %>/' + reDirname,
                    src: filename,
                    dest: '<%= files.css.dest %>/' + reDirname,
                    ext: '.less.min.css',
                    filter: 'isFile'
                }];
                // changed file in {{files.less.src}} / { {{sub}}/**/*, /**/* }
            } else {
                var subName;
                _(files.less.sub).forEach(function(item) {
                    if (reDirname.indexOf(item) === 0) {
                        subName = item;
                    }
                });
                // changed file in {{files.less.src}}/{{sub}}/**/*
                // @ rereDirname = 'common', {{sub}}/rereDirname/**/*
                if (subName) {
                    rereDirname = reDirname.split('/')[1];
                    conf = [{
                        expand: true,
                        cwd: '<%= files.less.src %>/' + subName,
                        src: rereDirname + '.less',
                        dest: '<%= files.css.dest %>/' + subName,
                        ext: '.less.min.css',
                        filter: 'isFile'
                    }];
                    // changed file in {{files.less.src}}/**/*
                    // @rereDirname, {{files.less.src}}/rereDirname/**/*
                } else {
                    rereDirname = reDirname.split('/')[0];
                    conf = [{
                        expand: true,
                        cwd: '<%= files.less.src %>',
                        src: rereDirname + '.less',
                        dest: '<%= files.css.dest %>',
                        ext: '.less.min.css',
                        filter: 'isFile'
                    }];
                }
            }

            grunt.config(['less', 'main', 'files'], conf);
            /* watch javascripts */
        
        // watch js, excute [jshint,uglify]
        } else if (target === 'scripts') {
            // jshint
            grunt.config(['jshint', 'main'], {
                src: [filepath],
            });
            // @filepath      {{files.js.src}}/partial/common/footer.js
            // @reFilepath    partial/common/footer.js
            // @reDirname     partial/common
            // @filename      footer.js
            var reFilepath = filepath.replace(files.js.src + '/', '');
            var reDirname = path.dirname(reFilepath);
            var filename = path.basename(filepath);
            var conf;
            // changed file in {{files.js.src}}/*.js
            if (reDirname === '.') {
                conf = [{
                    expand: true,
                    cwd: '<%= files.js.src %>',
                    src: filename,
                    dest: '<%= files.js.dest %>',
                    ext: '.min.js',
                    filter: 'isFile'
                }];
                // changed file in {{files.js.src}}/{{sub}}/*.js    
            } else if (files.js.sub.indexOf(reDirname) !== -1) {
                conf = [{
                    expand: true,
                    cwd: '<%= files.js.src %>/' + reDirname,
                    src: filename,
                    dest: '<%= files.js.dest %>/' + reDirname,
                    ext: '.min.js',
                    filter: 'isFile'
                }];
                // changed file in {{files.js.src}}/**/reDirname/*.js
            } else {
                conf = [{
                    src: '<%= files.js.src %>/' + reDirname + '/*.js',
                    dest: '<%= files.js.dest %>/' + reDirname + '.min.js'
                }]
            }
            grunt.config(['uglify', 'main', 'files'], conf);

        // watch css, excute cssmin
        } else if (target === 'css') {
            // @filepath      {{files.css.src}}/sub1/common/footer.css
            // @reFilepath    sub1/common/footer.css
            // @reDirname     sub1/common
            // @filename      footer.css
            var reFilepath = filepath.replace(files.css.src + '/', '');
            var reDirname = path.dirname(reFilepath);
            var filename = path.basename(filepath);
            var conf;
            // changed file in {{files.css.src}}/*

            if (reDirname === '.') {
                conf = [{
                    expand: true,
                    cwd: '<%= files.css.src %>',
                    src: reFilepath,
                    dest: '<%= files.css.dest %>',
                    ext: '.min.css',
                    filter: 'isFile'
                }];
                // changed file in {{files.css.src}}/{{sub}}/*
            } else if (files.css.sub.indexOf(reDirname) !== -1) {
                conf = [{
                    expand: true,
                    cwd: '<%= files.css.src %>/' + reDirname,
                    src: filename,
                    dest: '<%= files.css.dest %>/' + reDirname,
                    ext: '.min.css',
                    filter: 'isFile'
                }];
                // changed file in {{files.css.src}} / { {{sub}}/**/*, /**/* }
            } else {
                conf = [{
                    src: '<%= files.css.src %>/' + reDirname + '/*.css',
                    dest: '<%= files.css.dest %>/' + reDirname + '.min.css'
                }]
            }

            grunt.config(['cssmin', 'main', 'files'], conf);

        };
    };
};