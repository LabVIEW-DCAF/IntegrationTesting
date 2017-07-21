#!/usr/bin/env groovy

echo 'Starting pipeline'

node{
    echo 'Starting build...'
    stage ('Pre-Clean'){
        preClean()
    }
    stage ('Update Packages'){
        echo 'Updating all installed packages to latest version on internal repo'
        vipmUpdate("2014")
    }
    stage ('SCM_Checkout'){
        echo 'Attempting to get source from repo...'
        checkout scm
    }
    stage ('Temp Directories'){
        bat 'mkdir build_temp'
    }
    stage('Config File Check'){  
        utfTest("config file compatibility\\config check.lvproj", "2014")
    }      
    stage('Windows EXE'){  
        lvBuild("Automated Builds Project\\All Module Integration Test.lvproj", "My Computer", "", "2014")
    }      
    stage('cRIO ARM EXE'){  
        lvBuild("Automated Builds Project\\All Module Integration Test.lvproj", "cRIO9068", "", "2014")
    }
    stage('cRIO x86 EXE'){  
        lvBuild("Automated Builds Project\\All Module Integration Test.lvproj", "cRIO9039", "", "2014")
    }
     stage ('Post-Clean'){
        postClean()
    }   
}
