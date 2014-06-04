"""
To manage the applications in the system
"""

from util_db import DB_Conn
import json
import uuid

import time
import datetime

import htmllib
from htmllib import theme
global theme
theme = htmllib.theme


def application_get(application_id=None):
    """
    Get all the application list
    """
    query = """
    SELECT 
        `hostgroups`.`hostgroup_id`,
        `hostgroups`.`hostgroup_name`,
        `hostgroups`.`hostgroup_alias`,
        `hostgroups`.`timestamp`,
        `hostgroups`.`created_by`,
        `hostgroups`.`creation_time`,
        `hostgroups`.`is_deleted`,
        `hostgroups`.`updated_by`,
        `hostgroups`.`is_default`,
        `hostgroups`.`is_application`,
        `hostgroups`.`application_url`,
        `hostgroups`.`application_ip`,
        `hostgroups`.`application_start_date`,
        `hostgroups`.`application_end_date`,
        `hostgroups`.`application_notification` 
    FROM `hostgroups` 
    WHERE `is_application` = 1 
    """

    if application_id:
        query += """
        AND
        `hostgroups`.`hostgroup_id` = %s
        """ % (application_id)
    #success 0 -- successful
    #success 1 -- unsuccessful
    #success 2 -- exception
    result = {"success" : 1, "message" : "Applications can not be fetched."}

    db_conn = DB_Conn()
    db = db_conn.db_connect()

    app_details = None
    cursor = db.cursor()
    try:
        if cursor.execute(query) != 0:
            app_details = cursor.fetchall()
            result = {"success" : 0, "message" : "Applications details fetched successfully."}
    except Exception as e:
        result = {"success" : 2, "message" : "Applications can not be fetched. Exception: (%s). Query: (%s)" %(e, query)}
    finally:
        cursor.close()
        db.close()

    result["application_details"] = []

    if result["success"] == 0:
        for app in app_details:
            app = list(app)
            app_details = {}
            app_details["hostgroup_id"] = app[0]
            app_details["hostgroup_name"] = app[1]
            app_details["hostgroup_alias"] = app[2]
            app_details["timestamp"] = str(app[3])
            app_details["created_by"] = app[4]
            app_details["creation_time"] = str(app[5])
            app_details["is_deleted"] = app[6]
            app_details["updated_by"] = app[7]
            app_details["is_default"] = app[8]
            app_details["is_application"] = app[9]
            app_details["application_url"] = app[10]
            app_details["application_ip"] = app[11]
            app_details["application_start_date"] = str(app[12])
            app_details["application_end_date"] = str(app[13])
            app_details["application_notification"] = app[14]

            result["application_details"].append(app_details)

        if application_id:
            result["application_details"] = result["application_details"][0]

    return result

def application_get_one(application_id):
    """
    Get the application details for a specific application
    """
    return application_get(application_id=application_id)


def application_post(application_details):
    """
    post a new application & create an new application
    """

    now = datetime.datetime.now()
    f = '%Y-%m-%d %H:%M:%S'
    insert_time = now.strftime(f)
    application_details["creation_time"] = insert_time

    query = """
    INSERT INTO `hostgroups`
    (

        `hostgroup_name`, 
        `hostgroup_alias`, 
        `timestamp`, 
        `created_by`, 
        `creation_time`, 
        `is_deleted`, 
        `updated_by`, 
        `is_default`, 
        `is_application`, 
        `application_url`, 
        `application_ip`, 
        `application_start_date`, 
        `application_end_date`, 
        `application_notification`
     ) 
     VALUES 
    (
        
        \"%(hostgroup_name)s\",
        \"%(hostgroup_alias)s\",
        NOW(),
        \"%(created_by)s\",
        \"%(creation_time)s\",
        0,
        NULL,
        0,
        1,
        \"%(application_url)s\",
        \"%(application_ip)s\",
        \"%(application_start_date)s\",
        \"%(application_end_date)s\",
        %(application_notification)s
    )
    """ %(application_details)

    result = {"success" : 1, "message" : "Application onboarding failed"}

    db_conn = DB_Conn()
    db = db_conn.db_connect()

    app_details = None
    cursor = db.cursor()
    try:
        if cursor.execute(query) != 0:
            last_row = cursor.lastrowid
            app_details = db.commit()
            result = {"success" : 0, "message" : "Application onboarding successful. (%s)" %(app_details), "app_id": last_row}
    except Exception as e:
        result = {"success" : 2, "message" : "Applications can not be fetched. Exception: (%s). Query: (%s)" %(e, query)}
    finally:
        cursor.close()
        db.close()

    return result

def application_put(application_id, application_details):
    """
    Update an application
    """
    query = """
    UPDATE `hostgroups` 
    SET 
        `hostgroup_name`=\"%(hostgroup_name)s\",
        `hostgroup_alias`=\"%(hostgroup_alias)s\",
        `timestamp`= NOW(),

        `updated_by`=\"%(updated_by)s\",

        `application_url`=\"%(application_url)s\",
        `application_ip`=\"%(application_ip)s\",
        `application_start_date`=\"%(application_start_date)s\",
        `application_end_date`=\"%(application_end_date)s\",
        `application_notification`=%(application_notification)s
    WHERE `hostgroup_id` = %(hostgroup_id)s
    """ %(application_details)
    
    result = {"success" : 1, "message" : "Application update failed"}

    db_conn = DB_Conn()
    db = db_conn.db_connect()

    app_details = None
    cursor = db.cursor()
    try:
        if cursor.execute(query) != 0:
            app_details = db.commit()
            result = {"success" : 0, "message" : "Application updated successful. (%s)" %(app_details)}
    except Exception as e:
        result = {"success" : 2, "message" : "Applications can not be updated. Exception: (%s). Query: (%s)" %(e, query)}
    finally:
        cursor.close()
        db.close()

    return result

def application_delete(application_id):
    """
    delete and application
    """
    query = """
    DELETE FROM `hostgroups` 
    WHERE `hostgroup_id` = "%s"
    """ %(application_id)
    
    result = {"success" : 1, "message" : "Application can not be deleted"}
    
    db_conn = DB_Conn()
    db = db_conn.db_connect()
    cursor = db.cursor()

    try:
        if (cursor.execute(query)) != 0:
            db.commit()
            result = {"success" : 0, "message" : "Application Deleted Successfully"}
    except Exception as customer_exp:
        result = {"success" : 2, "message" : "Customer can not be Deleted. Exception (%s). Query (%s)" %(e, query)}
    finally:
        cursor.close()
        db.close()

    return result

#Common View functions

def header_application_buttons():
    """
    @return:
    """
    add_btn = "<div class=\"header-icon\">\
    <a href='application_detail_view.py?action=post'> \
        <img class=\"n-tip-image\" src=\"images/%s/round_plus.png\" id=\"add_customer\" \
        style=\"width: 16px; height: 16px; margin: 6px 20px 6px 10px;\" original-title=\"Add Customer Group\" />\
    </a>\
    </div>" % theme
    header_btn = add_btn
    return header_btn
#################################################################

def application_common_elements(group=False):
    css_list = ["css/demo_table_jui.css",
                "css/jquery.multiselect.css",
                "css/jquery.multiselect.filter.css",
                "css/jquery-ui-1.8.4.custom.css",
                'css/ccpl_jquery_combobox.css',
                "css/demo_table_jui.css"
    ]
    javascript_list = ["js/lib/main/jquery.dataTables.min.js",
                       "js/unmp/main/ccpl_jquery_autocomplete.js",
                       "js/applications.js",
                       "js/utilities.js",
                       #"static/gateone.js"
    ]
    
    all_btn = header_application_buttons()

    return {"css_list" : css_list, "javascript_list" : javascript_list, "all_btn" : all_btn}


#end comon view functions

def application_list_view(h):
    """
    check the list of all the applications in the system
    """
    global html
    html = h

    common_elements = application_common_elements()

    css_list = common_elements["css_list"]

    javascript_list = common_elements["javascript_list"]

    all_btn = common_elements["all_btn"]

    html.new_header("Applications", "application_list_view.py", all_btn, css_list, javascript_list)

    application_html = """
    <div>
        <table id="applications" cellpadding="0" cellspacing="0" border="0" class="display" style="text-align:center">
            <thead>
                <tr>
                    <th>
                        Application Name
                    </th>
                    <th>
                        Application URL
                    </th>
                    <th>
                        Application IP
                    </th>
                    <th>
                        Lease Start Date
                    </th>
                    <th>
                        Lease End Date
                    </th>
                    <th>
                        Application Notification
                    </th>
                    <th>
                        Actions
                    </th>
                </tr>
            </thead>
        </table>
    </div>
    """
    application_html += """
    <script>
        get_applications();
    </script>
    """
    html.write(application_html)
    html.new_footer()

def application_detail_view(h):
    """
    check and edit the details of an application
    """
    global html
    html = h

    common_elements = application_common_elements()

    css_list = common_elements["css_list"]

    javascript_list = common_elements["javascript_list"]

    all_btn = common_elements["all_btn"]

    html.new_header("Applications", "application_list_view.py", all_btn, css_list, javascript_list)

    application_id = None
    try:
        application_id = html.var("application_id")
    except:
        pass #dont care about application id

    application_html = """
    <form action="#" method="get" id="manage_application_form" name="manage_application_form" autocomplete="on" >
        <div class="form-div">
            <table class="tt-table" cellspacing="0" cellpadding="0" width="100%%">
                <tr>
                <th class="cell-title">Manage Applcation</th>
                </tr>
            </table>
            <div class="form-body">
                <div class="row-elem">
                    <label class="lbl lbl-big" for="hostgroup_name">Application Name</label>
                    <input type="text" id="hostgroup_name" name="hostgroup_name" />
                </div>
                <div class="row-elem">
                    <label class="lbl lbl-big" for="hostgroup_alias">Application Alias</label>
                    <input type="text" id="hostgroup_alias" name="hostgroup_alias"/>
                </div>
                <div class="row-elem">
                    <label class="lbl lbl-big" for="application_url">Application URL</label>
                    <input type="text" id="application_url" name="application_url"/>
                </div>
                <div class="row-elem">
                    <label class="lbl lbl-big" for="application_ip">Application IP</label>
                    <input type="text" id="application_ip" name="application_ip"/>
                </div>
                <div class="row-elem">
                    <label class="lbl lbl-big" for="application_start_date">Lease Start Date</label>
                    <input type="text" id="application_start_date" name="application_start_date"/>
                </div>
                <div class="row-elem">
                    <label class="lbl lbl-big" for="application_end_date">Lease End Date</label>
                    <input type="text" id="application_end_date" name="application_end_date" />
                </div>
                <div class="row-elem">
                    <label class="lbl lbl-big" for="application_notification">Enable Notification</label>
                    <select type="text" id="application_notification" name="application_notification">
                        <option value=0>Disabled</option>
                        <option value=1>Enabled</option>
                    </select>
                </div>

                <div class="row-elem">
                <div class="lbl lbl-big"> Assign Data Services </div>
        """
    application_html += app_service_list_widget(application_id)
    application_html += """
                </div>

            </div>
        </div>
        <div class="form-div-footer">
            <button type="submit" class="yo-small yo-button"><span class="add">Save</span></button>
            <button type="reset" class="yo-small yo-button" id="close_add_user"><span class="cancel">Cancel</span></button>
        </div>
    </form>
    """
    
    action = str(html.var("action"))

    if action == "post":
        application_html += """
        <script>
            post_application("post");
        </script>
    """
    elif action == "put":
        application_html += """
        <script>
            fill_application_values("%s")
            post_application(action="put", application_id="%s");
        </script>
    """ %(application_id, application_id)
    else:
        application_html += """
        <script>
            fill_application_values("%s");
            post_application(action="put", application_id="%s");
        </script>
    """ %(application_id, application_id)
    ####REDUNDENT CODE CODE REPLICATION
    html.write(application_html)

def application_get_list_ajax(h):
    """
    return a complete list of applications
    """
    global html
    html = h
    
    result_json = []

    applications = application_get()
    applications = applications["application_details"]

    for app in applications:
        if len(app):
            app_actions = """
            <a href="application_detail_view.py?application_id=%s&action=get">
                <img class="host_opr" title="View Application Details" src="images/new/info.png" alt="view"/>
            </a>
            &nbsp;
            <a href="application_detail_view.py?application_id=%s&action=put">
                <img class="host_opr" title="Edit Application Details" src='images/new/edit.png' alt='edit'/>
            </a>
            &nbsp;
            <a class="ajax_caller" href="application_delete_ajax.py?application_id=%s&action=delete">
                <img class="host_opr" title="Delete Application Details" src='images/new/delete.png' alt='delete'/>
            </a>
            """ %(app["hostgroup_id"], app["hostgroup_id"], app["hostgroup_id"])
            app["application_notification"] = "Enabled" if app["application_notification"] == 1 else "Disabled"
            result_json.append(
                [
                    app["hostgroup_alias"],
                    app["application_url"],
                    app["application_ip"],
                    app["application_start_date"],
                    app["application_end_date"],
                    app["application_notification"],
                    app_actions
                ]
            )
    html.write(json.dumps(result_json))

def application_get_detail_ajax(h):
    """
    return complete details for a specific application
    """
    global html
    html = h
    application_id = html.var("application_id")
    result = application_get_one(application_id)
    html.write(json.dumps(result))


def application_post_detail_ajax(h):
    """
    post a new applcation
    """
    global html
    html = h

    created_by = html.req.session.get('username')
    if created_by is None:
        created_by = "SuperAdmin"

    details_list = [
                # "hostgroup_id"
                "hostgroup_name",
                "hostgroup_alias",
                "timestamp",
                # "created_by"
                # "creation_time"
                # "is_deleted"
                # "updated_by"
                # "is_default"
                # "is_application"
                "application_url",
                "application_ip",
                "application_start_date",
                "application_end_date",
                "application_notification"
                ]
    application_details = {}
    application_details["created_by"] = created_by #created by what main user ?

    for details in details_list:
        if html.var(details) != None and len(html.var(details)) > 0:
            application_details[details] = html.var(details)
        else:
            if details == "application_notification":
                application_details[details] = 0
            else:
                application_details[details] = "unknown"

    result = application_post(application_details)

    #get the application service mapping details seperately
    application_service_details = html.var("all_services")
    application_service_details = application_service_details.split(",")
    if len(application_service_details) > 1:
        res = app_service_post(result["app_id"], application_service_details)
        result["success"] += res["success"]
        result["message"] += res["message"]

    html.write(json.dumps(result))

def application_put_detail_ajax(h):
    """
    update an older application
    """
    global html
    html = h
    updated_by = html.req.session.get('username')
    if updated_by is None:
        updated_by = "SuperAdmin"

    details_list = [
                # "hostgroup_id"
                "hostgroup_name",
                "hostgroup_alias",
                "timestamp",
                # "created_by"
                # "creation_time"
                # "is_deleted"
                # "updated_by"
                # "is_default"
                # "is_application"
                "application_url",
                "application_ip",
                "application_start_date",
                "application_end_date",
                "application_notification"
                ]

    application_details = {}

    application_details["hostgroup_id"] = html.var("application_id")

    application_details["updated_by"] = updated_by #created by what main user ?

    for details in details_list:
        if html.var(details) != None and len(html.var(details)) > 0:
            application_details[details] = html.var(details)
        else:
            if details == "application_notification":
                application_details[details] = 0
            else:
                application_details[details] = "unknown"

    result = application_put(application_details["hostgroup_id"], application_details)

    application_service_details = html.var("all_services")
    application_service_details = application_service_details.split(",")
    if application_service_details:
        res_d = app_service_delete(html.var("application_id"))
        res = app_service_post(html.var("application_id"), application_service_details)
        result["success"] += res["success"]
        result["message"] += res["message"]

    html.write(json.dumps(result))

def application_delete_ajax(h):
    """
    delete an older application
    """
    global html
    html = h

    application_id = html.var("application_id")

    result_json = application_delete(application_id=application_id)

    html.write(json.dumps(result_json))


#################################################################################################
####################Application to Device Type Service Management################################
# application data service table : application_service
# service data table : device_type_service

def service_all_get():
    """
    sql interface to get application to service relation
    where application does not have a relataionship defined with the data service
    """
    query = """
    SELECT `device_type_service`.`service_id`,  
            `device_type_service`.`device_type_id`,
            `device_type_service`.`service_name`,
            `device_type_service`.`service_value`,  
            `device_type`.`device_name`
    FROM `device_type_service`
    JOIN (`device_type`)
    ON 
    (`device_type`.`device_type_id` = `device_type_service`.`device_type_id`)
    """

    result = {"success" : 1, "message" : "No Data Services Found"}

    db_conn = DB_Conn()
    db = db_conn.db_connect()

    result_details = None
    cursor = db.cursor()
    try:
        if cursor.execute(query) != 0:
            result_details = cursor.fetchall()
            result = {"success" : 0, "message" : "Data Service details fetched successfully."}
    except Exception as e:
        result = {"success" : 2, "message" : "Data Services can not be fetched. Exception: (%s). Query: (%s)" %(e, query)}
    finally:
        cursor.close()
        db.close()

    if result["success"] == 0:
        result["device_type_service"] = {}

        for details in result_details:
            details = list(details)

            if details[1] not in result["device_type_service"] :
                result["device_type_service"][details[1]] = []
            device_type_service_details = {
                "service_id" : details[0],
                "device_type_id" : details[1],
                "service_name" : details[2],
                "service_value" : details[3],
                "device_name" : details[4]
            }
            result["device_type_service"][details[1]].append(device_type_service_details)

    return result

def app_service_not_get(application_id):
    """
    sql interface to get the application and service relataionship
    where a service doesnot exists in the application 
    """
    query = """
    SELECT `device_type_service`.`service_id`,  
            `device_type_service`.`device_type_id`,
            `device_type_service`.`service_name`,
            `device_type_service`.`service_value`,  
            `device_type`.`device_name`
    FROM `device_type_service`
    JOIN (`device_type`)
    ON 
    (`device_type`.`device_type_id` = `device_type_service`.`device_type_id`)
    WHERE
    `device_type_service`.`service_id`  
    NOT IN
    (SELECT `application_service`.`service_id` FROM `application_service` WHERE `application_service`.`app_id` = %s)
    """ %(application_id)

    result = {"success" : 1, "message" : "No Data Services Found"}

    db_conn = DB_Conn()
    db = db_conn.db_connect()

    result_details = None
    cursor = db.cursor()
    try:
        if cursor.execute(query) != 0:
            result_details = cursor.fetchall()
            result = {"success" : 0, "message" : "Data Service details fetched successfully."}
    except Exception as e:
        result = {"success" : 2, "message" : "Data Services can not be fetched. Exception: (%s). Query: (%s)" %(e, query)}
    finally:
        cursor.close()
        db.close()

    if result["success"] == 0:
        result["device_type_service"] = {}

        for details in result_details:
            details = list(details)

            if details[1] not in result["device_type_service"] :
                result["device_type_service"][details[1]] = []
            device_type_service_details = {
                "service_id" : details[0],
                "device_type_id" : details[1],
                "service_name" : details[2],
                "service_value" : details[3],
                "device_name" : details[4]
            }
            result["device_type_service"][details[1]].append(device_type_service_details)

    return result

def app_service_post(application_id, application_service_details):
    """
    sql interface to post a new relation in applicaiton service table
    """
    query = """
    INSERT INTO `application_service`(`app_id`, `service_id`) VALUES 
    """
    for a_s_detail in application_service_details:
        query += "(%s, %s)" %(application_id, a_s_detail)
        query += ","
    query = query[:-1]

    result = {"success" : 1, "message" : "Data Service & Application can not be mapped"}

    db_conn = DB_Conn()
    db = db_conn.db_connect()

    result_details = None
    cursor = db.cursor()
    try:
        if cursor.execute(query) != 0:
            db.commit()
            result = {"success" : 0, "message" : "Data Service & Application mapped"}
    except Exception as e:
        result = {"success" : 2, "message" : "Data Service & Application can not be mapped. \
                                                                        Exception: (%s). Query: (%s)" %(e, query)}
    finally:
        cursor.close()
        db.close()

    return result


def app_service_put():
    """
    sql interface to update an existing relation in application service table
    """
    pass

def app_service_delete(application_id, service_id=None):
    """
    sql interface to delete an existing relation in application service table
    """
    query = """
    DELETE FROM `application_service` WHERE `app_id` = %s
    """ %(application_id)

    result = {"success" : 1, "message" : "Data Service & Application can not be mapped"}

    db_conn = DB_Conn()
    db = db_conn.db_connect()

    result_details = None
    cursor = db.cursor()
    try:
        if cursor.execute(query) != 0:
            db.commit()
            result = {"success" : 0, "message" : "Data Service & Application mapped"}
    except Exception as e:
        result = {"success" : 2, "message" : "Data Service & Application can not be mapped. \
                                                                        Exception: (%s). Query: (%s)" %(e, query)}
    finally:
        cursor.close()
        db.close()

    return result


def app_service_list_widget(application_id = None):
    """
    the html wiget to choose
    """

    app_services = app_service_get_sorted(application_id)
    all_services = service_all_get()

    widget = """
    <table width="100%">
    """

    for apsvs in all_services["device_type_service"]: #ipc & all
        widget += "<tr>"
        widget += "<td> <b>"
        widget += "%s" % (all_services["device_type_service"][apsvs][0]["device_name"])
        widget += "</b> </td>"
        for ser_status in app_services["device_type_service"]: #notexists & exists
            for services in app_services["device_type_service"][ser_status][apsvs]: #list of ipc & all
                # service = app_services["device_type_service"][ser_status][services]
                if len(services):
                    if ser_status == "notexists":
                        widget += "<td>"
                        widget += "<input type='checkbox' name='all_services' \
                                                                                value='%s'> %s </input>" \
                                                                                %(services["service_id"], \
                                                                                    services["service_name"])
                        widget += "</td>"
                    else:
                        widget += "<td>"
                        widget += "<input type='checkbox' checked='checked' name='all_services' \
                                                                                value='%s'> %s </input>" \
                                                                                %(services["service_id"], \
                                                                                    services["service_name"])
                        widget += "</td>"
        widget += "</tr>"


    widget += "</table>"

    return widget



def app_service_get_sorted(application_id=None):
    """
    return result categorized as exists and notexists keys
    """

    result_all = service_all_get()
    result_not = result_all

    if application_id:
        result_not = app_service_not_get(application_id)

    result = {}

    result["success"] = result_not["success"] + result_all["success"]

    result["message"] = result_not["message"] + " " + result_all["message"]

    result["device_type_service"] = {"exists" : {}, "notexists" : {}}

    for d_t_service in result_all["device_type_service"]:
        
        result["device_type_service"]["exists"][d_t_service] = []
        result["device_type_service"]["notexists"][d_t_service] = []
        if "device_type_service" in result_not:
            if d_t_service in result_not["device_type_service"]:
                for service in result_all["device_type_service"][d_t_service]:
                    service_id = service["service_id"]

                    result["device_type_service"]["exists"][d_t_service].append(service) #asumption

                    for service_in in result_not["device_type_service"][d_t_service]:
                        if service_in["service_id"] == service_id :
                            result["device_type_service"]["notexists"][d_t_service].append(service_in)
                            result["device_type_service"]["exists"][d_t_service].pop()
            else:
                result["device_type_service"]["notexists"][d_t_service].append(result_all["device_type_service"][d_t_service])
        else:
            result["device_type_service"]["exists"][d_t_service] = result_all["device_type_service"][d_t_service]

    return result


def app_service_get_ajax(h):
    """
    get all the app to service relations
    """
    global html
    html = h

    application_id = None
    try:
        application_id = html.var("application_id")
    except Exception as e:
        pass #no application id no problem

    result = app_service_get_sorted(application_id)

    html.write(json.dumps(result))

def app_service_post_ajax(h):
    """
    post a new relations to application service table
    """
    pass

def app_service_put_ajax(h):
    """
    update a service to application relation
    """
    pass

def app_service_delete_ajax(h):
    """
    delete an application to service relation
    """
    pass


#################################################################################################
####################Application to Customer Management###########################################

def app_cust_all_info_get():
    """
    get complete information about the customer and application and services
    """

    query = """
    SELECT * FROM `hostgroups` as hg
    JOIN (`groups` as g,
            `hostgroups_groups` as hgg , 
            `application_service` as aps, 
            `users_groups` as ugs, 
            `users` as u, 
            `device_type_service` as dts, 
            `device_type` as dt
        )
    ON
    (
            ugs.`group_id` = hgg.group_id
            AND
            hg.`hostgroup_id` = hgg.`hostgroup_id`
            AND
            g.`group_id` = hgg.`group_id`
            AND
            aps.`app_id` = hgg.`hostgroup_id`
            AND
            u.`user_id` = ugs.`user_id`
            AND
            dts.`device_type_id` = dt.`device_type_id`
            AND
            dts.`service_id` = aps.`service_id`
    )
    """

    result = {"success" : 1, "message" : "Assign Application to Customers"}

    db_conn = DB_Conn()
    db = db_conn.db_connect()

    result_details = None
    cursor = db.cursor()
    try:
        if cursor.execute(query) != 0:
            result_details = cursor.fetchall()
            result = {"success" : 0, "message" : "Application &  Customers Data loaded Successfully"}
    except Exception as e:
        result = {"success" : 2, "message" : "Data Services can not be fetched. Exception: (%s). Query: (%s)" %(e, query)}
    finally:
        cursor.close()
        db.close()

def app_cust_all_get():
    """
    get company wise information regarding application
    """
    query = """
    SELECT  hg.hostgroup_alias as hostgroup_alias,
            hg.hostgroup_name as hostgroup_name, 
            hg.hostgroup_id as hostgroup_id, 
            hg.application_url as application_url, 
            hg.application_ip as application_ip, 
            g.group_id as group_id, 
            g.group_name as group_name,
            hgg.bandwidth as bandwidth,
            hgg.tps as tps,
            hgg.cpu as cpu,
            hgg.memory as memory,
            hgg.diskspace as diskspace
    FROM `hostgroups` as hg
    JOIN (`groups` as g,
            `hostgroups_groups` as hgg
        )
    ON
    (
            hg.`hostgroup_id` = hgg.`hostgroup_id`
            AND
            g.`group_id` = hgg.`group_id`
    )
WHERE hg.is_application = 1
    
    """

    result = {"success" : 1, "message" : "Assign Application to Customers"}

    db_conn = DB_Conn()
    db = db_conn.db_connect()

    result_details = None
    cursor = db.cursor()
    try:
        if cursor.execute(query) != 0:
            result_details = cursor.fetchall()
            result = {"success" : 0, "message" : "Application &  Customers Data loaded Successfully"}
    except Exception as e:
        result = {"success" : 2, "message" : "Data Services can not be fetched. Exception: (%s). Query: (%s)" %(e, query)}
    finally:
        cursor.close()
        db.close()

    if result["success"] == 0:
        result["app_cust_details"] = {}
        for details in result_details:
            details = list(details)
            if details[1] not in result["app_cust_details"]:
                result["app_cust_details"][details[1]] = {"customers" : {} }

            app_cust_details = {
                "hostgroup_alias" : details[0],
                "hostgroup_id" : details[2],
                "application_url" : details[3],
                "application_ip" : details[4],
                "group_id" : details[5],
                "group_name" : details[6],
                "bandwidth" : details[7],
                "tps" : details[8],
                "cpu" : details[9],
                "memory" : details[10],
                "diskspace" : details[11]
            }

            # result["app_cust_details"][details[1]]["application"].append(app_cust_details)
            if details[5] not in result["app_cust_details"][details[1]]["customers"]:
                result["app_cust_details"][details[1]]["customers"][details[5]] = app_cust_details

    return result

import customer_management
from customer_management import customer_group_get as cust_group_get

def cust_widget(group_id=None):
    """
    option list for customer
    """
    options = ""
    customers = cust_group_get(group_id)
    for customer in customers:
        customer = list(customer)
        options += "<option value='%s'> %s </option>" %(customer[0], customer[1])
    return options

def app_widget(application_id=None):
    """
    get the applications
    """
    options = ""
    applications = application_get(application_id)
    applications = applications["application_details"]
    for application in applications:
        customer = list(application)
        options += "<option value='%s'> %s </option>" %(application["hostgroup_id"], application["hostgroup_alias"])
    return options


#################################################################


def header_app_cust_buttons():
    """
    @return:
    """
    add_btn = "<div class=\"header-icon\">\
    <a href='app_cust_detail_view.py?action=post'> \
        <img class=\"n-tip-image\" src=\"images/%s/round_plus.png\" id=\"add_customer\" \
        style=\"width: 16px; height: 16px; margin: 6px 20px 6px 10px;\" original-title=\"Manage Application\" />\
    </a>\
    </div>" % theme
    header_btn = add_btn
    return header_btn

def app_cust_common_elements(group=False):
    css_list = ["css/demo_table_jui.css",
                "css/jquery.multiselect.css",
                "css/jquery.multiselect.filter.css",
                "css/jquery-ui-1.8.4.custom.css",
                'css/ccpl_jquery_combobox.css',
                "css/demo_table_jui.css"
    ]
    javascript_list = ["js/lib/main/jquery.dataTables.min.js",
                       "js/unmp/main/ccpl_jquery_autocomplete.js",
                       "js/applications.js",
                       "js/utilities.js",
                       #"static/gateone.js"
    ]
    
    all_btn = header_app_cust_buttons()

    return {"css_list" : css_list, "javascript_list" : javascript_list, "all_btn" : all_btn}



def app_cust_list_view(h):
    """
    get company and application list view according to the company
    """
    global html
    html = h

    common_elements = app_cust_common_elements()

    css_list = common_elements["css_list"]

    javascript_list = common_elements["javascript_list"]

    all_btn = common_elements["all_btn"]

    html.new_header("Application Customer Relation Management", "app_cust_list_view.py", all_btn, css_list, javascript_list)

    application_html = """
    <div>
        <table id="app_cust_list" cellpadding="0" cellspacing="0" border="0" class="display" style="text-align:center">
            <thead>
                <tr>
                    <th>
                        Application Name
                    </th>
                    <th>
                        Application URL
                    </th>
                    <th>
                        Application IP
                    </th>
                    <th>
                        Customer Company (Role)
                    </th>
                    <th>
                        Bandwidth
                    </th>
                    <th>
                        TPS
                    </th>
                    <th>
                        CPU
                    </th>
                    <th>
                        Memory
                    </th>
                    <th>
                        Diskspace
                    </th>
                    <th>
                        Actions
                    </th>
                </tr>
            </thead>
        </table>
    </div>
    """
    application_html += """
    <script>
        get_app_cust();
    </script>
    """
    html.write(application_html)
    html.new_footer()

def app_cust_list_get_ajax(h):
    """
    ajax information to send out to company and application list
    """
    global html
    html = h

    app_cust_all = app_cust_all_get()
    app_cust_all = app_cust_all["app_cust_details"]
    
    result_json = []

    for app in app_cust_all:
        if len(app):
            for customer in app_cust_all[app]["customers"]:
                ace = app_cust_all[app]["customers"][customer]
                if len(customer):
                    app_actions = """
                    &nbsp;
                    <a class="ajax_caller" href="app_cust_delete_ajax.py?application_id=%s&customer_id=%s&action=delete">
                        <img class="host_opr" title="Delete Application & Customer Details" src='images/new/delete.png' alt='delete'/>
                    </a>
                    """ %(ace["hostgroup_id"], ace["group_id"])
                    
                    result_json.append(
                        [
                            ace["hostgroup_alias"],
                            ace["application_url"],
                            ace["application_ip"],
                            ace["group_name"],
                            ace["bandwidth"],
                            ace["tps"],
                            ace["cpu"],
                            ace["memory"],
                            ace["diskspace"],
                            app_actions
                        ]
                    )
    html.write(json.dumps(result_json))

def app_cust_detail_view(h):
    """
    check and edit the details of an application
    """
    global html
    html = h

    common_elements = app_cust_common_elements()

    css_list = common_elements["css_list"]

    javascript_list = common_elements["javascript_list"]

    all_btn = common_elements["all_btn"]

    html.new_header("Application Customer Relation Management", "app_cust_list_view.py", all_btn, css_list, javascript_list)

    action = str(html.var("action"))

    application_id = None
    customer_id = None

    if action != "post":
        try:
            application_id = html.var("application_id")
        except:
            pass #dont care about application id

        try:
            customer_id = html.var("customer_id")
        except:
            pass #dont care about customer_id


    application_html = """
    <form action="#" method="get" id="manage_app_cust_form" name="manage_app_cust_form" autocomplete="on" >
        <div class="form-div">
            <table class="tt-table" cellspacing="0" cellpadding="0" width="100%">
                <tr>
                <th class="cell-title">Manage Applcation & Customer</th>
                </tr>
            </table>
            <table class="tt-table" cellspacing="0" cellpadding="0" width="100%">
                <thead>
                    <th>Customer</th>
                    <th>Application</th>
                </thead>
                <tbody>
                    <tr>
                    <td>
                        <div class="form-body">
                            <div class="row-elem">
                                <label class="lbl lbl-big" for="group_id">Select Customer</label>
                                <select name="group_id" id="group_id">
    """
    application_html += cust_widget(customer_id)
    application_html +="""
                                </select>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="form-body">
                            <div class="row-elem">
                                <label class="lbl lbl-big" for="hostgroup_id">Select Application</label>
                                <select name="hostgroup_id" id="hostgroup_id">
    """
    application_html += app_widget(application_id)
    application_html +="""
                                </select>
                            </div>
                        </div>
                    </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="form-body">
                                <div class="row-elem">
                                    <label class="lbl lbl-big" for="bandwidth">Bandwidth Throttling</label>
                                    <input type="text" id="bandwidth" name="bandwidth" />
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="form-body">
                                <div class="row-elem">
                                    <label class="lbl lbl-big" for="tps">TPS</label>
                                    <input type="text" id="tps" name="tps" />
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="form-body">
                                <div class="row-elem">
                                    <label class="lbl lbl-big" for="cpu">CPU</label>
                                    <input type="text" id="cpu" name="cpu" />
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="form-body">
                                <div class="row-elem">
                                    <label class="lbl lbl-big" for="memory">Memory</label>
                                    <input type="text" id="memory" name="memory" />
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="form-body">
                                <div class="row-elem">
                                    <label class="lbl lbl-big" for="diskspace">Disk Space</label>
                                    <input type="text" id="diskspace" name="diskspace" />
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="form-div-footer">
            <button type="submit" class="yo-small yo-button"><span class="add">Save</span></button>
            <button type="reset" class="yo-small yo-button" id="close_add_user"><span class="cancel">Cancel</span></button>
        </div>
    </form>
    """

    if action == "post":
        application_html += """
        <script>
            post_app_cust("post");
        </script>
    """
    ####REDUNDENT CODE CODE REPLICATION

    html.write(application_html)
    html.new_footer()

##############################New Application and Customer Management

def app_group_conf_view(h):
    """
    new details page
    """
    global html
    html = h

    common_elements = app_cust_common_elements()

    css_list = common_elements["css_list"]

    javascript_list = common_elements["javascript_list"]

    all_btn = common_elements["all_btn"]

    html.new_header("Application Customer Relation Management", "app_group_conf_view.py", all_btn, css_list, javascript_list)

    application_html = """
        <table id="application_group_container_table" width="100%" class="main_tbl" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <th id="application_group_main_heading" class="form_head fs16"><strong>Application Group Configuration</strong></th>
          </tr>
          <tr>
            <td>
                <table id="application_group_inner_container_table" class="content_tbl deatil_tbl" width="100%">
                    <!-- Select customer row -->
                    <tr>
                        <td>
                            <table width="100%">
                                <tr>
                                    <td class="label">Select Customer</td>
                                    <td><select id="application_group_select_customer" class="txt_bx">
                                        <option>Ford</option>
                                        <option>Volvo</option>
                                        <option>Smart Homes</option>
                                        <option>Tata Motors</option>
                                        <option>Godrej Secure</option>
                                        <option>Loxone</option>
                                    </select></td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <!-- End of Select customer row -->

                    <!-- Application Group List Table Row -->
                    <tr id="application_group_list_table_row">
                        <td>
                            <!-- Application Group List Table Head Row -->
                            <h3 class="width80">Application Group <a href="#"><img src="images/add-gray.png" alt="" class="add" border="0" align="right" id="add_application_group_button"></a></h3>
                            <!-- End of Application Group List Table Head Row -->

                            <!-- Application group List Table-->
                            <table id="application_group_list_table" class="content_tbl" cellspacing="0" cellpadding="0" width="80%">
                                <tr class="tbl_heading">
                                    <th>Application Group</th>
                                    <th>Service Profile</th>
                                    <th>Actions</th>
                                </tr>
                                <tbody id="application_group_list_table_tbody" class="">
                                    <tr id="application_group_list_table_row_1">
                                        <td><input type="text" class="txt_bx dashed_border" /></td>
                                        <td><input type="text" class="txt_bx dashed_border" /></td>
                                        <td>
                                            <table width="100%" class="action_tbl" cellspacing="0" cellpadding="0" border="0">
                                                <tr>
                                                    <td><center><a href="#"><img src="images/notification.png" class="view_application_group" alt="notification" border="0" height="14" width="14"></a></center></td>
                                                    <td><center><a href="#"><img src="images/pencil.png" class="edit_application_group" alt="edit" border="0" height="20" width="20"></a></center></td>
                                                    <td><center><a href="#"><img src="images/delete.png" class="delete_application_group" alt="edit" border="0" height="12" width="12"></a></center></td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr id="application_group_list_table_row_2">
                                        <td><input type="text" class="txt_bx dashed_border" /></td>
                                        <td><input type="text" class="txt_bx dashed_border" /></td>
                                        <td>
                                            <table width="100%" class="action_tbl" cellspacing="0" cellpadding="0" border="0">
                                                <tr>
                                                    <td><center><a href="#"><img src="images/notification.png" class="view_application_group" alt="notification" border="0" height="14" width="14"></a></center></td>
                                                    <td><center><a href="#"><img src="images/pencil.png" alt="edit" border="0" height="20" width="20"></a></center></td>
                                                    <td><center><a href="#"><img src="images/delete.png" alt="edit" border="0" height="12" width="12"></a></center></td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <!-- End of Application group List Table-->
                        </td>
                    </tr>
                    <!-- End of Application Group List Table Row -->


                    <!-- New Application Group Row -->
                    <tr id="create_new_application_group_row">
                        <td>
                            <h3>Add New Application Group</h3>
                            <table id="create_new_application_group_table" class="content_tbl deatil_tbl" width="80%" cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                    <td class="label">Enter App Group Name: </td>
                                    <td><input id="new_application_group_name" type="text" class="txt_bx" /></td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td class="label">Select Service Profile: </td>
                                    <td>
                                        <select id="new_application_group_service_profile" class="txt_bx">
                                        </select>
                                    </td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr id="add_new_application_row">
                                    <td class="label">Add Application: </td>
                                    <td>
                                        <select id="new_application_group_application" class="txt_bx">
                                        </select>
                                    </td>
                                    <td><input type="button" id="add_application_service" class="btn" value="Add" /></td>
                                </tr>
                                <!-- <tr>
                                    <td class="label"><input type="text" class="dashed_border" /></td>
                                    <td class="label"><a class="map_service" href="#">Map Service</a> <a href="#" class="map_services_delete"><img class="add" src="images/delete.png" align="absmiddle" alt="delete" width="12" height="12" /></a></td>
                                    <td>&nbsp;</td>
                                </tr> -->
                                <tr>
                                   <td>
                                        <input type="button" class="btn green" value="Save" id="create_new_application_group_button" /> &nbsp;
                                        <input id="cancel_new_application_group_button" type="button" class="btn red" value="Cancel" />
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <!-- End of New Application Group Row -->


                    <!-- View Application Group Row -->
                    <tr id="view_application_group_row">
                        <td>
                            <h3>View Application Group</h3>
                            <table id="view_application_group_table" class="content_tbl deatil_tbl" width="80%" cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                    <td class="label">App Group Name: </td>
                                    <td><input id="view_selected_application_group_name" type="text" class="txt_bx" readonly /></td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td class="label">Service Profile: </td>
                                    <td>
                                        <select id="view_selected_application_group_service_profile" class="txt_bx" disabled>
                                            <option></option>
                                            <option value="Ford_LBS01">Ford_LBS01</option>
                                            <option value="Ford_VS01">Ford_VS01</option>
                                            <option value="Volvo_LBS01">Volvo_LBS01</option>
                                            <option value="Volvo_VS01">Volvo_VS01</option>
                                            <option value="Smart Homes_LBS01">Smart Homes_LBS01</option>
                                            <option value="Smart Homes_VS01">Smart Homes_VS01</option>
                                            <option value="Tata Motors_LBS01">Tata Motors_LBS01</option>
                                            <option value="Tata Motors_VS01">Tata Motors_VS01</option>
                                            <option value="Godrej Secure_LBS01">Godrej Secure_LBS01</option>
                                            <option value="Godrej Secure_VS01">Godrej Secure_VS01</option>
                                            <option value="Loxone_LBS01">Loxone_LBS01</option>
                                            <option value="Loxone_VS01">Loxone_VS01</option>
                                        </select>
                                    </td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr id="view_application_row">
                                    <td class="label">Applications: </td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <!-- <td>
                                        <select class="txt_bx">
                                            <option> Ford </option>
                                        </select>
                                    </td>
                                    <td><input type="button" class="btn add_application_service" value="Add" /></td> -->
                                </tr>
                                <tr>
                                   <td>
                                        <input type="button" class="btn green" value="Close" id="close_viewing_application_group_button" /> &nbsp;
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <!-- End of View Application Group Row -->


                    <!-- Edit Application Group Row -->
                    <tr id="edit_application_group_row">
                        <td>
                            <h3>Edit Application Group</h3>
                            <table id="edit_application_group_table" class="content_tbl deatil_tbl" width="80%" cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                    <td class="label">Enter App Group Name: </td>
                                    <td><input id="updated_application_group_name" type="text" class="txt_bx" /></td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td class="label">Select Service Profile: </td>
                                    <td>
                                        <select id="updated_application_group_service_profile" class="txt_bx">

                                        </select>
                                    </td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr id="edit_application_row">
                                    <td class="label">Add Application: </td>
                                    <td>
                                        <select id="updated_application_group_applications" class="txt_bx">
                                            
                                        </select>
                                    </td>
                                    <td><input type="button" class="btn edit_add_new_application_service" value="Add" /></td>
                                </tr>
                                <!-- <tr>
                                    <td class="label"><input type="text" class="dashed_border" /></td>
                                    <td class="label"><a class="map_service" href="#">Map Service</a> <a href="#" class="map_services_delete"><img class="add" src="images/delete.png" align="absmiddle" alt="delete" width="12" height="12" /></a></td>
                                    <td>&nbsp;</td>
                                </tr> -->
                                <tr>
                                   <td>
                                        <input type="button" class="btn green" value="Update" id="update_application_group_button" /> &nbsp;
                                        <input id="cancel_update_application_group_button" type="button" class="btn red" value="Cancel" />
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <!-- End of Edit Application Group Row -->


                     <!-- Show Map Services Group Row -->
                    <tr id="show_map_services_group_row" style="display:none;">
                        <td>
                            <h3>Map Services</h3>
                            <table id="show_map_services_group_table" class="content_tbl deatil_tbl" width="80%" cellspacing="0" cellpadding="0" border="0">
                               
                                <tr id="show_map_services_row">
                                    <td>
                                        <div class="scroll height_250">
                                            <table id="show_map_services_list_table" cellspacing="0" cellpadding="0" border="0">
                                               <!--  <tr>
                                                    <td><input type="checkbox" class="chk_bx device_grp_checkbox" onclick="return false" value="Garmin_GPSTracker_Ford" /></td>
                                                    <td>Garmin_GPSTracker_Ford</td>
                                                </tr>
                                                <tr>
                                                    <td><input type="checkbox" class="chk_bx device_grp_checkbox" onclick="return false" value="Garmin_GPSTracker_Volvo" /></td>
                                                    <td>Garmin_GPSTracker_Volvo</td>
                                                </tr>
                                                <tr>
                                                    <td><input type="checkbox" class="chk_bx device_grp_checkbox" onclick="return false" value="Axis_Cam_012" /></td>
                                                    <td>Axis_Cam_012</td>
                                                </tr>
                                                <tr>
                                                    <td><input type="checkbox" class="chk_bx device_grp_checkbox" onclick="return false" value="Ubiquiti_Switch_001" /></td>
                                                    <td>Ubiquiti_Switch_001</td>
                                                </tr>
                                                <tr>
                                                    <td><input type="checkbox" class="chk_bx device_grp_checkbox" onclick="return false" value="HID_AC_PD_006" /></td>
                                                    <td>HID_AC_PD_006</td>
                                                </tr>
                                                <tr>
                                                    <td><input type="checkbox" class="chk_bx device_grp_checkbox" onclick="return false" value="HID_AC_023" /></td>
                                                    <td>HID_AC_023</td>
                                                </tr>
                                                <tr>
                                                    <td><input type="checkbox" class="chk_bx device_grp_checkbox" onclick="return false" value="SBSmart_RTU4556_001" /></td>
                                                    <td>SBSmart_RTU4556_001</td>
                                                </tr>
                                                <tr>
                                                    <td><input type="checkbox" class="chk_bx device_grp_checkbox" onclick="return false" value="NEC_Biomatrics_001" /></td>
                                                    <td>NEC_Biomatrics_001</td>
                                                </tr>
                                                <tr>
                                                    <td><input type="checkbox" class="chk_bx device_grp_checkbox" onclick="return false" value="Radwin_Access Point_002" /></td>
                                                    <td>Radwin_Access Point_002</td>
                                                </tr>
                                                <tr>
                                                    <td><input type="checkbox" class="chk_bx device_grp_checkbox" onclick="return false" value="D-Link DIR-600L_Router_001" /></td>
                                                    <td>D-Link DIR-600L_Router_001</td>
                                                </tr>
                                                <tr>
                                                    <td><input type="checkbox" class="chk_bx device_grp_checkbox" onclick="return false" value="RWE_SD_SH" /></td>
                                                    <td>RWE_SD_SH</td>
                                                </tr> -->
                                            </table>
                                        </div>
                                    </td>
                                </tr>
                                
                                <tr>
                                   <td>
                                        <input type="button" class="btn" value="Close" id="close_map_services_row_button" /> &nbsp;
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <!-- End of Edit Application Group Row -->



                </table>
            </td>
          </tr>
        </table>
    """
    
    html.write(application_html)
    html.write("""
    <style type="text/css">
        #application_group_list_table_row, #create_new_application_group_row, #view_application_group_row, #edit_application_group_row {
            display: none;
        }
    </style>
        """)
    html.write("""
        <script>
        app_group_conf_view();
        </script>
        """)
    html.new_footer()

##############################

def app_cust_post_detail_ajax(h):
    """

    """
    global html
    html = h
    application_id = h.var("hostgroup_id")
    customer_id = html.var("group_id")

    bandwidth = html.var("bandwidth")
    tps = html.var("tps")
    cpu = html.var("cpu")
    memory = html.var("memory")
    diskspace = html.var("diskspace")

    query = """
    INSERT INTO `hostgroups_groups`(`hostgroup_id`, `group_id`,`bandwidth`, `tps`, `cpu`, `memory`, `diskspace`) 
    VALUES (%s, "%s", %s, %s, %s, %s, %s)
    """ %(application_id, customer_id, bandwidth, tps, cpu, memory, diskspace)

    result = {"success" : 1, "message" : "Assign Application to Customers"}

    db_conn = DB_Conn()
    db = db_conn.db_connect()

    result_details = None
    cursor = db.cursor()
    try:
        if cursor.execute(query) != 0:
            db.commit()
            result = {"success" : 0, "message" : "Application &  Customers Data Saved Successfully"}
    except Exception as e:
        result = {"success" : 2, "message" : "Data Services can not be saved. Exception: (%s). Query: (%s)" %(e, query)}
    finally:
        cursor.close()
        db.close()

    html.write(json.dumps(result))

def app_cust_put_detail_ajax(h):
    """

    """
    global html
    html = h
    application_id = h.var("hostgroup_id")
    customer_id = html.var("group_id")

    bandwidth = html.var("bandwidth")
    tps = html.var("tps")
    cpu = html.var("cpu")
    memory = html.var("memory")
    diskspace = html.var("diskspace")

    query = """
    UPDATE `hostgroups_groups`
    SET `bandwidth` = %s, `tps` = %s, `cpu` = %s, `memory` = %s, `diskspace` = %s
    WHERE ( hostgroup_id = %s AND group_id = "%s")
    """ %(bandwidth, tps, cpu, memory, diskspace, application_id, customer_id)

    result = {"success" : 0, "message" : "No Update required for Application to Customers"}

    db_conn = DB_Conn()
    db = db_conn.db_connect()

    result_details = None
    cursor = db.cursor()
    try:
        if cursor.execute(query) != 0:
            db.commit()
            result = {"success" : 0, "message" : "Application &  Customers Updated data Saved Successfully"}
    except Exception as e:
        result = {"success" : 2, "message" : "Data Services can not be saved. Exception: (%s). Query: (%s)" %(e, query)}
    finally:
        cursor.close()
        db.close()

    html.write(json.dumps(result))


def app_cust_delete_ajax(h):
    """

    """
    global html
    html = h

    application_id = html.var("application_id")
    customer_id = html.var("customer_id")

    query = """
    DELETE FROM `hostgroups_groups` WHERE (`group_id` = "%s" AND `hostgroup_id` = %s)
    """ %(customer_id, application_id)

    result = {"success" : 1, "message" : "Customer's access to Application can not be revoked"}

    db_conn = DB_Conn()
    db = db_conn.db_connect()

    result_details = None
    cursor = db.cursor()
    try:
        if cursor.execute(query) != 0:
            db.commit()
            result = {"success" : 0, "message" : "Customer's access to Application revoked Successfully"}
    except Exception as e:
        result = {"success" : 2, "message" : "Customer's access to Application can not be revoked.\
                                                     Exception: (%s). Query: (%s)" %(e, query)}
    finally:
        cursor.close()
        db.close()

    html.write(json.dumps(result))