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
  
      console.log(tenantId)
      console.log(appId)
      console.log(filePath)
      console.log(releaseNotes)

    
    const a =  shell.echo("test")
    console.log(a)
  } 
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
