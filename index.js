const core = require('@actions/core');
const shell = require('shelljs')
shell.config.fatal = true

// // most @actions toolkit packages have async methods
// async function run() {
  try { 
      //inputs 
      const tenantId = core.getInput('tenantId')
      const appId = core.getInput('appId')
      const filePath = core.getInput('filePath')
      const releaseNotes = core.getInput('releaseNotes')
      const path = '../../' + filePath

      //checkout fastlane custom actions  

      const git = process.env.FASTLANE_CUSTOM_ACTIONS_GIT_URL
      shell.exec(`git clone ${git}`)
      shell.cd('csi-fastlane-custom-actions/fastlane')
      shell.exec(`bundle exec fastlane run distribute_to_appcatalog ktb_environment:'adorsys' tenant_id:${tenantId}  appcatalog_app_id:${appId} file_path:${path} release_notes:${releaseNotes} `)
      shell.cd()
  } 
  catch (error) {
    console.log(error)
    core.setFailed(error.message);
  }
// }

// run()
