import customer_management

pagehandlers.update({
    "customer_management" : customer_management.customer_list,
    "customer_add_view_old" : customer_management.customer_add_view,
    "customer_add_view" : customer_management.customer_add_view_new,
    "customer_edit_view" : customer_management.customer_edit_view,
    "customer_get_ajax" : customer_management.customer_get_ajax,
    "customer_get_details_ajax" : customer_management.customer_get_details_ajax,
    "customer_post_ajax" : customer_management.customer_post_ajax,
    "customer_put_ajax" : customer_management.customer_put_ajax,
    "customer_delete_ajax" : customer_management.customer_delete_ajax,
    "customer_control_view" : customer_management.customer_control_view,
    "customer_device_service_view" : customer_management.customer_device_service_view,
    "device_group_management_view": customer_management.device_group_management_view,
    })

pagehandlers.update({
    "customer_group_management" : customer_management.customer_group_list,
    "customer_group_add_view" : customer_management.customer_group_add_view,
    "customer_group_edit_view" : customer_management.customer_group_edit_view,
    "customer_group_get_ajax" : customer_management.customer_group_get_ajax,
    "customer_group_get_details_ajax" : customer_management.customer_group_get_details_ajax,
    "customer_group_post_ajax" : customer_management.customer_group_post_ajax,
    "customer_group_put_ajax" : customer_management.customer_group_put_ajax,
    "customer_group_delete_ajax" : customer_management.customer_group_delete_ajax,
    })