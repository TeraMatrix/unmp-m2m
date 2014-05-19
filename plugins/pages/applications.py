import application_management

pagehandlers.update({
    "application_list_view" : application_management.application_list_view,
    "application_get_list_ajax" : application_management.application_get_list_ajax,
    "application_delete_ajax" : application_management.application_delete_ajax,
    "application_detail_view" : application_management.application_detail_view,
    "application_post_detail_ajax" : application_management.application_post_detail_ajax,
    "application_put_detail_ajax" : application_management.application_put_detail_ajax,
    "application_get_detail_ajax" : application_management.application_get_detail_ajax,

    "app_service_get_ajax" : application_management.app_service_get_ajax,

    "app_cust_list_view" : application_management.app_cust_list_view,
    "app_cust_list_get_ajax" : application_management.app_cust_list_get_ajax,

    "app_cust_detail_view" :  application_management.app_cust_detail_view,
    "app_group_conf_view" : application_management.app_group_conf_view,

    "app_cust_post_detail_ajax" : application_management.app_cust_post_detail_ajax,
    "app_cust_delete_ajax" : application_management.app_cust_delete_ajax,

    })

