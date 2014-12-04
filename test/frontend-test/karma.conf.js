// Karma configuration
// Generated on Wed Nov 26 2014 14:26:50 GMT+0100 (CET)

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '../../',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            'client/vendor/angular/angular.js',
            'client/vendor/angular-route/angular-route.js',
            'client/vendor/angular-sanitize/angular-sanitize.js',
            'client/vendor/angular-mocks/angular-mocks.js',
            'client/vendor/angular-bootstrap/ui-bootstrap-tpls.js', // ui.bootstrap
            'client/SPA/app.js',
            'client/SPA/components/controllers.js',
            'client/SPA/components/directives.js',
            'client/SPA/components/factories.js',
            'client/SPA/components/filters.js',
            'client/SPA/components/services.js',
            // Test files goes here
            'test/frontend-test/clientTest.js'
        ],


        // list of files to exclude
        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {},


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome', 'Safari'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false
    });
};
