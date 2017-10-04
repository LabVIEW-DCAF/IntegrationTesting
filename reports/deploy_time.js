function DrawDeployTimeChart(chartInfo) {
  var header = ['Build', 'Deploy Time 9068'];
  var rawData = [header];

  rowData = dataToTable();

  var sortedData = rowData.sort(function(a, b) {
    return a[0] - b[0];
  });
  sortedData.forEach(function(item) { rawData = rawData.concat([item]); });

  console.log("Raw Chart Data:");
  console.log(rawData);
  var data = google.visualization.arrayToDataTable(rawData);

  var chart = new google.visualization.LineChart(document.getElementById("Deploy Time"));

  // Set the number of digits on our data.
  // var formatter = new google.visualization.NumberFormat(
  //   { fractionDigits: 5 }
  //   );
  // formatter.format(data, 1);
  // formatter.format(data, 2);
  // formatter.format(data, 3);
  // formatter.format(data, 4);
  chart_options = {
    title: "Deploy Time",
    legend: { position: 'bottom' },
    focusTarget: 'category',
    hAxis: { title: 'Jenkins Build Number' },
    vAxis: { title: 'Deploy Time (ms)'},
  }
  chart.draw(data, chart_options);
}


deployData = [];
function handleJenkinsDataDeployTime(data) {
  stageData = data['stages'].filter(stage => stage['name'] === 'RT Tests').map(stage => ({ target: '9068', duration: stage['durationMillis']}));
  newData = {build:data['id'], data:stageData}
  console.log('Adding Data');
  console.log(newData);
  deployData = deployData.concat(newData);
}

function dataToTable() {
  console.log("Row Chart Data:");
  console.log(deployData[0]['data'][0]['duration']);
  return deployData.map(row => [row['build'], row['data'][0]['duration']]);
}

// Calls Jenkins to get the data dumped from build
function getJenkinsDataDeployTime(build_number, chartInfo) {
  drawTrigger(1, chartInfo);
  $.ajax({
    'global': false,
    'url': chartInfo.CreateUrl(build_number),
    'dataType': "json",
    'success': function(data) {
      handleJenkinsDataDeployTime(data),
      drawTrigger(-1, chartInfo);
    },
    'error': function (request) { handleAjaxError(request, chartInfo); },
  });
}

function createJenkinsDataRequestsForDeployTime(chartInfo) {
  return function (data) {
    for (i = data.number; i > chartInfo.firstTest - 1; i--) {
      getJenkinsDataDeployTime(i, chartInfo);
    }
  };
}

var deployTimeChartInfo = {
  title: 'deployTime Time', // is this needed?
  dataKey: "RT_Exec_Test_9030", // is this needed?
  outstandingRequests: 0,
  firstTest: 165, // First test where data was available for this chart
  lastBuildUrl: 'http://vm-dcaf-bld-14:8080/job/Integration/lastSuccessfulBuild/api/json?jsonp=requestJenkinsDataDeployTime',
  CreateUrl: function (build_number) {return `http://vm-dcaf-bld-14:8080/job/Integration/${build_number}/wfapi/describe`;},
  DrawChart: DrawDeployTimeChart,
};
var requestJenkinsDataDeployTime = createJenkinsDataRequestsForDeployTime(deployTimeChartInfo);
