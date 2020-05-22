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
      shell.exec('git clone ${FASTLANE_CUSTOM_ACTIONS_GIT_URL}')
      shell.cd('csi-fastlane-custom-actions/fastlane')
      shell.exec("fastlane run distribute_to_appcatalog ktb_environment:'adorsys' tenant_id:'56c18594e4b04d5320869f83' appcatalog_app_id:'5ebbdd274a93e300693d7356' file_path:'.' release_notes:'test' ")
  } 
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
