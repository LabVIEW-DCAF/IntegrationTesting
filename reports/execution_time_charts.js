function DrawExecTimeChart(chartInfo) {
  var header = ['Build', 'Max', '99.9 Percentile', '99 Percentile', '95 Percentile']
  var rawData = [header];

  storedData = getDataForChart(chartInfo.dataKey);
  rowData = []
  storedData.forEach(function(row) {
      rowData.push([String(row["build_number"])].concat(row["build_times"]));
  });

  var sortedData = rowData.sort(function(a, b) {
    return a[0] - b[0];
  });
  sortedData.forEach(function(item) { rawData = rawData.concat([item]); });

  console.log("Raw Chart Data:");
  console.log(rawData);
  var data = google.visualization.arrayToDataTable(rawData);

  var chart = new google.visualization.LineChart(document.getElementById(chartInfo.dataKey));

  // Set the number of digits on our data.
  var formatter = new google.visualization.NumberFormat(
    { fractionDigits: 5 }
    );
  formatter.format(data, 1);
  formatter.format(data, 2);
  formatter.format(data, 3);
  formatter.format(data, 4);
  chart_options = {
    title: chartInfo.title,
    legend: { position: 'bottom' },
    focusTarget: 'category',
    hAxis: { title: 'Jenkins Build Number' },
    vAxis: { title: 'Loop Iteration Time (seconds)'},
  }
  chart.draw(data, chart_options);

  var hideMax = document.getElementById("hideMax");
  hideMax[chartInfo.dataKey] = {};
  hideMax[chartInfo.dataKey]["chart"] = chart;
  hideMax[chartInfo.dataKey]["data"] = data;
  hideMax[chartInfo.dataKey]["chartInfo"] = chartInfo;
  hideMax["dataKeys"] = (hideMax["dataKeys"] === undefined) ? new Set([chartInfo.dataKey]) : hideMax["dataKeys"].add(chartInfo.dataKey);
  var maxIsHidden = false;
  hideMax.onclick = function()
  {
    hideMax["dataKeys"].forEach (function (dataKey) {
      view = new google.visualization.DataView(hideMax[dataKey]["data"]);
      if (maxIsHidden) {
        view.setColumns([0,1,2,3,4]);
      }
      else {
        view.hideColumns([1]);
      }
      hideMax[dataKey]["chart"].draw(view, hideMax[dataKey]["chartInfo"]);
    })
    maxIsHidden = !maxIsHidden;
  }
}

// Clicking the button twice will redraw the charts.
function redrawAllExecCharts() {
  var button = document.getElementById("hideMax");
  button.onclick();
  button.onclick();
}

var pcChartInfo = {
  title: 'PC Loop Iteration Time',
  dataKey: "PC_Exec_Test",
  outstandingRequests: 0,
  firstTest: 110, // First test where data was available for this chart
  lastBuildUrl: 'http://vm-dcaf-bld-14:8080/job/Integration/lastSuccessfulBuild/api/json?jsonp=requestJenkinsDataPC',
  CreateUrl: function (build_number) {return `http://vm-dcaf-bld-14:8080/job/Integration/${build_number}/artifact/build_temp/exec_time.json`;},
  DrawChart: DrawExecTimeChart,
};
var requestJenkinsDataPC = createJenkinsDataRequests(pcChartInfo)

var rtExecTime9068ChartInfo = {
  title: '9068 RT Loop Iteration Time',
  dataKey: "RT_Exec_Test",
  outstandingRequests: 0,
  firstTest: 155, // First test where data was available for this chart
  lastBuildUrl: 'http://vm-dcaf-bld-14:8080/job/Integration/lastSuccessfulBuild/api/json?jsonp=requestJenkinsDataRT9068',
  CreateUrl: function (build_number) {return `http://vm-dcaf-bld-14:8080/job/Integration/${build_number}/artifact/build_temp/rt_exec_time.json`;},
  DrawChart: DrawExecTimeChart,
};
var requestJenkinsDataRT9068 = createJenkinsDataRequests(rtExecTime9068ChartInfo)

var rtExecTime9038ChartInfo = {
  title: '9038 RT Loop Iteration Time',
  dataKey: "RT_Exec_Test_9038",
  outstandingRequests: 0,
  firstTest: 48, // First test where data was available for this chart
  lastBuildUrl: 'http://vm-dcaf-bld-14:8080/job/LabVIEW-DCAF/job/IntegrationTesting/job/report-dcaf-errors/lastSuccessfulBuild/api/json?jsonp=requestJenkinsDataRT9038',
  CreateUrl: function (build_number) {return `http://vm-dcaf-bld-14:8080/job/LabVIEW-DCAF/job/IntegrationTesting/job/report-dcaf-errors/${build_number}/artifact/build_temp/rt_exec_time_9038.json`;},
  DrawChart: DrawExecTimeChart,
};
var requestJenkinsDataRT9038 = createJenkinsDataRequests(rtExecTime9038ChartInfo)
