/* global module:false */
module.exports = function(grunt) {

  // Project configuration.
  'use strict';
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    jshintrc: grunt.file.read('.jshintrc'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.nam' +
      'e %>; Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task Configuration
    webpack: {
      dev: {
        entry: {
          javascript: './src/main.js'
        },
        output: {
          filename: 'iiif-osd-crop.js',
          path: __dirname + '/dist',
        },
        externals: {
          'OpenSeadragon': 'OpenSeadragon'
        }
      }
    },
    connect: {
      server: {
        options: {
          port: 8000
        }
      }
    },
    jshint: {
      options: '<%= jshintrc %>',
      gruntfile: {
        src: 'Gruntfile.js'
      },
      libTest: {
        src: ['src/**/*.js', 'test/**/*.js']
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    },
    watch: {
      javascript: {
        files: '<%= jshint.libTest.src %>',
        tasks: ['jshint:libTest', 'webpack', 'test']
      },
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-webpack');

  // Default task.
  grunt.registerTask('test', ['jshint']);
  // grunt.registerTask('cover', []);
  grunt.registerTask('serve', ['webpack', 'connect', 'watch']);
  grunt.registerTask('default', ['jshint', 'webpack', 'test']);
};
