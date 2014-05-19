#!/usr/bin/python2.6

'''
@author: Yogesh Kumar
@since: 10-Mar-2014
@date: 10-Mar-2014
@version: 0.1
'''

# Import modules that contain the function and libraries
from datetime import datetime, timedelta
from json import JSONEncoder

from inventory_bll import HostUtils

# URL: http://127.0.0.1/nms/check_mk/get_sbsmart_params.py?p=t&timestamp1=2014-03-10%2018:00:00&timestamp2=2014-03-10%2019:00:00
def get_sbsmart_params(h):
    """
    @param h:
    """
    # t, h, a1, a2, a3, a4, d1, d2, d3, d4, prv, prc, pre, pbv, pbc, pbe, pyv, pyc, pye
    global html
    html = h
    data = {
        "status": 0
    }
    device_type_id = "sbs"
    error = False
    actual_param_dict = {}
    param_dict = {}
    params = html.var("p", None)
    t1 = html.var("timestamp1", "")
    t2 = html.var("timestamp2", "")
    if t1 and t2:
        try:
            # to check the datetime
            timestamp1 = datetime.strptime(t1, '%Y-%m-%d %H:%M:%S')
            timestamp2 = datetime.strptime(t2, '%Y-%m-%d %H:%M:%S')
        except:
            error = True
            msg = "Invalid Date"
    else:
        timestamp2 = datetime.now()
        timestamp1 = timestamp2 - timedelta(minutes = 30)
        t1 = timestamp1.strftime('%Y-%m-%d %H:%M:%S')
        t2 = timestamp2.strftime('%Y-%m-%d %H:%M:%S')
    if error:
        data["status"] = 0
        data["msg"] = msg
        html.req.content_type = "application/json"
        html.write(JSONEncoder().encode(data))
    else:
        hu = HostUtils()
        sp_list = hu.get_service_parameters(device_type_id)
        for i in range(len(sp_list)):
            actual_param_dict[sp_list[i][7]] = i
        
        if params:
            params = params.split(",")
            for param in params:
                if actual_param_dict.has_key(param):
                    param_dict[param] = actual_param_dict[param]
        else:
            param_dict = actual_param_dict
           
        if param_dict:
            data["status"] = 1
            data["data"] = []
            hsp_list = hu.get_host_service_parameter_data_by_time(t1, t2)
            for hsp in hsp_list:
                param = []
                if hsp[0] and hsp[1]:
                    dt_list = str(hsp[0]).split(";")
                    dt_list_len = len(dt_list)
                    dt_dict = {}
                    for k,v in param_dict.iteritems():
                        if v < dt_list_len:
                            dt_dict[k] = dt_list[v+1]
                    data["data"].append({hsp[1].strftime('%Y-%m-%d %H:%M:%S'):dt_dict})
            
        hu.close_database_connection()
        html.req.content_type = "application/json"
        html.write(JSONEncoder().encode(data))
             
#URL: http://127.0.0.1/nms/check_mk/get_sbsmart_alarms.py?s=3,4&timestamp1=2014-03-10%2018:00:00&timestamp2=2014-03-10%2018:20:00
def get_sbsmart_alarms(h):
    """
    @param h:
    """
    global html
    html = h
    data = {
        "status": 0
    }
    device_type_id = "sbs"
    error = False
    actual_param_dict = {}
    param_dict = {}
    serevity = html.var("s", None)
    if serevity:
        serevity = serevity.split(",")
    else:
        serevity = []
    t1 = html.var("timestamp1", "")
    t2 = html.var("timestamp2", "")
    if t1 and t2:
        try:
            # to check the datetime
            timestamp1 = datetime.strptime(t1, '%Y-%m-%d %H:%M:%S')
            timestamp2 = datetime.strptime(t2, '%Y-%m-%d %H:%M:%S')
        except:
            error = True
            msg = "Invalid Date"
    else:
        timestamp2 = datetime.now()
        timestamp1 = timestamp2 - timedelta(minutes = 30)
        t1 = timestamp1.strftime('%Y-%m-%d %H:%M:%S')
        t2 = timestamp2.strftime('%Y-%m-%d %H:%M:%S')
    if error:
        data["status"] = 0
        data["msg"] = msg
        html.req.content_type = "application/json"
        html.write(JSONEncoder().encode(data))
    else:
        hu = HostUtils()
        alarm_list = hu.get_alarm_by_time(serevity, t1, t2)
        if alarm_list:
            data["status"] = 1
            data["data"] = []
            for alarm in alarm_list:
                dt_dict = {
                    "description": alarm[0],
                    "trap_ip": alarm[1],
                    "event_id": alarm[2],
                    "trap_event_type": alarm[3],
                    "serevity": alarm[4]
                }
                data["data"].append({alarm[5].strftime('%Y-%m-%d %H:%M:%S'):dt_dict})
        hu.close_database_connection()
        html.req.content_type = "application/json"
        html.write(JSONEncoder().encode(data))        

#URL: http://127.0.0.1/nms/check_mk/delete_sbsmart_alarms.py?s=3,4&timestamp1=2014-03-10%2018:00:00&timestamp2=2014-03-10%2018:20:00                                                          
def delete_sbsmart_alarms(h):
    """
    @param h:
    """
    global html
    html = h
    data = {
        "status": 0
    }
    device_type_id = "sbs"
    error = False
    actual_param_dict = {}
    param_dict = {}
    serevity = html.var("s", None)
    if serevity:
        serevity = serevity.split(",")
    else:
        serevity = []
    t1 = html.var("timestamp1", "")
    t2 = html.var("timestamp2", "")
    if t1 and t2:
        try:
            # to check the datetime
            timestamp1 = datetime.strptime(t1, '%Y-%m-%d %H:%M:%S')
            timestamp2 = datetime.strptime(t2, '%Y-%m-%d %H:%M:%S')
        except:
            error = True
            msg = "Invalid Date"
    else:
        timestamp2 = datetime.now()
        timestamp1 = timestamp2 - timedelta(minutes = 30)
        t1 = timestamp1.strftime('%Y-%m-%d %H:%M:%S')
        t2 = timestamp2.strftime('%Y-%m-%d %H:%M:%S')
    if error:
        data["status"] = 0
        data["msg"] = msg
        html.req.content_type = "application/json"
        html.write(JSONEncoder().encode(data))
    else:
        hu = HostUtils()
        alarm_list = hu.delete_alarm_by_time(serevity, t1, t2)
        if alarm_list:
            data["status"] = 1
            data["msg"] = "Alarm Deleted successfully"
        hu.close_database_connection()
        html.req.content_type = "application/json"
        html.write(JSONEncoder().encode(data))


