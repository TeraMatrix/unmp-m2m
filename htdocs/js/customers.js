/*===========================new customer functions==============================*/
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BEGIN 19th May Monday

// function createSelectBox(domElement, callback) {
//    var scombobox= $(domElement).scombobox({
//       highlight: true
//    });
//    callback(scombobox);
// }

function commonTR(){
  $(".addChildTr").click(function(event) {
     event.preventDefault();
     var parentTable, $trToAdd, innerHTMLSubString= "";
     parentTable= $(this).closest('table');
     $trToAdd= parentTable.find('tr.findInnerHTML');
     $.each($trToAdd, function(i, tr) {
        innerHTMLSubString+= $(tr)[0].outerHTML;
        $(tr).removeClass('findInnerHTML');
     });
     $trToAdd.last().after(innerHTMLSubString);
  });

  $(".addParentTable").click(function(event) {
     event.preventDefault();
     var parentTable= $(this).closest('table');
     $(parentTable).append(parentTable[0].innerHTML)
  }); 
}

function customer_add_view_new(){
  commonTR();
  $("#billing_determinant_select_box").change(function() {
         var selectedValue= $(this).val();
         if(selectedValue=== 'TPS') {
            $("#billing_dept_table").find('tr:nth-child(4)').show();
            $("#billing_dept_table").find('tr:nth-child(5)').show();
            $("#billing_dept_table").find('tr:nth-child(6)').show();
         } else {
            $("#billing_dept_table").find('tr:nth-child(4)').hide();
            $("#billing_dept_table").find('tr:nth-child(5)').hide();
            $("#billing_dept_table").find('tr:nth-child(6)').hide();
         }
      });
};

function customer_control_view() {
  commonTR();
  var cust_detail= {
   'Ford': {'subscriptionNumber': 'xxx-xxx-xx', 'contactPersonName': 'Lorem Ipsum', 'email': 'a@e.com', 'portalId': 'xyz', 'portalLink': 'LinktoPortal', 'portalTheme': 'Dark Gray', 'usersList': [{'userName': 'user1', 'password': 'aaa', 'email': 'a@e.com'}, {'userName': 'user1', 'password': 'aaa', 'email': 'a@e.com'}, {'userName': 'user1', 'password': 'aaa', 'email': 'a@e.com'}]},
   'Option2': {'subscriptionNumber': 'xxx-yyyy-zz', 'contactPersonName': 'Dolor Ipsum', 'email': 'a@e.org', 'portalId': 'zyx', 'portalLink': 'PortalToLink', 'portalTheme': 'Light Gray', 'usersList': [{'userName': 'user2', 'password': 'aaa', 'email': 'a@e.net'}, {'userName': 'user2', 'password': 'aaa', 'email': 'a@e.net'}, {'userName': 'user2', 'password': 'aaa', 'email': 'a@e.net'}]}
  };

  var select_profile_details= {
   'Ford': [{'deviceType': 'garminGPS_Ford', 'services': 8}, {'deviceType': 'garminGPS_Ford', 'services': 11}, {'deviceType': 'garminGPS_Ford', 'services': 4}],
   'Option2': [{'deviceType': 'garminGPS_Option2', 'services': 8}, {'deviceType': 'garminGPS_Option2', 'services': 12}, {'deviceType': 'garminGPS_Option2', 'services': 3}],
  };

function looper(parentEm, selectedEm, selectedEm2, attribute) {
   $(parentEm).find(selectedEm).each(function(i, textbox) {
         $(textbox).attr('readonly', attribute);
      });

      $(parentEm).find(selectedEm2).each(function(i, textbox) {
         $(textbox).attr('readonly', attribute);
      });
  };

  $("#c_c_p_select_customer_select").change(function() {
     var selectedValue= $(this).val();
     $("tr#c_c_p_selected_customer_title_tr").find('strong').html(selectedValue+ ' :');
     $(this).closest('tbody').children().show();
     for (var key in cust_detail) {
        if(key=== selectedValue) {
           var obj = cust_detail[key];
           for (var prop in obj) {
              if(prop=== 'usersList') {
                 $("table#c_c_p_user_details_table tr.c_c_p_user_details_users_row").remove();
                 var userDetailsTrString= '';
                 $.each(obj[prop], function(i, obj2) {
                    if(i===obj[prop].length- 1) {
                       userDetailsTrString+= '<tr class="c_c_p_user_details_users_row findInnerHTML"><td>User Name</td><td><input type="text" value="'+ obj2.userName+ '" class="txt_bx" readonly=""></td><td>Password</td><td><input type="password" value="'+ obj2.password+ '" class="txt_bx" readonly=""></td><td>Email</td><td><input type="text" value="'+ obj2.email+ '" class="txt_bx" readonly=""></td></tr>';
                    } else {
                       userDetailsTrString+= '<tr class="c_c_p_user_details_users_row"><td>User Name</td><td><input type="text" value="'+ obj2.userName+ '" class="txt_bx" readonly=""></td><td>Password</td><td><input type="password" value="'+ obj2.password+ '" class="txt_bx" readonly=""></td><td>Email</td><td><input type="text" value="'+ obj2.email+ '" class="txt_bx" readonly=""></td></tr>';
                    }
                 });
                   $(userDetailsTrString).insertAfter( "table#c_c_p_user_details_table tr#c_c_p_user_details_header_row" );

              } else {
                 if(obj.hasOwnProperty(prop)){
                    $('table#customer_control_panel_inner_table input[type="text"]#c_c_p_'+prop).val('');
                    $('table#customer_control_panel_inner_table input[type="text"]#c_c_p_'+prop).val(obj[prop]);
                 }   
              }
           }
        }
     }
  });

  $("#service_profile_profile_select").change(function() {
       var selectedValue= $(this).val();
       $(this).closest('tbody').children('tr:hidden').show();
       for (var key in select_profile_details) {
          if(key=== selectedValue) {
             var obj = select_profile_details[key];
             $( "table#c_c_p_device_type_services_table tbody" ).empty();
             var trString= '';
             trString+= '<tr><th width="50%;">DeviceType</th><th width="50%;">Services</th></tr>';
             $.each(obj, function(i, eachObj) {
                trString+= '<tr><td>'+eachObj.deviceType+'</td><td>'+eachObj.services+'<input type="button" class="btn" style="visibility:hidden" value="hidden" /></td></tr>';
             });
             $( "table#c_c_p_device_type_services_table tbody" ).html(trString);
          }
       }
    });     

 $('input[type="button"]#manage_user_details').click(function() {
    
    //Show next a href for adding rows
    $("a#add_c_c_p_user_details_row").show();

    looper("table#c_c_p_user_details_table", 'input[type="text"][readonly]', 'input[type="password"][readonly]', false);

    $("table#c_c_p_user_details_table tr#c_c_p_user_details_table_save_tr").show();

    $('input[type=button]#user_details_table_save_button').click(function() {
       looper("table#c_c_p_user_details_table", 'input[type="text"]', 'input[type="password"]', true);
       $("table#c_c_p_user_details_table tr#c_c_p_user_details_table_save_tr").hide();
       $("a#add_c_c_p_user_details_row").hide();
    });
 });
};

function customer_device_service_view(){


function groupTable($rows, startIndex, total){
    if (total === 0){
        return;
    }
    var i , currentIndex = startIndex, count=1, lst=[];
    var tds = $rows.find('td:eq('+ currentIndex +')');
    var ctrl = $(tds[0]);
    lst.push($rows[0]);
    for (i=1;i<=tds.length;i++){
        if (ctrl.text() ==  $(tds[i]).text()){
            count++;
            $(tds[i]).addClass('deleted');
            lst.push($rows[i]);
        }
        else{
            if (count>1){
                ctrl.attr('rowspan',count);
                groupTable($(lst),startIndex+1,total-1)
            }
            count=1;
            lst = [];
            ctrl=$(tds[i]);
            lst.push($rows[i]);
        }
    }
}


  var buttonHtmlString = '<button class="btn btn-default view_application_group" style="margin:5px;"><i class="fa fa-pencil"></i>View</button><button class="btn btn-info edit_application_group" style="margin:5px;"><i class="fa fa-pencil-square-o"></i>Edit</button><button class="btn btn-danger confirm-dialog" style="margin:5px;"><i class="fa  fa-trash-o"></i>Delete</button>';

var customer_details= {
    'Ford': {
        'customer_name': 'Ford',
        'portal_Id': 'TTL_Ford',
        'portal_Link': 'http://ttslm2m/ford',
        'color_theme': 'Sea Gray',
        'serviceProfiles': [
            {
                'name': 'Ford_LBS01',
                'deviceGroups': 'Garmin_GPSTracker_Ford',
                'deviceService': 5,
                'P/F Services': 11,
                'actions': buttonHtmlString
            },
            {
                'name': 'Ford_LBS01',
                'deviceGroups': 'HID_AC_006',
                'deviceService': 2,
                'P/F Services': 11,
                'actions': buttonHtmlString
            },
            {
                'name': 'Ford_VS01',
                'deviceGroups': 'Axis_Cam_012',
                'deviceService': 5,
                'P/F Services': 11,
                'actions': buttonHtmlString
            }
        ]
    },
    'Volvo': {
        'customer_name': 'Volvo', 
        'portal_Id': 'TTL_Volvo', 
        'portal_Link': 'http://ttslm2m/volvo', 
        'color_theme': 'Sea Gray',
        'serviceProfiles': [
            {
                'name': 'Volvo_LBS01',
                'deviceGroups': 'Garmin_GPSTracker_Volvo',
                'deviceService': 5,
                'P/F Services': 10,
                'actions': buttonHtmlString
            },
            {
                'name': 'Volvo_LBS01',
                'deviceGroups': 'HID_AC_006',
                'deviceService': 2,
                'P/F Services': 10,
                'actions': buttonHtmlString
            },
            {
                'name': 'Volvo_VS01',
                'deviceGroups': 'Axis_Cam_012',
                'deviceService': 4,
                'P/F Services': 10,
                'actions': buttonHtmlString
            }
        ]
    },
    'Tata Motors': {
        'customer_name': 'Tata Motors', 
        'portal_Id': 'TTL_Tata', 
        'portal_Link': 'http://ttslm2m/Tata', 
        'color_theme': 'Blue',
        'serviceProfiles': [
            {
                'name': 'Tata_LBS01',
                'deviceGroups': 'Garmin_GPSTracker_Tata',
                'deviceService': 5,
                'P/F Services': 13,
                'actions': buttonHtmlString
            },
            {
                'name': 'Tata_LBS01',
                'deviceGroups': 'HID_AC_006',
                'deviceService': 2,
                'P/F Services': 13,
                'actions': buttonHtmlString
            },
            {
                'name': 'Tata_VS01',
                'deviceGroups': 'Axis_Cam_012',
                'deviceService': 5,
                'P/F Services': 13,
                'actions': buttonHtmlString
            }
        ]
    },
    'Smart Homes': {
        'customer_name': 'Smart Homes', 
        'portal_Id': 'TTL_Smart Homes', 
        'portal_Link': 'http://ttslm2m/Smart Homes', 
        'color_theme': 'Black',
        'serviceProfiles': [
            {
                'name': 'Smart Homes_LBS01',
                'deviceGroups': 'Ubiquiti_Switch_001',
                'deviceService': 2,
                'P/F Services': 11,
                'actions': buttonHtmlString
            },
            {
                'name': 'Smart Homes_LBS01',
                'deviceGroups': 'NEC_Biomatrics_001',
                'deviceService': 5,
                'P/F Services': 11,
                'actions': buttonHtmlString
            },
            {
                'name': 'Smart Homes_LBS01',
                'deviceGroups': 'RWE_SD_SH',
                'deviceService': 1,
                'P/F Services': 11,
                'actions': buttonHtmlString
            },
            {
                'name': 'Smart Homes_LBS01',
                'deviceGroups': 'HID_AC_023',
                'deviceService': 2,
                'P/F Services': 11,
                'actions': buttonHtmlString
            },
            {
                'name': 'Smart Homes_VS01',
                'deviceGroups': 'Axis_Cam_012',
                'deviceService': 5,
                'P/F Services': 11,
                'actions': buttonHtmlString
            }
        ]
    },
    'Godrej Secure': {
        'customer_name': 'Godrej Secure', 
        'portal_Id': 'TTL_Godrej Secure', 
        'portal_Link': 'http://ttslm2m/Godrej Secure', 
        'color_theme': 'Silver',
        'serviceProfiles': [
            {
                'name': 'Godrej Secure_LBS01',
                'deviceGroups': 'Ubiquiti_Switch_001',
                'deviceService': 2,
                'P/F Services': 10,
                'actions': buttonHtmlString
            },
            {
                'name': 'Godrej Secure_LBS01',
                'deviceGroups': 'NEC_Biomatrics_001',
                'deviceService': 5,
                'P/F Services': 10,
                'actions': buttonHtmlString
            },
            {
                'name': 'Godrej Secure_LBS01',
                'deviceGroups': 'RWE_SD_SH',
                'deviceService': 2,
                'P/F Services': 10,
                'actions': buttonHtmlString
            },
            {
                'name': 'Godrej Secure_LBS01',
                'deviceGroups': 'HID_AC_023',
                'deviceService': 2,
                'P/F Services': 10,
                'actions': buttonHtmlString
            },
            {
                'name': 'Godrej Secure_VS01',
                'deviceGroups': 'Axis_Cam_012',
                'deviceService': 6,
                'P/F Services': 10,
                'actions': buttonHtmlString
            }
        ]
    },
    'Loxone': {
        'customer_name': 'Loxone', 
        'portal_Id': 'TTL_Loxone', 
        'portal_Link': 'http://ttslm2m/Loxone', 
        'color_theme': 'Silver',
        'serviceProfiles': [
            {
                'name': 'Loxone_LBS01',
                'deviceGroups': 'Ubiquiti_Switch_001',
                'deviceService': 2,
                'P/F Services': 13,
                'actions': buttonHtmlString
            },
            {
                'name': 'Loxone_LBS01',
                'deviceGroups': 'NEC_Biomatrics_001',
                'deviceService': 5,
                'P/F Services': 13,
                'actions': buttonHtmlString
            },
            {
                'name': 'Loxone_LBS01',
                'deviceGroups': 'RWE_SD_SH',
                'deviceService': 2,
                'P/F Services': 13,
                'actions': buttonHtmlString
            },
            {
                'name': 'Loxone_LBS01',
                'deviceGroups': 'HID_AC_023',
                'deviceService': 2,
                'P/F Services': 13,
                'actions': buttonHtmlString
            },
            {
                'name': 'Loxone_VS01',
                'deviceGroups': 'Axis_Cam_012',
                'deviceService': 5,
                'P/F Services': 13,
                'actions': buttonHtmlString
            }
        ]
    }
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

var profile_Groups_Relationship= {
    'Ford_LBS01': 
    {
        'Garmin_GPSTracker_Ford': ['Get Coordinates', 'Get Speed', 'Email Notifications', 'Battery Alerts', 'Geo-Fence'],
        'HID_AC_PD_006': ['Get Logs', 'Set Lock', 'SMS Alerts']
    },
    'Ford_VS01':
    {
        'Axis_Cam_012': ['Audio Video Recording', 'Multi-Streaming', 'Event Backups', 'Email Notifications', 'Set Alarms']
    },
    'Volvo_LBS01':
    {
        'Garmin_GPSTracker_Volvo': ['Get Coordinates', 'SMS Notification', 'Email Notifications', 'Battery Alerts', 'Fleet Management'],
        'HID_AC_PD_006': ['Get Logs', 'SMS Alerts']
    },
    'Volvo_VS01':
    {
        'Axis_Cam_012': ['Audio Video Recording', 'Multi-Streaming', 'Email Notifications', 'Set Alarms']
    },
    'Tata_LBS01':
    {
        'Garmin_GPSTracker_Tata': ['Get Coordinates', 'Get Speed', 'Email Notifications', 'Battery Alerts', 'Geo-Fence'],
        'HID_AC_PD_006': ['Set Lock', 'SMS Alerts']
    },
    'Tata_VS01':
    {
        'Axis_Cam_012': ['Audio Video Recording', 'Multi-Streaming', 'Event Backups', 'Email Notifications', 'Set Alarms']
    },
    'Smart Homes_LBS01':
    {
        'Ubiquiti_Switch_001': ['Set Speed (10/100/1000mbps)', 'Configurable Alerts'],
        'HID_AC_023': ['Set Lock', 'SMS Alerts'],
        'NEC_Biomatrics_001': ['Alarms', 'Get Logs', 'Face Recognition', 'IRIS Recognition', 'Email Notifications'],
        'RWE_SD_SH': ['Get Alarms']
    },
    'Smart Homes_VS01':
    {
        'Axis_Cam_012': ['Audio Video Recording', 'Multi-Streaming', 'Event Backups', 'Email Notifications', 'Set Alarms']
    },
    'Godrej Secure_LBS01':
    {
        'Ubiquiti_Switch_001': ['Set Speed (10/100/1000mbps)', 'Port Minitoring'],
        'HID_AC_023': ['Get Logs', 'SMS Alerts'],
        'NEC_Biomatrics_001': ['Alarms', 'IRIS Recognition', 'Speech Recognition', 'SMS Alerts', 'Email Notifications'],
        'RWE_SD_SH': ['Get Alarms', 'Early Detection Alerts']
    },
    'Godrej Secure_VS01':
    {
        'Axis_Cam_012': ['Audio Video Recording', 'Get Logs', 'Multi-Streaming', 'Event Management', 'Event Backups', 'Set Alarms']
    },
    'Loxone_LBS01':
    {
        'Ubiquiti_Switch_001': ['Set Speed (10/100/1000mbps)', 'Configurable Alerts'],
        'HID_AC_023': ['Set Lock', 'SMS Alerts'],
        'NEC_Biomatrics_001': ['Alarms', 'Get Logs', 'Face Recognition', 'IRIS Recognition', 'Email Notifications'],
        'RWE_SD_SH': ['Get Alarms', 'Early Detection Alerts']
    },
    'Loxone_VS01':
    {
        'Axis_Cam_012': ['Audio Video Recording', 'Get Logs', 'Multi-Streaming', 'Event Backups', 'Set Alarms']
    }
};


var selectedValue;

function createTrString(array) {
    var trString= '';
    
    for(var i=0; i<array.length; i++) {
        trString+= '<tr>';
        for (var key in array[i]) {
            trString+= '<td>'+ array[i][key] + '</td>';
        }
        trString+= '</tr>';
    }
    return trString;
}

function halloWorld() {
    $("#customer_device_service_profile_tbl> tbody> tr").each(function(i, tr) {
        var rowSpan= $(tr).find('td').first().attr('rowspan');
        var self= this;
        console.log(rowSpan);
        if(rowSpan) {
            for(var j=0; j<rowSpan; j++) {
                if(j===0) {
                    $(self).find('td:nth-child(4)').attr('rowspan', rowSpan);
                    $(self).find('td:nth-child(5)').attr('rowspan', rowSpan);
                } else {
                    self= $(self).next();
                    $(self).find('td:nth-child(3)').remove();
                    $(self).find('td:nth-child(3)').remove();
                }
            }
        }
        
//        if(i===0) {
//        $(tr).find('td:nth-child(4)').attr('rowspan', rowSpan);
//        } else if(i< rowSpan) {
//            $(tr).find('td:nth-child(3)').remove();
//        }
    });
}


//createSelectBox('#service_profile_select_customer_select', function(selectBox) {
    $("#service_profile_select_customer_select").change(function() {
        selectedValue= $(this).val();
        var customerDetails= customer_details[selectedValue];

        $("table#selected_customer_details_table tr#selected_customer_name_row").show().find('input[type="text"]').val(customerDetails.customer_name);
        $("table#selected_customer_details_table tr#selected_customer_portalID_row").show().find('input[type="text"]').val(customerDetails.portal_Id);
        $("table#selected_customer_details_table tr#selected_customer_portalLink_row").show().find('input[type="text"]').val(customerDetails.portal_Link);
        $("table#selected_customer_details_table tr#selected_customer_colorTheme_row").show().find('input[type="text"]').val(customerDetails.color_theme);
        
        var getTrString= createTrString(customerDetails.serviceProfiles);
        
        $("table#customer_device_service_profile_tbl tbody").html(getTrString);
        
        groupTable($('table#customer_device_service_profile_tbl tr:has(td)'),0,5);
        $('table#customer_device_service_profile_tbl .deleted').remove();
        
        $("#customer_device_service_profile_tbl").show();
  
        halloWorld();
    });
//});



$('.view_application_group').live('click', function() {
    $("#new_profile_table").hide();
    //get item
    var trString= $(this).closest('tr');
    
    var selectedProfileJson= profile_Groups_Relationship[trString.find('td').first().html()];
    
    $("#view_profile_table #view_device_group_tbl table").find('input[type="checkbox"]').each(function(i, checkbox) {
        $(checkbox).attr('checked', false);
    });
    
    for(var key in selectedProfileJson) {
        $("#view_profile_table #view_device_group_tbl table").find('input[type="checkbox"]').each(function(i, checkbox) {
            if($(checkbox).val()=== key) {
                $(checkbox).attr('checked', true);
            }
        });
    }

    showServices("#view_profile_table #view_device_group_tbl table", trString.find('td').first().html());
    
    //profile name
    $("#view_profile_name_text").val(trString.find('td').first().html());
    
    $("#view_profile_table").show();
});

function showServices(domElement, profileName) {
    var trString= '';
    var profileSelected= profile_Groups_Relationship[profileName];
    
    $(domElement).find('input[type="checkbox"]:checked').each(function() {
        var checkboxValue= $(this).val();
        
        trString+= '<tr><td colspan="2" class="fixed_tbl_head">'+checkboxValue+'</td></tr>';
        for(var i=0; i< device_Group_Master_List[checkboxValue].length; i++) {
            if(profileSelected[checkboxValue].indexOf(device_Group_Master_List[checkboxValue][i]) !== -1) {
                trString+= '<tr><td><input type="checkbox"  onclick="return false" class="chk_bx" checked value="'+device_Group_Master_List[checkboxValue][i]+'"></td><td>'+device_Group_Master_List[checkboxValue][i]+'</td></tr>';
            } else {
                trString+= '<tr><td><input type="checkbox"  onclick="return false" class="chk_bx" value="'+device_Group_Master_List[checkboxValue][i]+'"></td><td>'+device_Group_Master_List[checkboxValue][i]+'</td></tr>';
            }
        }
    });
    $("#view_service_table").html(trString);
}

$("#close_view_profile_button").click(function() {
    $("#view_profile_table").hide();
});



$("#new_profile_name_add_link").click(function() {
    $("#new_profile_table").show();
    $("#view_profile_table").hide();
});


$('input[type="checkbox"].new_device_grp_checkbox').change(function(e) {
   var trString= '';
   $('input[type="checkbox"]:checked.new_device_grp_checkbox').each(function(i, checkbox) { 
      var value= $(checkbox).val();
      trString+= '<tr class="parent_tr"><td colspan="2" class="fixed_tbl_head">'+ value+ '</td></tr>';
      $.each(device_Group_Master_List[value], function(i, value2) {
         trString+= '<tr><td><input type="checkbox" class="chk_bx '+value+'" value="'+value2+'" /></td><td>'+ value2 + '</td></tr>'
      });
   });

   $("tbody#new_service_profile_tbody").html('');
   $("tbody#new_service_profile_tbody").html(trString);
});


$("#save_new_profile_button").click(function() {
    var profileName= $("#new_profile_name_input").val();
    
    $("#new_profile_table_groups_list").find('input[type="checkbox"]:checked').each(function() {
        var profileObect= {};
        profileObect['name']= $("#new_profile_name_input").val();    
        var pName= $("#new_profile_name_input").val();
        if(!profile_Groups_Relationship[pName]) {
            profile_Groups_Relationship[pName]= {};
        }
        profileObect['deviceGroups']= $(this).val();
        var pValue= $(this).val();
        profile_Groups_Relationship[pName][pValue]= [];
        var counter= 0;
        $("tbody#new_service_profile_tbody input[type='checkbox']:checked").each(function() {
            var self=this;
            if($(this).hasClass(profileObect['deviceGroups'])) {
                console.log($(self));
                profile_Groups_Relationship[pName][pValue].push($(this).val());
                counter++;
            }
        });
        profileObect['deviceService']= counter;
        
        var sreviceLength= $("#new_services_platform_table").find('input[type="checkbox"]:checked').length;
        profileObect['P/F Services']= sreviceLength;
        profileObect['actions']= buttonHtmlString;
       customer_details[selectedValue]['serviceProfiles'].push(profileObect);
        
    });
    
    $("#service_profile_select_customer_select").trigger('change');
    
    $("#new_profile_table").hide();
});





$(".device_group_search").keyup(function(e) {
   var searchValue= $(this).val();
   $(this).closest('tbody').find('tr').first().next().find('tbody > tr').each(function(i, tr) {
      var tdValue= $(tr).find('td:nth-child(2)').html();
       console.log(searchValue);
      if(tdValue.indexOf(searchValue) === -1) {
          
         $(tr).hide();
      } else {
         $(tr).show();
      }
   });
});

$(".services_search_text_box").keyup(function(e) {
   var searchValue= $(this).val();
   $(this).closest('tbody').find('tr').first().next().find('tbody > tr').each(function(i, tr) {
      var $firstTd= $(tr).find('td:first-child');
      if(!$firstTd.hasClass('fixed_tbl_head')) {
         var tdValue= $(tr).find('td:nth-child(2)').html();
         if(tdValue.indexOf(searchValue) === -1) {
            $(tr).hide();
         } else {
            $(tr).show();
         }
      } 
   });
});



$(".platform_services_search").keyup(function(e) {
   var searchValue= $(this).val();
   $(this).closest('tbody').find('tr').first().next().find('tbody > tr').each(function(i, tr) {
       var $inputTypeTexts= $(tr).find('input[type="text"]');
       $inputTypeTexts.each(function(i, input) {
         var inputValue= $(input).val();
         if(inputValue.indexOf(searchValue) === -1) {
            $(input).parent().prev().hide();
            $(input).parent().hide();
         } else {
            $(input).parent().prev().show();
            $(input).parent().show();
         }
       });  
   });
});

$("#cancel_new_profile_button").click(function() {
    $("#new_profile_table").hide();
});


//
//var device_grp_object= {
//   'Pikachu': ['PikachuService1', 'PikachuService2', 'PikachuService3'],
//   'Geodude': ['GeodudeService1', 'GeodudeService2', 'GeodudeService3'],
//   'Gramin': ['GraminService1', 'GraminService2', 'GraminService3']
//};
//
//
//$('input[type="checkbox"].device_grp_checkbox').change(function(e) {
//   var trString= '';
//   $('input[type="checkbox"]:checked.device_grp_checkbox').each(function(i, checkbox) { 
//      var value= $(checkbox).val();
//      trString+= '<tr><td colspan="2" class="fixed_tbl_head">'+ value+ '</td></tr>';
//      $.each(device_grp_object[value], function(i, value2) {
//         trString+= '<tr><td><input type="checkbox" class="chk_bx" value="" /></td><td>'+ value2 + '</td></tr>'
//      });
//   });
//
//   $("table#service_tbl_inner tbody").html('');
//   $("table#service_tbl_inner tbody")[0].innerHTML= trString;
//});
//
//$("#new_service_search_box").keypress(function(e) {
//   var searchValue= $("#new_service_search_box").val();
//   $("#service_tbl tr:nth-child(2) table#service_tbl_inner tbody tr").each(function(i, tr) {
//      var $firstTd= $(tr).find('td:first-child');
//      if(!$firstTd.hasClass('fixed_tbl_head')) {
//         var tdValue= $(tr).find('td:nth-child(2)').html();
//         if(tdValue.indexOf(searchValue) === -1) {
//            $(tr).hide();
//         } else {
//            $(tr).show();
//         }
//      } 
//   });
//});
//
//
//
//$("#platform_services_search").keypress(function(e) {
//   var searchValue= $("#platform_services_search").val();
//   $("#platform_service_tbl tr:nth-child(2) table#platform_search_table tr").each(function(i, tr) {
//       var $inputTypeTexts= $(tr).find('input[type="text"]');
//       $inputTypeTexts.each(function(i, input) {
//         var inputValue= $(input).val();
//         if(inputValue.indexOf(searchValue) === -1) {
//            $(input).parent().prev().hide();
//            $(input).parent().hide();
//         } else {
//            $(input).parent().prev().show();
//            $(input).parent().show();
//         }
//       });  
//   });
//});
//
//
//
//
//$("#new_profile_name_add_link").click(function() {
//   $("#new_profile_table").show();
//});
//
//function addButtonClickEvent() {
//        $("#new_profile_name_add_link").click(function(e) {
//            e.preventDefault();
//            $(this).unbind('click');
//            $("table#new_profile_table").show();
//        });    
//    }
//
//    $("#save_new_profile_button").click(function() {
//        $("table#new_profile_table").hide();
//        addButtonClickEvent()
//    });
//
//    $("#cancel_new_profile_button").click(function() {
//        $("table#new_profile_table").hide();
//        addButtonClickEvent();
//    });
//
//    addButtonClickEvent();

}

// END 19th May Monday
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function aCustomerUsers_Add() {
   var $trToCopy= $("tr#findInnerHTML")[0].outerHTML;
   var $trs= $('table.add_user tbody').find('tr');
   $($trs[$trs.length - 2]).after($trToCopy);
   $("tr#findInnerHTML").last().removeAttr('id');
}


function iDetails_Add() {
   var $detailsTr= '<tr><td colspan="6">&nbsp;</td></tr>';;
   $detailsTr+= $("table#iDetails_table tr:nth-child(1)")[0].outerHTML;
   $detailsTr+= $("table#iDetails_table tr:nth-child(2)")[0].outerHTML;
   $detailsTr+= $("table#iDetails_table tr:nth-child(3)")[0].outerHTML;
   $detailsTr+= $("table#iDetails_table tr:nth-child(4)")[0].outerHTML;
   $detailsTr+= $("table#iDetails_table tr:nth-child(5)")[0].outerHTML;
   var $trs= $('table#iDetails_table').find('tr');
   $($trs[$trs.length - 2]).after($detailsTr);
}

function add_device_groups() {
  var out_html = ' <tr> '
      out_html += '<th class="form_head fs16"><strong>Add Device Validitiy (For Customer)</strong></th>';
      out_html += '</tr>';
      out_html += '<tr>';
      out_html += ' <td>';
      out_html += '     <table class="deatil_tbl validity_tbl">';
      out_html += '         <tr>';
      out_html += '             <td class="label">Select Customer</td>';
      out_html += '            <td><select class="txt_bx"><option> Ford </option></select></td>';
      out_html += '         </tr>';
      out_html += '     </table>';
      out_html += '  </td>';
      out_html += '</tr>';
      out_html += '<tr>';
      out_html += ' <td>';
      out_html += '     <h3 align="right">Add New Group <a href="#"><img src="images/add-gray.png" alt="" class="add" border="0" align="right"></a></h3>';
      out_html += '     <table id="device_validity_tbl" class="content_tbl" cellspacing="0" cellpadding="0" border="0" width="100%">';
      out_html += '         <tr>';
      out_html += '             <td class="bdr_right">';
      out_html += '                 <table class="deatil_tbl" width="100%" cellspacing="0" cellpadding="0" border="0">';
      out_html += '                     <tr>';
      out_html += '                         <td>German_GPS_Tracker_Ford</td>';
      out_html += '                     </tr>';
      out_html += '                     <tr><td></td></tr>';
      out_html += '                     <tr>';
      out_html += '                         <td>Axix_IP_CAM_Ford</td>';
      out_html += '                     </tr>';
      out_html += '                     <tr><td></td></tr>';
      out_html += '                     <tr>';
      out_html += '                         <td>HID_AC_Ford</td>';
      out_html += '                     </tr>';
      out_html += '                 </table>    '
      out_html += '             </td>';
      out_html += '             <td>';
      out_html += '                 <table class="deatil_tbl device_validity_tbl" width="100%" cellspacing="0" cellpadding="0" border="0">';
      out_html += '                     <tr>';
      out_html += '                         <td><a href="#">Show Device</a></td>';
      out_html += '                         <td><a href="#">Add from Inventory</a></td>';
      out_html += '                         <td><a href="#">Bulk Upload</a></td>';
      out_html += '                     </tr>';
      out_html += '                     <tr><td colspan="3"></td></tr>';
      out_html += '                     <tr>';
      out_html += '                         <td><a href="#">Show Device</a></td>';
      out_html += '                         <td><a href="#">Add from Inventory</a></td>';
      out_html += '                         <td><a href="#">Bulk Upload</a></td>';
      out_html += '                     </tr>';
      out_html += '                     <tr><td colspan="3"></td></tr>';
      out_html += '                     <tr>';
      out_html += '                         <td><a href="#">Show Device</a></td>';
      out_html += '                         <td><a href="#">Add from Inventory</a></td>';
      out_html += '                         <td><a href="#">Bulk Upload</a></td>';
      out_html += '                     </tr>';
      out_html += '                 </table>    '
      out_html += '             </td>';
      out_html += '         </tr>';
      out_html += '     </table>'; 
      out_html += ' </td>'; 
      out_html += ' </tr> ';

      var bind_base = "#add_device_group";
      $(bind_base).click(function(){
          $.colorbox({html:out_html});
      });

}

/*===========================new customer functions==============================*/

function get_customers() {
    $.ajax({
        type: "get",
        url: "customer_get_ajax.py",
        cache: false,
        success: function (result) {
            try {
                result = JSON.parse(result);
            }
            catch (exp) {
                result = []
                $().toastmessage('showNoticeToast', "No Customers found");
            }
            oTable = $('#customers').DataTable({
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

function post_customers(action, user_id) {
    
    var url = "customer_post_ajax.py"; // the script where you handle the form input.

    if (action === "put"){
        url = "customer_put_ajax.py?user_id=" + user_id;
    }
    $("#add_customer_form").submit(function() {
    event.preventDefault();
    event.stopPropagation();

    $.ajax({
           type: "GET",
           url: url,
           data: $("#add_customer_form").serialize(), // serializes the form's elements.
           success: function(result)
           {
               try {
                    result = JSON.parse(result);
                    if (result.success == 0)
                    {
                        $().toastmessage('showSuccessToast', result.message);
                        window.location = "customer_management.py"
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

function put_customer_values(user_id) {

    $.ajax({
       type: "GET",
       url: "customer_get_details_ajax.py?customer_id="+user_id,
       success: function(result)
       {
           try {
                result = JSON.parse(result);
                if (result.success == 0)
                {
                    $().toastmessage('showSuccessToast', result.message);
                    $('#add_customer_form *').filter(':input').each(function(){
                        //your code here
                        var e_id = $(this).attr("id");
                        var e_value = result.user_details[e_id];
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


///////////////////////////////////////////


function get_customer_groups() {
    $.ajax({
        type: "get",
        url: "customer_group_get_ajax.py",
        cache: false,
        success: function (result) {
            try {
                result = JSON.parse(result);
            }
            catch (exp) {
                result = []
                $().toastmessage('showNoticeToast', "No Customers found");
            }
            oTable = $('#customers').DataTable({
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


function post_customer_groups(action, group_id) {
    
    var url = "customer_group_post_ajax.py"; // the script where you handle the form input.

    if (action === "put"){
        url = "customer_group_put_ajax.py?group_id=" + group_id;
    }
    $("#add_customer_group_form").submit(function() {
    event.preventDefault();
    event.stopPropagation();

    $.ajax({
           type: "GET",
           url: url,
           data: $("#add_customer_group_form").serialize(), // serializes the form's elements.
           success: function(result)
           {
               try {
                    result = JSON.parse(result);
                    if (result.success == 0)
                    {
                        $().toastmessage('showSuccessToast', result.message);
                        window.location = "customer_group_management.py"
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

function put_customer_group_values(group_id, company_name) {

    $.ajax({
       type: "GET",
       url: "customer_group_get_details_ajax.py?group_id="+group_id+"&company_name="+company_name,
       success: function(result)
       {
           try {
                result = JSON.parse(result);
                if (result.success == 0)
                {
                    $().toastmessage('showSuccessToast', result.message);
                    $('#add_customer_group_form *').filter(':input').each(function(){
                        //your code here
                        var e_id = $(this).attr("id");
                        if (e_id == "group_name"){
                            $("#group_name").val(company_name);
                        }
                        else {
                            var e_value = result.group_details[e_id];
                            $("#" + e_id).val(e_value);
                        }
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