/*
 * grunt-hackmyresume
 * https://github.com/hacksalot/grunt-hackmyresume
 *
 * Copyright (c) 2016 hacksalot <hacksalot@indevious.com> (github.com/hacksalot)
 * Licensed under the MIT license.
 */

'use strict';
module.exports = function(grunt) {
  var HMR = require('hackmyresume');
  var HMROUT = require('hackmyresume/dist/cli/out');
  var HMRERR = require('hackmyresume/dist/cli/error');

  function _build(hmrOut, srcArray, destFile, options) {
    try {
      grunt.log.writeln('Launching HackMyResume...');

      var v = new HMR.verbs.build();

      v.on('hmr:error', function(ex) {
        HMRERR.err.apply(HMRERR, arguments);
        grunt.warn('An error occurred during HackMyResume resume generation.');
      });

      v.on('hmr:status', function() {
        hmrOut.do.apply(hmrOut, arguments);
      });

      options.errHandler = v;

      // Invoke the verb and kick off resume generation
      v.invoke.call(v, srcArray, [destFile], options);
      if(v.errorCode) {
        grunt.warn('HackMyResume exited with error ' + v.errorCode + '.');
      }

      // TODO: Use grunt.file.write|read against the string version of the
      // HackMyResume API.

      grunt.log.writeln('Resume(s) successfully generated to "' + destFile + '".');
    }
    catch(ex) {

      var msg = ex.toString();
      if(ex.stack) {
        msg += ex.stack;
      }
      grunt.warn(msg);
    }
  }

  function _task() {
      var options = this.options({
        theme: 'modern',
        css: 'embed'
      });

      var hmrOut = new HMROUT(options);
      HMRERR.init(options.debug, options.assert, options.silent);

      this.files.forEach(function(f) {
        var src = f.src.filter(function(filepath) {
          if (!grunt.file.exists(filepath)) {
            grunt.log.warn('Source file "' + filepath + '" not found.');
            return false;
          } else {
            return true;
          }
        });
        _build(hmrOut, src, f.dest, options);
      });
  }

  grunt.registerMultiTask(
    'hackmyresume',
    'Grunt plugin for HackMyResume.',
    _task
  );
};
