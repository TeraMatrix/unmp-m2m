/**
 * This class is reponsible to design multiple knd of charts
 * @class ourChartWidget
 * @method ourChartWidget
 */
function ourChartWidget()
{
	/**
	 * This function creates pie chart
	 * @class ourChartWidget
	 * @method createPieChart
	 * @param chartObject {JSON Object} It contains the pie chart configuration & data json object
	 * @param domElement {String} It is the dom element on which the pie chart will be designed
	 */
	this.createPieChart = function(chartObject,domElement)
	{
		$('#'+domElement).highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false
            },
            title: {
                text: chartObject.title
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            legend: {
	            layout: 'vertical',
	            align: 'right',
	            background: '#FFFFFF'
	        },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            series: [{
                type: 'pie',
                name: 'Device State',
                data: chartObject.chartData
            }]
        });
	},

	/**
	 * This function creates line chart
	 * @class ourChartWidget
	 * @method createLineChart
	 * @param chartObject {JSON Object} It contains the line chart configuration & data json object
	 * @param domElement {String} It is the dom element on which the line chart will be designed
	 */
	this.createLineChart = function(chartObject,domElement)
	{
		$('#'+domElement).highcharts({
            title: {
                text: chartObject.title,
                x: -20 //center
            },
            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            yAxis: {
                title: {
                    text: chartObject.yTitle
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            legend: {
                layout: 'vertical',
                align: 'left',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series: chartObject.chartData
        });
	}
}