//###############################################
//anchor tags with class="ajax_caller" will call function and not refresh page
function make_ready_ajax_callers(oTable){
	//find ajax_callers
	
	var statusText = top.frames["main"].document;
	
	var container_body = $(statusText).find("#container_body > div");

	var a_ajax_caller = $(container_body).find("a.ajax_caller");

	//find the ajax_caller child
	var a_ajax_caller_child = a_ajax_caller.find("img");

	a_ajax_caller.click(function(event){
		event.preventDefault();
		event.stopPropagation();

		var call = $(this).attr("href");
		var me = $(this).parent("td").parent("tr").get(0);

		call_me_baby_one_more_time(call,me);
		return false;
	});

	a_ajax_caller_child.click(function(event){
		event.preventDefault();
		event.stopPropagation();

		//call GET as a default
		var call = $(this).parent().attr("href");

		var me = $(this).parent("a").parent("td").parent("tr").get(0);

		call_me_baby_one_more_time(call, me);
		return false;
	});

	function call_me_baby_one_more_time(call_what, me) {

		$.ajax({
			type: "GET",
			url: call_what,
			success : function(result){
				try {
					result = JSON.parse(result);
						if (result.success == 1){
						$().toastmessage('showErrorToast', result.message);
						// oTable.fnDeleteRow(oTable.fnGetPosition(me));
					}
					else {
						$().toastmessage('showSuccessToast', result.message);
					}
				}
				catch (ex) {
					$().toastmessage('showSuccessToast', result.message);
					return false;
				}
				window.location.reload();
			},
			error: function() {
				$().toastmessage('showErrorToast', "Action was unsuccessful. Please retry");
			}
		});
	}
}
//###############################################
//###for customer addition
$(function () {
	// creates tabs
    $("div.yo-tabs", "div#container_body").yoTabs();
});