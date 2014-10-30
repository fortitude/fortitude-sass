/*!
 * Fortitude's Gruntfile
 * http://github.com/fortitude/fortitude-sass
 * Licensed under MIT (https://github.com/fortitude/fortitude-sass/blob/master/LICENSE)
 */

module.exports = function (grunt) {
  'use strict';

  // Force use of Unix newlines
  grunt.util.linefeed = '\n';

  RegExp.quote = function (string) {
    return string.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
  };

  var fs = require('fs');
  var path = require('path');

  // Project configuration.
  grunt.initConfig({

    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    project: {
      app: 'app',
      assets: {
        root: 'app/assets',
        stylesheets: '<%= project.assets.root %>/stylesheets',
        javascripts: '<%= project.assets.root %>/javascripts',
        fonts:       '<%= project.assets.root %>/fonts'
      }
    },
    // NOTE: This jqueryCheck/jqueryVersionCheck code is duplicated in customizer.js;
    //       if making changes here, be sure to update the other copy too.
    jqueryCheck: [
      'if (typeof jQuery === \'undefined\') {',
      '  throw new Error(\'Fortitude\\\'s JavaScript requires jQuery\')',
      '}\n'
    ].join('\n'),
    jqueryVersionCheck: [
      '+function ($) {',
      '  var version = $.fn.jquery.split(\' \')[0].split(\'.\')',
      '  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1)) {',
      '    throw new Error(\'Fortitude\\\'s JavaScript requires jQuery version 1.9.1 or higher\')',
      '  }',
      '}(jQuery);\n\n'
    ].join('\n'),

    tag: {
      banner: '/*!\n' +
              ' * <%= pkg.name %>\n' +
              ' * <%= pkg.title %>\n' +
              ' * <%= pkg.url %>\n' +
              ' * @author <%= pkg.author %>\n' +
              ' * @version <%= pkg.version %>\n' +
              ' * Copyright <%= pkg.copyright %>. <%= pkg.license %> licensed.\n' +
              ' */\n'
    },

    // Task configuration.
    clean: {
      dist: 'dist',
      docs: 'docs/dist'
    },

    jshint: {
      options: {
        jshintrc: 'config/.jshintrc'
      },
      core: {
        src: '<%= project.assets.javascripts %>/**/*.js'
      }
    },

    jscs: {
      options: {
        config: 'config/.jscsrc',
        excludeFiles: [ '<%= project.assets.javascripts %>/fortitude.jquery.js' ]
      },
      core: {
        src: '<%= jshint.core.src %>',
        excludeFiles: [ '<%= project.assets.javascripts %>/fortitude/jquery/index.js' ]
      }
    },

    concat: {
      options: {
        banner: '<%= banner %>\n<%= jqueryCheck %>\n<%= jqueryVersionCheck %>',
        stripBanners: false
      },
      fortitude: {
        src: [
          '<%= project.assets.javascripts %>/fortitude.jquery.js',
          '<%= project.assets.javascripts %>/fortitude/jquery/index.js',
          '<%= project.assets.javascripts %>/fortitude/jquery/blocks/flashbar.js',
          '<%= project.assets.javascripts %>/jquery/blocks/modal.js',
          '<%= project.assets.javascripts %>/jquery/blocks/select-input.js',
          '<%= project.assets.javascripts %>/jquery/blocks/shade.js'
        ],
        dest: 'dist/js/<%= pkg.name %>.js'
      }
    },

    uglify: {
      options: {
        preserveComments: 'some'
      },
      core: {
        src: '<%= concat.fortitude.dest %>',
        dest: 'dist/js/<%= pkg.name %>.min.js'
      }
    },

    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'dist/css/<%= pkg.name %>.css': '<%= project.assets.stylesheets %>/fortitude.scss',
        }
      }
    },

    scsslint: {
      allFiles: ['<%= project.assets.stylesheets %>/**/*.scss'],
      options: {
        bundleExec: true,
        config: 'config/.scss-lint.yml',
        reporterOutput: null,
        colorizeOutput: true
      },
    },

    autoprefixer: {
      options: {
        browsers: [
          'Android 2.3',
          'Android >= 4',
          'Chrome >= 20',
          'Firefox >= 24', // Firefox 24 is the latest ESR
          'Explorer >= 8',
          'iOS >= 6',
          'Opera >= 12',
          'Safari >= 6'
        ]
      },
      core: {
        options: {
          map: true
        },
        src: 'dist/css/<%= pkg.name %>.css'
      }
    },

    csslint: {
      options: {
        csslintrc: 'config/.csslintrc'
      },
      dist: [
        'dist/css/<%= pkg.name %>.css'
      ]
    },

    usebanner: {
      options: {
        position: 'top',
        banner: '<%= tag.banner %>'
      },
      files: {
        src: 'dist/css/*.css'
      }
    },

    copy: {
      fonts: {
        src: '<%= project.assets.fonts %>/*',
        dest: 'dist/'
      }
    },

    watch: {
      src: {
        files: '<%= jshint.core.src %>',
        tasks: ['jshint:src', 'concat']
      },
      scss: {
        files: '<%= project.assets.stylesheets %>/fortitude.scss',
        tasks: 'sass'
      }
    }
  });


  // These plugins provide necessary tasks.
  require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });

  grunt.registerTask('test', ['test-js', 'test-scss']);
  grunt.registerTask('test-js', ['jshint:core', 'jscs:core']);
  grunt.registerTask('test-scss', ['scsslint', 'dist-css', 'csslint:dist'])

  // JS distribution task.
  grunt.registerTask('dist-js', ['concat', 'uglify:core']);

  // CSS distribution task.
  grunt.registerTask('dist-css', ['sass', 'autoprefixer:core', 'usebanner']);

  // Full distribution task.
  grunt.registerTask('dist', ['clean:dist', 'dist-css', 'copy:fonts', 'dist-js']);

  // Default task.
  grunt.registerTask('default', ['clean:dist', 'copy:fonts', 'test']);
};
