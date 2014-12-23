/**
 * 自定义编译路径
 * @sub 子板块，根目录下文件不被合并
 */
module.exports = {
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
}