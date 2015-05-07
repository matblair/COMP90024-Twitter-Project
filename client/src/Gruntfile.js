module.exports = function(grunt) {

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-wiredep');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // Production-Build Only.
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      release: {
        src: 'src/js/app.js',
        dest: 'release/app.min.js'
      }
    },
    wiredep: {
      dev: {
        src: ['index.html']
      },
      release: {
        src: 'src/index.html'
      } 
    },
    clean: {
      dev: ['build/'],
      release: ['dist/']
    },
    less: {
      dev: {
        options: {
          paths: ['src/less'],
        },
        files: {
          'build/app.css' : 'less/app.less'
        }
      },
      release: {
        options: {
          paths: ['src/less'],
          compress: true
        },
        files: {
          'release/app.css' : 'src/less/app.less',
          'build/app.css' : 'src/less/app.less'
        }
      }
    },
    concat: {
      options: {
        seperator: ';'
      },
      release: {
        src: ['src/js/*.js'],
        dest: 'release/app.js'
      },
      dev: {
        src:['src/js/*.js'],
        dest: 'build/app.js'
      }
    },
    jshint: {
      dev: {
        ignores: ['src/js/app.js'],
        beforeconcat: ['src/js/*.js'],
        afterconcat: ['build/*.js']
      },
      release: {
        ignores: ['src/js/app.js'],
        beforeconcat: ['src/js/*.js'],
        afterconcat: ['release/*.js']
      }
    },
    watch: {
      options: {
        livereload: true
      },
      src: {
        files: ['src/index.html', 'src/html/*.html'],
        tasks: ['dev-build']
      },
      scripts: {
        options: {
          livereload: false,
          debounceDelay: 1000
        },
        files: ['src/js/*.js'],
        tasks: ['dev-build']
      },
      less: {
        options: {
          livereload: false,
          debounceDelay: 1000
        },
        files: ['src/less/*.less', '!src/less/app.less'],
        tasks: ['dev-build']
      },
      gruntfile: {
        files: ['Gruntfile.js'],
        tasks: ['jshint:gruntfile']
      },
      test: {
        files: ['test/*.js'],
        tasks: ['jshint:test']
      },
      dependencies: {
        files: ['bower.json'],
        tasks: ['wiredep:dev']
      }
    },
    connect: {
      server: {
        options: {
          port: 8000,
          base: '.',
          livereload: true
        }
      }
    }
  });

  // Default task(s).
  grunt.registerTask('default', ['clean:dev', 'less:dev', 'jshint:dev', 'wiredep:dev', 'concat:dev']);
  grunt.registerTask('dev-build', ['clean:dev', 'less:dev', 'jshint:dev', 'concat:dev']);
  grunt.registerTask('release', ['clean', 'less:release', 'jshint:release', 'concat:release', 'uglify', 'wiredep:release']);
  grunt.registerTask('serve', ['default', 'connect', 'watch']);

};
