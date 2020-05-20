const core = require('@actions/core');



// most @actions toolkit packages have async methods
async function run() {
  try { 
      //inputs 
      const tenantId = core.getInput('tenantId')
      const appId = core.getInput('appId')
      const filePath = core.getInput('filePath')
      const releaseNotes = core.getInput('releaseNotes')
  
      console.log(tenantId)
      console.log(appId)
      console.log(filePath)
      console.log(releaseNotes)
  } 
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
