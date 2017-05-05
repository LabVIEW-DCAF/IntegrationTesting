#!/usr/bin/env groovy

echo 'Starting pipeline'

node{
    stage('Build LV EXE'){  
        lvBuild("Automated Builds Project\\All Module Integration Test.lvproj", "CRIO9068", "Test Build")
    }
}
