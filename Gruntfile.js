module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    app: {
      scss:       'app/assets/stylesheets',
      js:         'app/assets/javascripts',
      img:        'app/assets/images',
      dist:       'dist',
      tmp:        'tmp',
      sass_specs: 'sass_specs',
      jasmine:    'jasmine'
    },

    bower: {
      install: {}
    },

    copy: {
      dist: {
        expand: true,
        cwd:  '<%= app.img %>',
        src:  '**/*.png',
        dest: '<%= app.dist %>/'
      },
      test: {
        expand: true,
        cwd: '<%= app.jasmine %>',
        src: '**/*.html',
        dest: '<%= app.tmp %>'
      }
    },

    sass: {
      options: {
        includePaths: [
          '<%= app.scss %>'
        ]
      },
      dist: {
        options: {
          style: 'compact',
          sourcemap: 'none'
        },
        files: {
          '<%= app.dist %>/<%= pkg.name %>.css':       '<%= app.scss %>/fortitude.scss',
          '<%= app.dist %>/<%= pkg.name %>-theme.css': '<%= app.scss %>/fortitude/theme.scss'
        },
      },
      min: {
        options: {
          style: 'compressed',
          sourcemap: 'none'
        },
        files: {
          '<%= app.dist %>/<%= pkg.name %>.min.css':       '<%= app.scss %>/fortitude.scss',
          '<%= app.dist %>/<%= pkg.name %>-theme.min.css': '<%= app.scss %>/fortitude/theme.scss'
        }
      },
      test: {
        options: {
          style: 'compact',
          includePaths: [
            '<%= app.scss %>',
            'node_modules/bootcamp/dist'
          ],
          sourcemap: 'none'
        },
        files: {
          '<%= app.tmp %>/results.css':               '<%= app.sass_specs %>/tests.scss',
          '<%= app.tmp %>/<%= pkg.name %>.css':       '<%= app.scss %>/fortitude.scss'
        }
      }
    },



    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 9']
      },
      dist: {
        expand: true,
        flatten: true,
        src: '<%= app.dist %>/*.css',
        dest: '<%= app.dist %>/'
      },
      test: {
        expand: true,
        flatten: true,
        src: '<%= app.tmp %>/*.css',
        dest: '<%= app.tmp %>/'
      }
    },

    csslint: {
      test: {
        options: {
          'adjoining-classes':          false,
          'box-model':                  false,
          'box-sizing':                 false,
          'compatible-vendor-prefixes': false,
          'fallback-colors':            false,
          'floats':                     false,
          'font-sizes':                 false,
          'important':                  false,
          'known-properties':           false,
          'outline-none':               false,
          'overqualified-elements':     false,
          'unique-headings':            false,
          'universal-selector':         false,
          'unqualified-attributes':     false
        },
        src: ['<%= app.tmp %>/<%= pkg.name %>.css']
      }
    },

    bootcamp: {
      test: {
        files: {
          src: ['<%= app.tmp %>/results.css']
        }
      }
    },

    concat: {
      dist: {
        src: ['<%= app.js %>/**/*.js'],
        dest: '<%= app.tmp %>/<%= pkg.name %>.js',
      },
      test: {
        src: ['<%= app.js %>/**/*.js'],
        dest: '<%= app.tmp %>/<%= pkg.name %>.js',
      }
    },

    uglify: {
      dist: {
        files: {
          '<%= app.dist %>/<%= pkg.name %>.jquery.js': '<%= app.tmp %>/<%= pkg.name %>.js'
        }
      },
      test: {
        files: {
          '<%= app.tmp %>/<%= pkg.name %>.min.js': '<%= app.tmp %>/<%= pkg.name %>.js'
        }
      }
    },

    jshint: {
      all:  ['<%= app.js %>/**/*.js'],
      test: ['<%= app.tmp %>/<%= pkg.name %>.js', '<%= app.jasmine %>/**/*.js']
    },

    jasmine: {
      fortitude: {
        src: 'app/assets/javascripts/**/*.js',
        options: {
          specs: '<%= app.jasmine %>/**/*Spec.js',
          helpers: '<%= app.jasmine %>/**/*Helper.js',
          styles: [
            '<%= app.tmp %>/<%= pkg.name %>.css',
            '<%= app.jasmine %>/fixtures/animations.css'
          ],
          vendor: [
            'node_modules/jquery/dist/jquery.js',
            'node_modules/jasmine-jquery/lib/jasmine-jquery.js',
            'node_modules/lodash/index.js'
          ],
          outfile: '<%= app.tmp %>/SpecRunner.html',
          keepRunner: true
        }
      }
    },

    clean: ['tmp']
  });

grunt.loadNpmTasks('grunt-bower-task');
grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-contrib-copy');

  // Sass resources
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('bootcamp');

  // JS resources
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  grunt.registerTask('setup', ['bower']);
  grunt.registerTask('test-css',  ['build:test', 'bootcamp:test', 'csslint:test']);
  grunt.registerTask('test-js',  ['build:test', 'jshint:all', 'concat:test', 'jshint:test', 'uglify:test', 'jasmine']);

  grunt.registerTask('test',  ['test-css', 'test-js', 'clean']);
  grunt.registerTask('build:test',  ['sass:test', 'autoprefixer:test', 'copy:test']);
  grunt.registerTask('build',  ['sass:dist', 'sass:min', 'autoprefixer:dist', 'concat:dist', 'uglify:dist', 'copy:dist']);

  grunt.registerTask('default', ['test']);

};
