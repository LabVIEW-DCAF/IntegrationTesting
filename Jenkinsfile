#!/usr/bin/env groovy

echo 'Starting pipeline'

node{
      stage ('SCM_Checkout'){
        echo 'Attempting to get source from repo...'
        checkout scm
      }    
    stage('Build LV EXE'){  
        lvBuild("Automated Builds Project\\All Module Integration Test.lvproj", "cRIO9068", "Test Build")
    }
}
