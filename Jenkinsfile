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
    // stage('Config File Check'){
    //     utfTest("config file compatibility\\config check.lvproj", "2014")
    // }
    // stage('Windows EXE'){
    //     lvBuild("Automated Builds Project\\All Module Integration Test.lvproj", "My Computer", "", "2014")
    // }
    // stage('cRIO ARM EXE'){
    //     lvBuild("Automated Builds Project\\All Module Integration Test.lvproj", "cRIO9068", "", "2014")
    // }
    // stage('cRIO x86 EXE'){
    //     lvBuild("Automated Builds Project\\All Module Integration Test.lvproj", "cRIO9039", "", "2014")
    // }
    stage('Performance Testing'){
        echo "run performance tests"
        bat "labview-cli --kill --lv-ver 2014 \"${WORKSPACE}\\PerformanceTesting\\Execute PC Benchmarking.vi\" -- \"${WORKSPACE}\" \"PerformanceTesting\\ExecTiming.pcfg\" \"PC Benchmarking\" 60 logfile.tdms"
        bat "labview-cli --kill --lv-ver 2014 \"${WORKSPACE}\\utilities\\Timing Report.vi\" -- \"${WORKSPACE}\" logfile.tdms \"build_temp\" \"exec_time.json\" \"${BUILD_NUMBER}\" PC_Exec_Test" 
    }
    stage ('RT Tests'){
        def config_file = "RT_Exec_Timing.pcfg"
        def target_ip = "10.0.18.181"
        def logfile = "logfile.tdms"
        def logfile_path = "/home/lvuser/dcaf/${logfile}"
        def user = "admin"
        // Deploy config file
        bat "echo y | pscp -pw  ${RIO_PASSWORD} ${WORKSPACE}\\RT-Test\\${config_file} ${user}@${target_ip}:/home/lvuser/${config_file}"
        // delete log directory
        bat "echo y | plink -pw ${RIO_PASSWORD} ${user}@${target_ip} rm -r -f /home/lvuser/dcaf"
        // Run DCAF
        bat "labview-cli --kill --lv-ver 2014 ${WORKSPACE}\\RT-Test\\Execute-RT-9068-Benchmarking.vi -- ${WORKSPACE} RT-Test\\DCAF-RT-Performance-Test.lvproj 9068-Main.vi cRIO home:\\lvuser\\${config_file} 60 ${target_ip}"
        bat "echo y | pscp -pw ${RIO_PASSWORD} ${user}@${target_ip}:${logfile_path} ${WORKSPACE}\\${logfile}"
        bat "labview-cli --kill --lv-ver 2014 \"${WORKSPACE}\\utilities\\Timing Report.vi\" -- \"${WORKSPACE}\" ${logfile} build_temp rt_exec_time.json ${BUILD_NUMBER} RT_Exec_Test"
    }
    stage ('HTML Reports'){
        bat 'mkdir reports'
        bat "copy visualize_exec_time.html reports\\visualize_exec_time.html"
        publishHTML([allowMissing: false, alwaysLinkToLastBuild: true, includes: '**/*.html', keepAll: false, reportDir: 'reports', reportFiles: 'visualize_exec_time.html', reportName: 'Execution Time Trend', reportTitles: 'Execution Time Trends'])
    }
    stage ('Post-Clean'){
        postClean()
    }
}
