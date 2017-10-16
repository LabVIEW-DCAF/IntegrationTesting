// Calls both of the utilization charts functions.
function DrawUtilizationCharts(chartInfo) {
    redrawFunctions.push(function () { DrawCpuUtilizationChart(chartInfo) });
    DrawCpuUtilizationChart(chartInfo);
    redrawFunctions.push(function () { DrawMemoryUtilizationChart(chartInfo)});
    DrawMemoryUtilizationChart(chartInfo);
}

function DrawCpuUtilizationChart(chartInfo) {
    var header = ['Build', 'Mean', 'Std Dev', '99 Percentile']
    var rawData = [header];

    storedData = getDataForChart(chartInfo.dataKey);
    rowData = [];
    storedData.forEach(function(row) {
        rowData.push([
            String(row["build_number"]),
            row["cpu load stats"]["mean"],
            row["cpu load stats"]["standard deviation"],
            row["cpu load stats"]["99 percentile"],
            ]);
    });

    var sortedData = rowData.sort(function(a, b) {
      return a[0] - b[0];
    });
    sortedData.forEach(function(item) { rawData = rawData.concat([item]); });

    console.log("CPU Raw Chart Data:");
    console.log(rawData);
    var data = google.visualization.arrayToDataTable(rawData);

    var chart = new google.visualization.LineChart(document.getElementById(chartInfo.cpu_id));

    // Set the number of digits on our data.
    var formatter = new google.visualization.NumberFormat(
      { fractionDigits: 1 }
      );
    formatter.format(data, 1);
    formatter.format(data, 2);
    formatter.format(data, 3);
    chart_options = {
        title: chartInfo.cpu_title,
        legend: { position: 'bottom' },
        focusTarget: 'category',
        hAxis: { title: 'Jenkins Build Number' },
        vAxis: { title: 'CPU Usage %'},
    },
    chart.draw(data, chart_options);
  }

function DrawMemoryUtilizationChart(chartInfo) {
    var header = ['Build', 'Mean', '99 Percentile', 'Std Dev', 'Slope']
    var rawData = [header];

    storedData = getDataForChart(chartInfo.dataKey);
    rowData = []
    storedData.forEach(function(row) {
        rowData.push([
            String(row["build_number"]),
            row["memory stats"]["mean"],
            row["memory stats"]["99 percentile"],
            row["memory stats"]["std dev"],
            row["memory stats"]["slope"],
            ]);
    });

    var sortedData = rowData.sort(function(a, b) {
      return a[0] - b[0];
    });
    sortedData.forEach(function(item) { rawData = rawData.concat([item]); });

    console.log("Memory Raw Chart Data:");
    console.log(rawData);
    var data = google.visualization.arrayToDataTable(rawData);

    var chart = new google.visualization.LineChart(document.getElementById(chartInfo.mem_id));

    // Set the number of digits on our data.
    var formatter = new google.visualization.NumberFormat(
      { fractionDigits: 0 }
      );
    formatter.format(data, 1);
    formatter.format(data, 2);
    var formatter = new google.visualization.NumberFormat(
      { fractionDigits: 5 }
    );
    formatter.format(data, 3);
    formatter.format(data, 4);

    chart_options = {
        title: chartInfo.mem_title,
        legend: { position: 'bottom' },
        focusTarget: 'category',
        hAxis: { title: 'Jenkins Build Number' },
        vAxes: {
          0: { title: 'Memory Usage'},
          1: { title: 'Slope / Standard Deviation'},
        },
        series: {
          1: {targetAxisIndex: 0},
          2: {targetAxisIndex: 1},
          3: {targetAxisIndex: 1},
          4: {targetAxisIndex: 1},
        },
    };
    chart.draw(data, chart_options);
}

var rtUtilization9068ChartInfo = {
    cpu_title: '9068 RT CPU Utilization',
    mem_title: '9068 RT Memory Utilization',
    dataKey:"RT_Utilization_9068",
    cpu_id: "RT_Utilization_9068_CPU",
    mem_id: "RT_Utilization_9068_MEM",
    outstandingRequests: 0,
    firstTest: 170, // First test where data was available for this chart
    lastBuildUrl: 'http://vm-dcaf-bld-14:8080/job/Integration/lastSuccessfulBuild/api/json?jsonp=requestJenkinsDataRT9030',
    CreateUrl: function (build_number) {return `http://vm-dcaf-bld-14:8080/job/Integration/${build_number}/artifact/build_temp/rt_utilization_9068.json`;},
    DrawChart: DrawUtilizationCharts,
};
var requestJenkinsData9068Util = createJenkinsDataRequests(rtUtilization9068ChartInfo)

var rtUtilization9030ChartInfo = {
    cpu_title: '9030 RT CPU Utilization',
    mem_title: '9030 RT Memory Utilization',
    dataKey:"RT_Utilization_9030",
    cpu_id: "RT_Utilization_9030_CPU",
    mem_id: "RT_Utilization_9030_MEM",
    outstandingRequests: 0,
    firstTest: 170, // First test where data was available for this chart
    lastBuildUrl: 'http://vm-dcaf-bld-14:8080/job/Integration/lastSuccessfulBuild/api/json?jsonp=requestJenkinsData9030Util',
    CreateUrl: function (build_number) {return `http://vm-dcaf-bld-14:8080/job/Integration/${build_number}/artifact/build_temp/rt_utilization_9030.json`;},
    DrawChart: DrawUtilizationCharts,
};
var requestJenkinsData9030Util = createJenkinsDataRequests(rtUtilization9030ChartInfo)
