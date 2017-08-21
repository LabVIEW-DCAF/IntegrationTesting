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
        diffDir = '${WORKSPACE}\\diff_dir'
        bat 'mkdir ${diffDir}'
        lv_version = "2014"
        bat 'git difftool -x="labview-cli --kill --lv-ver ${lv_version} C:\\jenkins-buildsystem\\lvDiff.vi -- \"$LOCAL\" \"$REMOTE\" ${diffDir}" origin/master ${GIT_COMMIT}'
    }
     stage ('Post-Clean'){
        postClean()
    }
}
