// We want to draw the table after all of the ajax requests have resolved
// This function is used to trigger the function after the ajax requests have all finished.
function drawTrigger(delta, chartInfo) {
  chartInfo.outstandingRequests += delta;
  if (chartInfo.outstandingRequests === 0)
  {
    chartInfo.DrawChart(chartInfo);
  }
}

function handleAjaxError(request, chartInfo) {
  // But shouldn't 200 not be an error? Well sort of. Because we are requesting files I
  // wrote, it thinks there's an error because the server sees it as text but the browser
  // was expecting jsonp. This is the workaround.
  // It also means that there will be no success calls made if you set your ajax request to that.
  if (request.status != 200) {
      console.log("ERR:");
      console.log(request.status);
  }
  drawTrigger(-1, chartInfo);
}

var dataForChart = {};
function getDataForChart(testName) {
  return (dataForChart[testName] === undefined) ? [] : dataForChart[testName]
}

function jenkinsCallback(data) {
  // This effectively   sets the earlier builds of the pc integration test to use test_name = "PC_Exec_Test"
  var testName = (data["test_name"] === undefined) ? "PC_Exec_Test" : data["test_name"];
  dataForChart[testName] = getDataForChart(testName).concat(data);
}

// Calls Jenkins to get the data dumped from build
function getJenkinsData(build_number, chartInfo) {
  drawTrigger(1, chartInfo);
  console.log('requesting data');
  $.ajax({
    'global': false,
    'url': chartInfo.CreateUrl(build_number),
    'dataType': "jsonp",
    'error': function (request) { handleAjaxError(request, chartInfo); },
  });
}

function createJenkinsDataRequests(chartInfo) {
  return function (data) {
    for (i = data.number; i > chartInfo.firstTest - 1; i--) {
      getJenkinsData(i, chartInfo);
    }
  };
}

function getLastBuild(chartInfo) {
  drawTrigger(1, chartInfo);
  $.ajax({
    'global': false,
    'url': chartInfo.lastBuildUrl,
    'dataType': "jsonp",
    'error': function (request) { handleAjaxError(request, chartInfo); },
  });
}
