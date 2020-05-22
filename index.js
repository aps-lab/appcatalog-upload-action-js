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
      if (shell.exec('git clone ${FASTLANE_CUSTOM_ACTIONS_GIT_URL}').code !== 0){
        throw (`git error`)
      }
      shell.cd('csi-fastlane-custom-actions/fastlane')
      if(shell.exec(`fastlane run distribute_to_appcatalog ktb_environment:'adorsys' tenant_id:${number}  appcatalog_app_id:${appId} file_path:${filePath} release_notes:${releaseNotes} `).code !== 0){
        throw ("can not upload to appcatalog")
      }
  } 
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
