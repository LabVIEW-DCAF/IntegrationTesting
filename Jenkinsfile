#!/usr/bin/env groovy

// testName: The name of the test, as defined inside the json report
// testJsonFile: The filename that the json file with test data will have
// testTarget: The config target name in the pcfg file that will be run for this test.
def executionTimeTest(testName, testJsonFile, target_ip, targetName) {
    // Runs a simple DCAF application, logging the execution time for loops running on the device
    def config_file = "RT_Exec_Timing.pcfg"
    def logfile = "logfile.tdms"
    def logfile_path = "/home/lvuser/dcaf/${logfile}"
    def user = "admin"
    // Deploy config file
    bat "echo y | pscp -pw  ${RIO_PASSWORD} ${WORKSPACE}\\RT-Test\\${config_file} ${user}@${target_ip}:/home/lvuser/${config_file}"
    // delete log directory
    bat "echo y | plink -pw ${RIO_PASSWORD} ${user}@${target_ip} rm -r -f /home/lvuser/dcaf"
    // Run DCAF
    bat "labview-cli --kill --lv-ver 2014 ${WORKSPACE}\\RT-Test\\Execute-RT-Benchmarking.vi -- ${WORKSPACE} RT-Test\\DCAF-RT-Performance-Test.lvproj RT-Main.vi ExecutionTime home:\\lvuser\\${config_file} 60 ${target_ip} ${targetName}"
    bat "echo y | pscp -pw ${RIO_PASSWORD} ${user}@${target_ip}:${logfile_path} ${WORKSPACE}\\${logfile}"
    bat "labview-cli --kill --lv-ver 2014 \"${WORKSPACE}\\utilities\\Timing Report.vi\" -- \"${WORKSPACE}\" ${logfile} build_temp ${testJsonFile} ${BUILD_NUMBER} ${testName}"
}

def utilizationTest(testName, testJsonFile, target_ip, targetName) {
        // Runs a simple DCAF application, logging the resource utilization of the memory and CPU on the device.
        def config_file = "RT_Exec_Timing.pcfg"
        def logfile = "utilization.tdms"
        def logfile_path = "/home/lvuser/dcaf/utilization.1.tdms"
        def user = "admin"
        // Deploy config file
        bat "echo y | pscp -pw  ${RIO_PASSWORD} ${WORKSPACE}\\RT-Test\\${config_file} ${user}@${target_ip}:/home/lvuser/${config_file}"
        // delete log directory
        bat "echo y | plink -pw ${RIO_PASSWORD} ${user}@${target_ip} rm -r -f /home/lvuser/dcaf"
        // Run DCAF
        bat "labview-cli --kill --lv-ver 2014 ${WORKSPACE}\\RT-Test\\Execute-RT-Benchmarking.vi -- ${WORKSPACE} RT-Test\\DCAF-RT-Performance-Test.lvproj RT-Main.vi Utilization home:\\lvuser\\${config_file} 60 ${target_ip} ${targetName}"
        bat "echo y | pscp -pw ${RIO_PASSWORD} ${user}@${target_ip}:${logfile_path} ${WORKSPACE}\\${logfile}"
        bat "labview-cli --kill --lv-ver 2014 \"${WORKSPACE}\\utilities\\Utilization Report.vi\" -- \"${WORKSPACE}\" ${logfile} build_temp ${testJsonFile} ${BUILD_NUMBER} ${testName} 500"
}

echo 'Starting pipeline'

node('2014'){
    echo 'Starting build...'
    stage ('Pre-Clean'){
        preClean()
    }
    // stage ('Update Packages'){
    //     echo 'Updating all installed packages to latest version on internal repo'
    //     vipmUpdate("2014")
    // }
    stage ('SCM_Checkout'){
        echo 'Attempting to get source from repo...'
        checkout scm
    }
    // If this change is a pull request and the DIFFING_PIC_REPO variable is set on the jenkins master, diff vis.
    if (env.CHANGE_ID && env.DIFFING_PIC_REPO) {
        stage ('Diff VIs'){
            lvDiff(lvVersion)
        }
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
    // stage('Performance Testing'){
    //     echo "run performance tests"
    //     bat "labview-cli --kill --lv-ver 2014 \"${WORKSPACE}\\PerformanceTesting\\Execute PC Benchmarking.vi\" -- \"${WORKSPACE}\" \"PerformanceTesting\\ExecTiming.pcfg\" \"PC Benchmarking\" 60 logfile.tdms"
    //     bat "labview-cli --kill --lv-ver 2014 \"${WORKSPACE}\\utilities\\Timing Report.vi\" -- \"${WORKSPACE}\" logfile.tdms \"build_temp\" \"exec_time.json\" \"${BUILD_NUMBER}\" PC_Exec_Test"
    // }
    // stage ('9068 Execution Time'){
    //  executionTimeTest('RT_Exec_Test', 'rt_exec_time.json', '10.0.70.21', '9068')
    // }
    stage ('9038 Execution Time'){
     executionTimeTest('RT_Exec_Test_9038', 'rt_exec_time_9038.json', '10.0.70.14', '9038')
    }
    // stage ('9068 Utilization'){
    //  utilizationTest('RT_Utilization_9068', 'rt_utilization_9068.json', '9068-Utilization', '10.0.70.21', '9068')
    // }
    stage ('9038 Utilization'){//                                           rename target is relevant
        utilizationTest('RT_Utilization_9038', 'rt_utilization_9038.json', '10.0.70.14', '9038')
    }
    stage ('HTML Reports'){
        publishHTML([allowMissing: false, alwaysLinkToLastBuild: true, includes: '**/*.html,**/*.js', keepAll: false, reportDir: 'reports', reportFiles: 'visualize_exec_time.html', reportName: 'Execution Trends', reportTitles: 'Execution Trends'])
    }
    stage ('Post-Clean'){
        postClean()
    }
}
