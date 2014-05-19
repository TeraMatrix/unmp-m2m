#!/usr/bin/python

from mod_python import apache
from datetime import datetime, timedelta
import urlparse, json, MySQLdb

# Database connection information 
# localhost:   host ip or name on which database installed [server ip or name]
# root:        username of database
# root:        password of database
# demo:        name of database
mysql_credentials = ("localhost","root","root","nms")

# to get query params
def read_get_vars(req):
    req.vars = {}
    req.multivars = {}
    if req.args:
        req.rawvars = urlparse.parse_qs(req.args, True)
        for (key,values) in req.rawvars.items():
            if len(values) >= 1:
                req.vars[key] = values[-1]

# to get SBSmart device
def get_sbsmart_params(req):
    global mysql_credentials
    
    # result type
    req.content_type = 'application/json'
    
    # variables
    data = {"status": 0}
    error = False
    actual_param_dict = {}
    param_dict = {}
    device_type_id = "sbs"

    # get params
    params = req.vars.get("p", None)
    t1 = req.vars.get("timestamp1", "")
    t2 = req.vars.get("timestamp2", "")

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
    else:
        # Open database connection
        db = MySQLdb.connect(*mysql_credentials)
        
        # prepare a cursor object using cursor() method
        cursor = db.cursor()
        
        # SQL queries
        # get service parameters
        query = "SELECT query_param FROM service_parameter WHERE service_parameter.is_active = 1 AND device_type_id = '" + device_type_id + "' ORDER BY  parameter_index ASC"
        
        # execute sql query
        cursor.execute(query)
        
        # fetch data from executed sql query
        sp_list = cursor.fetchall()
        
        # close the cursor
        cursor.close()
        
        for i in range(len(sp_list)):
            actual_param_dict[sp_list[i][0]] = i
        if params:
            params = params.split(",")
            for param in params:
                if actual_param_dict.has_key(param):
                    param_dict[param] = actual_param_dict[param]
        else:
            param_dict = actual_param_dict
            
        if param_dict:
            data["data"] = {}
            
            # prepare a cursor object using cursor() method
            cursor = db.cursor()
            
            # SQL queries
            # get service parameters data
            query = "SELECT service_data, timestamp, host_id FROM host_service_parameter_data WHERE timestamp > '%s' AND timestamp <= '%s' ORDER BY  timestamp DESC, host_id DESC" % (t1, t2)
            
            # execute sql query
            cursor.execute(query)
            
            # fetch data from executed sql query
            hsp_list = cursor.fetchall()
            
            # close the cursor
            cursor.close()
        
            for hsp in hsp_list:
                if hsp[0] and hsp[1] and hsp[2]:
                    dt_list = str(hsp[0]).split(";")
                    dt_list_len = len(dt_list)
                    dt_dict = {}
                    device_id = None
                    if dt_list_len > 1:
                        device_id = dt_list[0]
                        if not data["data"].has_key(device_id):
                           data["data"][device_id] = []
                        for k,v in param_dict.iteritems():
                            if v < dt_list_len - 1:
                                dt_dict[k] = dt_list[v+1]
                        if dt_dict and device_id:
                            data["data"][device_id].append({hsp[1].strftime('%Y-%m-%d %H:%M:%S'):dt_dict})
            if data.has_key("data") and data["data"]:
                data["status"] = 1
            else:
                data["status"] = 0
                data["msg"] = "Data doesn't exist."
        else:
            data["status"] = 0
            data["msg"] = "invalid parameters passed"
        # Close database connection
        db.close()
    req.write(json.dumps(data))

# get SBSmart Alarms
def get_sbsmart_alarms(req):
    global mysql_credentials
    
    # result type
    req.content_type = 'application/json'
    
    # variable
    data = {"status": 0}
    error = False
    actual_param_dict = {}
    param_dict = {}
    serevity = req.vars.get("s", None)
    device_type_id = "sbs"
    
    if serevity:
        serevity = serevity.split(",")
    else:
        serevity = []
    t1 = req.vars.get("timestamp1", "")
    t2 = req.vars.get("timestamp2", "")
    
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
    else:
        # Open database connection
        db = MySQLdb.connect(*mysql_credentials)
        
        # prepare a cursor object using cursor() method
        cursor = db.cursor()
        
        # SQL queries
        if serevity:
            s_query = ""
            for i in range(len(serevity)):
                if i > 0:
                    s_query += "OR"
                s_query += " serevity like '%" + str(serevity[i]) + "%' "
            if s_query:
                s_query = "AND (" + s_query + ")"
                
            # get alarm
            query = "SELECT trap_alarm_id, description, trap_ip, event_id, trap_event_type, serevity, timestamp FROM trap_alarms WHERE timestamp > '%s' AND timestamp <= '%s' %s ORDER BY  timestamp DESC" % (t1, t2, s_query)
        else:
            query = "SELECT trap_alarm_id, description, trap_ip, event_id, trap_event_type, serevity, timestamp FROM trap_alarms WHERE timestamp > '%s' AND timestamp <= '%s' ORDER BY  timestamp DESC" % (t1, t2)
        
        # execute sql query
        cursor.execute(query)
        
        # fetch data from executed sql query
        alarm_tuple = cursor.fetchall()
        
        
        device_id_dict = {}
        if alarm_tuple:
            data["status"] = 1
            data["data"] = []
            for alarm in alarm_tuple:
                device_id = None
                if device_id_dict.has_key(alarm[2]):
                    device_id = device_id_dict[alarm[2]]
                else:
                    # get device id
                    query = "SELECT user_id FROM host_service_details INNER JOIN hosts ON hosts.host_id = host_service_details.host_id  WHERE hosts.ip_address = '%s'" % alarm[2]
                    # execute sql query
                    cursor.execute(query)
                    
                    device_id_list = cursor.fetchall()
                    if device_id_list:
                        device_id_list = device_id_list[0]
                        device_id_dict[alarm[2]] = device_id_list[0]
                        device_id = device_id_list[0]
                        
                
                dt_dict = {
                    "alarm_id": alarm[0],
                    "description": alarm[1],
                    "trap_ip": alarm[2],
                    "event_id": alarm[3],
                    "trap_event_type": alarm[4],
                    "serevity": alarm[5],
                    "device_id": device_id
                }
                data["data"].append({alarm[6].strftime('%Y-%m-%d %H:%M:%S'):dt_dict})
        else:
            data["status"] = 0
            data["msg"] = "No Alarm exist"
        
        # close the cursor
        cursor.close()    
        # Close database connection
        db.close()
    req.write(json.dumps(data))
    
# delete SBSmart Alarms
def delete_sbsmart_alarms(req):
    global mysql_credentials
    
    # result type
    req.content_type = 'application/json'
    
    # variable
    data = {"status": 0}
    error = False
    actual_param_dict = {}
    param_dict = {}
    serevity = req.vars.get("s", None)
    alarm_id = req.vars.get("id", None)
    device_type_id = "sbs"
    
    if alarm_id:
        # Open database connection
        db = MySQLdb.connect(*mysql_credentials)
        # prepare a cursor object using cursor() method
        cursor = db.cursor()
        # get alarm
        query = "DELETE from trap_alarms WHERE trap_alarm_id = '%s'" % (alarm_id)
        # execute sql query
        cursor.execute(query)
        
        # deleted row count
        rows_affected = cursor.rowcount
        
        # fetch data from executed sql query
        db.commit();
        
        # close the cursor
        cursor.close()
        
        if 0 == rows_affected:
            data["status"] = 0
            data["msg"] = "Alarm Id does not exist"
        else:
            data["status"] = 1
            data["msg"] = "Alarm Deleted successfully"
        # Close database connection
        db.close()
    else:
        if serevity:
            serevity = serevity.split(",")
        else:
            serevity = []
        t1 = req.vars.get("timestamp1", "")
        t2 = req.vars.get("timestamp2", "")
        
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
        else:
            # Open database connection
            db = MySQLdb.connect(*mysql_credentials)
            
            # prepare a cursor object using cursor() method
            cursor = db.cursor()
            
            # SQL queries
            if serevity:
                s_query = ""
                for i in range(len(serevity)):
                    if i > 0:
                        s_query += "OR"
                    s_query += " serevity like '%" + str(serevity[i]) + "%' "
                if s_query:
                    s_query = "AND (" + s_query + ")"
                    
                # delete alarm
                query = "DELETE from trap_alarms WHERE timestamp > '%s' AND timestamp <= '%s' %s" % (t1, t2, s_query)
            else:
                query = "DELETE from trap_alarms WHERE timestamp > '%s' AND timestamp <= '%s'" % (t1, t2)
            
            # execute sql query
            cursor.execute(query)
            
            # deleted row count
            rows_affected = cursor.rowcount
            
            # fetch data from executed sql query
            db.commit();
            
            # close the cursor
            cursor.close()
            
            if 0 == rows_affected:
                data["status"] = 1
                data["msg"] = "In this range of timestamp Alarm doesn't exist"
            else:
                data["status"] = 1
                data["msg"] = "Alarms Deleted successfully"
                
            # Close database connection
            db.close()
    req.write(json.dumps(data))
    
def page_not_found(req):
    data = {"status": 0, "msg": "API not found"}
    req.content_type = 'application/json'
    req.write(json.dumps(data))
		
pagehandlers = {}
pagehandlers.update({
	"get_sbsmart_params": get_sbsmart_params,
	"get_sbsmart_alarms": get_sbsmart_alarms,
	"delete_sbsmart_alarms": delete_sbsmart_alarms
})

def handler(req):
    req.log_error('handler')
    req.content_type = 'text/html'
    req.send_http_header()
    req.myfile = req.uri.split("/")[-1][:-3]
    handler = pagehandlers.get(req.myfile, page_not_found)
    read_get_vars(req)
    handler(req)
    return apache.OK

