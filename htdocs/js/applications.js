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
}

function app_group_conf_view()
{
    var fordGroup= [{'groupName': 'Ford Group 1', 'profileName': 'Ford Profile 1'}, {'groupName': 'Ford Group 2', 'profileName': 'Ford Profile 2'}, {'groupName': 'Ford Group 3', 'profileName': 'Ford Profile 3'}];
    var otherOptionGroup= [{'groupName': 'Option Group 1', 'profileName': 'Option Profile 1'}, {'groupName': 'Option Group 2', 'profileName': 'Option Profile 2'}, {'groupName': 'Option Group 3', 'profileName': 'Option Profile 3'}];
    

// $(document).ready(function() {
    // createSelectBox('#app_grp_configuration_select_customer', function(selectBox) {
        $("#app_grp_configuration_select_customer").change(function() {
            var selectedValue= $(this).val();
            var $tableTbodyTrReference= $("table#exite_appgrp_tbl tbody.exicting_app_grp > tr");
            $tableTbodyTrReference.each(function(i, tr) {
                if(selectedValue=== 'Ford') {
                    $(tr).find('td:nth-child(1) input').val(fordGroup[i].groupName);
                    $(tr).find('td:nth-child(2) input').val(fordGroup[i].profileName);
                } else {
                    $(tr).find('td:nth-child(1) input').val(otherOptionGroup[i].groupName);
                    $(tr).find('td:nth-child(2) input').val(otherOptionGroup[i].profileName);
                }
            });

            $("table#app_grp_configuration_table").find('tr:nth-child(2)').show();
        });

        // createSelectBox('#add_new_app_grp_select_service_profile', function() {});

    // });

    function addButtonClickEvent() {
        $("#addGroupImage").click(function(e) {
            e.preventDefault();
            $(this).unbind('click');
            $("table#app_grp_configuration_table > tbody > tr:nth-child(3)").show();
        });    
    }

    $("#add_new_app_grp_save").click(function() {
        $("table#app_grp_configuration_table > tbody > tr:nth-child(3)").hide();
        $('#addGroupImage').bind('click');
        addButtonClickEvent()
    });

    $("#add_new_app_grp_cancel").click(function() {
        $("table#app_grp_configuration_table > tbody > tr:nth-child(3)").hide();
        $('#addGroupImage').bind('click');
        addButtonClickEvent();
    });

    addButtonClickEvent();

    $('.app_map_services').click(function() {
        halloMapServices();
    });

    halloMapServices();
// });

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
