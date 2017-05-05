#!/usr/bin/env groovy

echo 'Starting pipeline'

node{
      stage ('SCM_Checkout'){
        echo 'Attempting to get source from repo...'
        checkout scm
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
