#!/usr/bin/env node

/**
 * For each lang-*.js file, runs the language handler in a fake context where
 * PR.registerLangHandler collects handler names without doing anything else,
 * and then makes copies of the JS extension under all registered language
 * names lang-<EXT>.js
 *
 * As verbose output, it also prints lines of the form:
 *    lang-foo.js => foo,bar,baz
 */

var fs = require('fs');
var path = require('path');
var vm = require('vm');

function getSandbox() {
    // collect registered language extensions
    var sandbox = {};
    sandbox.langExtensions = [];
    // mock prettify.js API
    sandbox.window = {};
    sandbox.window.PR = sandbox.PR = {
        registerLangHandler: function (_, exts) {
            exts.forEach(function (ext) {
                // take case-insensitive names,
                // and skip internal stuff like: foo-bar-baz
                var handler = String(ext).toLowerCase();
                if (/^\w+$/.test(handler)) {
                    sandbox.langExtensions.push(handler);
                }
            });
        },
        createSimpleLexer: function () {},
        sourceDecorator: function () {},
        PR_ATTRIB_NAME: 'atn',
        PR_ATTRIB_VALUE: 'atv',
        PR_COMMENT: 'com',
        PR_DECLARATION: 'dec',
        PR_KEYWORD: 'kwd',
        PR_LITERAL: 'lit',
        PR_PLAIN: 'pln',
        PR_PUNCTUATION: 'pun',
        PR_STRING: 'str',
        PR_TAG: 'tag',
        PR_TYPE: 'typ'
    };
    return sandbox;
}

// loop over lang-*.js files, and run each in an isolated sandbox
var srcDir = path.join(__dirname, '..', 'loader');
fs.readdirSync(srcDir).filter(function (f) {
    return path.extname(f) == '.js' && /^lang-/.test(f);
}).forEach(function (f) {
    // read source code
    var sourceFile = path.join(srcDir, f);
    var code = fs.readFileSync(sourceFile);

    // execute code in a seperate VM with a fake PR in context
    var sandbox = getSandbox();
    vm.runInNewContext(code, sandbox, {
        filename: sourceFile
    });

    // collect extensions list
    var langExtensions = sandbox.langExtensions.sort();
    console.log(f + ' => ' + langExtensions);

    // for each unique alias, copy file if not already exist
    langExtensions.filter(function (ext, pos) {
        return langExtensions.indexOf(ext) == pos;
    }).forEach(function (ext) {
        var targetFile = path.join(srcDir, 'lang-' + ext + '.js');
        if (!fs.existsSync(targetFile)) {
            fs.writeFileSync(targetFile, code);
        }
    });
});
