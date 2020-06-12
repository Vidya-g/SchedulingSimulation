var colors = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
    '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
    '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
    '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
    '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
    '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
    '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
    '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
    '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
    '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'
];
var lcm = 0;
	var startAxes = 0;
	var endAxes = 50;


function createGraph(canvasID, title, schedulingArray, inputArray) {
    if(schedulingArray.length == 0 ){
        return;
    }
    var labels = [];
    var data = generateGraph(schedulingArray);
    var dataSet = [];
    var set = {};
    var i;
    var axisLabel = []
    for (i = startAxes; i < endAxes ; i++) {
        axisLabel.push(i.toString());
    }
    for (i = 0; i < noOfTasks; i++) {
        var inputTask = '[' + inputArray[i][1] + ', ' + inputArray[i][2] + ', ' + inputArray[i][3] + ', ' + inputArray[i][4] + ']';
        var temp = {};
        temp['catergoryPercentage'] = 1;
        temp['barPercentage'] = 1.2;
        temp['barThickness'] = 'flex';
        temp['label'] = 'Task ' + (i + 1).toString() + inputTask;
        temp['backgroundColor'] = colors[i];
        temp['data'] = data[i];
        dataSet.push(temp);
    }
    var barChartData = {
        labels: axisLabel,
        datasets: dataSet
    };

    var ctx = document.getElementById(canvasID);
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: barChartData,
        options: {
            legend: {
                labels: {

                    fontColor: 'white'
                }
            },
            title: {
                display: true,
                text: title,
                fontColor: 'white'
            },

            responsive: true,
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                    stacked: true,
                }],
                yAxes: [{
                    stacked: true,
                    display: false,
                }]

            }
        }
    });
    myChart.canvas.parentNode.style.height = '125px';

};



function generateGraph(dataArray) {
    var timeLineLength = dataArray[0].length;
    var startingPoints = dataArray[0];
    var tasks = dataArray[1];
    if (lcm == 0) {
        lcm = dataArray[0][timeLineLength - 1];
        if (endAxes > lcm) {
            endAxes = lcm;
        }
    }
    var i = 0;
    var j;
    var tasksDataset = new Array(noOfTasks);
    for (i = 0; i < noOfTasks; i++) {
        tasksDataset[i] = new Array(endAxes - startAxes).fill(0);
    }
    for (i = 0; i < startingPoints.length; i++) {
        var start = startingPoints[i]
        var end = startingPoints[i + 1]
        var taskNo = tasks[i]

        if (taskNo > 0) {
            taskNo = taskNo - 1
            for (j = start; j < end; j++) {
                tasksDataset[taskNo][j - startingPoints[0]] = 1;
            }
        }
    }
    return tasksDataset;

}

function next(canvasID, title, schedulingArray, inputArray, chartID) {
    chooseGraph(canvasID, chartID); // the arguments will be inverted, i.e canvasID is chart ID and chartID is canvasID
    startAxes = endAxes + 1;
    endAxes = endAxes + 50;
    lcm = schedulingArray[0][schedulingArray[0].length - 1];
    if (endAxes > lcm) {
        endAxes = lcm;
    }
    var schedulingArrayTimeLineCopy = schedulingArray[0].slice(startAxes, endAxes);
    var schedulingArrayTaskCopy = schedulingArray[1].slice(startAxes, endAxes);
    var schedulingArrayCopy = [];
    schedulingArrayCopy[0] = schedulingArrayTimeLineCopy;
    schedulingArrayCopy[1] = schedulingArrayTaskCopy;
    createGraph(canvasID, title, schedulingArrayCopy, inputArray);
}

function prev(canvasID, title, schedulingArray, inputArray, chartID) {
    chooseGraph(canvasID, chartID); // the arguments will be inverted, i.e canvasID is chart ID and chartID is canvasID
    startAxes = startAxes - 50;
    if (startAxes < 0) {
        return false;
    }
    endAxes = startAxes - 1;
    lcm = schedulingArray[0][schedulingArray[0].length - 1];
    var schedulingArrayTimeLineCopy = schedulingArray[0].slice(startAxes, endAxes);
    var schedulingArrayTaskCopy = schedulingArray[1].slice(startAxes, endAxes);
    var schedulingArrayCopy = [];
    schedulingArrayCopy[0] = schedulingArrayTimeLineCopy;
    schedulingArrayCopy[1] = schedulingArrayTaskCopy;
    createGraph(canvasID, title, schedulingArrayCopy, inputArray);
}