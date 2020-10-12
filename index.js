const core = require('@actions/core');
const shell = require('shelljs');
const fs = require('fs');
const tc = require('@actions/tool-cache');

shell.config.fatal = true;

function run() {
  try {
    //inputs 
    const tenantId = core.getInput('tenantId');
    const appId = core.getInput('appId');
    const filePath = core.getInput('filePath');
    const releaseNotes = core.getInput('releaseNotes');
    const startingPath = process.cwd();
    const path = startingPath + '/' + filePath;
    const fastlane_action_path = 'csi-fastlane-custom-actions/fastlane' ;
  
    core.info(`startingPath: ${startingPath}`)
    //checkout fastlane custom actions if needed
    if (!fs.existsSync(fastlane_action_path)) {
      const git = process.env.FASTLANE_CUSTOM_ACTIONS_GIT_URL;
      shell.exec(`git clone ${git}`);
    }  
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
      const result = shell.exec('fastlane -v');
      if (result.code !== 0) {
        installUsingGem('fastlane');
      }
    }

    //upload to appcatalog
    shell.cd(fastlane_action_path);
    if (releaseNotes != null){
    shell.exec(`${fastlaneCommand} run distribute_to_appcatalog ktb_environment:'adorsys' tenant_id:${tenantId}  appcatalog_app_id:${appId} file_path:${path} release_notes:${releaseNotes} `);
    } else {
      shell.exec(`${fastlaneCommand} run distribute_to_appcatalog ktb_environment:'adorsys' tenant_id:${tenantId}  appcatalog_app_id:${appId} file_path:${path} release_notes:${Date.now}`);
    }
    //reset current folder to starting point
    core.info(`reset to starting path: ${startingPath}`)
    shell.cd(startingPath);
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
