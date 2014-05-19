/*
 * 
 * Author			:	Yogesh Kumar
 * Project			:	UNMP
 * Version			:	0.1
 * File Name		:	example.js
 * Creation Date	:	12-September-2011
 * Modify Date		:	12-September-2011
 * Purpose			:	Define All Required Javascript Functions
 * Require Library	:	jquery 1.4 or higher version and jquery.validate
 * Browser			:	Mozila FireFox [3.x or higher] and Chrome [all versions]
 * 
 * Copyright (c) 2011 Codescape Consultant Private Limited
 * 
 */

function performActionService(oLink, action, type, site, name1, name2) {
    var oImg = $(oLink).find("img");
    oImg.attr("src", "images/icon_reloading.gif");
    // Chrome and IE are not animating the gif during sync ajax request
    // So better use the async request here
    //get_url('nagios_action.py?action='+action+'&site='+site+'&host='+name1+'&service='+name2,actionResponseHandler, oImg);
    //oImg = null;

    $.ajax({
        type: "get",
        url: 'nagios_action.py',//actionResponseHandler, oImg,
        data: {"action": action, "site": site, "host": name1, "service": name2, "view_type": "UNMP"},
        cache: false,
        success: function (result) {
            //alert(result);
            //oLink;
            result = result.substring(1, result.length - 2);
            result = result.split("','");
            /*
             0 'OK', 1337773481, 0, 'SNMP RESPONSE : OK
             1 0
             2 33 min
             3 1 sec
             4 58 sec
             5 0.128615
             6 SNMP RESPONSE : OK ( Host Uptime - 0 Days, 0 Hours, 34 Mins, 30 Secs)'

             */
            var recTableObj = $(oLink).parent().parent();
            var td0 = $(recTableObj).find("td:eq(0)");
            var span0 = $(td0).find("span");
            $(span0).addClass("icon-" + result[1]);
            var td3 = $(recTableObj).find("td:eq(2)");
            $(td3).html(result[2]);
            var td4 = $(recTableObj).find("td:eq(3)");
            $(td4).html(result[3]);
            var td5 = $(recTableObj).find("td:eq(4)");
            $(td5).html(result[4]);
            var td6 = $(recTableObj).find("td:eq(5)");
            $(td6).html(result[5]);
            var td7 = $(recTableObj).find("td:eq(6)");
            $(td7).html(result[6]);
            oImg.attr("src", "images/icon_reload.gif");
        }
    });

}

$(function () {
    $.graphData = {};
    $.graphObj = null;
    $.tableContainer = $("#table_container");
    $.tableContainerHelp = $("#table_container_help");
    $.graphContainer = $("#graph_container");
    $.graphDiv = $("#graph_div");
    $.graphInterval = $("#graph_time").change(function() {
        $.timeInterval = $.graphInterval.val();
        createGraph();
    });
    
    $("#close_graph").click(function(e) {
        e.preventDefault();
        hideGraph();
    });
    // show graph
    $(".sp_graph").click(function (e) {
        e.preventDefault();
        $.graphInterval.find(">option").eq(0).attr("selected", "selected");
        var $this = $(this);
        $.graphName = $this.data("graph-name");
        $.graphId = $this.data("graph-id");
        $.graphIndex = $this.data("graph-index");
        $.graphUnit = $this.data("graph-unit");
        $.dataType = $this.data("graph-data-type");
        $.hostId = $this.data("host-id");
        $.timeInterval = $.graphInterval.val();
        createGraph();
    });
    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });
    var $hostRelayAction = $("#host_relay_action"), $serviceDetails = $("#host_service_details");
    if ($serviceDetails.length > 0) {
        $hostRelayAction.show();
    }
    else {
        $hostRelayAction.hide();
    }
    //spinStart($("#dashboard1").find("div.sm-spin"),$("#dashboard1").find("div.sm-loading"),{"left":"30px","top":"30px"},12,8,3,7,'#FFF',1,30,true);
    $("div.yo-tabs").yoTabs();

    $(".service-bar").click(function (e) {
        e.preventDefault();
        $("a[href='#content_2']").click();
    });
    $("#host_more_detail_button").toggle(function () {
            $("#more_details_div").show();
            $(this).find("span").html("Hide");
        },
        function () {
            $("#more_details_div").hide();
            $(this).find("span").html("More");
        });
    var green = "images/new/r-green.png", red = "images/new/r-red.png"
    $("a.relay-action").click(function (e) {
        e.preventDefault();
        var $this = $(this), $img = $this.children("img");
        
        $.ajax({
            type: "GET",
            url: "relay_action.py",
            data: {
                action: $this.data("action"),
                arm: $this.data("arm"),
                host_id: $this.data("hid")
            },
            cache: false,
            success: function (result) {
                if (result.status) {
                    $().toastmessage('showSuccessToast', result.msg);
                    if ($img.attr("src") == green) {
                        $img.attr("src", red);
                    }
                    else {
                        $img.attr("src", green);
                    }
                }
                else {
                    $().toastmessage('showWarningToast', result.msg);
                }
            }
        });
    });
    $("a.ivis-action").click(function(e) {
        e.preventDefault();
        var $this = $(this), action = $this.data("action"), port = $this.data("port"), host_id = $this.data("host"),
        $info = $this.parent().next();
        $info.text("Please Wait...");
        $.ajax({
            type: "GET",
            url: "ivis_action.py",
            data: {
                action: action,
                port: port,
                host_id: host_id
            },
            cache: false,
            success: function (result) {
                if (result.status) {
                    $info.text(result.msg);
                }
                else {
                    $info.text(result.msg);
                }
            }
        });
        
    });
    $.serviceSetting = void 0;
    $(".service_setting").colorbox({
        href:function(){
            $.serviceSetting = $(this);
            return "update_form_host_service_parameter.py?parameter_id=" + $.serviceSetting.data("pid");
        },
        title: "Update Service Thresholds",
        opacity: 0.4,
        maxWidth: "50%",
        width:"450px",
        height:"350px",
        onComplete: function(){
            $("#update_service").submit(function(e){
                e.preventDefault();
                $.ajax({
                    type: "get",
                    url: 'update_host_service_parameter.py',
                    data: $(this).serialize(),
                    cache: false,
                    success: function (result) {
                        if (result.status) {
                            $().toastmessage('showSuccessToast', result.msg);
                            var $max = $.serviceSetting.parent().prev().prev().prev(), $min = $max.prev();
                            $min.text(result.data.min_value);
                            $max.text(result.data.max_value);
                            $.colorbox.close();
                        }
                        else {
                            $().toastmessage('showErrorToast', result.msg);
                        }
                    }
                });
                return false;
            });
        }
    });
    var videoHtml = '<div id="help_container"><h1>Video</h1></div>';
    videoHtml +='<form><div class="row-elem" style="margin-bottom:10px;"><input type="button" id="flash_on" class="yo-button" value="Flash On"><input type="button" id="flash_off" class="yo-button" value="Flash Off"></div></form>';
    $("a.video-action").click(function(e) {
        e.preventDefault();
        var $this = $(this), ip = $this.data("ip"), port = $this.data("port"), username_password = $this.data("username-password"), url = "http://", html;
        if (void 0 != username_password) {
            url += username_password;
        }
        if (void 0 != ip) {
            url += ip;
        }
        if (void 0 != port) {
            url += ":" + port;
        }
        html = videoHtml;
        html += '<div style="overflow:hidden;margin:0px 10px;"><iframe src="' + url + '/jsfs.html" width="560px" height="420px" border="0px" style="overflow:hidden;border:0;"></iframe></div>';
        $.colorbox({
            html:html,
            title: "IP Camera",
            opacity: 0.4,
            maxWidth: "80%",
            width:"600px",
            height:"600px",
            onComplete:function(){
                $("#flash_on").click(function() {
                    $.ajax({
                        url: url + "/enabletorch",
                        crossDomain: true,
                        dataType: "jsonp"
                    });
                });
                $("#flash_off").click(function() {
                    $.ajax({
                        url: url + "/disabletorch",
                        crossDomain: true,
                        dataType: "jsonp"
                    });
                });
            }
        });
    });
    $("#page_tip").hide();
//	$("#page_tip").colorbox(
//	{
//		href:"page_tip_device_detail.py",
//		title: "Page Tip",
//		opacity: 0.4,
//		maxWidth: "80%",
//		width:"450px",
//		height:"350px",
//		onComplte:function(){}
//	});
});
function getGraphData (timeInterval) {
    $.ajax({
        type: "get",
        url: 'host_service_parameter_graph.py',
        data: {"host_id": $.hostId, "time_interval": $.timeInterval },
        cache: false,
        success: function (result) {
            if (result.status) {
                $.graphData[timeInterval] = result.data;
                initGraph();
            }
            else {
                $.prompt("Graph data not available. Please check data polling service.", {prefix: 'jqismooth'});
            }
        }
    });
};
function createGraph() {
    if (void 0 == $.graphData[$.timeInterval]) {
        getGraphData($.timeInterval);
    }
    else {
        initGraph();
    }
}
function initGraph() {
    $.graphObj && $.graphObj.destroy();
    var data = $.graphData[$.timeInterval], i, dataLn = data.length, result = {
        data: [],
    }, value, yAxisLabel = [], index, unit = $.graphUnit && $.graphUnit || "" ;
    for (i = 0; i < dataLn; i++) {
        if ("float" == $.dataType) {
            value = parseFloat(data[i][0][$.graphIndex + 1]);
        }
        else if ("integer" == $.dataType) {
            value = parseInt(data[i][0][$.graphIndex + 1], 10);
        }
        else {
            value = data[i][0][$.graphIndex + 1];
            index = $.inArray(value,yAxisLabel);
            if (-1 == index) {
                index = yAxisLabel.push(value) - 1;
            }
            value = index;
        }
        result.data.push([data[i][1], value]);
    }
    $.tableContainer.hide();
    $.tableContainerHelp.hide()
    $.graphContainer.show();
    $.graphDiv.show();
    $.graphObj = new Highcharts.Chart({
        chart: {
            renderTo: 'graph_div',
            type: 'spline',
            marginBottom: 70
        },
        title: {
            text: $.graphName,
            x: -20 //center
        },
        subtitle: {
            text: 'In Last ' + $.timeInterval + ' Min',
            x: -20
        },
        xAxis: {
            type: 'datetime',
            labels: {
                formatter: function () {
                    var hh = Highcharts.dateFormat('%H:%M:%S', this.value);
                    if (hh == "00:00:00") {
                        return Highcharts.dateFormat('%e %b %Y', this.value);
                    }
                    return Highcharts.dateFormat('%H:%M', this.value);
                }
            }
        },
        yAxis: {
            title: {
                text: unit
            },
            labels: {
                formatter: function() {
                    if (yAxisLabel.length > 0) {
                        return yAxisLabel[this.value];
                    }
                    else {
                        return this.value;
                    }
                }
            }
        },
        tooltip: {
            formatter: function() {
                return '<b>'+ Highcharts.dateFormat('%e-%b-%Y %H:%M', this.x) +'</b><br/>'+
                this.series.name + ': ' + (yAxisLabel.length > 0 && yAxisLabel[this.y] || this.y) + ' ' + unit;
            }
        },
        series: [{
            name: $.graphName,
            data: result.data
        }]
    });
}
function hideGraph() {
    $.tableContainer.show();
    $.tableContainerHelp.show();
    $.graphContainer.hide();
    $.graphDiv.hide();
}
