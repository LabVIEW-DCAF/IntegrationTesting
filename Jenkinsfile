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
    stage ('Git Diff'){
        echo 'Running LabVIEW diff build between origin/master and this commit' 
        def diffDir = "${WORKSPACE}\\diff_dir"
        bat "mkdir ${diffDir}"
        def lv_version = "2014"
        bat "git difftool --extcmd=\"labview-cli --kill --lv-ver ${lv_version} C:\\jenkins-buildsystem\\lvDiff.vi -- \'\$LOCAL\' \''\$REMOTE\' ${diffDir}\" origin/master HEAD"
    }
     stage ('Post-Clean'){
        postClean()
    }
}
