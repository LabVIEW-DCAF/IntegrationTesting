function DrawDeployTimeChart(chartInfo) {
  var header = ['Build', 'Deploy Time 9068'];
  var rawData = [header];

  rowData = dataToTable();

  var sortedData = rowData.sort(function(a, b) {
    return a[0] - b[0];
  });
  sortedData.forEach(function(item) { rawData = rawData.concat([item]); });

  console.log("Deploy Time Raw Chart Data:");
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

function dataToTable() {
  var deployData =  getDataForChart('deploy_test');
  return deployData.filter(row => !(isOutlier(row))).map(row => [row['build_number'], row['time_to_deploy_run']/1000]);
}

// I don't want show times when it got hung, etc.
function isOutlier(row) {
  return row['time_to_deploy_run']/1000 > 6000;
}

var deployTimeChartInfo = {
  outstandingRequests: 0,
  firstTest: 11, // First test where data was available for this chart
  lastBuildUrl: 'http://vm-dcaf-bld-14:8080/job/LabVIEW-DCAF/job/IntegrationTesting/job/deploy-time/lastSuccessfulBuild/api/json?jsonp=requestJenkinsDataDeployTime',
  CreateUrl: function (build_number) {return `http://vm-dcaf-bld-14:8080/job/LabVIEW-DCAF/job/IntegrationTesting/job/deploy-time/${build_number}/artifact/build_temp/deploy_test.json`;},
  DrawChart: DrawDeployTimeChart,
};
var requestJenkinsDataDeployTime = createJenkinsDataRequests(deployTimeChartInfo);
