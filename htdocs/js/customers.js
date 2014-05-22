/*===========================new customer functions==============================*/
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BEGIN 19th May Monday

// function createSelectBox(domElement, callback) {
//    var scombobox= $(domElement).scombobox({
//       highlight: true
//    });
//    callback(scombobox);
// }

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