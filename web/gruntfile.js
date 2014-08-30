/*global module*/

module.exports = function (grunt) {
  "use strict";

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
        'build/_assets/js/*.js',
        '!build/_assets/js/*.min.js',
        'build/_assets/less'
      ]
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
        src: [ '**' ],
        dest: 'build',
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
      build: {
        options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */',
          sourceMap: true,
          mangle: {},
          compress: true
        },
        src: 'build/_assets/js/*.js',
        dest: 'build/_assets/js/main.min.js'
      }
    },

    /*
    Generate minified css from less files
    */
    less: {
      build: {
        options: {
          paths: ["build/_assets/css"]
        },
        files: {
          "build/_assets/css/styles.min.css": "build/_assets/less/*.less"
        }
      }
    },

    /*
    Process html files for script tags, templates, less links etc...
    */
    processhtml: {
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
      build: {
        files: {
          src: ['build/**/*.html', '!build/_assets/includes/*.html']
        }
      }
    },

    /*
    Remove unused css
    */
    uncss: {
      build: {
        files: {
          'build/_assets/css/main.min.css': ['build/*.html']
        }
      }
    },

    /*
    Minify the css processed by uncss
    */
    cssmin: {
      build: {
        files: {
          'build/_assets/css/main.min.css': ['build/_assets/css/main.min.css']
        }
      }
    }
  });


  /*
  Load plugins
  */
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-html-validation');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-uncss');


  /*
  Declare tasks
  */
  //Default task //cmd: grunt
  // NOTE: grunt.registerTask('default') - Don't use this atm, not ready
  // TODO: grunt.registerTask('default') - Let default grunt task run a build and dev build
  grunt.registerTask('default', [
    'clean',
    'copy'
  ]);

  // Check js task //cmd: grunt checkjs
  grunt.registerTask('checkjs', [
    'jshint'
  ]);

  // Dev task //cmd: grunt dev
  grunt.registerTask('dev', [
    'jshint',
    'clean:dev',
    'copy:dev'
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
    'uncss:build',
    'cssmin:build'
  ]);
};