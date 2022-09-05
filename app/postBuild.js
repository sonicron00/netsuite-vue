/* eslint-disable no-unused-vars */
const mv = require('mv')
const rimraf = require('rimraf')
const folderName = 'app'
const repoName = 'vue-app-test'

// Upon npm run build, move compiled files to sdf location.
rimraf(`../sdf/src/FileCabinet/SuiteScripts/${repoName}/${folderName}`, () => {
	mv('dist', `../sdf/src/FileCabinet/SuiteScripts/${repoName}/${folderName}`, function (err) {
		if (err) console.log(err)
		else console.log('\nBuild completed!\nIn the sdf folder run "npm run deploy"')
	})
})