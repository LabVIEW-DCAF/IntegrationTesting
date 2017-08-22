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
        echo "Branch name: ${BRANCH_NAME}"
        echo "CHANGE_ID: ${CHANGE_ID}"
        echo "CHANGE_URL: ${CHANGE_URL}"
    }
    stage ('Git Diff'){
        echo 'Running LabVIEW diff build between origin/master and this commit' 
        def diffDir = "${WORKSPACE}\\diff_dir"
        bat "mkdir ${diffDir}"
        def lv_version = "2014"
        bat "git difftool --no-prompt --extcmd=\"'C:\\jenkins-buildsystem\\labview.bat' \$LOCAL \$REMOTE diff_dir\" origin/master HEAD"
    }
}
