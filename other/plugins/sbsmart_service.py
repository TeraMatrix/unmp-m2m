#!/usr/bin/python2.6

# import all the usefull modules.
import sys, urllib2, re, socket, time
from datetime import datetime
# get all the command line arguments
arg = sys.argv
service_url = "http://www.softbitonline.com/senddata.asp"
redirect_url = "http://54.201.58.16/fetchdata/fetchdata2.asp"
#site_name = __file__.split("/")[3]
site_name = "nms"

# TCP Connection
TCP_IP = '122.160.23.174'
TCP_PORT = 31241
BUFFER_SIZE = 1024
MESSAGE = "IDCB000482;USERasharma@teramatrix.in;"
        
# error message for this plugin
def plugin_message(message=""):
    if message:
        print str(message)
    else:
        print "you are passing bad arguments."

# exit from program using sys.exit() with error code[0,1,2,3]
# 0 for OK
# 1 for Warning
# 2 for Critical
# 3 for Unknown
def exit(message_code):
    try:
        sys.exit(message_code)
    except SystemExit:
        pass    

# to get text of xml node
def getText(nodelist):
    rc = []
    for node in nodelist:
        if node.nodeType == node.TEXT_NODE:
            rc.append(node.data)
    return ''.join(rc)

# to check string is a float or not
def isfloat(dt):
    if re.match("^\d+?\.\d+?$", str(dt)):
        return True
    else:
        return False

def update_relay_status(host_id, service_status):
    try:
        execfile('/omd/sites/%s/share/check_mk/web/htdocs/nms_config.py' % site_name)
        # Open database connection
        db = open_database_connection()
        if db:
            cursor = db.cursor()
            # update database
            update_query = "UPDATE host_service_details SET service_status = '%s' WHERE host_id = '%s'" % (",".join(service_status), host_id)
            cursor.execute(update_query)
            cursor.close()
            db.commit()
            #print ",".join(service_status)
        else:
            print "database connection problem"
    except Exception, e:
        print "(Replay Status not Updating)"

def relay_action(sckt, arm, action, host_id, service_status):
    try:
        action = "ON" == action and "1" or "0"
        MESSAGE = "IDCB000482;UPDATE;RLJ%s%s;RDDE#" % (str(arm), action)
        sckt.send(MESSAGE)
        time.sleep(3)
        data = sckt.recv(BUFFER_SIZE)
        print data + ";"
        if "IDSB000482;ACK;END#" in data:
            update_relay_status(host_id, service_status)
            return True
        else:
            return False
    except Exception, e:
        print str(e) + ";"
        return False
        
try:
    service_status = ""
    if len(arg) > 1:
        if ("-h" in arg) and (3 == len(arg)):
            host_name = arg[arg.index("-h") + 1]		# receive the host name
            execfile('/omd/sites/%s/share/check_mk/web/htdocs/nms_config.py' % site_name)
            # Open database connection
            db = open_database_connection()
            if db:
                # prepare a cursor object using cursor() method
                cursor = db.cursor()

                # get the device_id,username and password from ip address
                sql = "SELECT hosts.host_id, hosts.ip_address, device_type_id, username, password, user_id, service_status from hosts \
				    INNER JOIN host_service_details ON host_service_details.host_id = hosts.host_id WHERE host_name = '%s'" % (host_name)
                cursor.execute(sql)
                result = cursor.fetchall()
                # check data fectched or not
                if result:
                    result = result[0]
                    host_id = result[0]
                    ip_address = result[1]
                    device_type_id = result[2]
                    username = result[3]
                    password = result[4]
                    user_id = result[5]
                    service_status = result[6] and result[6] or service_status
                    service_status = service_status.split(",")
                    #url = "%s?t1=%s&t2=%s&t3=%s&t4=%s" % (service_url, username, password, user_id, redirect_url)
                    #req = urllib2.Request(url)
                    #f = urllib2.urlopen(req)
                    #response = f.read()
                    #dom = xml.dom.minidom.parseString(response)
                    #body = dom.getElementsByTagName("body")
                    #service_data = getText(body[0].childNodes)
                    
                    # TCP Connection
                    service_data = None
                    sckt = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
                    sckt.settimeout(5)
                    sckt.connect((TCP_IP, TCP_PORT))
                    sckt.send(MESSAGE)
                    time.sleep(1)
                    data = sckt.recv(BUFFER_SIZE)
                    if "ACCEPTEDACCEPTED" in data:
                        MESSAGE = "IDCB000482;ACTLOG"
                        sckt.send(MESSAGE)
                        time.sleep(2)
                        data = sckt.recv(BUFFER_SIZE)
                        if "ACCEPTEDACTLOG" in data:
                            MESSAGE = "IDCB000482;RXD"
                            sckt.send(MESSAGE)
                            time.sleep(3)
                            data = sckt.recv(BUFFER_SIZE)
                            data = data.strip().split(";")
                            data_len = len(data)
                            if data_len > 21:
                                service_data = "%s;%s;%s;%s;%s;%s;%s;%s;%s;%s;%s;%s;%s;%s;%s;%s;%s;%s" % (data[0][2:],data[1][2:],data[2][2:],data[3][2:],data[4][2:],data[5][2:],data[6][2:],data[7][2:],data[8][2:]
                                ,data[13][2:],data[14][2:],data[15][2:],data[16][2:],data[17][2:],data[18][2:],data[19][2:],data[20][2:],data[21][2:])
                            else:
                                print ",".join(data) + ";"
                                plugin_message("TCP Connection refused (3).")
                                db.close()
                                exit(1)
                        else:
                            print data + ";"
                            plugin_message("TCP Connection refused (2).")
                            db.close()
                            exit(1)
                    else:
                        plugin_message("TCP Connection refused (1).")
                        db.close()
                        exit(1)
                    
                    if None != service_data:
                        # insert data in database
                        sql = "INSERT INTO host_service_parameter_data (host_id, service_data) values ('%s','%s')" % (host_id, service_data)
                        cursor.execute(sql)
                        db.commit()
                        
                        # start - manage alarms
                        sql = "SELECT service_parameter.service_parameter_id, parameter_name, parameter_index, parameter_type, parameter_unit, host_service_parameter.min_value, host_service_parameter.max_value, host_service_parameter.is_active, host_service_parameter.min_arm, host_service_parameter.max_arm FROM service_parameter INNER JOIN host_service_parameter ON host_service_parameter.service_parameter_id = service_parameter.service_parameter_id where service_parameter.is_active = 1 AND service_parameter.device_type_id = '" + device_type_id + "' AND host_id='" + str(host_id) + "' GROUP BY service_parameter.service_parameter_id ORDER BY service_parameter.parameter_index ASC"
                        cursor.execute(sql)
                        sp_list = cursor.fetchall()
                        
                        if sp_list:
                            sp_data_list = service_data.split(";")
                            sp_data_list_len = len(sp_data_list)
                            for i in range(len(sp_list)):
                                state = 3
                                if i < sp_data_list_len - 1:
                                    data = sp_data_list[i+1]
                                else:
                                    data = ""
                                
                                if 1 == sp_list[i][7]:
                                    # state - manage state
                                    if "integer" == sp_list[i][3] and data.isdigit():
                                        data = int(data)
                                        min_data = None;
                                        max_data = None;
                                        if sp_list[i][5]:
                                            min_data = int(sp_list[i][5])
                                        if sp_list[i][6]:
                                            max_data = int(sp_list[i][6])
                                        if max_data and data >= max_data:
                                            state = 2
                                        elif min_data and data >= min_data:
                                            state = 1
                                        else:
                                            state = 0
                                    elif "float" == sp_list[i][3] and isfloat(data):
                                        data = float(data)
                                        min_data = None;
                                        max_data = None;
                                        if sp_list[i][5]:
                                            min_data = float(sp_list[i][5])
                                        if sp_list[i][6]:
                                            max_data = float(sp_list[i][6])
                                        if max_data and data >= max_data:
                                            state = 2
                                        elif min_data and data >= min_data:
                                            state = 1
                                        else:
                                            state = 0
                                    else:   # string
                                        data = data and str(data) or ""
                                        min_data = None;
                                        max_data = None;
                                        if sp_list[i][5]:
                                            min_data = str(sp_list[i][5])
                                        if sp_list[i][6]:
                                            max_data = str(sp_list[i][6])
                                        if max_data and data == max_data:
                                            state = 2
                                        elif min_data and data == min_data:
                                            state = 1
                                        else:
                                            state = 0
                                    # end - manage state
                                    # start - create alarm
                                    now_datetime = datetime.now()
                                    system_date = now_datetime.strftime("%Y-%m-%d %H:%M:%S")
                                    trap_receive_date = now_datetime.strftime('%c')
                                    if 1 == state:
                                        sql = "INSERT INTO trap_alarms (event_id, trap_id, agent_id, trap_date, trap_receive_date, serevity, trap_event_id, trap_event_type, manage_obj_id, manage_obj_name, component_id, trap_ip, description, device_sent_date) VALUES ('sbsAlarm','.1.3.6.1.4.1.26149.2.4.0.0.1','%s','0:0:00:32.11','%s','3','1001','MINOR_ALARM','500','SBSmart','500','%s','%s: %s', '%s')" % (ip_address, trap_receive_date, ip_address, sp_list[i][1], data, system_date)
                                        cursor.execute(sql)
                                        db.commit()
                                    elif 2 == state:
                                        sql = "INSERT INTO trap_alarms(event_id, trap_id, agent_id, trap_date, trap_receive_date, serevity, trap_event_id, trap_event_type, manage_obj_id, manage_obj_name, component_id, trap_ip, description, device_sent_date) VALUES ('sbsAlarm','.1.3.6.1.4.1.26149.2.4.0.0.1','%s','0:0:00:32.11','%s', '4','1001','MAJOR_ALARM','500','SBSmart','500','%s','%s: %s', '%s')" % (ip_address, trap_receive_date, ip_address, sp_list[i][1], data,system_date)
                                        cursor.execute(sql)
                                        db.commit()
                                    # end - create alarm
                                    # start - tcp connection
                                    min_arm = sp_list[i][8]
                                    if min_arm and str(min_arm).isdigit():
                                        min_arm = int(min_arm)
                                    max_arm = sp_list[i][9]
                                    if max_arm and str(max_arm).isdigit():
                                        max_arm = int(max_arm)
                                    current_status = "NA"
                                    new_status = "NA"
                                    if 1 == state and min_arm:
                                        # check the current status of min_arm
                                        service_status_len = len(service_status)
                                        if service_status_len >= min_arm:
                                            current_status = service_status[min_arm-1]
                                        else:
                                            for s in range(service_status_len, min_arm):
                                                service_status.append("NA")
                                        new_status = "ON"
                                        if current_status != new_status:
                                            # call tcp connection
                                            service_status[min_arm-1] = new_status
                                            relay_action(sckt, min_arm, new_status, host_id, service_status) # ralay action
                                        if max_arm:
                                            current_status = service_status[max_arm-1]
                                            new_status = "OFF"
                                            if current_status != new_status:
                                                service_status[max_arm-1] = new_status
                                                relay_action(sckt, max_arm, new_status, host_id, service_status) # ralay action
                                    elif 2 == state and max_arm:
                                        # check the current status of max_arm
                                        service_status_len = len(service_status)
                                        if service_status_len >= max_arm:
                                            current_status = service_status[max_arm-1]
                                        else:
                                            for s in range(service_status_len, max_arm):
                                                service_status.append("NA")
                                        new_status = "ON"
                                        if current_status != new_status:
                                            # call tcp connection
                                            service_status[max_arm-1] = new_status
                                            relay_action(sckt, max_arm, new_status, host_id, service_status) # ralay action
                                    elif 0 == state:
                                        new_status = "OFF"
                                        if min_arm:
                                            service_status_len = len(service_status)
                                            if service_status_len >= min_arm:
                                                current_status = service_status[min_arm-1]
                                            else:
                                                for s in range(service_status_len, min_arm):
                                                    service_status.append("NA")
                                            if current_status != new_status:
                                                # call tcp connection
                                                service_status[min_arm-1] = new_status
                                                relay_action(sckt, min_arm, new_status, host_id, service_status) # ralay action
                                        if max_arm:
                                            service_status_len = len(service_status)
                                            if service_status_len >= max_arm:
                                                current_status = service_status[max_arm-1]
                                            else:
                                                for s in range(service_status_len, max_arm):
                                                    service_status.append("NA")
                                            if current_status != new_status:
                                                # call tcp connection
                                                service_status[max_arm-1] = new_status
                                                relay_action(sckt, max_arm, new_status, host_id, service_status) # ralay action
                                    # end - tcp connection
                        # end - manage alarms
                        
                        db.close()
                        plugin_message("Response OK 200")
                        exit(0)
                    sckt.close()
                else:
                    plugin_message("Device or service details does not exist in Database")
                    db.close()
                    exit(1)
            else:
                plugin_message("Database Error")
                exit(2)
        else:
            plugin_message("Invalid Arguments")
            exit(2)
    else:
        plugin_message("Zero Argument passes in plugin.")
        exit(2)
except Exception, e:
    # print sys.exc_info()
    plugin_message(e)
    exit(2)
