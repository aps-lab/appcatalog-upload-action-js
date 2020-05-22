const core = require('@actions/core');
const shell = require('shelljs')


// most @actions toolkit packages have async methods
async function run() {
  try { 
      //inputs 
      const tenantId = core.getInput('tenantId')
      const appId = core.getInput('appId')
      const filePath = core.getInput('filePath')
      const releaseNotes = core.getInput('releaseNotes')

      //checkout fastlane custom actions  
      // shell.exec('git clone ${FASTLANE_CUSTOM_ACTIONS_GIT_URL}')
      shell.exec('git clone git@git.adorsys.de:csi/csi-fastlane-custom-actions.git')

  } 
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
