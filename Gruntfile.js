module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    app: {
      scss:       'app/assets/stylesheets',
      js:         'app/assets/javascripts',
      dist:       'dist',
      tmp:        'tmp',
      sass_specs: 'sass_specs'
    },

    bower: {
      install: {}
    },
    
    sass: {
      dist: {
        options: {
          style: 'compressed',
          bundleExec: true,
          sourcemap: 'none'
        },
        files: {
          '<%= app.tmp %>/<%= pkg.name %>.css.min':       '<%= app.scss %>/fortitude.scss',
          '<%= app.tmp %>/<%= pkg.name %>-theme.css.min': '<%= app.scss %>/fortitude/theme.scss'
        }
      },
      test: {
        options: {
          style: 'expanded',
          loadPath: [
            '<%= app.scss %>',
            'node_modules/bootcamp/dist'
          ],
          bundleExec: true,
          sourcemap: 'none'
        },
        files: {
          '<%= app.tmp %>/results.css':               '<%= app.sass_specs %>/tests.scss',
          '<%= app.tmp %>/<%= pkg.name %>.css':       '<%= app.scss %>/fortitude.scss',
          '<%= app.tmp %>/<%= pkg.name %>-theme.css': '<%= app.scss %>/fortitude/theme.scss'
        }
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 8', 'ie 9']
      },
      dist: {
        expand: true,
        flatten: true,
        src: '<%= app.tmp %>/*.css',
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
          'import':                     2,
          'ids':                        false,
          'zero-units':                 false,
          'fallback-colors':            false,
          'box-sizing':                 false,
          'vendor-prefixes':            false,
          'compatible-vendor-prefixes': false,
          'universal-selector':         false,
          'box-model':                  false,
          'adjoining-classes':          false,
          'unique-headings':            false,
          'unqualified-attributes':     false,
          'font-sizes':                 false,
          'overqualified-elements':     false,
          'font-sizes':                 false,
          'floats':                     false,
          'outline-none':               false,
          'known-properties':           false
        },
        src: ['<%= app.tmp %>/<%= pkg.name %>.css', '<%= app.tmp %>/<%= pkg.name %>-theme.css']
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
          '<%= app.dist %>/<%= pkg.name %>.min.js': '<%= app.tmp %>/<%= pkg.name %>.js'
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
      test: ['<%= app.tmp %>/<%= pkg.name %>.js']
    },

    clean: ['tmp']
  });

  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Sass resources
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('bootcamp');

  // JS resources
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('setup', ['bower']);
  grunt.registerTask('test-css',  ['bootcamp:test', 'sass:test', 'autoprefixer:test', 'csslint:test']);
  grunt.registerTask('test-js',  ['jshint:all', 'concat:test', 'jshint:test', 'uglify:test']);

  grunt.registerTask('test',  ['test-css', 'test-js', 'clean']);
  grunt.registerTask('build',  ['sass:dist', 'autoprefixer:dist', 'concat:dist', 'uglify:dist']);

  grunt.registerTask('default', ['test']);


};