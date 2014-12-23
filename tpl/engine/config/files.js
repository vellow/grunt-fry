/**
 * 自定义文件路径
 * @deep 文件合并深度
 */
module.exports = {
        root: {
            dest: 'app/dist'
        },
        js: {
            src: 'app/js',
            dest: 'app/dist/js',
            sub: ['tpubbs']
        },
        css: {
            src: 'app/css',
            dest: 'app/dist/css',
            sub: ['tpubbs']
        },
        less: {
            src: 'app/css',
            dest: 'app/dist/css',
            sub: ['tpubbs']
        },
        img: {
            src: 'app/img',
            dest: 'app/dist/img'
        }
}