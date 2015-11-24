/*global module:false*/
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
        // Task configuration.
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true
            },
            dist: {
                src: ['lib/<%= pkg.name %>.js'],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        connect: {
            server: {
                options: {
                    port: 8000
                }
            }
        },
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            dist: {
                src: '<%= concat.dist.dest %>',
                dest: 'dist/<%= pkg.name %>.min.js'
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
        test: {
            src: 'src/**/*.js',
            options: {
                specs: 'test/src/**/*Test.js'
            }
        },
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            libTest: {
                files: '<%= jshint.lib_test.src %>',
                tasks: ['jshint:libTest', 'test']
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    // Default task.
    grunt.registerTask('default', ['jshint', 'test', 'concat', 'uglify']);
    grunt.registerTask('serve', ['connect', 'watch']);
};
