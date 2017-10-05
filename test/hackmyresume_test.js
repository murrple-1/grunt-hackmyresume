'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.hackmyresume = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  default_options: function(test) {
    test.expect(2);

    var actualHTML = grunt.file.read('tmp/default_options.html');
    var expectedHTML = grunt.file.read('test/expected/default_options.html');
    test.equal(actualHTML, expectedHTML, 'should describe what the default behavior is.');

    var actualCSS = grunt.file.read('tmp/modern-html.css');
    var expectedCSS = grunt.file.read('test/expected/modern-html.css');
    test.equal(actualCSS, expectedCSS, 'should describe what the default behavior is.');

    test.done();
  },
  custom_options: function(test) {
    test.expect(2);

    var actualHTML = grunt.file.read('tmp/custom_options.html');
    var expectedHTML = grunt.file.read('test/expected/custom_options.html');
    test.equal(actualHTML, expectedHTML, 'should describe what the custom option(s) behavior is.');

    var actualCSS = grunt.file.read('tmp/compact-html.css');
    var expectedCSS = grunt.file.read('test/expected/compact-html.css');
    test.equal(actualCSS, expectedCSS, 'should describe what the custom option(s) behavior is.');

    test.done();
  },
};
