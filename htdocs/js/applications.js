// new functionality for anew pages
function halloMapServices() {
$(".map_services_delete").bind('click', function() {
   var $tr= $(this).closest('tr');
   var $trSiblings= $tr.siblings(':visible').length;
   
   if($trSiblings > 4) {
      if(!$tr.hasClass('findInnerHTML')) {
      $tr.remove();   
   } else {
      $tr.removeClass('findInnerHTML').prev().addClass('findInnerHTML');
      $tr.remove();
   }   
   }
   
});
};

function app_group_conf_view(){

    Array.prototype.removeValue = function(name, value){
       var array = $.map(this, function(v,i){
          return v[name] === value ? null : v;
       });
       this.length = 0; //clear original array
       this.push.apply(this, array); //push all elements except the one we want to delete
        }

    var main_Json= {
        'Ford': [
        {
            'groupName': 'Ford_App_GRP1', 
            'profileName': 'Ford_LBS01', 
            'applications': ['Location Based Services', 'Fleet Management'],
            'services': {
                'Garmin_GPSTracker_Ford': ['Get Coordinates', 'Get Speed', 'Email Notifications', 'Battery Alerts', 'Geo-Fence'],
                'HID_AC_PD_006': ['Get Logs', 'Set Lock', 'SMS Alerts']
            }
        }, {
            'groupName': 'Ford_App_GRP2', 
            'profileName': 'Ford_VS01', 
            'applications': ['Smart Home Monitoring', 'Automatic Meter Reading'],
            'services': {
                'Axis_Cam_012': ['Audio Video Recording', 'Multi-Streaming', 'Event Backups', 'Email Notifications', 'Set Alarms']
            }
        }
        ],
        'Volvo': [
        {
            'groupName': 'Volvo_App_GRP1', 
            'profileName': 'Volvo_LBS01', 
            'applications': ['Location Based Services', 'Fleet Management'],
            'services': {
                'Garmin_GPSTracker_Volvo': ['Get Coordinates', 'Email Notifications', 'Battery Alerts', 'Fleet Management'],
                'HID_AC_PD_006': ['Get Logs', 'SMS Alerts']
            }
        }, {
            'groupName': 'Volvo_App_GRP2', 
            'profileName': 'Volvo_VS01', 
            'applications': ['Tower Monitoring', 'Fleet Management'],
            'services': {
                'Axis_Cam_012': ['Audio Video Recording', 'Multi-Streaming', 'Email Notifications', 'Set Alarms']
            }
        }
        ],
        'Smart Homes': [
        {
            'groupName': 'Smart Homes_App_GRP1', 
            'profileName': 'Smart Homes_LBS01', 
            'applications': ['Tower Monitoring', 'Fleet Management'],
            'services': {
                'Ubiquiti_Switch_001': ['Set Speed (10/100/1000mbps)', 'Configurable Alerts'],
                'HID_AC_023': ['Set Lock', 'SMS Alerts'],
                'NEC_Biomatrics_001': ['Alarms', 'Get Logs', 'Face Recognition', 'IRIS Recognition', 'Email Notifications'],
                'RWE_SD_SH': ['Get Alarms']
            }
        }, {
            'groupName': 'Smart Homes_App_GRP2', 
            'profileName': 'Smart Homes_VS01', 
            'applications': ['Smart Home Monitoring', 'Automatic Meter Reading'],
            'services': {
                'Axis_Cam_012': ['Audio Video Recording', 'Multi-Streaming', 'Event Backups', 'Email Notifications', 'Set Alarms']
            }
        }
        ],
        'Tata Motors': [
        {
            'groupName': 'Tata Motors_App_GRP1', 
            'profileName': 'Tata Motors_LBS01', 
            'applications': ['Location Based Services', 'Fleet Management'],
            'services': {
                'HID_AC_PD_006': ['Set Lock', 'SMS Alerts']
            }
        }, {
            'groupName': 'Tata Motors_App_GRP2', 
            'profileName': 'Tata Motors_VS01', 
            'applications': ['Vehicle Tracking System', 'Generator Monitoring System'],
            'services': {
                'Axis_Cam_012': ['Audio Video Recording', 'Multi-Streaming', 'Event Backups', 'Email Notifications', 'Set Alarms']
            }
        }
        ],
        'Godrej Secure': [
        {
            'groupName': 'Godrej Secure_App_GRP1', 
            'profileName': 'Godrej Secure_LBS01', 
            'applications': ['Smart Home Monitoring', 'Automatic Meter Reading'],
            'services': {
                'Ubiquiti_Switch_001': ['Set Speed (10/100/1000mbps)'],
                'HID_AC_023': ['Get Logs', 'SMS Alerts'],
                'NEC_Biomatrics_001': ['Alarms', 'IRIS Recognition', 'Speech Recognition', 'SMS Alerts', 'Email Notifications'],
                'RWE_SD_SH': ['Get Alarms', 'Early Detection Alerts']
            }
        }, {
            'groupName': 'Godrej Secure_App_GRP2', 
            'profileName': 'Godrej Secure_VS01', 
            'applications': ['Tower Monitoring', 'Fleet Management'],
            'services': {
                'Axis_Cam_012': ['Audio Video Recording', 'Get Logs', 'Multi-Streaming', 'Event Mangement', 'Event Backups', 'Set Alarms']
            }
        }
        ],
        'Loxone': [
        {
            'groupName': 'Loxone_App_GRP1', 
            'profileName': 'Loxone_LBS01', 
            'applications': ['Automatic Meter Reading', 'Fleet Management'],
            'services': {
                'Ubiquiti_Switch_001': ['Set Speed (10/100/1000mbps)', 'Configurable Alerts'],
                'HID_AC_023': ['Set Lock', 'SMS Alerts'],
                'NEC_Biomatrics_001': ['Alarms', 'Get Logs', 'Face Recognition', 'Iris Recognition', 'Email Notifications'],
                'RWE_SD_SH': ['Get Alarms', 'Early Detection Alerts']
            }
        }, {
            'groupName': 'Loxone_App_GRP2', 
            'profileName': 'Loxone_VS01', 
            'applications': ['Smart Home Monitoring', 'Tower Monitoring'],
            'services': {
                'Axis_Cam_012': ['Audio Video Recording', 'Multi-Streaming', 'Event Backups', 'Email Notifications', 'Set Alarms']
            }
        }
        ]
    };

    var device_Group_Master_List= {
    'Garmin_GPSTracker_Ford': ['Get Coordinates', 'Get Speed', '2-Way Voice', 'SMS Alerts', 'Email Notifications', 'Battery Alerts', 'Geo-Fence', 'Fleet Management'],
    'Garmin_GPSTracker_Volvo': ['Get Coordinates', 'Get Speed', '2-Way Voice', 'SMS Alerts', 'Email Notifications', 'Battery Alerts', 'Geo-Fence', 'Fleet Management'],
    'HID_AC_PD_006': ['Get Logs', 'Set Lock', 'AudioVisual Indication', 'SMS Alerts', 'Email Notifications'],
    'Axis_Cam_012': ['Audio Video Recording', 'Get Logs', 'Multi-Streaming', 'Event Management', 'Event Backups', 'Email Notifications', 'SMS Alerts', 'Set Alarms'],
    'Ubiquiti_Switch_001': ['Set Speed (10/100/1000mbps)', 'Port Monitoring', 'VLAN', 'Configurable Alerts', 'Email Notifications'],
    'HID_AC_023': ['Get Logs', 'Set Lock', 'AudioVisual Indication', 'SMS Alerts', 'Email Notifications'],
    'SBSmart_RTU4556_001': ['Get Logs', 'Alarms', 'Historical Data', 'SMS Alerts', 'Email Notifications'],
    'NEC_Biomatrics_001': ['High Level Security', 'Alarms', 'Get Logs', 'Face Recognition', 'IRIS Recognition', 'Speech Recognition', 'SMS Alerts', 'Email Notifications'],
    'Radwin_Access Point_002': ['Get Logs', 'High data Rate', 'PTP Connectivity', 'PTMP Connectivity', 'Email Notifications'],
    'D-Link DIR-600L_Router_001': ['Get Logs', 'Real-time Browsing Record', 'Online User Notice', 'Wireless Intrusion Alert', 'Email Notifications', 'Cloud router'],
    'RWE_SD_SH': ['Get Logs', 'Get Alarms', 'Early Detection Alerts']
    };

    var applicationsArray= [
        {value: 'Location Based Services', text: 'Location Based Services'},
        {value: 'Fleet Management', text: 'Fleet Management'},
        {value: 'Smart Home Monitoring', text: 'Smart Home Monitoring'},
        {value: 'Automatic Meter Reading', text: 'Automatic Meter Reading'},
        {value: 'Tower Monitoring', text: 'Tower Monitoring'},
        {value: 'Vehicle Tracking System', text: 'Vehicle Tracking System'},
        {value: 'Generator Monitoring System', text: 'Generator Monitoring System'}
    ];

    var selectedValue;

    function fillMapServicesList(type, addBit, viewBit) {
        var selectedValue= $("#application_group_select_customer").val();
        var trString= '';
        $.each(main_Json[selectedValue], function(i, value) {
            if(value['profileName']=== type) {
                for(var key in value['services']) {
                        trString+= '<tr class="parent_tr"><td colspan="2" class="fixed_tbl_head">'+ key+ '</td></tr>';
                        $.each(device_Group_Master_List[key], function(i, value2) {
                            if(value['services'][key].indexOf(value2) !== -1 && !addBit) {
                                if(viewBit) {
                                    trString+= '<tr><td><input type="checkbox" checked class="chk_bx" value="'+value2+'" /></td><td>'+ value2 + '</td></tr>'
                                } else {
                                    trString+= '<tr><td><input type="checkbox" checked class="chk_bx" value="'+value2+'" /></td><td>'+ value2 + '</td></tr>'
                                    
                                }
                            } else {
                                  if(viewBit) {
                                    
                                // trString+= '<tr><td><input type="checkbox" readonly disabled class="chk_bx" value="'+value2+'" /></td><td>'+ value2 + '</td></tr>'
                                } else {
                                    
                                // trString+= '<tr><td><input type="checkbox" class="chk_bx" value="'+value2+'" /></td><td>'+ value2 + '</td></tr>'
                                    
                                }
                            }
                        });
                }
            }
        });
        // for(var key in device_Group_Master_List) {
        //     trString+= '<tr class="parent_tr"><td colspan="2" class="fixed_tbl_head">'+ key+ '</td></tr>';
        //     console.log(device_Group_Master_List[key]);
        //     $.each(device_Group_Master_List[key], function(i, value2) {
        //         trString+= '<tr><td><input type="checkbox" class="chk_bx" value="'+value2+'" /></td><td>'+ value2 + '</td></tr>'
        //     });
        // }
        $("#show_map_services_list_table").html('');
        $("#show_map_services_list_table").html(trString);
    }

    var selectedValue;


            //Get selected Value in the dropdown
    $("#application_group_select_customer").change(function() {
            selectedValue= $(this).val();
            applicationsArray= [
                {value: 'Location Based Services', text: 'Location Based Services'},
                {value: 'Fleet Management', text: 'Fleet Management'},
                {value: 'Smart Home Monitoring', text: 'Smart Home Monitoring'},
                {value: 'Automatic Meter Reading', text: 'Automatic Meter Reading'},
                {value: 'Tower Monitoring', text: 'Tower Monitoring'},
                {value: 'Vehicle Tracking System', text: 'Vehicle Tracking System'},
                {value: 'Generator Monitoring System', text: 'Generator Monitoring System'}
            ];
            //Get Group Selected from the main_Json according to the value selected in dropdown
            var groupSelected= main_Json[selectedValue];
            $("#application_group_list_table_row tbody#application_group_list_table_tbody tr.application_group_list_table_rows").remove();
            var trString= '';
            for(var k=0; k< groupSelected.length; k++) {
                trString+= '<tr class="application_group_list_table_rows"><td><input type="text" class="txt_bx dashed_border" value="'+groupSelected[k].groupName+'" readonly/></td><td><input type="text" class="txt_bx dashed_border" value="'+groupSelected[k].profileName+'" readonly/></td><td><table width="100%" class="action_tbl" cellspacing="0" cellpadding="0" border="0"><tr><td><center><a href="#"><img src="images/notification.png" class="view_application_group" alt="notification" border="0" height="14" width="14"></a></center></td><td><center><a href="#"><img src="images/pencil.png" class="edit_application_group" alt="edit" border="0" height="20" width="20"></a></center></td><td><center><a href="#"><img src="images/delete.png" class="delete_application_group" alt="delete" border="0" height="12" width="12"></a></center></td></tr></table></td></tr>'
            }
            $("#application_group_list_table_row tbody#application_group_list_table_tbody").html(trString);
            //Show the Division
            $("tr#application_group_list_table_row").show();
            $("tr#view_application_group_row").hide();
            $("tr#edit_application_group_row").hide();
            $("tr#create_new_application_group_row").hide();
            
            $("#show_map_services_list_table").html('');
            $("#view_application_group_row").hide();
            $("#show_map_services_group_row").hide();
        });
    //});
$('.view_application_group').live('click', function() {
    
    $("#edit_application_group_row").hide();
    $("#create_new_application_group_row").hide();
    var parentTr= $(this).closest('table').parent().parent();
    var getApplicationGroupName= parentTr.find('td').first().find('input').val();
    for(var i=0; i< main_Json[selectedValue].length; i++) {
        if(main_Json[selectedValue][i]['groupName']=== getApplicationGroupName) {
            $("#view_selected_application_group_name").val(main_Json[selectedValue][i]['groupName']);
            $("#view_selected_application_group_service_profile").val(main_Json[selectedValue][i]['profileName']);
            $("tr#view_application_group_row tr.view_map_services_row").remove();
            var map_String= '';
            for(var j=0; j< main_Json[selectedValue][i]['applications'].length; j++) {
                map_String+= '<tr class="view_map_services_row"><td class="label"><input type="text" value="'+main_Json[selectedValue][i]['applications'][j]+'" class="dashed_border" readonly/></td><td class="label"><a class="map_service" href="#">Map Service</a></td><td>&nbsp;</td></tr>';
            }
            $("tr#view_application_group_row tr#view_application_row").after(map_String);
            $("#view_application_group_row").show();
            $("#show_map_services_group_row").hide();
        }
    }
   
});

$("#close_viewing_application_group_button").click(function() {
    $("#view_application_group_row").hide();
});


$("#add_application_group_button").click(function() {
    $("#show_map_services_group_row").hide();
    $("#edit_application_group_row").hide();
    $("#view_application_group_row").hide();
    
    $("tr.new_application_group_map_service").remove();
    
    var $select2= $("#new_application_group_application");
    $select2.find('option').remove();
    
    $(applicationsArray).each(function (index, o) {    
        var $option = $("<option/>").attr("value", o.value).text(o.text);
        $select2.append($option);
    });

    var servicesValue= [];
    for(var i=0; i< main_Json[selectedValue].length; i++) {
        var seviceObject= {};
        seviceObject['value']= main_Json[selectedValue][i]['profileName'];
        seviceObject['text']= main_Json[selectedValue][i]['profileName'];
        servicesValue.push(seviceObject);
    }
    
    var $select = $('#new_application_group_service_profile');
    $select.find('option').remove();
    
    $(servicesValue).each(function (index, o) {    
        var $option = $("<option/>").attr("value", o.value).text(o.text);
        $select.append($option);
    });
    $("tr#create_new_application_group_row").show();
    


});

 $("#add_application_service").click(function() {
        var selectedApplication= $("#new_application_group_application").val();

        if(selectedApplication) {
            var map_tr_String= '<tr class="new_application_group_map_service"><td class="label"><input type="text" class="dashed_border" value="'+selectedApplication+'" readonly/></td><td class="label"><a class="map_service" href="#">Map Service</a> <a href="#" class="map_services_delete"><img class="add" src="images/delete.png" align="absmiddle" alt="delete" width="12" height="12" /></a></td><td>&nbsp;</td></tr>';
        
     applicationsArray.removeValue('text', selectedApplication);
     var $select2= $("#new_application_group_application");
     $select2.find('option').remove();
     $(applicationsArray).each(function (index, o) {    
         var $option = $("<option/>").attr("value", o.value).text(o.text);
         $select2.append($option);
     });
     $("tr#add_new_application_row").after(map_tr_String);    
        }

        
 });

$("#create_new_application_group_button").click(function() {
    $("#show_map_services_group_row").hide();
    var newApplicationObject= {};
    newApplicationObject['groupName']= $("#new_application_group_name").val();
    newApplicationObject['profileName']= $("#new_application_group_service_profile").val();
    newApplicationObject['applications']= [];
    $('tr.new_application_group_map_service').each(function() {
        newApplicationObject['applications'].push($(this).find('input').val());
    });
    main_Json[selectedValue].push(newApplicationObject);
    $("#application_group_select_customer").trigger('change');
});


var getApplicationGroupName;
//Bind Edit Button
$(".edit_application_group").live('click', function() {
    $("#show_map_services_group_row").hide();
    $("#view_application_group_row").hide();
    $("#create_new_application_group_row").hide();
    //Find parent Tr
    var parentTr= $(this).closest('table').parent().parent();
    //Find Application Group Name
    getApplicationGroupName= parentTr.find('td').first().find('input').val();
    
    for(var i=0; i< main_Json[selectedValue].length; i++) {
        if(main_Json[selectedValue][i]['groupName']=== getApplicationGroupName) {
            $("#updated_application_group_name").val(main_Json[selectedValue][i]['groupName']);
            
            var serviceValue= [];
            for(var j=0; j< main_Json[selectedValue].length; j++) {
                var serviceOjbect= {};
                serviceOjbect['value']= main_Json[selectedValue][j]['profileName'];
                serviceOjbect['text']= main_Json[selectedValue][j]['profileName'];
                serviceValue.push(serviceOjbect);
            }

            var $select2= $("#updated_application_group_service_profile");
            $select2.find('option').remove();
            $(serviceValue).each(function (index, o) {    
                var $option = $("<option/>").attr("value", o.value).text(o.text);
                $select2.append($option);
            });
            
            $select2.val(main_Json[selectedValue][i]['profileName']);
            

            
            var map_String= '';
            
            for(var k=0; k< main_Json[selectedValue][i]['applications'].length; k++) {
                
                applicationsArray.removeValue('text', main_Json[selectedValue][i]['applications'][k]);
                
                map_String+= '<tr class="edit_map_services_row"><td class="label"><input type="text" value="'+main_Json[selectedValue][i]['applications'][k]+'" class="dashed_border" readonly/></td><td class="label"><a class="map_service" href="#">Map Service</a><a href="#" class="map_services_delete"><img class="add" src="images/delete.png" align="absmiddle" alt="delete" width="12" height="12" /></a></td><td>&nbsp;</td></tr>';
            }
            var $select2= $("#updated_application_group_applications");
            $select2.find('option').remove();
            $(applicationsArray).each(function (index, o) {    
                var $option = $("<option/>").attr("value", o.value).text(o.text);
                $select2.append($option);
            });
            
            $("tr#edit_application_group_row tr.edit_map_services_row").remove();
            
            $("tr#edit_application_group_row tr#edit_application_row").after(map_String);
            
            $("#edit_application_group_row").show();
        }
    }
});
//End Edit Button

$('.edit_add_new_application_service').live('click', function() {
    $("#show_map_services_group_row").hide();
    var selectedValueinCombobox= $("#updated_application_group_applications").val();
    if(selectedValueinCombobox) {
        var map_tr_String= '<tr class="edit_map_services_row"><td class="label"><input type="text" class="dashed_border" value="'+selectedValueinCombobox+'" readonly/></td><td class="label"><a class="map_service" href="#">Map Service</a> <a href="#" class="map_services_delete"><img class="add" src="images/delete.png" align="absmiddle" alt="delete" width="12" height="12" /></a></td><td>&nbsp;</td></tr>';
        applicationsArray.removeValue('text', selectedValueinCombobox);
    var $select2= $("#updated_application_group_applications");
            $select2.find('option').remove();
            $(applicationsArray).each(function (index, o) {    
                var $option = $("<option/>").attr("value", o.value).text(o.text);
                $select2.append($option);
            });
        $("tr#edit_application_row").after(map_tr_String);    
    }
    
});


//Bind Delete Button
$('.delete_application_group').live('click', function() {
    $("#show_map_services_group_row").hide();
    var userResponse= confirm("Are you sure you want to delete?");
    if(userResponse) {
        $("#view_application_group_row").hide();
        $("#create_new_application_group_row").hide();
        $("#edit_application_group_row").hide();
        $(this).closest('tr.application_group_list_table_rows').remove();
        
    };
});
//End Delete Button 

//Bind Map Service Delete Button
$('.map_services_delete').live('click', function() {
    $("#show_map_services_group_row").hide();
    var label= $(this).closest('tr').find('td').first().find('input').val();
    var obj= {};
    obj['value']= label;
    obj['text']= label;
    applicationsArray.push(obj);
    var parentTr= $(this).closest('tr');
    var $select;
    if(parentTr.hasClass('new_application_group_map_service')) {
        $select= $("#new_application_group_application");
    } else {
        $select= $("#updated_application_group_applications");
    }
    $select.find('option').remove();
    $(applicationsArray).each(function (index, o) {    
        var $option = $("<option/>").attr("value", o.value).text(o.text);
        $select.append($option);
    });
    $(this).closest('tr').remove();
});

$("#update_application_group_button").click(function() {
    $("#show_map_services_group_row").hide();
    for(var j=0; j< main_Json[selectedValue].length; j++) {
        if(main_Json[selectedValue][j]['groupName']=== getApplicationGroupName) {
            main_Json[selectedValue][j]['groupName']= $("#updated_application_group_name").val();
            main_Json[selectedValue][j]['profileName']= $("#updated_application_group_service_profile").val();
            var hallo= [];
            $('tr.edit_map_services_row').each(function() {
                hallo.push($(this).find('input').val());
            });
            main_Json[selectedValue][j]['applications']= hallo;
        }
    }
    $("#application_group_select_customer").trigger('change');
});

$("#cancel_update_application_group_button").click(function() {
    $("#show_map_services_group_row").hide();
    $("#edit_application_group_row").hide();
});

$("#cancel_new_application_group_button").click(function() {
    $("#show_map_services_group_row").hide();
    $("#create_new_application_group_row").hide();
});

$('.map_service').live('click', function() {
   $("#show_map_services_group_row").show();
   if($("#edit_application_group_row").css('display') !== 'none') {
       $("#update_map_services_row_button").show();
       $("#update_map_services_row_button").val('Update');
   }
   else {
       $("#update_map_services_row_button").hide();
   }

   var selectService= '';
   if($(this).closest('tr').hasClass('view_map_services_row')) {
       selectService= $("#view_selected_application_group_service_profile").val();
       fillMapServicesList(selectService, false, 'view');
   } else if ($(this).closest('tr').hasClass('new_application_group_map_service')) {
       selectService= $("#new_application_group_service_profile").val();
       fillMapServicesList(selectService);
   } else {
       selectService= $("#updated_application_group_service_profile").val();
       fillMapServicesList(selectService);
   }
   
});

$('#close_map_services_row_button').live('click', function() {
   $("#show_map_services_group_row").hide();
});

$("#update_map_services_row_button").live('click', function() {
   var new_Object= {};
   var last_Parent= '';
   $("#show_map_services_row #show_map_services_list_table").find('tr').each(function(i, tr) {
       if($(tr).hasClass('parent_tr')) {
           var td= $(tr).find('td').html();
           last_Parent= td;
           new_Object[td]= [];
       } else {
           var input= $(tr).find('input[type="checkbox"]:checked');
           if(input.length) {
               new_Object[last_Parent].push(input.val());    
           }
       }
   });
   var selectedCustomer= $("#application_group_select_customer").val();
   var selectedGroup = $("#updated_application_group_name").val();
   $.each(main_Json[selectedCustomer], function(i, obj) {
       if(obj.groupName=== selectedGroup) {
           obj.services= new_Object;
       }
   });
   $("#show_map_services_group_row").hide();
});


}
// 

function get_applications() {
    $.ajax({
        type: "get",
        url: "application_get_list_ajax.py",
        cache: false,
        success: function (result) {
            try {
                result = JSON.parse(result);
            }
            catch (exp) {
                result = []
                $().toastmessage('showNoticeToast', "No Applications found");
            }
            oTable = $('#applications').DataTable({
                "bDestroy": true,
                "bJQueryUI": true,
                "bProcessing": true,
                "sPaginationType": "full_numbers",
                "bStateSave": true,
                "aaData": result
                });
              oTable.fnDraw();
              make_ready_ajax_callers(oTable);
        },
        error: function() {
            $().toastmessage('showErrorToast', "Unhandeled System Exception");
        }
    });
}


function post_application(action, application_id) {
    
    var url = "application_post_detail_ajax.py?action=post"; // the script where you handle the form input.

    if (action == "put"){
        url = "application_put_detail_ajax.py?action=put&application_id=" + application_id;
    }
    $("#manage_application_form").submit(function() {
    event.preventDefault();
    event.stopPropagation();
    var data = data = $('form#manage_application_form').find('input:not([name="all_services"])').serialize();
    var ratingData = [];
    $('form#manage_application_form').find('input[name="all_services"]:checked').each(function(){
        ratingData.push(this.value);
    });
    data += '&all_services='+ratingData.join(',');
    data += '&application_notification='+ $('form#manage_application_form').find("#application_notification").val();
    $.ajax({
           type: "GET",
           url: url,
           data: data,//$("#manage_application_form").serialize(), // serializes the form's elements.
           success: function(result)
           {
               try {
                    result = JSON.parse(result);
                    if (result.success == 0)
                    {
                        $().toastmessage('showSuccessToast', result.message);
                        window.location = "application_list_view.py"
                    }
                    else {
                        $().toastmessage('showErrorToast', result.message);
                    }
                }
                catch (exp) {
                    result = []
                    $().toastmessage('showErrorToast', "Unhandeled System Exception");
                }
           },
           error: function() {
                $().toastmessage('showErrorToast', "Unhandeled System Exception");
            }
        });

    return false; // avoid to execute the actual submit of the form.
    });
}

function fill_application_values(application_id) {

    $.ajax({
       type: "GET",
       url: "application_get_detail_ajax.py?application_id="+application_id,
       success: function(result)
       {
           try {
                result = JSON.parse(result);
                if (result.success == 0)
                {
                    $().toastmessage('showSuccessToast', result.message);
                    $('#manage_application_form *').filter(':input').each(function(){
                        //your code here
                        var e_id = $(this).attr("id");
                        var e_value = result.application_details[e_id];
                        $("#" + e_id).val(e_value);
                    });
                }
                else {
                    $().toastmessage('showErrorToast', result.message);
                }
            }
            catch (exp) {
                result = []
                return false;
            }
       },
       error: function() {
            $().toastmessage('showErrorToast', "Unhandeled System Exception");
        }
    });
}

//===============================================================================================

function get_app_cust() {
    $.ajax({
        type: "get",
        url: "app_cust_list_get_ajax.py",
        cache: false,
        success: function (result) {
            try {
                result = JSON.parse(result);
            }
            catch (exp) {
                result = []
                $().toastmessage('showNoticeToast', "No Application & Customer relation found");
            }
            oTable = $('#app_cust_list').DataTable({
                "bDestroy": true,
                "bJQueryUI": true,
                "bProcessing": true,
                "sPaginationType": "full_numbers",
                "bStateSave": true,
                "aaData": result
                });
              oTable.fnDraw();
              make_ready_ajax_callers(oTable);
        },
        error: function() {
            $().toastmessage('showErrorToast', "Unhandeled System Exception");
        }
    });
}


function post_app_cust(action, application_id, customer_id) {
    
    var url = "app_cust_post_detail_ajax.py?action=post"; // the script where you handle the form input.

    if (action == "put"){
        url = "app_cust_put_detail_ajax.py?action=put&application_id=" + application_id;
    }
    $("#manage_app_cust_form").submit(function() {
    event.preventDefault();
    event.stopPropagation();
    var data = data = $('form#manage_app_cust_form').serialize();
    
    $.ajax({
           type: "GET",
           url: url,
           data: data,//$("#manage_application_form").serialize(), // serializes the form's elements.
           success: function(result)
           {
               try {
                    result = JSON.parse(result);
                    if (result.success == 0)
                    {
                        $().toastmessage('showSuccessToast', result.message);
                        window.location = "app_cust_list_view.py"
                    }
                    else {
                        $().toastmessage('showErrorToast', result.message);
                    }
                }
                catch (exp) {
                    result = []
                    $().toastmessage('showErrorToast', "Unhandeled System Exception");
                }
           },
           error: function() {
                $().toastmessage('showErrorToast', "Unhandeled System Exception");
            }
        });

    return false; // avoid to execute the actual submit of the form.
    });
}
