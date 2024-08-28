/**
 * Wait until the test condition is true or a timeout occurs. Useful for waiting
 * on a server response or for a ui change (fadeIn, etc.) to occur.
 *
 * @param testFx javascript condition that evaluates to a boolean
 * @param onReady what to do when testFx condition is fulfilled
 * @param timeOutMsec the max amount of time to wait. If not specified, 3 sec is used.
 */
function waitFor(testFx, onReady, timeOutMsec) {

    var maxTimeOutMsec = timeOutMsec ? timeOutMsec : 3001; //< Default Max Timout is 3s
    var start = new Date().getTime();
    var condition = false;
    var interval = setInterval(function () {

        var elapsedTime = new Date().getTime() - start;

        if ((elapsedTime < maxTimeOutMsec) && !condition) {

            // If not time-out yet and condition not yet fulfilled
            condition = testFx();

        } else {

            clearInterval(interval);

            // If condition still not fulfilled (timeout but condition is 'false')
            if (!condition) {
                new Error();
                phantom.exit(1);
            }

            console.log('Page load time: ' + elapsedTime + 'ms.');
            onReady();

        }

    }, 250);

}

var File = {

    fs: require("fs"),

    save: function (fileName, content) {
        this.fs.write(fileName, content, "w");
    }

};

var Coverage = {

    settings: {
        output: {
            junit: 'junit.xml',
            cobertura: 'cobertura.xml'
        }
    },

    initialize: function (args) {
        var options = this.getOptions(args);

        if (options.dir) {
            this.settings.dir = options.dir + '/';
        }

        if (!options.test) {
            console.log("Specify test file");
            phantom.exit(1);
        }

        this.settings.test = options.test;

        this.run();
    },

    run: function () {
        this.page = new WebPage();
        this.page.onConsoleMessage = function (value) {
            console.log(value);
        };

        var self = this;

        this.page.open(this.settings.test, function (status) {
            if (status !== "success") {
                throw "Unable to access network";
            }
            else {
                waitFor(
                    function () {
                        return self.isTestCompeted();
                    },
                    function () {

                        self.createReports();

                        var report = self.page.evaluate(function () {
                            return getReport();
                        });

                        phantom.exit(report.failures > 0);

                    },
                    60000
                );
            }
        });
    },

    createReports: function () {
        var junit = JUnit.generateReport(this.page, this.settings);
        var cobertura = Cobertura.generateReport(this.page, this.settings);

        File.save(this.settings.dir + this.settings.output.junit, junit);
        File.save(this.settings.dir + this.settings.output.cobertura, cobertura);
    },

    isTestCompeted: function () {
        return this.page.evaluate(function () {
            return isReportReady();
        });
    },

    getOptions: function (args) {
        var options = {};

        for (var i = 0; i < args.length; i++) {
            if (args[ i ].indexOf("--") === 0) {
                if (( i + 1 ) < args.length && args[ i + 1 ].indexOf("--") === 0) {
                    options[ args[ i ].replace("--", "")] = true;
                }
                else if (( i + 1 ) < args.length) {
                    options[ args[ i ].replace("--", "")] = args[ i + 1 ];
                }
            }
        }

        return options;
    }
};

Coverage.initialize(phantom.args);

var JUnit = {

    /**
     * @param page
     */
    generateReport: function (page, options) {
        var report = page.evaluate(function () {
            return getReport();
        });

        var xmlEscape = function(text) {
            return text.replace(/["'<>&]/g, function(c){
                switch(c){
                    case "<":   return "&lt;";
                    case ">":   return "&gt;";
                    case "\"":  return "&quot;";
                    case "'":   return "&apos;";
                    case "&":   return "&amp;";
                }
            });
        };

        var lines = [];

        lines.push('<?xml version="1.0" encoding="UTF-8"?>');
        lines.push('<testsuites tests="' + report.count + '" failures="' + report.failures + '" disabled="0" errors="0" time="' + ( report.time / 1000 ) + '" name="tests">');

        if (report.suites) {
            report.suites.forEach(function (suite) {
                var suiteName = suite.name;

                if (suite.tests) {
                    lines.push('\t<testsuite tests="' + suite.count + '" failures="' + suite.failures + '" disabled="0" errors="0" time="' + ( suite.time / 1000 ) + '" name="' + xmlEscape(suiteName) + '">');

                    suite.tests.forEach(function (test) {
                        if(test.success) {
                            lines.push('\t\t<testcase name="' + xmlEscape(test.name) + '" assertions="'+ test.expects +'" status="' + ( test.success ? 'pass' : 'fail' ) + '" time="' + ( test.time / 1000 ) + '" classname="' + xmlEscape(suiteName) + '" />');
                        } else {
                            lines.push('\t\t<testcase name="' + xmlEscape(test.name) + '" assertions="'+ test.expects +'" status="' + ( test.success ? 'pass' : 'fail' ) + '" time="' + ( test.time / 1000 ) + '" classname="' + xmlEscape(suiteName) + '">');

                            if(test.failures) {
                                test.failures.forEach(function (failure) {
                                    lines.push('\t\t\t<failure message="' + xmlEscape(failure.message) + '" type="expectationNotMet"><![CDATA[' + failure.message + ']]></failure>');
                                });
                            }

                            lines.push('\t\t</testcase>');
                        }
                    });

                    lines.push('\t</testsuite>');
                }
            });
        }

        lines.push('</testsuites>');

        console.log('Tests completed (' + report.count + '): ');
        console.log('\t' + report.passed + ' passed');
        console.log('\t' + report.failures + ' failed');

        return lines.join('\n');
    }

};

var Cobertura = {

    generateReport: function (page, options) {
        var output = page.evaluate(function () {
            function getClassPath(file) {
                var paths = file.split("/");
                paths.pop();

                return paths.join(".");
            }

            var report = {
                files: 0,
                packages: 0,
                testableLines: 0,
                testedLines: 0,
                untestedLines: 0,
                packageMap: {}
            };

            if (_$jscoverage) {
                for (var file in _$jscoverage) {
                    if (!_$jscoverage.hasOwnProperty(file)) {
                        continue;
                    }

                    var coverage = _$jscoverage[ file ];
                    var classPath = getClassPath(file);

                    report.files++;

                    if (!report.packageMap[ classPath ]) {
                        report.packages++;

                        report.packageMap[ classPath ] = {
                            testableLines: 0,
                            testedLines: 0,
                            untestedLines: 0,
                            classMap: {}
                        };
                    }

                    report.packageMap[ classPath ].classMap[ file ] = {
                        source: coverage.source,
                        file: file,
                        classPath: classPath,
                        testableLines: 0,
                        testedLines: 0,
                        untestedLines: 0,
                        coverage: {}
                    };

                    for (var i = 0; i < coverage.source.length; i++) {
                        var i = parseInt(i, 10);
                        var cvg = coverage[ i + 1 ];
                        var hits = 0;

                        if (cvg !== undefined) {
                            report.testableLines++;
                            report.packageMap[ classPath ].testableLines++;
                            report.packageMap[ classPath ].classMap[ file ].testableLines++;

                            if (cvg > 0) {
                                hits = cvg;
                                report.testedLines++;
                                report.packageMap[ classPath ].testedLines++;
                                report.packageMap[ classPath ].classMap[ file ].testedLines++;
                            }

                            report.packageMap[ classPath ].classMap[ file ].coverage[ i ] = { hits: hits };
                        }
                        else {
                            report.untestedLines;
                            report.packageMap[ classPath ].untestedLines++;
                            report.packageMap[ classPath ].classMap[ file ].untestedLines++;
                        }
                    }
                }
            }

            return report;
        });

        var lines = [];

        lines.push("<?xml version='1.0' encoding='UTF-8'?>");
        lines.push("<!DOCTYPE coverage SYSTEM 'http://cobertura.sourceforge.net/xml/coverage-03.dtd'>");
        lines.push("<coverage line-rate='" + ( output.testedLines / output.testableLines ) + "' branch-rate='0' version='3.5.1' timestamp='" + ( new Date()).getTime().toString() + "'>");
        lines.push("\t<sources/>");
        lines.push("\t<packages>");

        for (var file in output.packageMap) {
            lines.push("\t\t<package name='" + file + "' line-rate='" + ( output.packageMap[ file ].testedLines / output.packageMap[ file ].testableLines ) + "' branch-rate='0' complexity='0'>");
            lines.push("\t\t\t<classes>");

            for (var clazz in output.packageMap[ file ].classMap) {
                lines.push("\t\t\t\t<class name='" + clazz + "' filename='" + output.packageMap[ file ].classMap[ clazz ].file + "' line-rate='" + ( output.packageMap[ file ].classMap[ clazz ].testedLines / output.packageMap[ file ].classMap[ clazz ].testableLines ) + "' branch-rate='0'>");
                lines.push("\t\t\t\t\t<lines>");

                for (var line in output.packageMap[ file ].classMap[ clazz ].coverage) {
                    lines.push("\t\t\t\t\t\t<line number='" + ( parseInt(line, 10) + 1 ).toString() + "' hits='" + output.packageMap[ file ].classMap[ clazz ].coverage[ line ].hits.toString() + "' branch='false' />");
                }

                lines.push("\t\t\t\t\t</lines>");
                lines.push("\t\t\t\t</class>");
            }

            lines.push("\t\t\t</classes>");
            lines.push("\t\t</package>");
        }

        lines.push("\t</packages>");
        lines.push("</coverage>");

        console.log("Coverage measured (" + Math.round(( output.testedLines / output.testableLines ) * 100) + "%):");
        console.log("\t" + output.packages + " packages");
        console.log("\t" + output.files + " files");

        return lines.join("\n");
    }

};

