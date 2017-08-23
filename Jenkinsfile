#!/usr/bin/env groovy

echo 'Starting pipeline'

node('proto'){
    echo 'Starting build...'
    stage ('Pre-Clean'){
        preClean()
    }
    stage ('SCM_Checkout'){
        echo 'Attempting to get source from repo...'
        checkout scm
    }
    stage ('Messing with env variables'){
        echo CHANGE_ID
        echo JOB_NAME
        echo JOB_BASE_NAME
    }
    // If this change is a pull request and the DIFFING_ENABLED variable is set on the jenkins master, diff vis.
    if (env.CHANGE_ID && env.DIFFING_ENABLED) {
    	stage ('Diff VIs'){
	        echo 'Running LabVIEW diff build between origin/master and this commit' 
	        def diffDir = "${WORKSPACE}\\diff_dir"
	        bat "if exist ${diffDir} rd /s /q ${diffDir}"
	        bat "mkdir ${diffDir}"
	        bat "git difftool --no-prompt --extcmd=\"'C:\\jenkins-buildsystem\\labview.bat' \$LOCAL \$REMOTE diff_dir\" origin/master HEAD"
	        // Silencing echo so as to not print out the token.
	        bat "@python C:\\Users\\nitest\\Documents\\GitHub\\LabVIEW-Diff\\github_commenter.py --token=${GITHUB_DIFF_TOKEN} --pic-dir=${diffDir} --pull-req=${CHANGE_ID} --info=${JOB_NAME}"
    	}
	}
}