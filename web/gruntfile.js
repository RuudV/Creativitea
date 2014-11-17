/*global module, require*/

module.exports = function (grunt) {
  "use strict";

  // Disply time of the tasks executed
  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    /*
     Clean Task for deleting files/folders etc...
     */
    clean: {
      dev: ['dev/'],
      build: ["build/"],
      build_assets: [
        // clean js and less
        'build/_assets/js/*.js',
        'build/_assets/less',
        // exclude minified js
        '!build/_assets/js/*.min.js'
      ],
      watchJs: ['dev/_assets/js'],
      watchLess: ['dev/_assets/less'],
      watchHtml: ['dev/**/*.html']
    },


    /*
     Copy files/folders
     */
    copy: {
      dev: {
        cwd: 'src',
        src: ['**'],
        dest: 'dev',
        expand: true
      },
      build: {
        cwd: 'src',
        src: ['**'],
        dest: 'build',
        expand: true
      },
      watchJs: {
        cwd: 'src',
        src: ['**/*.js'],
        dest: 'dev',
        expand: true
      },
      watchLess: {
        cwd: 'src',
        src: ['**/*.less'],
        dest: 'dev',
        expand: true
      },
      watchHtml: {
        cwd: 'src',
        src: ['**/*.html'],
        dest: 'dev',
        expand: true
      }
    },


    /*
     Check javascript files for errors
     */
    jshint: {
      all: ['src/_assets/js/*.js']
    },


    /*
     Uglify and generate sourcemaps for javascripts
     */
    uglify: {
      dev: {
        options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */',
          sourceMap: true,
          mangle: {},
          compress: true
        },
        src: [
          'dev/_assets/js/*.js',
          'dev/_vendors/picturefill/picturefill.min.js'
        ],
        dest: 'dev/_assets/js/main.min.js'
      },
      build: {
        options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */',
          sourceMap: false,
          mangle: {},
          compress: true
        },
        src: [
          'build/_assets/js/*.js',
          'build/_vendors/picturefill/picturefill.min.js'
        ],
        dest: 'build/_assets/js/main.min.js'
      }
    },

    /*
     Generate minified css from less files
     */
    less: {
      dev: {
        options: {
          paths: ["dev/_assets/css"]
        },
        files: {
          "dev/_assets/css/styles.min.css": "dev/_assets/less/styles.less"
        }
      },
      build: {
        options: {
          paths: ["build/_assets/css"]
        },
        files: {
          "build/_assets/css/styles.min.css": "build/_assets/less/styles.less"
        }
      }
    },

    /*
     Process html files for script tags, templates, less links etc...
     */
    processhtml: {
      dev: {
        files: [{
          expand: true,
          src: '**/*.html',
          dest: 'dev/',
          cwd: 'dev/'
        }]
      },
      build: {
        files: [{
          expand: true,
          src: '**/*.html',
          dest: 'build/',
          cwd: 'build/'
        }]
      }
    },

    /*
     Check html files with the w3c validator
     */
    validation: {
      options: {
        reset: true,
        reportpath: false
      },
      dev: {
        files: {
          src: ['dev/**/*.html', '!dev/_includes/*.html']
        }
      },
      build: {
        files: {
          src: ['build/**/*.html', '!build/_includes/*.html']
        }
      }
    },

    /*
     Auto prefix css properties that need them
     */
    autoprefixer: {
      dev: {
        files: {
          'dev/_assets/css/styles.min.css': 'dev/_assets/css/styles.min.css'
        }
      },
      build: {
        files: {
          'build/_assets/css/styles.min.css': 'build/_assets/css/styles.min.css'
        }
      }
    },

    /*
     Minify the css processed by uncss
     */
    cssmin: {
      build: {
        files: {
          'build/_assets/css/styles.min.css': ['build/_assets/css/styles.min.css']
        }
      }
    },

    /*
     Watch files for specific grunt tasks
     */
    watch: {
      watchJs: {
        files: ['src/_assets/js/*.js'],
        tasks: [
          'clean:watchJs',
          'copy:watchJs',
          'uglify:dev'
        ]
      },
      watchLess: {
        files: ['src/_assets/less/*.less'],
        tasks: [
          'clean:watchLess',
          'copy:watchLess',
          'less:dev',
          'autoprefixer:dev'
        ]
      },
      watchHtml: {
        files: ['src/**/*.html'],
        tasks: [
          'clean:watchHtml',
          'copy:watchHtml',
          'processhtml:dev',
          'validation:dev'
        ]
      }
    }
  });


  /*
   Load plugins
   */
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-html-validation');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  /*
   Declare tasks
   */
  //Default task //cmd: grunt
  // NOTE: grunt.registerTask('default') - Don't use this atm, not ready
  // TODO: grunt.registerTask('default') - Let default grunt task run a build and dev build
  grunt.registerTask('default', [
    'clean:dev', 'clean:build',
    'copy:dev', 'copy:build',
    'uglify',
    'less',
    'processhtml',
    'validation',
    'cssmin'
  ]);

  // Check js task //cmd: grunt checkjs
  grunt.registerTask('checkjs', [
    'jshint'
  ]);

  // Dev task //cmd: grunt dev
  grunt.registerTask('dev', [
    'jshint',
    'clean:dev',
    'copy:dev',
    'uglify:dev',
    'less:dev',
    'autoprefixer:dev',
    'processhtml:dev',
    'validation:dev'
  ]);

  // Build task //cmd: grunt build
  grunt.registerTask('build', [
    'jshint',
    'clean:build',
    'copy:build',
    'uglify:build',
    'less:build',
    'processhtml:build',
    'validation:build',
    'autoprefixer:build',
    'cssmin:build',
    'clean:build_assets'
  ]);
};