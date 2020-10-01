module.exports =
/******/ (function(modules, runtime) { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	__webpack_require__.ab = __dirname + "/";
/******/
/******/ 	// the startup function
/******/ 	function startup() {
/******/ 		// Load entry module and return exports
/******/ 		return __webpack_require__(34);
/******/ 	};
/******/
/******/ 	// run startup
/******/ 	return startup();
/******/ })
/************************************************************************/
/******/ ({

/***/ 6:
/***/ (function(module) {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 34:
/***/ (function(__unusedmodule, __unusedexports, __webpack_require__) {

const core = __webpack_require__(6);
const shell = __webpack_require__(809);
const fs = __webpack_require__(747);
const tc = __webpack_require__(141);

shell.config.fatal = true;

function run() {
  try {
    //inputs 
    const tenantId = core.getInput('tenantId');
    const appId = core.getInput('appId');
    const filePath = core.getInput('filePath');
    const releaseNotes = core.getInput('releaseNotes');
    const path = process.cwd() + '/' + filePath;
    const fastlane_action_path = 'csi-fastlane-custom-actions/fastlane' ;
  
    //checkout fastlane custom actions  
    const git = process.env.FASTLANE_CUSTOM_ACTIONS_GIT_URL;
    shell.exec(`git clone ${git}`);
  
    //install fastlane if needed
    let fastlaneCommand;
    const gemfilePath = process.cwd() + '/Gemfile';
    if (fs.existsSync(gemfilePath)) {
      installBundlerIfNeeded();
      fastlaneCommand = 'bundle exec fastlane';

      shell.config.fatal = false;
      const result = shell.exec('bundle show fastlane');
      if (result.code !== 0) {
        shell.exec('bundle add fastlane');
      }
      shell.config.fatal = true;
      
      shell.exec('bundle install');
    } else {
      fastlaneCommand = 'fastlane';
      const result = shell.exec('fastlane');
      if (result.code !== 0) {
        installUsingGem('fastlane');
      }
    }

    //upload to appcatalog
    shell.cd(fastlane_action_path);
    shell.exec(`${fastlaneCommand} run distribute_to_appcatalog ktb_environment:'adorsys' tenant_id:${tenantId}  appcatalog_app_id:${appId} file_path:${path} release_notes:${releaseNotes} `);
  
    //reset current folder to home
    shell.cd();
  } catch (error) {
    setFailed(error);
  }
}

function setFailed(error) {
  core.error(error);
  core.setFailed(error.message);
}

function installBundlerIfNeeded() {
  if (!shell.which('bundle')) {
    installUsingGem('bundler');
  }
}

function installUsingGem(package) {
  setupRubyIfNeeded();
  shell.exec(`sudo gem install ${package}`);
}

function setupRubyIfNeeded() {
  if (!shell.which('gem')) {
    const rubyInstallationDirectory = tc.find('Ruby', '>=2.6');
    const rubyBinaryDirectory = `${rubyInstallationDirectory}/bin`;
    
    core.addPath(rubyBinaryDirectory);
  }
}

run();


/***/ }),

/***/ 141:
/***/ (function(module) {

module.exports = eval("require")("@actions/tool-cache");


/***/ }),

/***/ 747:
/***/ (function(module) {

module.exports = require("fs");

/***/ }),

/***/ 809:
/***/ (function(module) {

module.exports = eval("require")("shelljs");


/***/ })

/******/ });