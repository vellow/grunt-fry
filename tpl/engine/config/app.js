/**
 * 配置自定义npmtasks
 */

module.exports = require('grunt-fry').extend('app', {
  copy: {
    css: {
      files: [
        // copy src/css/*.css ==> dist/css/
        {
          expand: true,
          cwd: '<%= files.css.src %>',
          src: ['*.css'],
          dest: '<%= files.css.dest %>/',
          filter: 'isFile'
        }
      ],
    },
    js: {
      files: [
        // copy src/js/*.js ==> dist/js/
        {
          expand: true,
          cwd: '<%= files.js.src %>',
          src: ['*.js'],
          dest: '<%= files.js.dest %>/',
          filter: 'isFile'
        }
      ],
    },
    img: {
      files: [
        // copy src/img/* ==> dist/img/
        {
          expand: true,
          cwd: '<%= files.img.src %>',
          src: ['*'],
          dest: '<%= files.img.dest %>/',
          filter: 'isFile'
        },

      ],
    },
  },

  imagemin: {
    options: { // Target options
      optimizationLevel: 3,
      svgoPlugins: [{
        removeViewBox: false
      }],
      // use: [mozjpeg()]
    },
    main: {
      files: [{
        expand: true, // Enable dynamic expansion
        cwd: '<%= files.img.src %>', // Src matches are relative to this path
        src: ['**/*.{png,jpg,gif}'], // Actual patterns to match
        dest: '<%= files.img.dest %>' // Destination path prefix
      }]
    }
  },

  // compile less to css
  // less: {
  //   options: {
  //     compress: false,
  //     syncImport: false
  //   },
  //   main: {
  //     files: [
  //       {
  //         expand: true,
  //         cwd: '<%= files.less.src %>',
  //         src: ['*.less'],
  //         dest: '<%= files.less.dest %>/',
  //         ext: '.less.min.css',
  //         filter: 'isFile'
  //       }
  //     ]
  //   }
  // },
});