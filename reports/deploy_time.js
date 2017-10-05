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

  chart_options = {
    title: "Deploy Time",
    legend: { position: 'bottom' },
    focusTarget: 'category',
    hAxis: { title: 'Jenkins Build Number' },
    vAxis: { title: 'Deploy Time (seconds)'},
  }
  chart.draw(data, chart_options);
}

deployData = [];
function handleJenkinsDataDeployTime(data) {
  stageData = data['stages'].filter(stage => stage['name'] === 'Deploy Test').map(stage => ({ target: '9068', duration: stage['durationMillis']/1000}));
  newData = {build:data['id'], data:stageData}
  deployData = deployData.concat(newData);
}

function dataToTable() {
  // TODO if I want to do this for different targets, figure out a solution
  return deployData.filter(removeOutliers).map(row => [row['build'], row['data'][0]['duration']]);
}

// I don't want show times when it got hung, etc.
function removeOutliers(row) {
  return row['data'][0]['duration'] < 6000;
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
  outstandingRequests: 0,
  firstTest: 163, // First test where data was available for this chart
  lastBuildUrl: 'http://vm-dcaf-bld-14:8080/job/Integration/lastSuccessfulBuild/api/json?jsonp=requestJenkinsDataDeployTime',
  CreateUrl: function (build_number) {return `http://vm-dcaf-bld-14:8080/job/Integration/${build_number}/wfapi/describe`;},
  DrawChart: DrawDeployTimeChart,
};
var requestJenkinsDataDeployTime = createJenkinsDataRequestsForDeployTime(deployTimeChartInfo);
