#!/usr/bin/env groovy

echo 'Starting pipeline'

node{
    echo 'Starting build...'
    stage ('Pre-Clean'){
        preClean()
    }
    stage ('Update Packages'){
        echo 'Updating all installed packages to latest version on internal repo'
        vipmUpdate("14.0")
    }
    stage ('SCM_Checkout'){
        echo 'Attempting to get source from repo...'
        checkout scm
    }
    stage ('Temp Directories'){
        bat 'mkdir build_temp'
    }
    stage('Windows EXE'){  
        lvBuild("Automated Builds Project\\All Module Integration Test.lvproj", "My Computer", "")
    }      
    stage('cRIO ARM EXE'){  
        lvBuild("Automated Builds Project\\All Module Integration Test.lvproj", "cRIO9068", "")
    }
    stage('cRIO x86 EXE'){  
        lvBuild("Automated Builds Project\\All Module Integration Test.lvproj", "cRIO9039", "")
    }
     stage ('Post-Clean'){
        postClean()
    }   
}
