#!/usr/bin/env groovy

// testName: The name of the test, as defined inside the json report
// testJsonFile: The filename that the json file with test data will have
// targetIp: The IP address of the target where this test will run
// testTarget: The config target name in the pcfg file that will be run for this test.
def executionTimeTest(testName, testJsonFile, targetIp, targetName) {
    // Runs a simple DCAF application, logging the execution time for loops running on the device
    def config_file = "RT_Exec_Timing.pcfg"
    def logfile = "logfile.tdms"
    def logfile_path = "/home/lvuser/dcaf/${logfile}"
    def user = "admin"
    // Deploy config file
    bat "echo y | pscp -pw  ${RIO_PASSWORD} ${WORKSPACE}\\RT-Test\\${config_file} ${user}@${targetIp}:/home/lvuser/${config_file}"
    // delete log directory
    bat "echo y | plink -pw ${RIO_PASSWORD} ${user}@${targetIp} rm -r -f /home/lvuser/dcaf"
    // Run DCAF
    bat "labview-cli --kill --lv-ver 2014 ${WORKSPACE}\\RT-Test\\Execute-RT-Benchmarking.vi -- ${WORKSPACE} RT-Test\\DCAF-RT-Performance-Test.lvproj RT-Main.vi ExecutionTime home:\\lvuser\\${config_file} 60 ${targetIp} ${targetName}"
    bat "echo y | pscp -pw ${RIO_PASSWORD} ${user}@${targetIp}:${logfile_path} ${WORKSPACE}\\${logfile}"
    bat "labview-cli --kill --lv-ver 2014 \"${WORKSPACE}\\utilities\\Timing Report.vi\" -- \"${WORKSPACE}\" ${logfile} build_temp ${testJsonFile} ${BUILD_NUMBER} ${testName}"
}

// testName: The name of the test, as defined inside the json report
// testJsonFile: The filename that the json file with test data will have
// targetIp: The IP address of the target where this test will run
// testTarget: The config target name in the pcfg file that will be run for this test.
def utilizationTest(testName, testJsonFile, targetIp, targetName) {
        // Runs a simple DCAF application, logging the resource utilization of the memory and CPU on the device.
        def config_file = "RT_Exec_Timing.pcfg"
        def logfile = "utilization.tdms"
        def logfile_path = "/home/lvuser/dcaf/utilization.1.tdms"
        def user = "admin"
        // Deploy config file
        bat "echo y | pscp -pw  ${RIO_PASSWORD} ${WORKSPACE}\\RT-Test\\${config_file} ${user}@${targetIp}:/home/lvuser/${config_file}"
        // delete log directory
        bat "echo y | plink -pw ${RIO_PASSWORD} ${user}@${targetIp} rm -r -f /home/lvuser/dcaf"
        // Run DCAF
        bat "labview-cli --kill --lv-ver 2014 ${WORKSPACE}\\RT-Test\\Execute-RT-Benchmarking.vi -- ${WORKSPACE} RT-Test\\DCAF-RT-Performance-Test.lvproj RT-Main.vi Utilization home:\\lvuser\\${config_file} 60 ${targetIp} ${targetName}"
        bat "echo y | pscp -pw ${RIO_PASSWORD} ${user}@${targetIp}:${logfile_path} ${WORKSPACE}\\${logfile}"
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
    // // If this change is a pull request and the DIFFING_PIC_REPO variable is set on the jenkins master, diff vis.
    // if (env.CHANGE_ID && env.DIFFING_PIC_REPO) {
    //     stage ('Diff VIs'){
    //         lvDiff("2014")
    //     }
    // }
    // stage ('Temp Directories'){
    //     bat 'mkdir build_temp'
    // }
    // stage('Config File Check'){
    //     utfTest("config file compatibility\\config check.lvproj", "2014")
    // }
    // stage('Windows EXE'){
    //     timeout(time: 20, unit: 'MINUTES'){
    //         lvBuild("Automated Builds Project\\All Module Integration Test.lvproj", "My Computer", "", "2014")
    //     }
    // }
    // stage('cRIO ARM EXE'){
    //     timeout(time: 20, unit: 'MINUTES'){
    //         lvBuild("Automated Builds Project\\All Module Integration Test.lvproj", "cRIO9068", "", "2014")
    //     }
    // }
    // stage('cRIO x86 EXE'){
    //     timeout(time: 20, unit: 'MINUTES'){
    //         lvBuild("Automated Builds Project\\All Module Integration Test.lvproj", "cRIO9039", "", "2014")
    //     }
    // }
    // stage('Utilities Unit Tests'){
    //     utfTest("utilities\\UtilitiesTests.lvproj", "2014")
    // }
    // stage('PC Performance Testing'){
    //     timeout(time: 10, unit: 'MINUTES'){
    //         echo "run performance tests"
    //         bat "labview-cli --kill --lv-ver 2014 \"${WORKSPACE}\\PerformanceTesting\\Execute PC Benchmarking.vi\" -- \"${WORKSPACE}\" \"PerformanceTesting\\ExecTiming.pcfg\" \"PC Benchmarking\" 60 logfile.tdms"
    //         bat "labview-cli --kill --lv-ver 2014 \"${WORKSPACE}\\utilities\\Timing Report.vi\" -- \"${WORKSPACE}\" logfile.tdms \"build_temp\" \"exec_time.json\" \"${BUILD_NUMBER}\" PC_Exec_Test"
    //     }
    // }
    stage('Deploy Test'){
        timeout(time: 20, unit: 'MINUTES'){
            bat "echo y | pscp -pw  ${RIO_PASSWORD} ${WORKSPACE}\\RT-Test\\RT_Deploy.pcfg admin@10.0.70.21:/home/lvuser/RT_Deploy.pcfg"
            bat "labview-cli --kill --lv-ver 2014 ${WORKSPACE}\\RT-Test\\Execute-RT-Benchmarking.vi -- ${WORKSPACE} RT-Test\\DCAF-RT-Performance-Test.lvproj RT-Main.vi cRIO home:\\lvuser\\RT_Deploy.pcfg 60 10.0.70.21 9068"
        }
    }
    // stage ('9068 Execution Time'){
    //     timeout(time: 10, unit: 'MINUTES'){
    //       executionTimeTest('RT_Exec_Test', 'rt_exec_time.json', '10.0.18.181', '9068')
    //     }
    // }
    // stage ('9030 Execution Time'){
    //   timeout(time: 10, unit: 'MINUTES'){
    //     executionTimeTest('RT_Exec_Test_9030', 'rt_exec_time_9030.json', '10.1.129.126', '9030')
    //   }
    // }
    // stage ('9068 Utilization'){
    //   timeout(time: 10, unit: 'MINUTES'){
    //     utilizationTest('RT_Utilization_9068', 'rt_utilization_9068.json', '10.0.18.181', '9068')
    //   }
    // }
    // stage ('9030 Utilization'){
    //   timeout(time: 10, unit: 'MINUTES'){
    //     utilizationTest('RT_Utilization_9030', 'rt_utilization_9030.json', '10.1.129.126', '9030')
    //   }
    // }
    stage ('HTML Reports'){
        publishHTML([allowMissing: false, alwaysLinkToLastBuild: true, includes: '**/*.html,**/*.js', keepAll: false, reportDir: 'reports', reportFiles: 'visualize_exec_time.html', reportName: 'Execution Trends', reportTitles: 'Execution Trends'])
    }
    stage ('Post-Clean'){
        postClean()
    }
}
