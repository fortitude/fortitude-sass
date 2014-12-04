module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    app: {
      scss: 'app/assets/stylesheets',
      js:   'app/assets/javascripts',
      dist: 'dist',
      sass_specs: 'sass_specs'
    },

    bower: {
      install: {}
    },
    
    sass: {
      dist: {                            // Target
        options: {                       // Target options
          style: 'compressed',
          bundleExec: true,
          sourcemap: 'none'
        },
        files: {
          // 'destination': 'source'
          '<%= app.dist %>/fortitude.css':       '<%= app.scss %>/fortitude.scss',
          '<%= app.dist %>/fortitude-theme.css': '<%= app.scss %>/fortitude/theme.scss'
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
          '<%= app.sass_specs %>/results.css': '<%= app.sass_specs %>/tests.scss'
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
        src: '<%= app.dist %>/*.css',
      }
    },

    bootcamp: {
      test: {
        files: {
          src: ['<%= app.sass_specs %>/results.css']
        }
      }
    },


    uglify: {
      dist: {
        files: {
          '<%= app.dist %>/fortitude.min.js': '<%= app.js %>/**/*.js'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-bower-task');

  // Sass resources
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('bootcamp');

  // JS resources
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('setup', ['bower']);
  grunt.registerTask('test',  ['sass', 'bootcamp']);
  grunt.registerTask('dist',  ['sass', 'autoprefixer']);

  grunt.registerTask('default', ['dist']);


};