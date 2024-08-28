/*global module:false*/
module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        globals:{
            target :'target',
            toolsPath : 'tools'
        },
        pkg:'<json:package.json>',
        clean:['<config:globals.target>'], //grunt-contrib-clean
        version:{   // copies project's package descriptor to target and sets version
            srcFile:'<config:pkg>',
            destPath:'<config:globals.target>'
        },
        npmInstall: {
            maven: {
                windowsNode : '<%= globals.windowsNode %>',
                linuxNode : '<%= globals.linuxNode %>',
                npmScriptPath : '/tools/nodejs/lib/node_modules/npm/bin/npm-cli.js',
                npmArgument: ""
            }
        },
        concat:{
            wrapSources:{
                src:[
                    'src/wrapper_start.txt',
                    'src/globals.js',
                    'src/Backbone.History.fix.js',
                    'src/core.js',
                    'src/EventBus.js',
                    'src/Router.js',
                    'src/Place.js',
                    'src/Application.js',
                    'src/MainController.js',
                    'src/Presenter.js',
                    'src/View.js',
                    'src/Element.js',
                    'src/Model.js',
                    'src/Collection.js',
                    'src/utils.js',
                    'src/define.js',
                    'src/wrapper_end.txt'
                ],
                dest:'<%= globals.target %>/temp/<%= pkg.name %>.js'
            },
            developerVesion: {
                src:[
                    'lib/requirejs/require-2.0.4.js',
                    'lib/requirejs/domReady-2.0.0.js',
                    'lib/requirejs/template.js',
                    'lib/requirejs/styles.js',
                    'lib/requirejs/i18n.js',
                    'lib/jquery/jquery-1.8.0.js',
                    'lib/underscore/underscore-1.3.3.js',
                    'lib/backbone/backbone-0.9.2.js',
                    'lib/handlebars/handlebars-1.0.0.beta.6.js',
                    'lib/less/less-1.3.0.js',
                    '<%= globals.target %>/temp/<%= pkg.name %>.js'
                ],
                dest:'<%= globals.target %>/build/package-dev/<%= pkg.name %>-dev.js'
            },
            productionVersion: {
                src:[
                    'lib/requirejs/require-2.0.4.js',
                    'lib/requirejs/domReady-2.0.0.js',
                    'lib/jquery/jquery-1.8.0.js',
                    'lib/underscore/underscore-1.3.3.js',
                    'lib/backbone/backbone-0.9.2.js',
                    'lib/handlebars/handlebars.runtime-1.0.0.beta.js',
                    '<%= globals.target %>/temp/<%= pkg.name %>.js'
                ],
                dest:'<%= globals.target %>/build/package-prod/<%= pkg.name %>-prod.js'
            }
        },
        lint:{
            gruntjs: ['grunt.js'],
            wrappedSource:['<%= globals.target %>/temp/<%= pkg.name %>.js']
        },
        jshint: {      // options for lint task
            wrappedSource: {
               options: {
                    strict: false, //equivalent of sloppy in JSLINT
                    es5: true, // ES5 syntax should be allowed
                    ident: 4 // enforces indent spacing
               },
               globals: { require : true }     // no globals allowed
            }
        },
        prepareTest: {
            winPath: '/<%= globals.toolsPath %>/jscoverage/jscoverage.exe',
            linuxPath: '/<%= globals.toolsPath %>/jscoverage/jscoverage',
            srcCode : 'src',
            jsCoverageTarget: '<%= globals.target %>',
            testResources: {
                'test': '<%= globals.target %>',
                'lib':'<%= globals.target %>',
                'tools/jasmine':'<%= globals.target %>/tools'
            }
        },
        testJasmine: {
            phantomWinPath: '/<%= globals.toolsPath %>/phantomjs/bin/phantomjs.exe',
            phantomLinuxPath: '/<%= globals.toolsPath %>/phantomjs/bin/phantomjs',
            runnerPath : '<%= globals.toolsPath %>/jasmine/test-runner.js',
            reportsPath : '<%= globals.target %>/test/reports-unit',
            testIndex : '<%= globals.target %>/test/index.html'
        },
        packageNPM :
        {
            dev: {
                packageDescriptor: '<%= globals.target %>/build/package-dev/package.json',
                packageTarget: '<%= globals.target %>/build/package-dev',
                packageResources: {
                    'target/build/package-prod/titan-prod.js':'',
                    'target/package.json':'',
                    'src/ext':'',
                    'lib':'',
                    'tools':'',
                    'node_modules/handlebars':'/node_modules',
                    'node_modules/less':'/node_modules',
                    'node_modules/requirejs':'/node_modules',
                    'node_modules/server':'/node_modules',
                    'node_modules/shelljs':'/node_modules',
                    'node_modules/yuidocjs':'/node_modules'
                },
                testResources: {
                    'test': '<%= globals.target %>',
                    'lib':'<%= globals.target %>',
                    'tools/jasmine':'<%= globals.target %>/tools'
                }

            },
            prod: {
                packageDescriptor: '<%= globals.target %>/build/package-prod/package.json',
                packageTarget: '<%= globals.target %>/build/package-prod/',
                packageResources: {
                    'target/build/package-dev/titan-dev.js':'',
                    'target/package.json':''
                },
                removeDependencies: true
            }
        },
        min:{
            prod: {
                src: ['<%= globals.target %>/build/package-dev/titan-prod.js'],
                dest: '<%= globals.target %>/build/package-prod/<%= pkg.name %>/<%= pkg.name %>-prod-min.js'
            }
        },
        uglify: {
            mangle: {toplevel: true},
            squeeze: {dead_code: false},
            codegen: {quote_keys: false}
        }
    });

//   to run: grunt.cmd taskName

// Developer Tasks (notice capital letters):
//    Version        ( incl.  clean version)
//    Concat         ( incl.  clean version concat)
//    Lint           ( incl.  clean version concat lint)
//    PrepareTest    ( incl.  clean version concat lint prepareTest)
//    Test           ( incl.  clean version concat lint prepareTest testJasmine)
//    Package-dev    ( incl.  clean version concat lint prepareTest testJasmine packageNPM:dev)
//    Package-prod   ( incl.  clean version concat lint prepareTest testJasmine packageNPM:dev packageNPM:prod )
//    Package        ( incl.  clean version concat lint prepareTest testJasmine packageNPM:dev packageNPM:prod )
//    Min-prod       ( when you run "grunt" or "grunt.cmd" ) (incl. all of the above)

// Load additional tasks
grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-UI-tasks');
grunt.loadTasks('./node_modules/grunt-UI-tasks/aliases/titan');
};