module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    app: {
      scss:       'app/assets/stylesheets',
      js:         'app/assets/javascripts',
      img:        'app/assets/images',
      dist:       'dist',
      tmp:        'tmp',
      sass_specs: 'sass_specs'
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
      }
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
      test: ['<%= app.tmp %>/<%= pkg.name %>.js']
    },

    clean: ['tmp']
  });

  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Sass resources
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('bootcamp');

  // JS resources
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('test-compass', 'Run a test build with Compass', function(){
    var cb = this.async();
    var child = grunt.util.spawn({
      cmd: 'bundle',
      args: [
        'exec',
        'compass',
        'create',
        'tmp/new-compass-project',
        '-r',
        'fortitude-sass',
        '--using',
        'fortitude',
        '--trace',
        '--force',
        '-q'
      ]
    }, function (err, result, code) {
      if (code === 127) {
        grunt.warn(
          'You need to have Ruby and Compass installed ' +
          'and in your system PATH for this task to work. ' +
          'Make sure you have run bundle install'
        );
      }

      if (code != 0) {
        grunt.warn('Compass failed to build test app correctly.');
        return cb(err);
      }

      grunt.log.ok(['Compass built succesfully.'])
      cb();
    });

    if (child) {
      child.stderr.pipe(process.stderr);
    }
  });

  grunt.registerTask('setup', ['bower']);
  grunt.registerTask('test-css',  ['sass:test', 'autoprefixer:test', 'bootcamp:test', 'csslint:test']);
  grunt.registerTask('test-js',  ['jshint:all', 'concat:test', 'jshint:test', 'uglify:test']);

  grunt.registerTask('test',  ['clean', 'test-css', 'test-js', 'test-compass', 'clean']);
  grunt.registerTask('build',  ['sass:dist', 'autoprefixer:dist', 'concat:dist', 'uglify:dist', 'copy:dist']);

  grunt.registerTask('default', ['test']);


};