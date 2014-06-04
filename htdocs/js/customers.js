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
  // var cust_detail= {
  //  'Ford': {'subscriptionNumber': 'xxx-xxx-xx', 'contactPersonName': 'Lorem Ipsum', 'email': 'a@e.com', 'portalId': 'xyz', 'portalLink': 'LinktoPortal', 'portalTheme': 'Dark Gray', 'usersList': [{'userName': 'user1', 'password': 'aaa', 'email': 'a@e.com'}, {'userName': 'user1', 'password': 'aaa', 'email': 'a@e.com'}, {'userName': 'user1', 'password': 'aaa', 'email': 'a@e.com'}]},
  //  'Option2': {'subscriptionNumber': 'xxx-yyyy-zz', 'contactPersonName': 'Dolor Ipsum', 'email': 'a@e.org', 'portalId': 'zyx', 'portalLink': 'PortalToLink', 'portalTheme': 'Light Gray', 'usersList': [{'userName': 'user2', 'password': 'aaa', 'email': 'a@e.net'}, {'userName': 'user2', 'password': 'aaa', 'email': 'a@e.net'}, {'userName': 'user2', 'password': 'aaa', 'email': 'a@e.net'}]}
  // };

  var cust_detail= {
    'Ford': {
         'subscriptionNumber': 'ford_0098',
         'contactPersonName': 'Ford',
         'email': 'ford@email.com',
         'portalId': 'TTL_Ford',
         'portalLink': 'http://ttslm2m/ford',
         'portalTheme': 'Sea Gray',
         'usersList': [
             {'userName': 'ford_01', 'password': 'aaaa', 'email': 'example1@ford.com'},
             {'userName': 'ford_02', 'password': 'aaaa', 'email': 'example2@ford.com'}
         ],
         'serviceProfiles': {
             'Ford_LBS01': {
                 'deviceTypes': {'Garmin_GPSTracker_Ford': 3,'HID_AC_006': 3},
                 'subscribedApplications': {'Location Based Services': 'Inactive', 'Fleet Management': 'Inactive'},
                 'platformServices': ['Alarm Service', 'Data Service', 'Geo Fence Service', 'DataItem Services', 'Device Configuration Service', 'General']
             },
             'Ford_VS01': {
                 'deviceTypes': {'Axis_Cam_012': 2},
                 'subscribedApplications': {'Fleet Management': 'Inactive'},
                 'platformServices': ['Alarm Service', 'Data Service', 'Geo Fence Service', 'Audit Log', 'Device Configuration Service']
             }
         },
         'billingInfo': {
             'billingDept': 'TPS',
             'billingCycle': '3 months',
             'billingStartDate': '31-02-2014',
             'billingAmount': 'Rs. 1000',
             'amountNext': '31-03-2014',
             'totalOutstanding': 'Rs. 1000'
         }
     },
     'Volvo': {
         'subscriptionNumber': 'Volvo_0099',
         'contactPersonName': 'Volvo',
         'email': 'Volvo@e.org',
         'portalId': 'TTL_Volvo',
         'portalLink': 'http://ttslm2m/volvo',
         'portalTheme': 'Sea Gray',
         'usersList': [
             {'userName': 'Volvo_01', 'password': 'aaa', 'email': 'example@Volvo_01.net'},
             {'userName': 'Volvo_02', 'password': 'aaa', 'email': 'example@Volvo_02.net'}
         ],
         'serviceProfiles': {
             'Volvo_LBS01': {
                 'deviceTypes': {'Garmin_GPSTracker_Volvo': 3, 'HID_AC_006': 2},
                 'subscribedApplications': {'Location Based Services': 'Inactive', 'Fleet Management': 'Active'},
                 'platformServices': ['Alarm Service', 'Data Service', 'Geo Fence Service', 'Audit Log', 'Device Configuration Service']
             },
             'Volvo_VS01': {
                 'deviceTypes': {'Axis_Cam_Volvo': 2},
                 'subscribedApplications': {'Fleet Management': 'Inactive'},
                 'platformServices': ['Alarm Service', 'Data Service', 'Geo Fence Service', 'Audit Log', 'Device Configuration Service']
             }
         },
         'billingInfo': {
             'billingDept': 'TPS',
             'billingCycle': '3 months',
             'billingStartDate': '31-02-2014',
             'billingAmount': 'Rs. 1000',
             'amountNext': '31-03-2014',
             'totalOutstanding': 'Rs. 1000'
         }
     },
     'Tata Motors': {
         'subscriptionNumber': 'Tata Motors_0011',
         'contactPersonName': 'Tata Motors',
         'email': 'Tata Motors@e.org',
         'portalId': 'TTL_Tata',
         'portalLink': 'http://ttslm2m/Tata',
         'portalTheme': 'Blue',
         'usersList': [
             {'userName': 'Tata Motors_01', 'password': 'aaa', 'email': 'example@Tata Motors_01.net'},
             {'userName': 'Tata Motors_02', 'password': 'aaa', 'email': 'example@Tata Motors_02.net'}
         ],
         'serviceProfiles': {
             'Tata_LBS01': {
                 'deviceTypes': {'Garmin_GPSTracker_Tata': 3, 'HID_AC_Tata': 2},
                 'subscribedApplications': {'Location Based Service': 'Inactive'},
                 'platformServices': ['Alarm Service', 'Data Service', 'Geo Fence Service', 'Audit Log', 'Device Configuration Service']
             },
             'Tata_VS01': {
                 'deviceTypes': {'Axis_Cam_UPSRTC': 2},
                 'subscribedApplications': {'Fleet Management': 'Inactive'},
                 'platformServices': ['Alarm Service', 'Data Service', 'Geo Fence Service', 'Audit Log', 'Device Configuration Service']
             }
         },
         'billingInfo': {
             'billingDept': 'TPS',
             'billingCycle': '3 months',
             'billingStartDate': '31-02-2014',
             'billingAmount': 'Rs. 1000',
             'amountNext': '31-03-2014',
             'totalOutstanding': 'Rs. 1000'
         }
     },
     'Smart Homes': {
         'subscriptionNumber': 'Smart Homes_0064',
         'contactPersonName': 'Smart Homes',
         'email': 'Smart Homes@e.org',
         'portalId': 'TTL_Smart Homes',
         'portalLink': 'http://ttslm2m/Smart Homes',
         'portalTheme': 'Black',
         'usersList': [
             {'userName': 'Smart Homes_01', 'password': 'aaa', 'email': 'example@Smart Homes_01.net'},
             {'userName': 'Smart Homes_02', 'password': 'aaa', 'email': 'example@Smart Homes_02.net'}
         ],
         'serviceProfiles': {
             'Smart Homes_LBS01': {
                 'deviceTypes': {'Garmin_GPSTracker_Smart Homes': 3,'SBSmart_RTU4556_Smart Homes': 2},
                 'subscribedApplications': {'Location Based Services': 'Inactive', 'Fleet Management': 'Active'},
                 'platformServices': ['Alarm Service', 'Data Service', 'Geo Fence Service', 'Audit Log', 'Device Configuration Service']
             },
             'Smart Homes_VS01': {
                 'deviceTypes': {'Axis_Cam_Smart Homes': 2},
                 'subscribedApplications': {'Fleet Management': 'Inactive'},
                 'platformServices': ['Alarm Service', 'Data Service', 'Geo Fence Service', 'Audit Log', 'Device Configuration Service']
             }
         },
         'billingInfo': {
             'billingDept': 'TPS',
             'billingCycle': '3 months',
             'billingStartDate': '31-02-2014',
             'billingAmount': 'Rs. 1000',
             'amountNext': '31-03-2014',
             'totalOutstanding': 'Rs. 1000'
         }
     },
     'Godrej Secure': {
         'subscriptionNumber': 'Godrej Secure_0011',
         'contactPersonName': 'Godrej Secure',
         'email': 'Godrej Secure@e.org',
         'portalId': 'TTL_Godrej Secure',
         'portalLink': 'http://ttslm2m/Godrej Secure',
         'portalTheme': 'Silver',
         'usersList': [
             {'userName': 'Godrej Secure_01', 'password': 'aaa', 'email': 'example@Godrej Secure_01.net'},
             {'userName': 'Godrej Secure_02', 'password': 'aaa', 'email': 'example@Godrej Secure_02.net'}
         ],
         'serviceProfiles': {
             'Godrej Secure_LBS01': {
                 'deviceTypes': {'Ubiquiti_Switch_Godrej Secure': 2, 'NEC_Biomatrics_Godrej Secure': 5, 'RWE_SD_SH': 2, 'HID_AC_Godrej Secure': 2},
                 'subscribedApplications': {'Location Based Service': 'Inactive'},
                 'platformServices': ['Alarm Service', 'Data Service', 'Geo Fence Service', 'Audit Log', 'Device Configuration Service']
             },
             'Godrej Secure_VS01': {
                 'deviceTypes': {'Axis_Cam_Godrej Secure': 2},
                 'subscribedApplications': {'Fleet Management': 'Inactive'},
                 'platformServices': ['Alarm Service', 'Data Service', 'Geo Fence Service', 'Audit Log', 'Device Configuration Service']
             }
         },
         'billingInfo': {
             'billingDept': 'TPS',
             'billingCycle': '3 months',
             'billingStartDate': '31-02-2014',
             'billingAmount': 'Rs. 1000',
             'amountNext': '31-03-2014',
             'totalOutstanding': 'Rs. 1000'
         }
     },
     'Loxone': {
         'subscriptionNumber': 'Loxone_0064',
         'contactPersonName': 'Loxone',
         'email': 'Loxone@e.org',
         'portalId': 'TTL_Loxone',
         'portalLink': 'http://ttslm2m/Loxone',
         'portalTheme': 'Silver',
         'usersList': [
             {'userName': 'Loxone_01', 'password': 'aaa', 'email': 'example@Loxone_01.net'},
             {'userName': 'Loxone_02', 'password': 'aaa', 'email': 'example@Loxone_02.net'}
         ],
         'serviceProfiles': {
             'Loxone_LBS01': {
                 'deviceTypes': {'Ubiquiti_Switch_Loxone': 2, 'NEC_Biomatrics_Loxone': 2, 'RWE_SD_SH': 2, 'HID_AC_Loxone': 2},
                 'subscribedApplications': {'Location Based Services': 'Inactive', 'Fleet Management': 'Active'},
                 'platformServices': ['Alarm Service', 'Data Service', 'Geo Fence Service', 'Audit Log', 'Device Configuration Service']
             },
             'Loxone_VS01': {
                 'deviceTypes': {'Axis_Cam_Loxone': 2},
                 'subscribedApplications': {'Fleet Management': 'Inactive'},
                 'platformServices': ['Alarm Service', 'Data Service', 'Geo Fence Service', 'Audit Log', 'Device Configuration Service']
             }
         },
         'billingInfo': {
             'billingDept': 'TPS',
             'billingCycle': '3 months',
             'billingStartDate': '31-02-2014',
             'billingAmount': 'Rs. 1000',
             'amountNext': '31-03-2014',
             'totalOutstanding': 'Rs. 1000'
         }
     }
  };

  var select_profile_details= {
   'Ford': [{'deviceType': 'garminGPS_Ford', 'services': 8}, {'deviceType': 'garminGPS_Ford', 'services': 11}, {'deviceType': 'garminGPS_Ford', 'services': 4}],
   'Option2': [{'deviceType': 'garminGPS_Option2', 'services': 8}, {'deviceType': 'garminGPS_Option2', 'services': 12}, {'deviceType': 'garminGPS_Option2', 'services': 3}],
  };

function updateSelectBox(domElement, array) {
  var optionString= '';
    for(var i=0; i<array.length; i++) {
        if(i===0) {
            optionString+= '<option></option>';
        }
        optionString+= '<option>'+array[i]+'</option>';
    }
    $(domElement).empty().append(optionString);
}


function looper(parentEm, selectedEm, selectedEm2, attribute) {
   $(parentEm).find(selectedEm).each(function(i, textbox) {
         $(textbox).attr('readonly', attribute);
      });

      $(parentEm).find(selectedEm2).each(function(i, textbox) {
         $(textbox).attr('readonly', attribute);
      });
  };
  function createServiceProfile(selectedValue) {
     var afroJack= [];
     for(var key in cust_detail[selectedValue]['serviceProfiles']) {
        afroJack.push(key);
     }
     updateSelectBox('#service_profile_profile_select', afroJack);
  }
  function updateBillingSection(selectedValue) {
   for(var key in cust_detail[selectedValue]['billingInfo']) {
      $('#'+key).val(cust_detail[selectedValue]['billingInfo'][key]);
   }
  }


  $("#c_c_p_select_customer_select").change(function() {
         var selectedValue= $(this).val();
         $("tr#c_c_p_selected_customer_title_tr").find('strong').html(selectedValue+ ' :');
         createServiceProfile(selectedValue);
         updateBillingSection(selectedValue);
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

    $('#service_profile_profile_select').change(function() {
       var val= $(this).val();
       var selectedVal= $("#c_c_p_select_customer_select").val();
       $("#c_c_p_device_type_services_table").find('.services_row_dynamic').remove();
       var trString= '';
       for(var key in cust_detail[selectedVal]['serviceProfiles'][val]['deviceTypes']) {
          trString+= '<tr class="services_row_dynamic"><td>'+key+'</td><td>'+cust_detail[selectedVal]['serviceProfiles'][val]['deviceTypes'][key]+'<input type="button" class="btn" style="visibility:hidden" value="hidden" /></td></tr>';
       }
       $("#c_c_p_device_type_services_table").find('#c_c_p_device_type_services_table_head').after(trString);


       trString= '';
       $("#subscribed_Appication_table").find('.subscribed_row_dynamic').remove();
       for(var key in cust_detail[selectedVal]['serviceProfiles'][val]['subscribedApplications']) {
          trString+= '<tr class="subscribed_row_dynamic"><td>'+key+'</td><td>'+cust_detail[selectedVal]['serviceProfiles'][val]['subscribedApplications'][key]+'<input type="button" class="btn" style="visibility:hidden" value="hidden" /></td>';
          trString+= '<td><input type="button" class="btn green toggleButton" value="Activate"></td></tr>';
       }
       $("#subscribed_Appication_table").find('#subscribed_Appication_table_header').after(trString);

       selectedValue= $(this).val();
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

$('.toggleButton').live('click', function() {
   var currentValue, previousTd;
   currentValue= $(this).val();
   previousTd= $(this).parent().prev();
   if(currentValue=== 'Activate') {
      previousTd.html('Active');
      $(this).val('Deactivate');
      $(this).removeClass('green').addClass('red');
   } else {
      previousTd.html('Inactive');
      $(this).val('Activate');
      $(this).removeClass('red').addClass('green');
   }
});
  // $("#service_profile_profile_select").change(function() {
         
  //     });       

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

////////////////////////////////////////////

function device_group_management_view() {
  $(".addParentTable").click(function(event) {
   event.preventDefault();
   var parentTable= $(this).closest('table');
   $(parentTable).append(parentTable[0].innerHTML)
});

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

//Toggle Button
$('.toggleButton').live('click', function() {
   var currentValue, previousTd;
   currentValue= $(this).val();
   previousTd= $(this).parent().prev();
   if(currentValue=== 'Activate') {
      previousTd.html('Active');
      $(this).val('Deactivate');
      $(this).removeClass('green').addClass('red');
   } else {
      previousTd.html('Inactive');
      $(this).val('Activate');
      $(this).removeClass('red').addClass('green');
   }
});

function createSelectBox(domElement, callback) {
   var scombobox= $(domElement).scombobox({
      highlight: true
   });
   callback(scombobox);
}

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
}

function findAndRemove(array, property, value) {
   $.each(array, function(index, result) {
       console.log(index);
       if(result[property] == value) {
          //Remove from array
          array.splice(index, 1);
      }    
   });
}


Array.prototype.removeValue = function(name, value){
   var array = $.map(this, function(v,i){
      return v[name] === value ? null : v;
   });
   this.length = 0; //clear original array
   this.push.apply(this, array); //push all elements except the one we want to delete
}


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

function addExtraTd(tableDomElement, headerHtml, tdHtml) {
    'use strict';
    
    $('#' + tableDomElement).find('tr').each(function (i, tr) {
        if(i===0) {
            $(this).find('th').last().after(headerHtml);
        } else {
            $(this).find('td').last().after(tdHtml);
        }
    });
}

function updateSelectBox(domElement, array) {
  var optionString= '';
    for(var i=0; i<array.length; i++) {
        if(i===0) {
            optionString+= '<option></option>';
        }
        optionString+= '<option>'+array[i]+'</option>';
    }
    $(domElement).empty().append(optionString);
}

function findObjectinArray(array, key, value) {
  for(var i=0; i<array.length; i++) {
    for(var innerKey in array[i]) {
      if(innerKey=== key && array[i][innerKey]=== value) {
        return array[i];
      }
    }
  }
}
  var manageButtonHtml= '<input type="button" class="device_group_table_manage_button btn" value="Manage">';

var device_group_json= [
{
   'device_group': 'Garmin_GPSTracker_Ford',
   'device_type': 'Garmin_GPSTracker',
   'noOfDevices': 10,
   'actions': manageButtonHtml,
   'selected_Devices': ['Tracker_001', 'Tracker_002', 'Tracker_003', 'Tracker_004', 'Tracker_005', 'Tracker_006', 'Tracker_007', 'Tracker_009', 'Tracker_013', 'Tracker_018']
},
{
   'device_group': 'Garmin_GPSTracker_Volvo',
   'device_type': 'Garmin_GPSTracker',
   'noOfDevices': 5,
   'actions': manageButtonHtml,
   'selected_Devices': ['Tracker_001', 'Tracker_013', 'Tracker_018', 'Tracker_022', 'Tracker_024']
},
{
   'device_group': 'Axis_Cam_Kite',
   'device_type': 'Axis_Cam',
   'noOfDevices': 10,
   'actions': manageButtonHtml,
   'selected_Devices': ['Axis_Cam_001', 'Axis_Cam_002', 'Axis_Cam_003', 'Axis_Cam_004', 'Axis_Cam_005', 'Axis_Cam_006', 'Axis_Cam_007', 'Axis_Cam_008', 'Axis_Cam_009', 'Axis_Cam_010']
},
{
   'device_group': 'Ubiquiti_Switch',
   'device_type': 'Ubiquiti_Switch',
   'noOfDevices': 5,
   'actions': manageButtonHtml,
   'selected_Devices': ['Ubiquiti_Switch_001', 'Ubiquiti_Switch_002', 'Ubiquiti_Switch_003', 'Ubiquiti_Switch_004', 'Ubiquiti_Switch_005']
},
{
   'device_group': 'HID_AC_PD',
   'device_type': 'HID_AC_PD',
   'noOfDevices': 5,
   'actions': manageButtonHtml,
   'selected_Devices': ['HID_AC_PD_001', 'HID_AC_PD_002', 'HID_AC_PD_003', 'HID_AC_PD_004', 'HID_AC_PD_005']
},
{
   'device_group': 'HID_AC',
   'device_type': 'HID_AC',
   'noOfDevices': 5,
   'actions': manageButtonHtml,
   'selected_Devices': ['HID_AC_001', 'HID_AC_002', 'HID_AC_003', 'HID_AC_004', 'HID_AC_005']
},
{
   'device_group': 'SBSmart_RTU4556',
   'device_type': 'SBSmart_RTU4556',
   'noOfDevices': 5,
   'actions': manageButtonHtml,
   'selected_Devices': ['SBSmart_RTU4556_001', 'SBSmart_RTU4556_002', 'SBSmart_RTU4556_003', 'SBSmart_RTU4556_004', 'SBSmart_RTU4556_005']
},
{
   'device_group': 'NEC_Biomatrics',
   'device_type': 'NEC_Biomatrics',
   'noOfDevices': 5,
   'actions': manageButtonHtml,
   'selected_Devices': ['NEC_Biomatrics_001', 'NEC_Biomatrics_002', 'NEC_Biomatrics_003', 'NEC_Biomatrics_004', 'NEC_Biomatrics_005']
},
{
   'device_group': 'Radwin_Access Point',
   'device_type': 'Radwin_Access Point',
   'noOfDevices': 5,
   'actions': manageButtonHtml,
   'selected_Devices': ['Radwin_Access Point_001', 'Radwin_Access Point_002', 'Radwin_Access Point_003', 'Radwin_Access Point_004', 'Radwin_Access Point_005']
},
{
   'device_group': 'D-Link DIR-600L_Router',
   'device_type': 'D-Link DIR-600L_Router',
   'noOfDevices': 5,
   'actions': manageButtonHtml,
   'selected_Devices': ['D-Link DIR-600L_Router_001', 'D-Link DIR-600L_Router_002', 'D-Link DIR-600L_Router_003', 'D-Link DIR-600L_Router_004', 'D-Link DIR-600L_Router_005']
},
{
   'device_group': 'RWE_Smoke Detector_SH',
   'device_type': 'RWE_Smoke Detector',
   'noOfDevices': 5,
   'actions': manageButtonHtml,
   'selected_Devices': ['RWE_Smoke Detector_SH_001', 'RWE_Smoke Detector_SH_002', 'RWE_Smoke Detector_SH_003', 'RWE_Smoke Detector_SH_004', 'RWE_Smoke Detector_SH_005']
}
];

var master_Device_Json= {
   'Garmin_GPSTracker': ['Tracker_001', 'Tracker_002', 'Tracker_003', 'Tracker_004', 'Tracker_005', 'Tracker_006', 'Tracker_007', 'Tracker_008', 'Tracker_009', 'Tracker_010', 'Tracker_011', 'Tracker_012', 'Tracker_013', 'Tracker_014', 'Tracker_015', 'Tracker_016', 'Tracker_017', 'Tracker_018', 'Tracker_019', 'Tracker_020', 'Tracker_021', 'Tracker_022', 'Tracker_023', 'Tracker_024', 'Tracker_025'],
   'Axis_Cam': ['Axis_Cam_001', 'Axis_Cam_002', 'Axis_Cam_003', 'Axis_Cam_004', 'Axis_Cam_005', 'Axis_Cam_006', 'Axis_Cam_007', 'Axis_Cam_008', 'Axis_Cam_009', 'Axis_Cam_010', 'Axis_Cam_011', 'Axis_Cam_012', 'Axis_Cam_013', 'Axis_Cam_014', 'Axis_Cam_015', 'Axis_Cam_016', 'Axis_Cam_017', 'Axis_Cam_018', 'Axis_Cam_019', 'Axis_Cam_020', 'Axis_Cam_021', 'Axis_Cam_022', 'Axis_Cam_023', 'Axis_Cam_024', 'Axis_Cam_025'],
   'Ubiquiti_Switch': ['Ubiquiti_Switch_001', 'Ubiquiti_Switch_002', 'Ubiquiti_Switch_003', 'Ubiquiti_Switch_004', 'Ubiquiti_Switch_005', 'Ubiquiti_Switch_006', 'Ubiquiti_Switch_007', 'Ubiquiti_Switch_008', 'Ubiquiti_Switch_009', 'Ubiquiti_Switch_010', 'Ubiquiti_Switch_011', 'Ubiquiti_Switch_012', 'Ubiquiti_Switch_013', 'Ubiquiti_Switch_014', 'Ubiquiti_Switch_015', 'Ubiquiti_Switch_016', 'Ubiquiti_Switch_017', 'Ubiquiti_Switch_018', 'Ubiquiti_Switch_019', 'Ubiquiti_Switch_020', 'Ubiquiti_Switch_021', 'Ubiquiti_Switch_022', 'Ubiquiti_Switch_023', 'Ubiquiti_Switch_024', 'Ubiquiti_Switch_025', 'Ubiquiti_Switch_026', 'Ubiquiti_Switch_027', 'Ubiquiti_Switch_028', 'Ubiquiti_Switch_029', 'Ubiquiti_Switch_030'],
   'HID_AC_PD': ['HID_AC_PD_001', 'HID_AC_PD_002', 'HID_AC_PD_003', 'HID_AC_PD_004', 'HID_AC_PD_005', 'HID_AC_PD_006', 'HID_AC_PD_007', 'HID_AC_PD_008', 'HID_AC_PD_009', 'HID_AC_PD_010', 'HID_AC_PD_011', 'HID_AC_PD_012', 'HID_AC_PD_013', 'HID_AC_PD_014', 'HID_AC_PD_015', 'HID_AC_PD_016', 'HID_AC_PD_017', 'HID_AC_PD_018', 'HID_AC_PD_019', 'HID_AC_PD_020', 'HID_AC_PD_021', 'HID_AC_PD_022', 'HID_AC_PD_023', 'HID_AC_PD_024', 'HID_AC_PD_025', 'HID_AC_PD_026', 'HID_AC_PD_027', 'HID_AC_PD_028', 'HID_AC_PD_029', 'HID_AC_PD_030'],
   'HID_AC': ['HID_AC_001', 'HID_AC_002', 'HID_AC_003', 'HID_AC_004', 'HID_AC_005', 'HID_AC_006', 'HID_AC_007', 'HID_AC_008', 'HID_AC_009', 'HID_AC_010', 'HID_AC_011', 'HID_AC_012', 'HID_AC_013', 'HID_AC_014', 'HID_AC_015', 'HID_AC_016', 'HID_AC_017', 'HID_AC_018', 'HID_AC_019', 'HID_AC_020', 'HID_AC_021', 'HID_AC_022', 'HID_AC_023', 'HID_AC_024', 'HID_AC_025', 'HID_AC_026', 'HID_AC_027', 'HID_AC_028', 'HID_AC_029', 'HID_AC_030'],
   'SBSmart_RTU4556': ['SBSmart_RTU4556_001', 'SBSmart_RTU4556_002', 'SBSmart_RTU4556_003', 'SBSmart_RTU4556_004', 'SBSmart_RTU4556_005', 'SBSmart_RTU4556_006', 'SBSmart_RTU4556_007', 'SBSmart_RTU4556_008', 'SBSmart_RTU4556_009', 'SBSmart_RTU4556_010', 'SBSmart_RTU4556_011', 'SBSmart_RTU4556_012', 'SBSmart_RTU4556_013', 'SBSmart_RTU4556_014', 'SBSmart_RTU4556_015', 'SBSmart_RTU4556_016', 'SBSmart_RTU4556_017', 'SBSmart_RTU4556_018', 'SBSmart_RTU4556_019', 'SBSmart_RTU4556_020', 'SBSmart_RTU4556_021', 'SBSmart_RTU4556_022', 'SBSmart_RTU4556_023', 'SBSmart_RTU4556_024', 'SBSmart_RTU4556_025', 'SBSmart_RTU4556_026', 'SBSmart_RTU4556_027', 'SBSmart_RTU4556_028', 'SBSmart_RTU4556_029', 'SBSmart_RTU4556_030'],
   'NEC_Biomatrics': ['NEC_Biomatrics_001', 'NEC_Biomatrics_002', 'NEC_Biomatrics_003', 'NEC_Biomatrics_004', 'NEC_Biomatrics_005', 'NEC_Biomatrics_006', 'NEC_Biomatrics_007', 'NEC_Biomatrics_008', 'NEC_Biomatrics_009', 'NEC_Biomatrics_010', 'NEC_Biomatrics_011', 'NEC_Biomatrics_012', 'NEC_Biomatrics_013', 'NEC_Biomatrics_014', 'NEC_Biomatrics_015', 'NEC_Biomatrics_016', 'NEC_Biomatrics_017', 'NEC_Biomatrics_018', 'NEC_Biomatrics_019', 'NEC_Biomatrics_020', 'NEC_Biomatrics_021', 'NEC_Biomatrics_022', 'NEC_Biomatrics_023', 'NEC_Biomatrics_024', 'NEC_Biomatrics_025', 'NEC_Biomatrics_026', 'NEC_Biomatrics_027', 'NEC_Biomatrics_028', 'NEC_Biomatrics_029', 'NEC_Biomatrics_030'],
   'Radwin_Access Point': ['Radwin_Access Point_001', 'Radwin_Access Point_002', 'Radwin_Access Point_003', 'Radwin_Access Point_004', 'Radwin_Access Point_005', 'Radwin_Access Point_006', 'Radwin_Access Point_007', 'Radwin_Access Point_008', 'Radwin_Access Point_009', 'Radwin_Access Point_010', 'Radwin_Access Point_011', 'Radwin_Access Point_012', 'Radwin_Access Point_013', 'Radwin_Access Point_014', 'Radwin_Access Point_015', 'Radwin_Access Point_016', 'Radwin_Access Point_017', 'Radwin_Access Point_018', 'Radwin_Access Point_019', 'Radwin_Access Point_020', 'Radwin_Access Point_021', 'Radwin_Access Point_022', 'Radwin_Access Point_023', 'Radwin_Access Point_024', 'Radwin_Access Point_025', 'Radwin_Access Point_026', 'Radwin_Access Point_027', 'Radwin_Access Point_028', 'Radwin_Access Point_029', 'Radwin_Access Point_030'],
   'D-Link DIR-600L_Router': ['D-Link DIR-600L_Router_001', 'D-Link DIR-600L_Router_002', 'D-Link DIR-600L_Router_003', 'D-Link DIR-600L_Router_004', 'D-Link DIR-600L_Router_005', 'D-Link DIR-600L_Router_006', 'D-Link DIR-600L_Router_007', 'D-Link DIR-600L_Router_008', 'D-Link DIR-600L_Router_009', 'D-Link DIR-600L_Router_010', 'D-Link DIR-600L_Router_011', 'D-Link DIR-600L_Router_012', 'D-Link DIR-600L_Router_013', 'D-Link DIR-600L_Router_014', 'D-Link DIR-600L_Router_015', 'D-Link DIR-600L_Router_016', 'D-Link DIR-600L_Router_017', 'D-Link DIR-600L_Router_018', 'D-Link DIR-600L_Router_019', 'D-Link DIR-600L_Router_020', 'D-Link DIR-600L_Router_021', 'D-Link DIR-600L_Router_022', 'D-Link DIR-600L_Router_023', 'D-Link DIR-600L_Router_024', 'D-Link DIR-600L_Router_025', 'D-Link DIR-600L_Router_026', 'D-Link DIR-600L_Router_027', 'D-Link DIR-600L_Router_028', 'D-Link DIR-600L_Router_029', 'D-Link DIR-600L_Router_030'],
   'RWE_Smoke Detector': ['RWE_Smoke Detector_SH_001', 'RWE_Smoke Detector_SH_002', 'RWE_Smoke Detector_SH_003', 'RWE_Smoke Detector_SH_004', 'RWE_Smoke Detector_SH_005', 'RWE_Smoke Detector_SH_006', 'RWE_Smoke Detector_SH_007', 'RWE_Smoke Detector_SH_008', 'RWE_Smoke Detector_SH_009', 'RWE_Smoke Detector_SH_010', 'RWE_Smoke Detector_SH_011', 'RWE_Smoke Detector_SH_012', 'RWE_Smoke Detector_SH_013', 'RWE_Smoke Detector_SH_014', 'RWE_Smoke Detector_SH_015', 'RWE_Smoke Detector_SH_016', 'RWE_Smoke Detector_SH_017', 'RWE_Smoke Detector_SH_018', 'RWE_Smoke Detector_SH_019', 'RWE_Smoke Detector_SH_020', 'RWE_Smoke Detector_SH_021', 'RWE_Smoke Detector_SH_022', 'RWE_Smoke Detector_SH_023', 'RWE_Smoke Detector_SH_024', 'RWE_Smoke Detector_SH_025', 'RWE_Smoke Detector_SH_026', 'RWE_Smoke Detector_SH_027', 'RWE_Smoke Detector_SH_028', 'RWE_Smoke Detector_SH_029', 'RWE_Smoke Detector_SH_030']
};

var device_group_table_tr_string= '<tr><td>Garmin_GPSTracker_Volvo</td><td>Garmin_GPSTracker</td><td>20</td><td>Manage</td></tr>;'

function fillDeviceGroupTable() {
   var trString= '';
   $.each(device_group_json, function(i, value) {
      trString+= '<tr>';
      for(var key in value) {
         if(key=== 'selected_Devices') {} else {
            trString+= '<td>'+ value[key]+ '</td>';   
         }
      }
      trString+= '</tr>';
   });
   $("#device_group_table").find('tbody').html('');
   $("#device_group_table").find('tbody').html(trString);
}


function fillNewDeviceTypeDropdown() {
   var device_group_array= [];
   $.each(device_group_json, function(i, value) {
      device_group_array.push(value.device_type);
   });
   updateSelectBox('#new_device_type_select_box', device_group_array);

   $("#new_device_type_select_box").change(function() {
      var selected= $(this).val();
      if(selected) {
         $("#add_selected_services_list").show();
         $("#add_selected_services_list_table").find('thead th').html(selected);
         $("#add_selected_services_list_table").find('tbody').html('');
         var array= master_Device_Json[selected];
         var trString='';
         for(var i=0; i< array.length; i++) {
            trString+= '<tr><td><input class="totalServiceGroupCheckbox" id="" name="'+array[i]+'" type="checkbox" value="'+array[i]+'"><label for="'+array[i]+'">'+array[i]+'</label></td></tr>';
         }
         $("#add_selected_services_list").find('tbody').html(trString);
      } else {
         $("#add_selected_services_list").hide();
      }
   });
}

   $('.hidden-on-start').hide();
   fillDeviceGroupTable();

$(".remove_Device_Type_new_device").live('click', function() {
   $("#selected_type_row").find('td:first-child').html('');
   $("#selected_type_row").find('td:nth-child(2)').html('');
   $("#add_device_type_to_new_group_button").attr('disabled', false);
});

$("#add_device_type_to_new_group_button").live('click', function() {

   var selectedDeviceType= $("#new_device_type_select_box").val();
   if(selectedDeviceType) {
      $("#selected_type_row").find('td:first-child').html(selectedDeviceType);
      $("#selected_type_row").find('td:nth-child(2)').html('<input type="button" value="Remove Device Type" class="remove_Device_Type_new_device">');
      $("#add_device_type_to_new_group_button").attr('disabled', true);   
   }
});

$("#add_device_group_button").live('click', function() {
   fillNewDeviceTypeDropdown();
   $('.hidden-on-start').hide();
   $("#add_new_device_row").show();
});

$("#cancel_new_device_group_button").live('click', function() {
   $("#new_device_group_name").val('');
   $("#add_device_type_to_new_group_button").attr('disabled', false);
   $("#add_new_device_row").hide();
});

$("#save_new_device_group_button").live('click', function() {
   var selectedName= $("#new_device_group_name").val();
   var selectedType= $("#new_device_type_select_box").val();
   // var selectedDevices= 
   if(selectedName && selectedType) {
      var newDeviceObject= {};
      newDeviceObject['device_group']= selectedName;
      newDeviceObject['device_type']= selectedType;
      newDeviceObject['noOfDevices']= 0;
      newDeviceObject['actions']= manageButtonHtml;
      newDeviceObject['selected_Devices']= [];
      $("#add_selected_services_list_table").find('tbody tr').each(function(i, hallo) {
         var checkBox= $(hallo).find('input[type="checkbox"]:checked');
         if(checkBox.length > 0) {
            newDeviceObject['selected_Devices'].push(checkBox.val());
            newDeviceObject['noOfDevices']++;
         }
      });
      device_group_json.push(newDeviceObject);
      fillDeviceGroupTable();
      $("#new_device_group_name").val('');
      $("#add_device_type_to_new_group_button").attr('disabled', false);
      $("#add_new_device_row").hide();
   }
});

/* End of Add Section */


/* Manage Section */
function updateSelectedDeviceGroup(array) {
   $("#selected_device_group_table").find('tbody').html('');
   var trString='';
   for(var i=0; i< array.length; i++) {
      trString+= '<tr id="selected_service_group'+array[i]+'"><td>'+ array[i]+'</td></tr>';
   }
   $("#selected_device_group_table").find('tbody').html(trString);
}

function updateTotalDevicesGroup(array, selectedArray) {
   $("#all_service_list_tables").find('tbody').html('');
   var trString='';
   for(var i=0; i< array.length; i++) {
      if(selectedArray.indexOf(array[i]) !== -1) {
         trString+= '<tr><td><input class="totalServiceGroupCheckbox" id="" name="'+array[i]+'" type="checkbox" checked value="'+array[i]+'"><label for="'+array[i]+'">'+array[i]+'</label></td></tr>';
      } else {
         trString+= '<tr><td><input class="totalServiceGroupCheckbox" id="" name="'+array[i]+'" type="checkbox" value="'+array[i]+'"><label for="'+array[i]+'">'+array[i]+'</label></td></tr>';
      }
   }
   $("#all_service_list_tables").find('tbody').html(trString);
}

$(".device_group_table_manage_button").live('click', function() {
   var $tr= $(this).closest('tr');
   $("#device_group_name_row").find('td:nth-child(2)').html($tr.find('td:first-child').html());
   $("#device_type_name_row").find('td:nth-child(2)').html($tr.find('td:nth-child(2)').html());
   $("#selected_device_group_table_head").find('th').html('Selected: '+ $tr.find('td:first-child').html());
   var objectInArray= findObjectinArray(device_group_json, 'device_group', $tr.find('td:first-child').html());
   console.log(objectInArray);
   updateSelectedDeviceGroup(objectInArray.selected_Devices);
   updateTotalDevicesGroup(master_Device_Json[$tr.find('td:nth-child(2)').html()], objectInArray.selected_Devices);
   $('.hidden-on-start').hide();
   $("#manage_device_row").show();
});

$(".totalServiceGroupCheckbox").live('change', function() {
   if($(this).attr('checked')) {
      var trString= '<tr id="selected_service_group'+$(this).val()+'"><td>'+ $(this).val()+'</td></tr>';
      if($("#selected_device_group_table").find('tbody tr:last-child').length !== 0) {
         $("#selected_device_group_table").find('tbody tr:last-child').after(trString);
      } else {
         $("#selected_device_group_table").find('tbody').html(trString);
      }
   } else {
      $("#selected_service_group"+$(this).val()).remove();
   }
});

$("#save_manage_device_group").live('click', function() {
   var selectedName= $("#device_group_name_row").find('td:nth-child(2)').html();
   var selectedType= $("#device_type_name_row").find('td:nth-child(2)').html();
   var selectedDevicesArray= [];
   var selectedDevicesCount= 0;
   $("#selected_device_group_table").find('tbody tr').each(function(i, tr) {
      var tdText= $(tr).children().text();
      selectedDevicesArray.push(tdText);
      selectedDevicesCount++;
   });
   var objectInArray= findObjectinArray(device_group_json, 'device_group', selectedName);
   objectInArray['noOfDevices']= /*master_Device_Json[selectedType].length - */selectedDevicesCount;
   objectInArray['selected_Devices']= selectedDevicesArray;
$("#manage_device_row").hide();
   fillDeviceGroupTable();
});
$("#cancel_manage_device_group").live('click', function() {
   $("#manage_device_row").hide();
});
/* End of Manage Section */

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