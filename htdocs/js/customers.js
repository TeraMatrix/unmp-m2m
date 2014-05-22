/*===========================new customer functions==============================*/
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BEGIN 19th May Monday

// function createSelectBox(domElement, callback) {
//    var scombobox= $(domElement).scombobox({
//       highlight: true
//    });
//    callback(scombobox);
// }

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

function addButtonClickEvent() {
    $("#new_profile_name_add_link").click(function(e) {
        e.preventDefault();
        $(this).unbind('click');
        $("table#new_profile_table").show();
    });    
}

function toggle_state(){
    //Toggle Button
  $(".toggleButton").click(function() {
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

}

function customer_device_service_view()
{
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

  halloMapServices();

    $("#new_profile_name_device_grp_search").keypress(function(e) {
     var searchValue= $("#new_profile_name_device_grp_search").val();
     $("#device_group_tbl tr:nth-child(2) table tr").each(function(i, tr) {
        var tdValue= $(tr).find('td:nth-child(2)').html();
        if(tdValue.indexOf(searchValue) === -1) {
           $(tr).hide();
        } else {
           $(tr).show();
        }
     });
  });

  var device_grp_object= {
     'Pikachu': ['PikachuService1', 'PikachuService2', 'PikachuService3'],
     'Geodude': ['GeodudeService1', 'GeodudeService2', 'GeodudeService3'],
     'Gramin': ['GraminService1', 'GraminService2', 'GraminService3']
  };


  $('input[type="checkbox"].device_grp_checkbox').change(function(e) {
     var trString= '';
     $('input[type="checkbox"]:checked.device_grp_checkbox').each(function(i, checkbox) { 
        var value= $(checkbox).val();
        trString+= '<tr><td colspan="2" class="fixed_tbl_head">'+ value+ '</td></tr>';
        $.each(device_grp_object[value], function(i, value2) {
           trString+= '<tr><td><input type="checkbox" class="chk_bx" value="" /></td><td>'+ value2 + '</td></tr>'
        });
     });

     $("table#service_tbl_inner tbody").html('');
     $("table#service_tbl_inner tbody")[0].innerHTML= trString;
  });

  $("#new_service_search_box").keypress(function(e) {
     var searchValue= $("#new_service_search_box").val();
     $("#service_tbl tr:nth-child(2) table#service_tbl_inner tbody tr").each(function(i, tr) {
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



  $("#platform_services_search").keypress(function(e) {
     var searchValue= $("#platform_services_search").val();
     $("#platform_service_tbl tr:nth-child(2) table#platform_search_table tr").each(function(i, tr) {
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


  var customer_details= {
     'Ford': {'.customer_name': 'Ford', '.portal_Id': 'TT-Port-0496', '.portal_Link': 'http://teramatrix.co.in/', '.color_theme': 'Dark Gray'},
     'Other': {'.customer_name': 'Other', '.portal_Id': 'TT-Port-Other', '.portal_Link': 'http://dontknow.co.in/', '.color_theme': 'Dark Gray'}
  };
  // createSelectBox('#service_profile_select_customer_select', function(selectBox) {
     $("#service_profile_select_customer_select").change( function() {
              var selectedValue= $(this).val();
              // $("table#propiling_tbl table.deatil_tbl")
              var customerDetails= customer_details[selectedValue];
              for (var key in customer_details) {
                 if(key=== selectedValue) {
                    var obj = customer_details[key];
                    for (var prop in obj) {
                       if(obj.hasOwnProperty(prop)){
                          $(prop).val('');
                          $(prop).val(obj[prop]);
                       }
                    }
                 }
              }

              $("table#service_profile_tbl").show();
           });
  // });

  $("#new_profile_name_add_link").click(function() {
     $("#new_profile_table").show();
  });

  addButtonClickEvent();

  $("#save_new_profile_button").click(function() {
      $("table#new_profile_table").hide();
      addButtonClickEvent()
  });

  $("#cancel_new_profile_button").click(function() {
      $("table#new_profile_table").hide();
      addButtonClickEvent();
  });
}


//////////////////FORM 1


function looper(parentEm, selectedEm, selectedEm2, attribute) {
   $(parentEm).find(selectedEm).each(function(i, textbox) {
         $(textbox).attr('readonly', attribute);
      });

      $(parentEm).find(selectedEm2).each(function(i, textbox) {
         $(textbox).attr('readonly', attribute);
      });
}

function customer_control_view(){
  var cust_detail= {
   'Ford': {'subscriptionNumber': 'xxx-xxx-xx', 'contactPersonName': 'Lorem Ipsum', 'email': 'a@e.com', 'portalId': 'xyz', 'portalLink': 'LinktoPortal', 'portalTheme': 'Dark Gray', 'usersList': [{'userName': 'user1', 'password': 'aaa', 'email': 'a@e.com'}, {'userName': 'user1', 'password': 'aaa', 'email': 'a@e.com'}, {'userName': 'user1', 'password': 'aaa', 'email': 'a@e.com'}]},
   'Option2': {'subscriptionNumber': 'xxx-yyyy-zz', 'contactPersonName': 'Dolor Ipsum', 'email': 'a@e.org', 'portalId': 'zyx', 'portalLink': 'PortalToLink', 'portalTheme': 'Light Gray', 'usersList': [{'userName': 'user2', 'password': 'aaa', 'email': 'a@e.net'}, {'userName': 'user2', 'password': 'aaa', 'email': 'a@e.net'}, {'userName': 'user2', 'password': 'aaa', 'email': 'a@e.net'}]}
};

var select_profile_details= {
   'Ford': [{'deviceType': 'garminGPS_Ford', 'services': 8}, {'deviceType': 'garminGPS_Ford', 'services': 11}, {'deviceType': 'garminGPS_Ford', 'services': 4}],
   'Option2': [{'deviceType': 'garminGPS_Option2', 'services': 8}, {'deviceType': 'garminGPS_Option2', 'services': 12}, {'deviceType': 'garminGPS_Option2', 'services': 3}],
};

// $(document).ready(function() {
     // createSelectBox('#Customer_Control_Panel_Select_Customer', function(selectBox) {
        $("#Customer_Control_Panel_Select_Customer").change(function() {
           var selectedValue= $(this).val();
           $(this).closest('tbody').children().show();
           for (var key in cust_detail) {
              if(key=== selectedValue) {
                 var obj = cust_detail[key];
                 for (var prop in obj) {
                    if(prop=== 'usersList') {
                       
                    } else {
                       if(obj.hasOwnProperty(prop)){
                          $('table#customer_control_panel_table input[type="text"].'+prop).val('');
                          $('table#customer_control_panel_table input[type="text"].'+prop).val(obj[prop]);
                       }   
                    }
                 }
              }
           }
        });
     // });

     // createSelectBox('#service_profile_profile_select', function(selectBox) {
        $("#service_profile_profile_select").change(function() {
           var selectedValue= $(this).val();
           $(this).closest('tbody').children('tr:hidden').show();
           for (var key in select_profile_details) {
              if(key=== selectedValue) {
                 var obj = select_profile_details[key];
                 $( "table#device_type_services_table tbody" ).empty();
                 var trString= '';
                 trString+= '<tr><th>Device Type</th><th>Services</th></tr>';
                 $.each(obj, function(i, eachObj) {
                    trString+= '<tr><td>'+eachObj.deviceType+'</td><td>'+eachObj.services+'<input type="button" class="btn" style="visibility:hidden" value="hidden" /></td></tr>';
                 });
                 $( "table#device_type_services_table tbody" ).html(trString);
              }
           }
           toggle_state();
        });     
     // });

     $('input[type="button"]#manage_user_details').click(function() {
        
        //Show next a href for adding rows
        $("a#add_user_details_row").show();

        looper("table#user_details_table", 'input[type="text"][readonly]', 'input[type="password"][readonly]', false);

        $("table#user_details_table tr#user_details_table_save_tr").show();

        $('input[type=button]#user_details_table_save_button').click(function() {
           looper("table#user_details_table", 'input[type="text"]', 'input[type="password"]', true);
           $("table#user_details_table tr#user_details_table_save_tr").hide();
           $("a#add_user_details_row").hide();
        });
     });
  // });
}

function customer_add_view_new(){
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