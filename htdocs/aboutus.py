def home(h):
    global html
    html = h

    css_list=["css/style.css"]

    javascript_list=["js/highcharts.js","js/ourChartWidget.js"]

    all_btn=""

    html.new_header("Applications", "aboutus.py", all_btn, css_list, javascript_list)

    html.write(""" 
        <div class="chartWrapper">
            <div class="pieChartContainer">
                <div class="pieChartBlock" id="pieChart1"></div>
                <div class="pieChartBlock" id="pieChart2"></div>
                <div class="clear"></div>
            </div>
            <div class="pieChartContainer">
                <div class="pieChartBlock" id="pieChart3"></div>
                <div class="pieChartBlock" id="pieChart4"></div>
                <div class="clear"></div>
            </div>
            <div class="lineChartContainer">
                <div class="lineChartBlock" id="lineChart1"></div>
                <div class="clear"></div>
            </div>
        </div>
    """)
    html.write("""
       <script type="text/javascript">



    $(document).ready(function(e)

    {

        var completeDataArray = [] ,

            dataValObj = {} ,

            chartObject = {};



        /*First Pie Chart Data Object Creation Starts*/



        completeDataArray = [];

        dataValObj = {};

        dataValObj["name"] = "Active";

        dataValObj["y"] = 25.0;

        dataValObj["color"] = "#2f7ed8";

        dataValObj["sliced"] = false;

        dataValObj["selected"] = false;     



        completeDataArray.push(dataValObj);



        dataValObj = {};

        dataValObj["name"] = "Disabled";

        dataValObj["y"] = 18.5;

        dataValObj["color"] = "#33c6e7";

        dataValObj["sliced"] = false;

        dataValObj["selected"] = false;     



        completeDataArray.push(dataValObj);



        dataValObj = {};

        dataValObj["name"] = "Under Maintenance";

        dataValObj["y"] = 35.0;

        dataValObj["color"] = "#CCCCCC";

        dataValObj["sliced"] = false;

        dataValObj["selected"] = false;     



        completeDataArray.push(dataValObj);



        dataValObj = {};

        dataValObj["name"] = "Un Assigned";

        dataValObj["y"] = 21.5;

        dataValObj["color"] = "#a4d53a";

        dataValObj["sliced"] = false;

        dataValObj["selected"] = false;     



        completeDataArray.push(dataValObj);



        /*First Pie Chart Data Object Creation End*/



        

        /*Create instance of Chart Widget Class*/

        var ourChartWidgetObject = new ourChartWidget();

        chartObject = {};

        chartObject["title"] = "Device States";

        chartObject["chartData"] = completeDataArray;



        /*Call Pie Chart Function*/

        ourChartWidgetObject.createPieChart(chartObject,"pieChart1");





        /*Second Pie Chart Data Object Creation Starts*/



        completeDataArray = [];

        dataValObj = {};

        dataValObj["name"] = "Active";

        dataValObj["y"] = 25.0;

        dataValObj["color"] = "#2f7ed8";

        dataValObj["sliced"] = false;

        dataValObj["selected"] = false;     



        completeDataArray.push(dataValObj);



        dataValObj = {};

        dataValObj["name"] = "Inactive";

        dataValObj["y"] = 18.5;

        dataValObj["color"] = "#33c6e7";

        dataValObj["sliced"] = false;

        dataValObj["selected"] = false;     



        completeDataArray.push(dataValObj);



        dataValObj = {};

        dataValObj["name"] = "Suspended";

        dataValObj["y"] = 35.0;

        dataValObj["color"] = "#CCCCCC";

        dataValObj["sliced"] = false;

        dataValObj["selected"] = false;     



        completeDataArray.push(dataValObj);



        dataValObj = {};

        dataValObj["name"] = "Retired";

        dataValObj["y"] = 21.5;

        dataValObj["color"] = "#a4d53a";

        dataValObj["sliced"] = false;

        dataValObj["selected"] = false;     



        completeDataArray.push(dataValObj);



        /*Second Pie Chart Data Object Creation End*/



        chartObject = {};

        chartObject["title"] = "Application Subscription";

        chartObject["chartData"] = completeDataArray;



        /*Call Pie Chart Function*/

        ourChartWidgetObject.createPieChart(chartObject,"pieChart2");





        /*Third Pie Chart Data Object Creation Starts*/



        completeDataArray = [];

        dataValObj = {};

        dataValObj["name"] = "BTS Monitoring";

        dataValObj["y"] = 25.0;

        dataValObj["color"] = "#2f7ed8";

        dataValObj["sliced"] = false;

        dataValObj["selected"] = false;     



        completeDataArray.push(dataValObj);



        dataValObj = {};

        dataValObj["name"] = "ATM Monitoring";

        dataValObj["y"] = 8.5;

        dataValObj["color"] = "#33c6e7";

        dataValObj["sliced"] = false;

        dataValObj["selected"] = false;     



        completeDataArray.push(dataValObj);



        dataValObj = {};

        dataValObj["name"] = "DG Set Monitoring";

        dataValObj["y"] = 35.0;

        dataValObj["color"] = "#CCCCCC";

        dataValObj["sliced"] = false;

        dataValObj["selected"] = false;     



        completeDataArray.push(dataValObj);



        dataValObj = {};

        dataValObj["name"] = "AMR";

        dataValObj["y"] = 21.5;

        dataValObj["color"] = "#a4d53a";

        dataValObj["sliced"] = false;

        dataValObj["selected"] = false;     



        completeDataArray.push(dataValObj);



        dataValObj = {};

        dataValObj["name"] = "LDS";

        dataValObj["y"] = 10.5;

        dataValObj["color"] = "#ff0000";

        dataValObj["sliced"] = false;

        dataValObj["selected"] = false;     



        completeDataArray.push(dataValObj);



        /*Third Pie Chart Data Object Creation End*/



        chartObject = {};

        chartObject["title"] = "Customer Bifurcation";

        chartObject["chartData"] = completeDataArray;



        /*Call Pie Chart Function*/

        ourChartWidgetObject.createPieChart(chartObject,"pieChart3");



                

        /*Fourth Pie Chart Data Object Creation Starts*/



        completeDataArray = [];

        dataValObj = {};

        dataValObj["name"] = "Assigned";

        dataValObj["y"] = 2.0;

        dataValObj["color"] = "#2f7ed8";

        dataValObj["sliced"] = false;

        dataValObj["selected"] = false;     



        completeDataArray.push(dataValObj);



        dataValObj = {};

        dataValObj["name"] = "Unassigned";

        dataValObj["y"] = 18.5;

        dataValObj["color"] = "#33c6e7";

        dataValObj["sliced"] = false;

        dataValObj["selected"] = false;     



        completeDataArray.push(dataValObj);



        dataValObj = {};

        dataValObj["name"] = "Resolved";

        dataValObj["y"] = 58.0;

        dataValObj["color"] = "#CCCCCC";

        dataValObj["sliced"] = false;

        dataValObj["selected"] = false;     



        completeDataArray.push(dataValObj);



        dataValObj = {};

        dataValObj["name"] = "Blocking";

        dataValObj["y"] = 21.5;

        dataValObj["color"] = "#a4d53a";

        dataValObj["sliced"] = false;

        dataValObj["selected"] = false;     



        completeDataArray.push(dataValObj);



        /*Fourth Pie Chart Data Object Creation End*/





        chartObject = {};

        chartObject["title"] = "Ticket Status";

        chartObject["chartData"] = completeDataArray;



        /*Call Pie Chart Function*/

        ourChartWidgetObject.createPieChart(chartObject,"pieChart4");





        /*Line Chart Data Object Starts*/

        var lineObject = {} ,

            lineDataArray = [] ,

            completeLineDataObject = [];



        /*First Line Data Object Starts*/

        lineDataArray = [] ;

        lineDataArray.push(7.0);lineDataArray.push(6.9);lineDataArray.push(9.5);lineDataArray.push(5.8);lineDataArray.push(15.8);lineDataArray.push(25.8);lineDataArray.push(20.8);lineDataArray.push(38.5);

        lineObject["name"] = "TTSL-ATM";

        lineObject["data"] = lineDataArray;

        completeLineDataObject.push(lineObject);

        /*First Line Data Object Ends*/



        /*Second Line Data Object Starts*/

        lineDataArray = [] ;

        lineObject = {};

        lineDataArray.push(-0.2);lineDataArray.push(0.8);lineDataArray.push(5.7);lineDataArray.push(11.3);lineDataArray.push(17.0);lineDataArray.push(22.0);lineDataArray.push(24.8);lineDataArray.push(20.5);

        lineObject["name"] = "TTSL-BTS MON";

        lineObject["data"] = lineDataArray;

        completeLineDataObject.push(lineObject);



        /*Second Line Data Object Ends*/



        chartObject = {};

        chartObject["title"] = "Appication TPS";

        chartObject["yTitle"] = "";

        chartObject["chartData"] = completeLineDataObject;



        /*Line Chart Data Object Ends*/



        /*Call Line Chart Function*/

        ourChartWidgetObject.createLineChart(chartObject,"lineChart1");

    });



</script> 
    """)
    html.new_footer()
