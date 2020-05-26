# Action for Uploading Packages to Adorsys Appcatalog

## Usage

You can now consume the action by referencing the master branch

``` yaml
name: Upload to AppCatalog
uses: aps-lab/appcatalog-upload-action@master
env: 
  FASTLANE_CUSTOM_ACTIONS_GIT_URL: ${{ secrets.FASTLANE_CUSTOM_ACTIONS_GIT_URL }}
  FASTLANE_PASSWORD: ${{ secrets.APPCATALOG_PASSWORD }} 
with:
  tenantId: '1234'
  appId: '1234' 
  filePath: 'buildFolder/your-app.ipa' # path to your app package(.ipa, .apk) relative to your working directory 
  releaseNotes: 'This version inludes some bug fixes'
```

The `FASTLANE_CUSTOM_ACTIONS_GIT_URL` must contain a deploy token to be able to check out the private repository.
