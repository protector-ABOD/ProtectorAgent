var fs = Npm.require('fs');
var path = Npm.require('path');
var Future = Npm.require('fibers/future');
var Fiber = Npm.require('fibers');

var archConfig = {
    // client
    'web.browser': function(config) {
        return {};
    },
    // cordova
    'web.cordova': function(config) {
        var r = config.permissions;
        return r;
    },
    // server
    'os': function(config) {
        var r = {};
        r.APP_ID = config.cordova.APP_ID;
        r.secret = config.cordova.secret;
        r.profileFields = config.profileFields;
        return r;
    }
};
var configStringify = function(config) {
    // http://docs.meteor.com/#/full/ejson_stringify
    var str = EJSON.stringify(config, 4);
    return 'Meteor.startup(function() {\n\tCFB.Configure(' + str + ');\n});'
};
Plugin.registerSourceHandler('facebook.json', function(compileStep) {
    // Read the configuration
    var configString = compileStep.read().toString('utf8');

    if (!configString) return;

    try {
        // Try parsing the json
        configString = EJSON.parse(configString);
        var config = archConfig[compileStep.arch](configString);
        // Serve the configuration
        compileStep.addJavaScript({
            path: 'facebook.config.' + compileStep.arch + '.js',
            sourcePath: 'facebook.config.' + compileStep.arch + '.js',
            data: configStringify(config),
            // https://github.com/meteor/meteor/blob/0371c4ff26a67319db0f70ec18132b7e7659e3a7/tools/compiler.js#L444
            // It must be present and should
            // be relative to the project root. Typically 'inputPath' will
            // do handsomely. "bare" means to not wrap the file in
            // a closure, so that its vars are shared with other files
            // in the module.
            bare: /^web/.test(compileStep.arch)
        });
    }
    catch (e) {
        var message = e.message ? e.message : e.toString();
        compileStep.error({
            message: "cordova facebook compiler error >> " + message,
            sourcePath: e.filename || compileStep.inputPath,
            line: e.line - 1,
            column: e.column + 1
        });
        return;
    }
    // console.log(configString);
});
