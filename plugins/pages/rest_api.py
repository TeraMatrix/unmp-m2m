#!/usr/bin/python2.6

'''
@author: Yogesh Kumar
@since: 10-Mar-2014
@date: 10-Mar-2014
@version: 0.1
'''

# Import modules that contain the page functions
import rest_api

# map URLs to page rendering functions
pagehandlers.update({
    "get_sbsmart_params": rest_api.get_sbsmart_params,
    "get_sbsmart_alarms": rest_api.get_sbsmart_alarms,
    "delete_sbsmart_alarms": rest_api.delete_sbsmart_alarms,
    # "help_inventory_hostgroup": inventory_controller.page_tip_inventory_hostgroup,
    # "help_inventory_host": inventory_controller.page_tip_inventory_host,
    # "help_inventory_discovery": inventory_controller.page_tip_inventory_discovery,
    # "help_inventory_service": inventory_controller.page_tip_inventory_service,
    # "help_inventory_network_map": inventory_controller.page_tip_inventory_network_map,
    # "help_inventory_vendor": inventory_controller.page_tip_inventory_vendor,
    # "help_inventory_black_list_mac": inventory_controller.page_tip_inventory_black_list_mac,
    # "help_crc_phy": reporting_controller.page_tip_crc_phy,
    # "help_rssi": reporting_controller.page_tip_rssi,
    # "help_network_usage": reporting_controller.page_tip_network_usage,
    # "help_network_outage": reporting_controller.page_tip_network_outage,
    # "help_trap": reporting_controller.page_tip_trap,
    # "help_daemons": daemons_controller.page_tip_daemons,
    # "help_license": license_controller.page_tip_license,
})
