const core = require('@actions/core');
const shell = require('shelljs')
shell.config.fatal = true
shell.config.verbose = true

// most @actions toolkit packages have async methods
async function run() {
  try { 
      //inputs 
      const tenantId = core.getInput('tenantId')
      const appId = core.getInput('appId')
      const filePath = core.getInput('filePath')
      const releaseNotes = core.getInput('releaseNotes')

      //checkout fastlane custom actions  
      // shell.exec('git clone ${FASTLANE_CUSTOM_ACTIONS_GIT_URL}'
      shell.exec(`git clone ${shell.env.FASTLANE_CUSTOM_ACTIONS_GIT_URL}`)
      shell.cd('csi-fastlane-custom-actions/fastlane')
      // shell.exec(`fastlane run distribute_to_appcatalog ktb_environment:'adorsys' tenant_id:${number}  appcatalog_app_id:${appId} file_path:${filePath} release_notes:${releaseNotes} `)
  } 
  catch (error) {
    console.log(error)
    core.setFailed(error.message);
  }
}

run()
