"""
To manage the customers in the system
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

"""
View Part for the customer
"""


def header_buttons():
    """
    @return:
    """
    add_btn = "<div class=\"header-icon\">\
    <a id='customer_add_view' href='customer_add_view.py'> \
        <img class=\"n-tip-image\" src=\"images/%s/round_plus.png\" id=\"add_customer\" \
        style=\"width: 16px; height: 16px; margin: 6px 20px 6px 10px;\" original-title=\"Add Customer\" />\
    </a>\
    </div>" % theme
    header_btn = add_btn
    return header_btn

#################################################################
##################Customer Group Function########################
def header_c_group_buttons():
    """
    @return:
    """
    add_btn = "<div class=\"header-icon\">\
    <a href='customer_group_add_view.py'> \
        <img class=\"n-tip-image\" src=\"images/%s/round_plus.png\" id=\"add_customer\" \
        style=\"width: 16px; height: 16px; margin: 6px 20px 6px 10px;\" original-title=\"Add Customer Group\" />\
    </a>\
    </div>" % theme
    header_btn = add_btn
    return header_btn
#################################################################

def customer_common_elements(group=False):
    css_list = ["css/demo_table_jui.css",
                "css/jquery-ui-1.8.4.custom.css",
                'css/ccpl_jquery_combobox.css'
    ]
    javascript_list = ["js/lib/main/jquery.dataTables.min.js",
                       "js/unmp/main/ccpl_jquery_autocomplete.js",
                       "js/customers.js",
                       "js/utilities.js",
                       #"static/gateone.js"
    ]
    
    all_btn = header_buttons()
    if group:
        all_btn = header_c_group_buttons()

    return {"css_list" : css_list, "javascript_list" : javascript_list, "all_btn" : all_btn}


def customer_list(h):
    """
    function to display the complete list of the customers
    """
    global html
    html = h

    common_elements = customer_common_elements()

    css_list = common_elements["css_list"]

    javascript_list = common_elements["javascript_list"]

    all_btn = common_elements["all_btn"]

    html.new_header("Customers", "customer_management.py", all_btn, css_list, javascript_list)
    customer_string = """
    <div>
        <table id="customers" cellpadding="0" cellspacing="0" border="0" class="display" style="text-align:center">
            <thead>
                <tr>
                    <th>
                        Customer Name
                    </th>
                    <th>
                        Customer Group
                    </th>
                    <th>
                        Customer Company
                    </th>
                    <th>
                        Email
                    </th>
                    <th>
                        Mobile
                    </th>
                    <th>
                        Usage
                    </th>
                    <th>
                        Actions
                    </th>
                </tr>
            </thead>
        </table>
    </div>
    """
    customer_string += """
    <script>
        get_customers();
    </script>
    """
    html.write(customer_string)
    html.new_footer()

def customer_add_view(h):
    """
    View part for the customer
    """
    global html
    html = h
    
    common_elements = customer_common_elements()
    
    css_list = common_elements["css_list"]

    javascript_list = common_elements["javascript_list"]

    all_btn = common_elements["all_btn"]

    html.new_header("Add Customers", "customer_management.py", all_btn, css_list, javascript_list)
    customer_string = """
    <div id="grid_view_div">
        <div class="yo-tabs">
            <ul>
                <li>
                    <a class="active" href="#content_1" id="active_host_tab">Customer Application Form</a>
                </li>
                <li>
                    <a href="#content_2" id="disable_host_tab">Bulk Upload</a>
                </li>
                <li>
                    <a href="#content_3" id="discovered_host_tab">CRM Import</a>
                </li>
            </ul>
            <div id="content_1" class="tab-content" style="display:block;height:100%;">
        <form action="customer_post_ajax.py" method="get" id="add_customer_form" name="add_customer_form" autocomplete="on" >
            <div class="form-div" style="top:30px;">
                <div class="form-body">
                    <div class="row-elem">
                        <label class="lbl lbl-big" for="username">Customer User Name</label>
                        <input type="text" id="user_name" name="user_name" 
                        title="Choose Unique User Name. <br/>Must be at least 5 characters." />
                    </div>
                    <div class="row-elem">
                        <label class="lbl lbl-big" for="password">Password</label>
                        <input type="password" id="password" name="password" title="Must be at least 8 characters. "/>
                    </div>
    """
    customer_string += """
                    <div class="row-elem">
                        <label class="lbl lbl-big" for="groups">Customer Organisation(Role)</label>
    """
    customer_string += (customer_group_customer_widget())
    customer_string += """
                    </div>
    """
    customer_string += """
                    <div class="row-elem">
                        <label class="lbl lbl-big" for="first_name">First Name</label>
                        <input type="text" id="first_name" name="first_name" title="Please Enter First name."/>
                    </div>
                    <div class="row-elem">
                        <label class="lbl lbl-big" for="last_name">Last Name</label>
                        <input type="text" id="last_name" name="last_name" title="Please Enter Last name."/>
                    </div>
                    <div class="row-elem">
                        <label class="lbl lbl-big" for="company_name">Company</label>
                        <input type="text" id="company_name" name="company_name" title="Please Enter Company Name."/>
                    </div>
                    <div class="row-elem">
                        <label class="lbl lbl-big" for="designation">Designation</label>
                        <input type="text" id="designation" name="designation" title="Please Enter Designation."/>
                    </div>
                    <div class="row-elem">
                        <label class="lbl lbl-big" for="mobile_no">Mobile Number</label>
                        <input type="text" id="mobile_no" name="mobile_no" 
                        title="Please Enter Mobile Number<br/> Don't include +91 or 0."/>
                    </div>
                    <div class="row-elem">
                        <label class="lbl lbl-big" for="telephone_no">Telephone Number</label>
                        <input type="text" id="telephone_no" name="telephone_no" 
                        title="Please Enter Mobile Number<br/> Don't include +91 or 0."/>
                    </div>
                    <div class="row-elem">
                        <label class="lbl lbl-big" for="fax">Fax</label>
                        <input type="text" id="fax" name="fax" 
                        title="Please Enter Mobile Number<br/> Don't include +91 or 0."/>
                    </div>
                    <div class="row-elem">
                        <label class="lbl lbl-big" for="email_id">E-Mail ID</label>
                        <input type="text" id="email_id" name="email_id" title="Please Enter E-Mail ID."/>
                    </div>
                    <div class="row-elem">
                        <label class="lbl lbl-big" for="city_id">City</label>
                        <input type="text" id="city_id" name="city_id" title="Please Enter City Name."/>
                    </div>
                    <div class="row-elem">
                        <label class="lbl lbl-big" for="state_id">State</label>
                        <input type="text" id="state_id" name="state_id" title="Please Enter State."/>
                    </div>
                    <div class="row-elem">
                        <label class="lbl lbl-big" for="country_id">Country</label>
                        <input type="text" id="country_id" name="country_id" title="Please Enter Country."/>
                    </div>
                    <div class="row-elem">
                        <label class="lbl lbl-big" for="usage">Usage</label>
                        <select id='usage' name='usage'>
                            <option value=0>Personal</option>
                            <option value=1>Commercial</option>
                        </select>
                    </div>
                    <div class="row-elem">
                        <label class="lbl lbl-big" for="purpose">Purpose</label>
                        <input type="text" id="purpose" name="purpose" title="Please Enter Purpose."/>
                    </div>
                    <div class="row-elem">
                        <label class="lbl lbl-big" for="address">Address</label>
                        <textarea id="address" name="address" title="Please Enter own Address."></textarea>
                    </div>
                </div>
            </div>
            <div class="form-div-footer">
                <button type="submit" class="yo-small yo-button"><span class="add">Save</span></button>
                <button type="reset" class="yo-small yo-button" id="close_add_user"><span class="cancel">Cancel</span></button>
            </div>
        </form>
    </div>
        <!-- container tab 2 -->
        <div id="content_2" class="tab-content" style="display:block;height:100%;">
            <form action="#" method="post">
                <label for="bulk">Upload Customers</label>
                <input name="bulk" id="bulk" type="file" />
            </form>
        </div>
        <!-- container tab 3 -->
        <div id="content_3" class="tab-content" style="display:block;height:100%;">
            <form class="form-body" id="crm_conn" action="#" method="get">
                <div class="form-div" style="top:30px;">
                    <div class="form-body">
                        <div class="row-elem">
                            <label class="lbl lbl-big" for="crm_link">CRM Link Location</label>
                            <input type="text" name="crm_link" id="crm_link" />
                        </div>
                        <div class="row-elem">
                            <label class="lbl lbl-big" for="crm_user">CRM Username</label>
                            <input type="text" name="crm_user" id="crm_user" />
                        </div>
                        <div class="row-elem">
                            <label class="lbl lbl-big" for="crm_pass">CRM Password</label>
                            <input type="password" name="crm_pass" id="crm_pass" />
                        </div>
                    </div>
                </div>
                <div class="form-div-footer">
                    <button type="submit" class="yo-small yo-button"><span class="add">Test Connection</span></button>
                    <button type="reset" class="yo-small yo-button" id="close_add_user"><span class="add">Start Import</span></button>
                </div>
            </form>
        </div>
        </div>
    </div>
    """ 
    customer_string += """
        <script>
            post_customers();
        </script>
    """
    html.write(customer_string)
    html.new_footer()


#############################new form integration for customer add
def customer_add_view_new(h):
    """
    new customer add view
    """
    global html
    html = h
    common_elements = customer_common_elements()
    
    css_list = common_elements["css_list"]

    javascript_list = common_elements["javascript_list"]

    all_btn = common_elements["all_btn"]

    html.new_header("Add Customers", "customer_management.py", all_btn, css_list, javascript_list)

    customer_add_html = """
        <table width="100%" class="content_tbl" border="0" cellspacing="0" cellpadding="0">
        <tbody>
            <tr>
                <th>Customer Details</th>
            </tr>
            <tr>
                <td>
                    <table width="100%" class="deatil_tbl" border="0" cellspacing="0" cellpadding="0">
                      <tbody>
                      <tr>
                        <td class="label">Organization Name</td>
                        <td colspan="3"><input type="text" value="" class="txt_bx"></td>
                      </tr>
                      <tr>
                        <td>Telephone Number</td>
                        <td><input type="text" value="" class="txt_bx"></td>
                        <td class="label">Fax</td>
                        <td><input type="text" value="" class="txt_bx"></td>
                      </tr>
                      <tr>
                        <td>Website</td>
                        <td><input type="text" value="" class="txt_bx"></td>
                        <td>Email</td>
                        <td><input type="text" value="" class="txt_bx"></td>
                      </tr>
                      <tr>
                        <td>Business Type</td>
                        <td><select class="txt_bx"><option> Auction </option></select></td>
                        <td>Submission</td>
                        <td><input type="text" value="" class="txt_bx"></td>
                      </tr>
                      <tr>
                        <td>Address</td>
                        <td colspan="3"><textarea rows="4" cols="27"></textarea></td>
                      </tr>
                    </tbody>
                  </table>
                </td>
            </tr>
            <tr>
                <td>
                    <table width="100%" id="iDetails_table" class="individual_tbl" border="0" cellspacing="0" cellpadding="0">
                      <tbody>
                          <tr>
                            <th colspan="4">Individual Details <a href="" class="addChildTr"><img class="add" src="images/add-gray.png" align="right" alt="" border="0"></a></th>
                          </tr>
                          <tr class="findInnerHTML"><td colspan="4"></td></tr>
                          <tr class="findInnerHTML">
                            <td class="label">Contact Person Name</td>
                            <td colspan="3"><input type="text" value="" class="txt_bx"></td>
                          </tr>
                          <tr class="findInnerHTML">
                            <td>Email</td>
                            <td><input type="text" value="" class="txt_bx"></td>
                            <td class="label">Contact Number</td>
                            <td><input type="text" value="" class="txt_bx"></td>
                          </tr>
                          <tr class="findInnerHTML">
                            <td>Department</td>
                            <td><input type="text" value="" class="txt_bx"></td>
                            <td>Designation</td>
                            <td><input type="text" value="" class="txt_bx"></td>
                          </tr>
                          <tr><td colspan="4"></td></tr>
                        </tbody>
                      </table>
                </td>
              </tr>
              <tr>
                <td>
                    <table width="100%" class="individual_tbl" border="0" cellspacing="0" cellpadding="0">
                      <tbody>
                          <tr>
                            <th colspan="4">Customer Portal Configration</th>
                          </tr>
                          <tr><td colspan="4"></td></tr>
                          <tr>
                            <td class="label">Portal ID</td>
                            <td><input type="text" value="" class="txt_bx"></td>
                            <td class="label">Portal Link</td>
                            <td><input type="text" value="" class="txt_bx"></td>
                          </tr>
                          <tr>
                            <td>Set Theme</td>
                            <td><select class="txt_bx"><option> Theme </option></select></td>
                            <td>Port Number</td>
                            <td><input type="text" value="" class="txt_bx"></td>
                          </tr>
                          <tr><td colspan="4"></td></tr>
                          <tr>
                            <td colspan="4">
                                <table border="0" class="add_user_tbl" width="90%" cellpadding="0" cellspacing="0">
                                    <tbody>
                                    <tr>
                                        <th colspan="6">Add Customer Users <a href="#" class="addChildTr"><img class="add" src="images/add-gray.png" align="right" alt="" border="0"></a></th>
                                    </tr>
                                    <tr><td colspan="6"></td></tr>
                                    <tr>
                                        <td>User Name</td>
                                        <td><input type="text" value="" class="txt_bx"></td>
                                        <td>Password</td>
                                        <td><input type="text" value="" class="txt_bx"></td>
                                        <td>Email</td>
                                        <td><input type="text" value="" class="txt_bx"></td>
                                    </tr>
                                    <tr class="findInnerHTML">
                                        <td>User Name</td>
                                        <td><input type="text" value="" class="txt_bx"></td>
                                        <td>Password</td>
                                        <td><input type="text" value="" class="txt_bx"></td>
                                        <td>Email</td>
                                        <td><input type="text" value="" class="txt_bx"></td>
                                    </tr>
                                    <tr><td colspan="6"></td></tr>
                                    </tbody>
                                  </table>
                            </td>
                          </tr>
                          <tr><td>&nbsp;</td></tr>
                    </tbody></table>
                </td>
              </tr>
              <tr>
                <td>
                    <table width="100%" id="billing_dept_table" class="individual_tbl endof_tbl" border="0" cellspacing="0" cellpadding="0">
                        <tbody><tr>
                            <th colspan="4">Billing Departments</th>
                        </tr>
                        <tr><td colspan="4"></td></tr>
                      <tr>
                        <td class="width_150">
                            Select Billing Department 
                            <br> 
                            <em class="fs10">(If TPS selected)</em>
                        </td>
                        <td colspan="3">
                            <select id="billing_determinant_select_box" class="txt_bx">
                              <option>TPS</option>
                              <option>Bandwidth</option>
                              <option>Sim Subscription</option>
                            </select>
                        </td>
                      </tr>
                      <tr>
                        <td class="width_150">Max TPS</td>
                        <td colspan="3"><input type="text" value="" class="txt_bx"></td>
                      </tr>
                      <tr>
                        <td class="width_150">Billing Cycle</td>
                        <td colspan="3"><select class="txt_bx"><option> Monthly </option></select></td>
                      </tr>
                      <tr>
                        <td class="width_150">Billing Start Date</td>
                        <td><input type="text" value="" class="txt_bx"></td>
                        <td class="width_150">Billing Amount</td>
                        <td><input type="text" value="" class="txt_bx"></td>
                      </tr>
                      <tr><td colspan="4"></td></tr>
                    </tbody></table>
                </td>
              </tr>
          </tbody></table>
    
    """
    html.write(customer_add_html)
    html.write("""
        <script>
            customer_add_view_new();
        </script>
        """)
    html.new_footer()
#############################new form integration for customer add

#############################new form integration for customer management

def customer_control_view(h):
    """
    customer control panel
    """
    global html
    html = h
    common_elements = customer_common_elements()
    
    css_list = common_elements["css_list"]

    javascript_list = common_elements["javascript_list"]

    all_btn = common_elements["all_btn"]

    html.new_header("Customer Control Panel", "customer_control_view.py", all_btn, css_list, javascript_list)

    customer_html = """
    <table width="100%" class="content_tbl" border="0" cellspacing="0" cellpadding="0">
            <tbody>
                <tr>
                    <td>
                        <table width="100%" id="customer_control_panel_table" class="deatil_tbl" border="0" cellspacing="0" cellpadding="0">
                            <tbody>
                                <tr id="select_customer_selectbox_tr">
                                    <td class="label">Select Customer</td>
                                    <td>
                                        <select id="Customer_Control_Panel_Select_Customer" class="txt_bx">
                                            <option> Select </option>
                                            <option>Ford</option>
                                            <option>Option2</option>
                                        </select></td>
                                </tr>
                                <tr id="selected_customer_name_tr" style="display:none;">
                                    <td colspan="2" class="label">
                                        <strong>Ford :</strong>
                                    </td>
                                </tr>
                                <tr id="subscription_number_tr" style="display:none;">
                                    <td>Subscription number:</td>
                                    <td>
                                        <input type="text" value="" class="txt_bx dashed_border subscriptionNumber"></td>
                                </tr>
                                <tr id="contact_person_name_tr" style="display:none;">
                                    <td>Contact Person Name</td>
                                    <td>
                                        <input type="text" value="" class="txt_bx dashed_border contactPersonName"></td>
                                </tr>
                                <tr id="email_id_tr" style="display:none;">
                                    <td>Email</td>
                                    <td>
                                        <input type="text" value="" class="txt_bx dashed_border email"></td>
                                </tr>
                                <tr id="portal_id_tr" style="display:none;">
                                    <td>Portal  ID</td>
                                    <td>
                                        <input type="text" value="" class="txt_bx dashed_border portalId"></td>
                                </tr>
                                <tr id="portal_link_tr" style="display:none;">
                                    <td>Portal  Link</td>
                                    <td>
                                        <input type="text" value="" class="txt_bx dashed_border portalLink"></td>
                                </tr>
                                <tr id="portal_theme_tr" style="display:none;">
                                    <td>Portal Theme</td>
                                    <td>
                                        <input type="text" value="" class="txt_bx dashed_border portalTheme"></td>
                                </tr>
                                <tr id="user_details_table_container_tr" style="display:none;">
                                    <td colspan="2">
                                        <table class="content_tbl" id="user_details_table" border="0" width="100%" align="center" cellpadding="0" cellspacing="0">
                                            <tbody>
                                                <tr>
                                                    <th class="cust_detail">User Details</th>
                                                    <th class="aling_right" colspan="5">
                                                        <input type="button" id="manage_user_details" class="btn add" value="Manage">
                                                        <a id="add_user_details_row" class="addChildTr" href="" style="display:none;">
                                                            <img class="add" border="0" align="right" alt="" src="images/add-gray.png">
                                                        </a>
                                                    </th>
                                                </tr>
                                                <tr>
                                                <tr><td colspan="6"></td></tr>
                                                    <td class="label">User Name</td>
                                                    <td>
                                                        <input type="text" value="User1" class="txt_bx" readonly=""></td>
                                                    <td>Password</td>
                                                    <td>
                                                        <input type="password" value="password1" class="txt_bx" readonly=""></td>
                                                    <td>Email</td>
                                                    <td>
                                                        <input type="text" value="a@e.com" class="txt_bx" readonly=""></td>
                                                </tr>
                                                <tr>
                                                    <td>User Name</td>
                                                    <td>
                                                        <input type="text" value="User2" class="txt_bx" readonly=""></td>
                                                    <td>Password</td>
                                                    <td>
                                                        <input type="password" value="password2" class="txt_bx" readonly=""></td>
                                                    <td>Email</td>
                                                    <td>
                                                        <input type="text" value="a@e.com" class="txt_bx" readonly=""></td>
                                                </tr>
                                                <tr class="findInnerHTML">
                                                    <td>User Name</td>
                                                    <td>
                                                        <input type="text" value="User3" class="txt_bx" readonly=""></td>
                                                    <td>Password</td>
                                                    <td>
                                                        <input type="password" value="password3" class="txt_bx" readonly=""></td>
                                                    <td>Email</td>
                                                    <td>
                                                        <input type="text" value="a@e.com" class="txt_bx" readonly=""></td>
                                                </tr>
                                                <tr id="user_details_table_save_tr" style="display: none;">
                                                    <td colspan="9" class="saveButtonTd">
                                                        <input id="user_details_table_save_button" type="button" value="Save" style="float: right; width: 80px;">
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                <tr style="display:none;">
                                    <td colspan="9">
                                        <table id="service_profile_table" class="content_tbl" border="0" width="100%" align="center" cellpadding="0" cellspacing="0">
                                            <tbody>
                                                <tr>
                                                    <th colspan="5" class="label">Service Profile</th>
                                                </tr>
                                                <tr><td colspan="6"></td></tr>
                                                <tr>
                                                    <td colspan="5"><span>Select a Profile </span>
                                                        <select id="service_profile_profile_select" class="txt_bx">
                                                            <option> Select </option>
                                                            <option>Ford</option>
                                                            <option>Option2</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr style="display:none;">
                                                    <td></td>
                                                    <td width="49%" valign="top">
                                                        <table id="device_type_services_table" class="content_tbl exicting_app_grp" width="100%" align="left" cellpadding="0" cellspacing="0">
                                                            <tbody>
                                                                <tr>
                                                                    <th>Device Type</th>
                                                                    <th>Services</th>
                                                                </tr>
                                                                <tr>
                                                                    <td>GarminGPS_ford</td>
                                                                    <td>09<input type="button" class="btn" style="visibility:hidden" value="hidden" /></td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Axiscam_ford</td>
                                                                    <td>10<input type="button" class="btn" style="visibility:hidden" value="hidden" /></td>
                                                                </tr>
                                                                <tr>
                                                                    <td>HIDAccess_ford</td>
                                                                    <td>04<input type="button" class="btn" style="visibility:hidden" value="hidden" /></td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                    <td></td>
                                                    <td width="49%" valign="top" align="right">
                                                        <table class="content_tbl exicting_app_grp" width="100%" align="right" cellpadding="0" cellspacing="0">
                                                            <tbody>
                                                                <tr>
                                                                    <th>Subscribed Application</th>
                                                                    <th>Status</th>
                                                                    <th>Action</th>
                                                                </tr>
                                                                <tr>
                                                                    <td>Vehicle Tracking</td>
                                                                    <td>Active</td>
                                                                    <td><input type="button" class="btn red toggleButton" value="Deactivate"></td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Video Surveillance</td>
                                                                    <td>Active</td>
                                                                    <td><input type="button" class="btn red toggleButton" value="Deactivate"></td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Access Control</td>
                                                                    <td>Inactive</td>
                                                                    <td><input type="button" class="btn green toggleButton" value="Activate"></td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                    <td></td>
                                                </tr>
                                                <tr style="display:none;">
                                                    <td width="5"></td>
                                                    <td colspan="3">
                                                        <table class="content_tbl" border="0" width="100%" align="center" cellpadding="0" cellspacing="0">
                                                            <tbody>
                                                                <tr>
                                                                    <th class="cust_detail">Platform Services</th>
                                                                    <th class="aling_right" colspan="6"><input type="button" class="btn add" value="Manage" /></th>
                                                                </tr>
                                                                <tr><td></td></tr>
                                                                <tr>
                                                                    <td>
                                                                        <label>
                                                                            <input type="checkbox">
                                                                            Some text</label>
                                                                    </td>
                                                                    <td>
                                                                        <label>
                                                                            <input type="checkbox">
                                                                            Some text</label>
                                                                    </td>
                                                                    <td>
                                                                        <label>
                                                                            <input type="checkbox">
                                                                            Some text</label>
                                                                    </td>
                                                                    <td>
                                                                        <label>
                                                                            <input type="checkbox">
                                                                            Some text</label>
                                                                    </td>
                                                                    <td>
                                                                        <label>
                                                                            <input type="checkbox">
                                                                            Some text</label>
                                                                    </td>
                                                                    <td>
                                                                        <label>
                                                                            <input type="checkbox">
                                                                            Some text</label>
                                                                    </td>
                                                                    <td>
                                                                        <label>
                                                                            <input type="checkbox">
                                                                            Some text</label>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <label>
                                                                            <input type="checkbox">
                                                                            Some text</label>
                                                                    </td>
                                                                    <td>
                                                                        <label>
                                                                            <input type="checkbox">
                                                                            Some text</label>
                                                                    </td>
                                                                    <td>
                                                                        <label>
                                                                            <input type="checkbox">
                                                                            Some text</label>
                                                                    </td>
                                                                    <td>
                                                                        <label>
                                                                            <input type="checkbox">
                                                                            Some text</label>
                                                                    </td>
                                                                    <td>
                                                                        <label>
                                                                            <input type="checkbox">
                                                                            Some text</label>
                                                                    </td>
                                                                    <td>
                                                                        <label>
                                                                            <input type="checkbox">
                                                                            Some text</label>
                                                                    </td>
                                                                    <td>
                                                                        <label>
                                                                            <input type="checkbox">
                                                                            Some text</label>
                                                                    </td>
                                                                </tr>
                                                                <tr><td></td></tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                    <td width="5"></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                <tr style="display:none;">
                                    <td colspan="8">
                                        <table class="content_tbl" border="0" width="100%" align="center" cellpadding="0" cellspacing="0">
                                            <tbody>
                                                <tr>
                                                    <th colspan="9" class="cust_detail">Customer Billing</th>
                                                </tr>
                                                <tr>
                                                    <td width="35%" class="bdr_right" valign="top">
                                                        <table class="" border="0" width="100%" align="center" cellpadding="0" cellspacing="0">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="label">Billing Department:
                                                                    </td>
                                                                    <td>
                                                                        <input type="text" class="txt_bx dashed_border" value="TPS">
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Billing Cycle:
                                                                    </td>
                                                                    <td>
                                                                        <input type="text" class="txt_bx dashed_border" value="Monthly">
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Billing Start Date:
                                                                    </td>
                                                                    <td>
                                                                        <input type="text" class="txt_bx dashed_border" value="xx-xx-xxx">
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Billing Amount:
                                                                    </td>
                                                                    <td style="padding-right:10px;">
                                                                        <input type="text" class="txt_bx dashed_border">
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                    <td width="35%" class="bdr_right" valign="top">
                                                        <table border="0" width="100%" align="center" cellpadding="0" cellspacing="0">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="label" style="padding-left:5px; text-indent:0;">Amount for next billing cycle:</td>
                                                                    <td>
                                                                        <input type="text" class="txt_bx dashed_border">
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Total Outstanding:
                                                                    </td>
                                                                    <td style="padding-right:10px;">
                                                                        <input type="text" class="txt_bx dashed_border" value="Monthly">
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                    <td width="30%">
                                                        <p>App-wise TPS consumption(curremt month)</p>
                                                        <img height="150px" src="images/pie_chart.gif">
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    """
    html.write(customer_html)
    html.write("""
        <script>
            customer_control_view();
        </script>
        """)
    html.new_footer()

#############################new form integration for customer management END

#############################new form integration for customer device service profiling

def customer_device_service_view(h):
    """
    """
    global html
    html = h
    common_elements = customer_common_elements()
    
    css_list = common_elements["css_list"]

    javascript_list = []
    javascript_list += [
                    # "js/jquery-1.11.1.js", 
                    # "js/jquery-migrate-1.2.1.js", 
                    # "js/jquery.scombobox.min.js", 
                    "js/jquery.easing.min.js",
                    ]
    javascript_list += common_elements["javascript_list"]

    all_btn = common_elements["all_btn"]

    html.new_header("Device Service Group Management", "customer_device_service_view.py", all_btn, css_list, javascript_list)

    customer_html = """
    <table width="100%" class="main_tbl" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td>
      <!-- select customer tbl -->
      <table id="propiling_tbl" width="100%" class="content_tbl" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td>
                <table class="deatil_tbl" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td class="label">Select Customer</td>
                    <td>&nbsp;</td>
                    <td colspan="3">
                    <select class="txt_bx" id="service_profile_select_customer_select">
                    <option>Ford</option>
                    <option>Other</option>
                    
                    </select>
                    </td>
                  </tr>
                  <tr>
                    <td class="label">Customer :</td>
                    <td>&nbsp;</td>
                    <td><input type="text" value="" class="txt_bx dashed_border customer_name" /></td>
                    <td>&nbsp;</td>
                    <td><input type="button" value="Manage" class="btn orange" /></td>
                  </tr>
                  <tr>
                    <td class="label">Portal ID</td>
                    <td>&nbsp;</td>
                    <td colspan="3"><input type="text" value="" class="txt_bx dashed_border portal_Id" /></td>
                  </tr>
                  <tr>
                    <td class="label">Portal Link</td>
                    <td>&nbsp;</td>
                    <td colspan="3"><input type="text" value="" class="txt_bx dashed_border portal_Link" /></td>
                  </tr>
                  <tr>
                    <td class="label">Color Theme</td>
                    <td>&nbsp;</td>
                    <td colspan="3"><input type="text" value="" class="txt_bx dashed_border color_theme" /></td>
                  </tr>
                </table>
            </td>
          </tr>
      </table>
      <!-- end of select customer tbl -->
      
      <!-- service profile tbl -->
      <table id="service_profile_tbl" width="100%" class="content_tbl" border="0" cellspacing="0" cellpadding="0" style="display:none;">
        <thead>
            <tr>
                <th align="right" colspan="6">Add New Service Profile <a href="#" id="new_profile_name_add_link"><img class="add" src="images/add-gray.png" align="right" alt="" border="0" /></a></th>
            </tr>
            <tr class="tbl_heading">
                <th>Service Profile</th>
                <th>Device Groups</th>
                <th>Device Service</th>
                <th>P/F Service</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody class="tbl_content">
            <tr>
                <td>Ford-DG-VT_01</td>
                <td>
                    <table width="100%" class="inner_tbl" cellspacing="0" cellpadding="0" border="0">
                        <tr>
                            <td>Gramin GPS</td>
                        </tr>
                        <tr>
                            <td>HID Access</td>
                        </tr>
                    </table>
                </td>
                <td>
                    <table width="100%" class="inner_tbl" cellspacing="0" cellpadding="0" border="0">
                        <tr>
                            <td>10</td>
                        </tr>
                        <tr>
                            <td>06</td>
                        </tr>
                    </table>
                </td>
                <td>55</td>
                <td width="100" class="">
                    <table width="100%" class="" cellspacing="0" cellpadding="0" border="0">
                        <tr>
                            <td><center><a href="#"><img src="images/notification.png" alt="notification" border="0" height="16" width="16" /></a></center></td>
                            <td><center><a href="#"><img src="images/pencil.png" alt="edit" border="0" height="22" width="22" /></a></center></td>
                            <td><center><a href="#"><img src="images/delete.png" alt="edit" border="0" height="14" width="14" /></a></center></td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td class="btm_bdr_none">Ford-DG-VT_01</td>
                <td>
                    <table width="100%" class="inner_tbl" cellspacing="0" cellpadding="0" border="0">
                        <tr>
                            <td>Gramin GPS</td>
                        </tr>
                        <tr>
                            <td class="btm_bdr_none">HID Access</td>
                        </tr>
                    </table>
                </td>
                <td>
                    <table width="100%" class="inner_tbl" cellspacing="0" cellpadding="0" border="0">
                        <tr>
                            <td>10</td>
                        </tr>
                        <tr>
                            <td class="btm_bdr_none">06</td>
                        </tr>
                    </table>
                </td>
                <td>55</td>
                <td class="">
                    <table width="100%" class="" cellspacing="0" cellpadding="0" border="0">
                        <tr>
                            <td><center><a href="#"><img src="images/notification.png" alt="notification" border="0" height="16" width="16" /></a></center></td>
                            <td><center><a href="#"><img src="images/pencil.png" alt="edit" border="0" height="22" width="22" /></a></center></td>
                            <td><center><a href="#"><img src="images/delete.png" alt="edit" border="0" height="14" width="14" /></a></center></td>
                        </tr>
                    </table>
                </td>
            </tr>
         </tbody>
      </table>
      <!-- end of service profile tbl -->
      
      <!-- new profile tbl -->
      <table id="new_profile_table" width="100%" class="content_tbl deatil_tbl" cellspacing="0" cellpadding="0" border="0" style="display:none;">
        <tr>
            <td colspan="2">
                <table width="100%" cellspacing="0" cellpadding="0" border="0">
                    <tr>
                        <td class="label"><strong>New Profile Name</strong></td>
                        <td><input type="text" value="" class="txt_bx" /></td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td colspan="2" class="dashed_border">Select Device Group and Map Services</td>
        </tr>
        <tr class="group_wrp">
            <td colspan="2">
                <table width="100%" cellspacing="0" cellpadding="0" border="0">
                    <tr>
                        <td class="group_tbl" valign="top">
                <h3>Device Group 
                    <a id="add_device_group" href="#"><img src="images/add-gray.png" alt="" border="0" align="right" /></a>
                </h3>
                    <table id="device_group_tbl" class="search_tbl" width="100%" cellspacing="0" border="0" cellpadding="0">
                        <tr>
                            <td><input type="text" placeholder="Search Device Group" class="txt_bx" id="new_profile_name_device_grp_search" /></td>
                        </tr>
                        <tr>
                            <td>
                                <div class="scroll height_250">
                                    <table cellspacing="0" cellpadding="0" border="0">
                                        <tr>
                                            <td><input type="checkbox" class="chk_bx device_grp_checkbox" value="Gramin" /></td>
                                            <td>Gramin GPS -  Ford</td>
                                        </tr>
                                        <tr>
                                            <td><input type="checkbox" class="chk_bx device_grp_checkbox" value="Geodude" /></td>
                                            <td>Geodude GPS -  Ford</td>
                                        </tr>
                                        <tr>
                                            <td><input type="checkbox" class="chk_bx device_grp_checkbox" value="Pikachu" /></td>
                                            <td>Pikachu GPS -  Ford</td>
                                        </tr>
                                </table>
                                </div>
                            </td>
                        </tr>
                    </table>
                </td>
                        <td>&nbsp;</td>
                        <td class="group_tbl" valign="top">
                <h3>Services</h3>
                    <table id="service_tbl" width="100%" class="search_tbl" cellspacing="0" border="0" cellpadding="0">
                        <tr>
                            <td>
                                <input id="new_service_search_box" type="text" placeholder="Search Services" class="txt_bx srch_width" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="scroll height_250">
                                    <table id="service_tbl_inner" width="100%" cellpadding="0" cellspacing="0" border="0" >
                                        <!-- <thead>
                                            <tr>
                                                <td colspan="2" class="fixed_tbl_head">Lorem ipsum</td>
                                            </tr>
                                        </thead> -->
                                        <tbody>
                                        <!-- <tr>
                                                <td colspan="2" class="fixed_tbl_head">Lorem ipsum</td>
                                            </tr>
                                            <tr>
                                                <td><input type="checkbox" class="chk_bx" value="" /></td>
                                                <td>Gramin GPS -  Ford</td>
                                            </tr>
                                            <tr>
                                                <td><input type="checkbox" class="chk_bx" value="" /></td>
                                                <td>Gramin GPS -  Ford</td>
                                            </tr>
                                            <tr>
                                                <td><input type="checkbox" class="chk_bx" value="" /></td>
                                                <td>Gramin GPS -  Ford</td>
                                            </tr>
                                            <tr>
                                                <td><input type="checkbox" class="chk_bx" value="" /></td>
                                                <td>Gramin GPS -  Ford</td>
                                            </tr>
                                            <tr>
                                                <td><input type="checkbox" class="chk_bx" value="" /></td>
                                                <td>Gramin GPS -  Ford</td>
                                            </tr>
                                            <tr>
                                                <td colspan="2" class="fixed_tbl_head">Lorem ipsum</td>
                                            </tr>
                                            <tr>
                                                <td><input type="checkbox" class="chk_bx" value="" /></td>
                                                <td>Gramin GPS -  Ford</td>
                                            </tr>
                                            <tr>
                                                <td><input type="checkbox" class="chk_bx" value="" /></td>
                                                <td>Gramin GPS -  Ford</td>
                                            </tr>
                                            <tr>
                                                <td><input type="checkbox" class="chk_bx" value="" /></td>
                                                <td>Gramin GPS -  Ford</td>
                                            </tr>
                                            <tr>
                                                <td><input type="checkbox" class="chk_bx" value="" /></td>
                                                <td>Gramin GPS -  Ford</td>
                                            </tr>
                                            <tr>
                                                <td><input type="checkbox" class="chk_bx" value="" /></td>
                                                <td>Gramin GPS -  Ford</td>
                                            </tr>
                                            <tr>
                                                <td><input type="checkbox" class="chk_bx" value="" /></td>
                                                <td>Gramin GPS -  Ford</td>
                                            </tr> -->
                                        </tbody>
                                </table>
                                </div>
                            </td>
                        </tr>
                        <!--<tr>
                            <td>
                                <div class="scroll height_120">
                                    <table>
                                        <thead>
                                            <tr>
                                                <td class="fixed_tbl_head">Lorem ipsum</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td colspan="2">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td><input type="checkbox" class="chk_bx" value="" /></td>
                                                <td>Gramin GPS -  Ford</td>
                                            </tr>
                                            <tr>
                                                <td><input type="checkbox" class="chk_bx" value="" /></td>
                                                <td>Gramin GPS -  Ford</td>
                                            </tr>
                                            <tr>
                                                <td><input type="checkbox" class="chk_bx" value="" /></td>
                                                <td>Gramin GPS -  Ford</td>
                                            </tr>
                                            <tr>
                                                <td><input type="checkbox" class="chk_bx" value="" /></td>
                                                <td>Gramin GPS -  Ford</td>
                                            </tr>
                                            <tr>
                                                <td><input type="checkbox" class="chk_bx" value="" /></td>
                                                <td>Gramin GPS -  Ford</td>
                                            </tr>
                                            <tr>
                                                <td><input type="checkbox" class="chk_bx" value="" /></td>
                                                <td>Gramin GPS -  Ford</td>
                                            </tr>
                                            <tr>
                                                <td><input type="checkbox" class="chk_bx" value="" /></td>
                                                <td>Gramin GPS -  Ford</td>
                                            </tr>
                                            <tr>
                                                <td><input type="checkbox" class="chk_bx" value="" /></td>
                                                <td>Gramin GPS -  Ford</td>
                                            </tr>
                                            <tr>
                                                <td><input type="checkbox" class="chk_bx" value="" /></td>
                                                <td>Gramin GPS -  Ford</td>
                                            </tr>
                                            <tr>
                                                <td><input type="checkbox" class="chk_bx" value="" /></td>
                                                <td>Gramin GPS -  Ford</td>
                                            </tr>
                                            <tr>
                                                <td><input type="checkbox" class="chk_bx" value="" /></td>
                                                <td>Gramin GPS -  Ford</td>
                                            </tr>
                                        </tbody>
                                </table>
                                </div>
                            </td>
                        </tr>-->
                    </table>
                </td>       
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td colspan="2">
                    <h3>Platform Services</h3>
                    <table id="platform_service_tbl" cellspacing="0" cellpadding="0" width="100%" class="content_tbl">
                        <tr>
                            <td colspan="2">
                                <input type="text" id="platform_services_search" placeholder="Search Services" class="txt_bx" />    
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <div class="scroll height_120">
                                <table id="platform_search_table" class="deatil_tbl pltfrm_tbl" width="100%" cellspacing="0" cellpadding="0">
                                    <tr>
                                        <td><input type="checkbox" class="chk_bx" value="" /></td>
                                        <td><input type="text" value="Lorem Ipsum" class="txt_bx dashed_border" /></td>
                                        <td><input type="checkbox" class="chk_bx" value="" /></td>
                                        <td><input type="text" value="Dolor Amit" class="txt_bx dashed_border" /></td>
                                        <td><input type="checkbox" class="chk_bx" value="" /></td>
                                        <td><input type="text" value="Lorem Ipsum" class="txt_bx dashed_border" /></td>
                                        <td><input type="checkbox" class="chk_bx" value="" /></td>
                                        <td><input type="text" value="Dolor Amit" class="txt_bx dashed_border" /></td>
                                    </tr>
                                    <tr>
                                        <td><input type="checkbox" class="chk_bx" value="" /></td>
                                        <td><input type="text" value="Lorem Ipsum" class="txt_bx dashed_border" /></td>
                                        <td><input type="checkbox" class="chk_bx" value="" /></td>
                                        <td><input type="text" value="Dolor Amit" class="txt_bx dashed_border" /></td>
                                        <td><input type="checkbox" class="chk_bx" value="" /></td>
                                        <td><input type="text" value="Lorem Ipsum" class="txt_bx dashed_border" /></td>
                                        <td><input type="checkbox" class="chk_bx" value="" /></td>
                                        <td><input type="text" value="Lorem Ipsum" class="txt_bx dashed_border" /></td>
                                    </tr>
                                    <tr>
                                        <td><input type="checkbox" class="chk_bx" value="" /></td>
                                        <td><input type="text" value="Lorem Ipsum" class="txt_bx dashed_border" /></td>
                                        <td><input type="checkbox" class="chk_bx" value="" /></td>
                                        <td><input type="text" value="Lorem Ipsum" class="txt_bx dashed_border" /></td>
                                        <td><input type="checkbox" class="chk_bx" value="" /></td>
                                        <td><input type="text" value="Lorem Ipsum" class="txt_bx dashed_border" /></td>
                                        <td><input type="checkbox" class="chk_bx" value="" /></td>
                                        <td><input type="text" value="Lorem Ipsum" class="txt_bx dashed_border" /></td>
                                    </tr>
                                    <tr>
                                        <td><input type="checkbox" class="chk_bx" value="" /></td>
                                        <td><input type="text" value="Lorem Ipsum" class="txt_bx dashed_border" /></td>
                                        <td><input type="checkbox" class="chk_bx" value="" /></td>
                                        <td><input type="text" value="Lorem Ipsum" class="txt_bx dashed_border" /></td>
                                        <td><input type="checkbox" class="chk_bx" value="" /></td>
                                        <td><input type="text" value="Lorem Ipsum" class="txt_bx dashed_border" /></td>
                                        <td><input type="checkbox" class="chk_bx" value="" /></td>
                                        <td><input type="text" value="Lorem Ipsum" class="txt_bx dashed_border" /></td>
                                    </tr>
                                </table>
                                </div>
                            </td>
                        </tr>
                    </table>
                </td>
        </tr>
        <tr>
            <td colspan="2"><input type="button" value="Save" id="save_new_profile_button" class="btn green" /> &nbsp; <input type="button" id="cancel_new_profile_button" value="Cancel" class="btn red" /></td>
        </tr>
      </table>
      <!-- end of service profile tbl -->
    </td>
  </tr>     
</table>
    """
    html.write(customer_html)
    html.write("""
        <script>
            add_device_groups();
            customer_device_service_view();
        </script>
        """)
    html.new_footer()
#############################new form integration for customer device service profiling

def customer_edit_view(h):
    """
    View part for the customer
    """
    global html
    html = h
    
    user_id = html.var("customer_id"); #get the user id from the url query

    common_elements = customer_common_elements()
    
    css_list = common_elements["css_list"]

    javascript_list = common_elements["javascript_list"]

    all_btn = common_elements["all_btn"]

    html.new_header("Edit Customers", "customer_management.py", all_btn, css_list, javascript_list)
    customer_string = """
    <div>
        <form action="customer_put_ajax.py" method="get" id="add_customer_form" name="add_customer_form" autocomplete="on" >
            <div class="form-div">
                <table class="tt-table" cellspacing="0" cellpadding="0" width="100%">
                    <tr>
                    <th class="cell-title">Edit Customer</th>
                    </tr>
                </table>
                <div class="form-body">
                <div class="row-elem">
                        <input type="hidden" id="user_id" name="user_id" disabled='disabled' />
                    </div>
                    <div class="row-elem">
                        <label class="lbl lbl-big" for="username">Customer User Name</label>
                        <input type="text" id="user_name" name="user_name" disabled='disabled'
                        title="Choose Unique User Name. <br/>Must be at least 5 characters." />
                    </div>
                    <div class="row-elem">
                        <label class="lbl lbl-big" for="password">Password</label>
                        <input type="password" id="password" name="password" title="Must be at least 8 characters. "/>
                    </div>
    """
    customer_string += """
                    <div class="row-elem">
                        <label class="lbl lbl-big" for="groups">Select Group</label>
    """
    customer_string += (customer_group_customer_widget())
    customer_string += """
                    </div>
    """
    customer_string += """
                    <div class="row-elem">
                        <label class="lbl lbl-big" for="first_name">First Name</label>
                        <input type="text" id="first_name" name="first_name" title="Please Enter First name."/>
                    </div>
                    <div class="row-elem">
                        <label class="lbl lbl-big" for="last_name">Last Name</label>
                        <input type="text" id="last_name" name="last_name" title="Please Enter Last name."/>
                    </div>
                    <div class="row-elem">
                        <label class="lbl lbl-big" for="company_name">Company</label>
                        <input type="text" id="company_name" name="company_name" title="Please Enter Company Name."/>
                    </div>
                    <div class="row-elem">
                        <label class="lbl lbl-big" for="designation">Designation</label>
                        <input type="text" id="designation" name="designation" title="Please Enter Designation."/>
                    </div>
                    <div class="row-elem">
                        <label class="lbl lbl-big" for="mobile_no">Mobile Number</label>
                        <input type="text" id="mobile_no" name="mobile_no" 
                        title="Please Enter Mobile Number<br/> Don't include +91 or 0."/>
                    </div>
                    <div class="row-elem">
                        <label class="lbl lbl-big" for="telephone_no">Telephone Number</label>
                        <input type="text" id="telephone_no" name="telephone_no" 
                        title="Please Enter Mobile Number<br/> Don't include +91 or 0."/>
                    </div>
                    <div class="row-elem">
                        <label class="lbl lbl-big" for="fax">Fax</label>
                        <input type="text" id="fax" name="fax" 
                        title="Please Enter Mobile Number<br/> Don't include +91 or 0."/>
                    </div>
                    <div class="row-elem">
                        <label class="lbl lbl-big" for="email_id">E-Mail ID</label>
                        <input type="text" id="email_id" name="email_id" title="Please Enter E-Mail ID."/>
                    </div>
                    <div class="row-elem">
                        <label class="lbl lbl-big" for="city_id">City</label>
                        <input type="text" id="city_id" name="city_id" title="Please Enter City Name."/>
                    </div>
                    <div class="row-elem">
                        <label class="lbl lbl-big" for="state_id">State</label>
                        <input type="text" id="state_id" name="state_id" title="Please Enter State."/>
                    </div>
                    <div class="row-elem">
                        <label class="lbl lbl-big" for="country_id">Country</label>
                        <input type="text" id="country_id" name="country_id" title="Please Enter Country."/>
                    </div>
                    <div class="row-elem">
                        <label class="lbl lbl-big" for="usage">Usage</label>
                        <select id='usage' name='usage'>
                            <option value=0>Personal</option>
                            <option value=1>Commercial</option>
                        </select>
                    </div>
                    <div class="row-elem">
                        <label class="lbl lbl-big" for="purpose">Purpose</label>
                        <input type="text" id="purpose" name="purpose" title="Please Enter Purpose."/>
                    </div>
                    <div class="row-elem">
                        <label class="lbl lbl-big" for="address">Address</label>
                        <textarea id="address" name="address" title="Please Enter own Address."></textarea>
                    </div>
                </div>
            </div>
            <div class="form-div-footer">
                <button type="submit" class="yo-small yo-button"><span class="add">Save</span></button>
                <button type="reset" class="yo-small yo-button" id="close_add_user"><span class="cancel">Cancel</span></button>
            </div>
        </form>
    </div>
    """ 
    customer_string += """
        <script>
            put_customer_values("%s");
            post_customers(action="put", user_id = "%s");
        </script>
    """ %(user_id,user_id)
    html.write(customer_string)
    html.new_footer()


def customer_get(user_id=None):
    """
    get the list of the customers
    """

    db_conn = DB_Conn()
    db = db_conn.db_connect()
    query = """
        SELECT `users`.`user_id`, 
        CONCAT (`users`.`first_name`," ",`users`.`last_name`) as fullname, 
        `users`.`email_id`,
        `users`.`mobile_no`, 
        `groups`.`group_name`, 
        `users`.`company_name`, 
        `users`.`usage`,
        `groups`.`group_id`,
        `users`.`designation`,
        `users`.`address`,
        `users`.`city_id`,
        `users`.`state_id`,
        `users`.`country_id`,
        `users`.`telephone_no`,
        `users`.`fax`,
        `users`.`usage`,
        `users`.`purpose`,
        `user_login`.`user_name`

        FROM `users` LEFT join  (`users_groups`, `groups`, `user_login`)
        on (
        `users_groups`.`user_id`=`users`.`user_id`
        and
        `users_groups`.`group_id`=`groups`.`group_id`
        and
        `user_login`.`user_id` = `users`.`user_id`
        )
        where `users`.`is_customer` = 1
    """

    if user_id:
        query += """
            And
            `users`.`user_id` = \"%s\"
        """ % (user_id)

    user_details = None
    cursor = db.cursor()
    if cursor.execute(query) != 0:
        user_details = cursor.fetchall()
    cursor.close()
    db.close()
    return user_details

def customer_get_one(user_id):
    """
    get information of a specific customer
    """
    return customer_get(user_id)

def customer_post(user_details):
    """
    POST a new costomer
    """
    now = datetime.datetime.now()
    f = '%Y-%m-%d %H:%M:%S'
    insert_time = now.strftime(f)

    user_details["creation_time"] = insert_time

    db_conn = DB_Conn()
    db = db_conn.db_connect()
    query = """
    INSERT INTO `users`
    (   `user_id`, 
        `first_name`, 
        `last_name`, 
        `designation`, 
        `company_name`, 
        `mobile_no`, 
        `address`, 
        `city_id`, 
        `state_id`,
        `country_id`, 
        `email_id`, 
        `is_customer`, 
        `telephone_no`, 
        `fax`, 
        `usage`, 
        `purpose`
    ) 
    VALUES 
    (   \"%(user_id)s\",
        \"%(first_name)s\",
        \"%(last_name)s\",
        \"%(designation)s\",
        \"%(company_name)s\",
        \"%(mobile_no)s\",
        \"%(address)s\",
        \"%(city_id)s\",
        \"%(state_id)s\",
        \"%(country_id)s\",
        \"%(email_id)s\",
        %(is_customer)s,
        \"%(telephone_no)s\",
        \"%(fax)s\",
        %(usage)s,
        \"%(purpose)s\"
    )
    """ %(user_details)

    cursor = db.cursor()
    result = {"success" : 1, "message" : "Customer can not be added"}
    try:
        if cursor.execute(query):
            db.commit()
            result = {"success" : 0, "message" : "Customer added Successfully"}
    except Exception as e:
        result = {"success" : 1, "message" : "Customer can not be added. Error \"\'%s\'\" " % (e) }
    finally:
        cursor.close()
        db.close()

    #relate customer to the customer group
    result = customer_group_customer_post(user_details["user_id"], user_details["groups"])

    #insert customer into login table

    customer_login_post(user_details)

    return result

def customer_put(user_details):
    """
    update a customer
    """
    db_conn = DB_Conn()
    db = db_conn.db_connect()

    #cleanup the password
    password = db.escape_string((user_details["password"]))

    query = """
    UPDATE `users` 
    SET 
        `first_name`=\"%(first_name)s\",
        `last_name`=\"%(last_name)s\",
        `designation`=\"%(designation)s\",
        `company_name`=\"%(company_name)s\",
        `mobile_no`=\"%(mobile_no)s\",
        `address`=\"%(address)s\",
        `city_id`=\"%(city_id)s\",
        `state_id`=\"%(state_id)s\",
        `country_id`=\"%(country_id)s\",
        `email_id`=\"%(email_id)s\",
        `is_customer`=1,
        `telephone_no`=\"%(telephone_no)s\",
        `fax`=\"%(fax)s\",
        `usage`=%(usage)s,
        `purpose`=\"%(purpose)s\"
    WHERE `user_id`=\"%(user_id)s\"
    """ %(user_details)

    cursor = db.cursor()
    result = {"success" : 2, "message" : "Customer is not updated"}
    try:
        if cursor.execute(query):
            db.commit()
            result = {"success" : 0, "message" : "Customer updated Successfully"}
    except Exception as e:
        result = {"success" : 1, "message" : "Customer can not be updated. Error \"\'%s\'\" . Query %s" % (e, query) }
    finally:
        cursor.close()
        db.close()

    if result["success"] in [0,2] : #0 to update all, 2 oto update the group
        #relate customer to the customer group
        result = customer_group_customer_put(user_details["user_id"], user_details["groups"])

    if result["success"] in [0,2] and len(password) > 1: #0 to update all
        #relate customer to the customer group
        result = customer_login_put(user_details)

    return result

def customer_delete(user_id):
    """
    delete a customer
    """
    result = {"success" : 1, "message" : "Customer can not be Deleted"}
    db_conn = DB_Conn()
    db = db_conn.db_connect()
    
    #clean up the user id
    user_id = db.escape_string(user_id)
    
    query = """
        DELETE FROM `users`
        WHERE `users`.`user_id` = "%s"
    """ %(user_id)
    cursor = db.cursor()
    try:
        if (cursor.execute(query)) != 0:
            db.commit()
            result = {"success" : 0, "message" : "Customer Deleted Successfully"}
    except Exception as customer_exp:
        result = {"success" : 1, "message" : "Customer can not be Deleted " + str(e)}
    finally:
        cursor.close()
        db.close()
    return result

def customer_get_ajax(h):
    """
    get the customers
    """
    global html
    html = h
    result_json = []
    customer_list = customer_get()
    for customer in customer_list:
        cust_list = list(customer)
        if len(cust_list):
            customer_actions = """
            <a href="customer_edit_view.py?customer_id=%s">
                <img class="host_opr" title="View Customer Details" src="images/new/info.png" alt="view"/>
            </a>
            &nbsp;
            <a href="customer_edit_view.py?customer_id=%s">
                <img class="host_opr" title="Edit Customer Details" src='images/new/edit.png' alt='edit'/>
            </a>
            &nbsp;
            <a class="ajax_caller" href="customer_delete_ajax.py?customer_id=%s">
                <img class="host_opr" title="Edit Customer Details" src='images/new/delete.png' alt='delete'/>
            </a>
            """ %(cust_list[0], cust_list[0], cust_list[0])
            cust_list[6] = "Personal" if cust_list[6] == 0 else "Commercial"
            result_json.append(
                [
                    cust_list[1],
                    cust_list[4],
                    cust_list[5],
                    cust_list[2],
                    cust_list[3],
                    cust_list[6],
                    customer_actions
                ]
            )
    html.write(json.dumps(result_json))

def customer_get_details_ajax(h):
    """
    get all the details of a user and pass on to the ajax call
    """
    global html
    html = h
    user_id = html.var("customer_id")
    customer_detail = customer_get_one(user_id)[0]
    # `users`.`first_name`," ",`users`.`last_name`) as fullname, [1]
    # `users`.`email_id`, [2]
    # `users`.`mobile_no`, [3]
    # `groups`.`group_name`, [4]
    # `users`.`company_name`, [5]
    # `users`.`usage`,[6]
    # `groups`.`group_id`, [7]
    # `users`.`designation`,[8]
    # `users`.`address`,[9]
    # `users`.`city_id`,[10]
    # `users`.`state_id`,[11]
    # `users`.`country_id`,[12]
    # `users`.`telephone_no`,[13]
    # `users`.`fax`,[14]
    # `users`.`usage`,[15]
    # `users`.`purpose`[16]
    # `user_login`.`username`[17]

    result = {"success" : 0, "message" : "Customer Details Fetched Successfully"}

    user_details = {
        'user_id' : user_id,
        'user_name' : customer_detail[17],
        'password' : "",
        'first_name' : customer_detail[1].split()[0] ,
        'last_name' : customer_detail[1].split()[1] if customer_detail[1].split()[1] != None else "",
        'designation' : customer_detail[8],
        'company_name' : customer_detail[5],
        'groups' : customer_detail[7],
        'mobile_no' : customer_detail[3],
        'email_id' : customer_detail[2],
        'city_id' : customer_detail[10],
        'state_id' : customer_detail[11],
        'country_id' : customer_detail[12],
        'address' : customer_detail[9],
        # 'created_by', put created by manually
        # 'is_customer',
        'telephone_no' : customer_detail[13],
        'fax' : customer_detail[14],
        'usage' : customer_detail[15],
        'purpose' : customer_detail[16]
    }

    result["user_details"] = user_details

    html.write(json.dumps(result))

def customer_post_ajax(h):
    """
    call this function to add a new customer
    """
    global html
    html = h

    ##
    #Created By
    ##
    created_by = html.req.session.get('username')
    if created_by is None:
        created_by = "SuperAdmin"    

    details_list = [
                'user_name',
                'password',
                'first_name',
                'last_name',
                'designation',
                'company_name',
                'groups',
                'mobile_no',
                'email_id',
                'city_id',
                'state_id',
                'country_id',
                'address',
                # 'created_by', put created by manually
                # 'is_customer',
                'telephone_no',
                'fax',
                'usage',
                'purpose'
                ]
    user_details = {}
    user_details["created_by"] = created_by #created by what main user ?
    user_details["user_id"] = uuid.uuid1() #user id is uuid
    user_details["is_customer"] = 1 #yes this is a customer
    for details in details_list:
        if html.var(details) != None and len(html.var(details)) > 0:
            user_details[details] = html.var(details)
        else:
            if details == "usage":
                user_details[details] = 0
            elif details == "password":
                user_details["password"] = ""
            else:
                user_details[details] = "unknown"

    result = customer_post(user_details)
    html.write(json.dumps(result))

def customer_put_ajax(h):
    """
    update the customer details
    """
    global html
    html = h
    ##
    #Created By
    ##
    updated_by = html.req.session.get('username')
    if updated_by is None:
        updated_by = "SuperAdmin"    

    details_list = [
                'user_id',
                'user_name',
                'password',
                'first_name',
                'last_name',
                'designation',
                'company_name',
                'groups',
                'mobile_no',
                'email_id',
                'city_id',
                'state_id',
                'country_id',
                'address',
                # 'created_by', put created by manually
                # 'is_customer',
                'telephone_no',
                'fax',
                'usage',
                'purpose'
                ]
    user_details = {}
    user_details["updated_by"] = updated_by #created by what main user ?
    user_details["is_customer"] = 1 #yes this is a customer
    for details in details_list:
        if html.var(details) != None and len(html.var(details)) > 0:
            user_details[details] = html.var(details)
        else:
            if details == "usage":
                user_details[details] = 0
            elif details == "password":
                user_details["password"] = ""
            else:
                user_details[details] = "unknown"

    result = customer_put(user_details)
    html.write(json.dumps(result))

def customer_delete_ajax(h):
    """
    call this fucntion to delete the user / customer
    """
    global html
    html = h
    user_id = html.var("customer_id")
    result = customer_delete(user_id)
    html.write(json.dumps(result))


##############################################################################
############################Customer Groups###################################

def customer_group_get_all():
    """
    get the list of the customers groups
    """
    db_conn = DB_Conn()
    db = db_conn.db_connect()
    query = """
        SELECT 
            `group_id`, 
            `group_name`, 
            `description`, 
            `timestamp`, 
            `created_by`, 
            `creation_time`, 
            `is_deleted`, 
            `updated_by`, 
            `role_id`, 
            `is_default`, 
            `is_customer` 
        FROM `groups` 
        WHERE `is_customer` = 1
    """
    user_group_details = None
    cursor = db.cursor()
    if cursor.execute(query) != 0:
        user_group_details = cursor.fetchall()
    cursor.close()
    db.close()
    return user_group_details

def customer_group_post(group_info):
    """
    post a new customer group
    create same group multiple times with roles : viewer and operator
    """

    db_conn = DB_Conn()
    db = db_conn.db_connect()

    viewer_role = "64ad6824-1221-11e1-ab39-f04da24c7c26"
    operator_role = "64aa3690-1221-11e1-ab39-f04da24c7c26"

    now = datetime.datetime.now()
    f = '%Y-%m-%d %H:%M:%S'
    insert_time = now.strftime(f)

    customer_groups = [group_info["group_name"] + "(Operator)", group_info["group_name"] + "(Viewer)"]
    customer_roles = [operator_role, viewer_role]

    # group_details["group_id"] = 

    details_list = [
        "group_name" ,
        "description" ,
        "timestamp" ,
        "created_by" ,
        "creation_time" ,
        "is_deleted" ,
        "updated_by" ,
        "role_id" ,
        "is_default" ,
        "is_customer" ,
        "company_name" ,
        "company_address" ,
        "company_telephone" ,
        "company_fax" ,
        "company_website" ,
        "company_sales_contact" ,
        "company_purchase_contact" ,
        "company_business" ,
        "company_business_type" ,
        "company_sales_email" ,
        "company_purchase_email" ,
        "company_reg_number" ,
        "company_vat_number" ,
        "group_id"
    ]

    viewer_info = {
        "group_id" : "UUID()",
        "group_name" : "'" + str(customer_groups[1]) + "'",
        "description" : "'Customer Viewer Group'",
        "timestamp" : "'" + str(insert_time) + "'",
        "created_by" : "'" + str(group_info["created_by"]) + "'",
        "creation_time" : "'" + str(insert_time) + "'",
        "is_deleted" : 0 ,
        "updated_by" : "NULL",
        "role_id" : "'" + str(customer_roles[1]) + "'",
        "is_default" : 0,
        "is_customer" : 1,
        "company_name" : "'" + str(group_info["company_name"]) + "'",
        "company_address" : "'" + str(group_info["company_address"]) + "'",
        "company_telephone" : "'" + str(group_info["company_telephone"]) + "'",
        "company_fax" : "'" + str(group_info["company_fax"]) + "'",
        "company_website" : "'" + str(group_info["company_website"]) + "'",
        "company_sales_contact" : "'" + str(group_info["company_sales_contact"]) + "'",
        "company_purchase_contact" : "'" + str(group_info["company_purchase_contact"]) + "'",
        "company_business" : "'" + str(group_info["company_business"]) + "'",
        "company_business_type" : "'" + str(group_info["company_business_type"]) + "'",
        "company_sales_email" : "'"+ str(group_info["company_sales_email"]) + "'",
        "company_purchase_email" : "'" + str(group_info["company_purchase_email"]) + "'",
        "company_reg_number" : "'"+ str(group_info["company_reg_number"]) + "'",
        "company_vat_number" : "'" + str(group_info["company_vat_number"]) + "'"
    }
    operator_info = {
        "group_id" : "UUID()",
        "group_name" : "'" + str(customer_groups[0]) + "'",
        "description" : "'Customer Operator Group'",
        "timestamp" : "'" + str(insert_time) + "'",
        "created_by" : "'" + str(group_info["created_by"]) + "'",
        "creation_time" : "'" + str(insert_time) + "'",
        "is_deleted" : 0,
        "updated_by" : "NULL",
        "role_id" : "'" + str(customer_roles[0]) + "'",
        "is_default" : 0,
        "is_customer" : 1,
        "company_name" : "'" + str(group_info["company_name"]) + "'",
        "company_address" : "'" + str(group_info["company_address"]) + "'",
        "company_telephone" : "'" + str(group_info["company_telephone"]) + "'",
        "company_fax" : "'" + str(group_info["company_fax"]) + "'",
        "company_website" : "'" + str(group_info["company_website"]) + "'",
        "company_sales_contact" : "'" + str(group_info["company_sales_contact"]) + "'",
        "company_purchase_contact" : "'" + str(group_info["company_purchase_contact"]) + "'",
        "company_business" : "'" + str(group_info["company_business"]) + "'",
        "company_business_type" : "'" + str(group_info["company_business_type"]) + "'",
        "company_sales_email" : "'"+ str(group_info["company_sales_email"]) + "'",
        "company_purchase_email" : "'" + str(group_info["company_purchase_email"]) + "'",
        "company_reg_number" : "'" + str(group_info["company_reg_number"]) + "'",
        "company_vat_number" : "'" + str(group_info["company_vat_number"]) + "'"
    }

    query = ""

    insert_information = {"insert_viewer" : viewer_info, "insert_operator" : operator_info}

    query += "INSERT INTO `groups` ( "
    for details in operator_info:
        query += "`%s`" % (details)
        query += ","
    query = query[:-1] + ")"
    query += " VALUES "

    for insert_info in insert_information:
        query += " ("
        for insert in insert_information[insert_info]:
            query += "%s" % (insert_information[insert_info][insert])
            query += ","
        query = query[:-1] + "),"
    query = query[:-1] + ""

    cursor = db.cursor()

    try:
        if cursor.execute(query):
            db.commit()
            result = {"success" : 0, "message" : "Customer Company created Successfully"}
    except Exception as e:
        result = {"success" : 1, "message" : "Customer Company can not be created. Error \"\'%s\'\" \
                        Query = %s" % (e, query) }
    finally:
        cursor.close()
        db.close()

    return result

def customer_group_put(group_info):
    """
    update a customer group
    update same group multiple times with roles : viewer and operator
    """
    related_groups = customer_group_get_related(group_info["group_id"])

    now = datetime.datetime.now()
    f = '%Y-%m-%d %H:%M:%S'
    insert_time = now.strftime(f)

    result = {"success" : 1, "message" : "Customer Company can not be Updated"}

    for groups in related_groups:
        c_group_info = list(groups)
        #check for the roles
        c_g_id = c_group_info[0]
        c_g_role = c_group_info[1].split("(")[1][:-1]
        c_g_name = c_group_info[1].split("(")[0]
        new_c_g_name = group_info["group_name"] + "("+ c_g_role +")"
        db_conn = DB_Conn()
        db = db_conn.db_connect()
        cursor = db.cursor()
        query = """
        UPDATE `groups`
        SET
        `group_name` = "%s",
        `company_name` = "%s",
        `company_address` = "%s",
        `company_telephone` = "%s",
        `company_fax` = "%s",
        `company_website` = "%s",
        `company_sales_contact` = "%s",
        `company_purchase_contact` = "%s",
        `company_business` = "%s",
        `company_business_type` = "%s",
        `company_sales_email` = "%s",
        `company_purchase_email` = "%s",
        `company_reg_number` = "%s",
        `company_vat_number` = "%s",
        `description` = "%s"
        WHERE
        `group_id` = "%s"
        """ %(
            new_c_g_name, 
            group_info["company_name"],
            group_info["company_address"],
            group_info["company_telephone"],
            group_info["company_fax"],
            group_info["company_website"],
            group_info["company_sales_contact"],
            group_info["company_purchase_contact"],
            group_info["company_business"],
            group_info["company_business_type"],
            group_info["company_sales_email"],
            group_info["company_purchase_email"],
            group_info["company_reg_number"],
            group_info["company_vat_number"],
            group_info["description"],
            c_g_id
            )
        try:
            if cursor.execute(query):
                db.commit()
                result = {"success" : 0, "message" : "Customer Company Updated Successfully"}
        except Exception as e:
            result = {"success" : 1, "message" : "Customer Company can not be Updated. Error \"\'%s\'\" \
                            Query = %s" % (e, query) }
        finally:
            cursor.close()
            db.close()
    return result

def customer_group_delete(group_id):
    """
    delete a new customer group
    create same group multiple times with roles : viewer and operator
    """
    result = {"success" : 1, "message" : "Customer can not be Deleted"}
    db_conn = DB_Conn()
    db = db_conn.db_connect()
    
    #clean up the user id
    group_id = db.escape_string(group_id)
    
    query = """
        DELETE FROM `groups`
        WHERE `groups`.`group_id` = "%s"
    """ %(group_id)
    cursor = db.cursor()
    try:
        if (cursor.execute(query)) != 0:
            db.commit()
            result = {"success" : 0, "message" : "Customer Group Deleted Successfully"}
    except Exception as customer_exp:
        result = {"success" : 1, "message" : "Customer Group can not be Deleted " + str(e)}
    finally:
        cursor.close()
        db.close()
    return result
    
def customer_group_list(h):
    """
    list of the customer groups
    """
    global html
    html = h

    common_elements = customer_common_elements(group=True)

    css_list = common_elements["css_list"]

    javascript_list = common_elements["javascript_list"]

    all_btn = common_elements["all_btn"]

    html.new_header("Customer Organization", "customer_group_management.py", all_btn, css_list, javascript_list)
    customer_string = """
    <div>
        <table id="customers" cellpadding="0" cellspacing="0" border="0" class="display" style="text-align:center">
            <thead>
                <tr>
                    <th>
                        Company System Role
                    </th>
                    <th>
                        Company Name
                    </th>
                    <th>
                        Company Address
                    </th>
                    <th>
                        Company Telephone
                    </th>
                    <th>
                        Company Website
                    </th>
                    <th>
                        Company Business
                    </th>
                    <th>
                        Company Registration Number
                    </th>
                    <th>
                        Company VAT Number
                    </th>
                    <th>
                        Company Sales Contact
                    </th>
                    <th>
                        Company Purchase Contact
                    </th>
                    <th>
                        Actions
                    </th>
                </tr>
            </thead>
        </table>
    </div>
    """
    customer_string += """
    <script>
        get_customer_groups();
    </script>
    """
    html.write(customer_string)
    html.new_footer()
    pass

def customer_group_add_view(h):
    """
    create a new customer group
    """
    global html
    html = h
    
    user_id = html.var("customer_id"); #get the user id from the url query

    common_elements = customer_common_elements(group=True)
    
    css_list = common_elements["css_list"]

    javascript_list = common_elements["javascript_list"]

    all_btn = common_elements["all_btn"]

    html.new_header("Add Customer Group", "customer_group_management.py", all_btn, css_list, javascript_list)
    customer_string = """
    <div>
        <form action="customer_group_post_ajax.py" method="get" id="add_customer_group_form" 
                                                                    name="add_customer_group_form" autocomplete="on" >
            <div class="form-div">
                <table class="tt-table" cellspacing="0" cellpadding="0" width="100%">
                    <tr>
                    <th class="cell-title">Add Customer Group</th>
                    </tr>
                </table>
                <div class="form-body">
                    <div class="row-elem">
                        <label class="lbl lbl-big" for="group_name">Customer Company Name</label>
                        <input type="text" id="group_name" name="group_name" />
                    </div>
                    <div class="row-elem">
                        <label class="lbl lbl-big" for="company_telephone">Company Telephone</label>
                        <input type="text" id="company_telephone" name="company_telephone" title="Please Enter Company Name."/>
                    </div>
                    <div class="row-elem">
                        <label class="lbl lbl-big" for="company_fax">Company Fax</label>
                        <input type="text" id="company_fax" name="company_fax" title="Please Enter Fax information."/>
                    </div>
                    <div class="row-elem">
                        <label class="lbl lbl-big" for="company_website">Company Website</label>
                        <input type="text" id="company_website" name="company_website"/>
                    </div>
                    <div class="row-elem">
                        <label class="lbl lbl-big" for="company_sales_contact">Company Sales Contact</label>
                        <input type="text" id="company_sales_contact" name="company_sales_contact" />
                    </div>
                    <div class="row-elem">
                        <label class="lbl lbl-big" for="company_purchase_contact">Company Purchase Contact</label>
                        <input type="text" id="company_purchase_contact" name="company_purchase_contact"/>
                    </div>
                    <div class="row-elem">
                        <label class="lbl lbl-big" for="company_business">Company Business</label>
                        <select id='company_business' name='company_business'>
                            <option value="OEM">OEM</option>
                            <option value="VAR">VAR</option>
                            <option value="Distributor">Distributor</option>
                            <option value="Retailer">Retailer</option>
                            <option value="Reseller">Reseller</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div class="row-elem">
                        <label class="lbl lbl-big" for="company_business_type">Company Business Type</label>
                        <select id='company_business_type' name='company_business_type'>
                            <option value="Private">Personal</option>
                            <option value="Public">Public</option>
                        </select>
                    </div>
                    <div class="row-elem">
                        <label class="lbl lbl-big" for="company_sales_email">Company Sales Email</label>
                        <input type="text" id="company_sales_email" name="company_sales_email" />
                    </div>
                    <div class="row-elem">
                        <label class="lbl lbl-big" for="company_purchase_email">Company Purchase Email</label>
                        <input type="text" id="company_purchase_email" name="company_purchase_email" />
                    </div>
                    <div class="row-elem">
                        <label class="lbl lbl-big" for="company_reg_number">Company Registration Number</label>
                        <input type="text" id="company_reg_number" name="company_reg_number"/>
                    </div>
                    <div class="row-elem">
                        <label class="lbl lbl-big" for="company_vat_number">VAT Information</label>
                        <input type="text" id="company_vat_number" name="company_vat_number" />
                    </div>
                    <div class="row-elem">
                        <label class="lbl lbl-big" for="company_address">Company Address</label>
                        <textarea type="text" id="company_address" name="company_address" /> </textarea>
                    </div>
                </div>
            </div>
            <div class="form-div-footer">
                <button type="submit" class="yo-small yo-button"><span class="add">Save</span></button>
                <button type="reset" class="yo-small yo-button" id="close_add_user"><span class="cancel">Cancel</span></button>
            </div>
        </form>
    </div>
    """ 
    customer_string += """
        <script>
            post_customer_groups();
        </script>
    """
    html.write(customer_string)
    html.new_footer()

def customer_group_edit_view(h):
    """
    edit a new customer group
    """
    global html
    html = h
    
    group_id = html.var("group_id"); #get the user id from the url query
    company_name = html.var("company_name");

    common_elements = customer_common_elements(group=True)
    
    css_list = common_elements["css_list"]

    javascript_list = common_elements["javascript_list"]

    all_btn = common_elements["all_btn"]

    html.new_header("Edit Customer Group", "customer_group_management.py", all_btn, css_list, javascript_list)
    customer_string = """
    <div>
        <form action="customer_group_put_ajax.py" method="get" id="add_customer_group_form" 
                                                                    name="add_customer_group_form" autocomplete="on" >
            <div class="form-div">
                <table class="tt-table" cellspacing="0" cellpadding="0" width="100%">
                    <tr>
                    <th class="cell-title">Add Customer Group</th>
                    </tr>
                </table>
                <div class="form-body">
                    <div class="row-elem">
                        <label class="lbl lbl-big" for="group_name">Customer Company Name</label>
                        <input type="text" id="group_name" name="group_name" />
                    </div>
                    <div class="row-elem">
                        <label class="lbl lbl-big" for="company_telephone">Company Telephone</label>
                        <input type="text" id="company_telephone" name="company_telephone" title="Please Enter Company Name."/>
                    </div>
                    <div class="row-elem">
                        <label class="lbl lbl-big" for="company_fax">Company Fax</label>
                        <input type="text" id="company_fax" name="company_fax" title="Please Enter Fax information."/>
                    </div>
                    <div class="row-elem">
                        <label class="lbl lbl-big" for="company_website">Company Website</label>
                        <input type="text" id="company_website" name="company_website"/>
                    </div>
                    <div class="row-elem">
                        <label class="lbl lbl-big" for="company_sales_contact">Company Sales Contact</label>
                        <input type="text" id="company_sales_contact" name="company_sales_contact" />
                    </div>
                    <div class="row-elem">
                        <label class="lbl lbl-big" for="company_purchase_contact">Company Purchase Contact</label>
                        <input type="text" id="company_purchase_contact" name="company_purchase_contact"/>
                    </div>
                    <div class="row-elem">
                        <label class="lbl lbl-big" for="company_business">Company Business</label>
                        <select id='company_business' name='company_business'>
                            <option value="OEM">OEM</option>
                            <option value="VAR">VAR</option>
                            <option value="Distributor">Distributor</option>
                            <option value="Retailer">Retailer</option>
                            <option value="Reseller">Reseller</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div class="row-elem">
                        <label class="lbl lbl-big" for="company_business_type">Company Business Type</label>
                        <select id='company_business_type' name='company_business_type'>
                            <option value="Private">Personal</option>
                            <option value="Public">Public</option>
                        </select>
                    </div>
                    <div class="row-elem">
                        <label class="lbl lbl-big" for="company_sales_email">Company Sales Email</label>
                        <input type="text" id="company_sales_email" name="company_sales_email" />
                    </div>
                    <div class="row-elem">
                        <label class="lbl lbl-big" for="company_purchase_email">Company Purchase Email</label>
                        <input type="text" id="company_purchase_email" name="company_purchase_email" />
                    </div>
                    <div class="row-elem">
                        <label class="lbl lbl-big" for="company_reg_number">Company Registration Number</label>
                        <input type="text" id="company_reg_number" name="company_reg_number"/>
                    </div>
                    <div class="row-elem">
                        <label class="lbl lbl-big" for="company_vat_number">VAT Information</label>
                        <input type="text" id="company_vat_number" name="company_vat_number" />
                    </div>
                    <div class="row-elem">
                        <label class="lbl lbl-big" for="company_address">Company Address</label>
                        <textarea type="text" id="company_address" name="company_address" /> </textarea>
                    </div>
                </div>
            </div>
            <div class="form-div-footer">
                <button type="submit" class="yo-small yo-button"><span class="add">Save</span></button>
                <button type="reset" class="yo-small yo-button" id="close_add_user"><span class="cancel">Cancel</span></button>
            </div>
        </form>
    </div>
    """ 
    customer_string += """
        <script>
            put_customer_group_values("%s", "%s");
            post_customer_groups(action="put", group_id = "%s");
        </script>
    """ %(group_id, company_name, group_id)
    html.write(customer_string)
    html.new_footer()

def customer_group_get(group_id=None):
    """
    get all the customer groups
    """
    db_conn = DB_Conn()
    db = db_conn.db_connect()

    query = """
    SELECT 
        `group_id`,
        `group_name`,
        `description`,
        `timestamp`,
        `created_by`,
        `creation_time`,
        `is_deleted`,
        `updated_by`,
        `role_id`,
        `is_default`,
        `is_customer`,
        `company_name`,
        `company_address`,
        `company_telephone`,
        `company_fax`,
        `company_website`,
        `company_sales_contact`,
        `company_purchase_contact`,
        `company_business`,
        `company_business_type`,
        `company_sales_email`,
        `company_purchase_email`,
        `company_reg_number`,
        `company_vat_number` 
    FROM `groups` 
    WHERE `is_customer` = 1
    """

    if group_id:
        query += """
            AND `group_id` = \"%s\"
        """ % (group_id)

    group_details = None
    cursor = db.cursor()

    if cursor.execute(query) != 0:
        group_details = cursor.fetchall()

    cursor.close()
    db.close()

    return group_details

def customer_group_get_one(group_id):
    """
    get specific customer group
    """
    return customer_group_get(group_id)

def customer_group_get_related(group_id):
    """
    update multiple related groups
    """
    db_conn = DB_Conn()
    db = db_conn.db_connect()

    query = """
    SELECT 
        `group_id`,
        `group_name`,
        `description`,
        `timestamp`,
        `created_by`,
        `creation_time`,
        `is_deleted`,
        `updated_by`,
        `role_id`,
        `is_default`,
        `is_customer`,
        `company_name`,
        `company_address`,
        `company_telephone`,
        `company_fax`,
        `company_website`,
        `company_sales_contact`,
        `company_purchase_contact`,
        `company_business`,
        `company_business_type`,
        `company_sales_email`,
        `company_purchase_email`,
        `company_reg_number`,
        `company_vat_number` 
    FROM `groups` 
    WHERE `groups`.`company_name` = (
                                        SELECT `asshole`.`company_name` 
                                        FROM 
                                            (
                                                SELECT * 
                                                    FROM `groups` 
                                                    WHERE `group_id` = "%s"
                                            ) AS `asshole`
                                    )
    """ %(group_id)
    
    group_details = None
    cursor = db.cursor()

    if cursor.execute(query) != 0:
        group_details = cursor.fetchall()

    cursor.close()
    db.close()

    return group_details 

def customer_group_get_ajax(h):
    """
    get the list of customer groups
    """
    global html 
    html = h
    # `group_id`, [0]
    # `group_name`, [1]
    # `description`, [2]
    # `timestamp`, [3]
    # `created_by`, [4]
    # `creation_time`, [5]
    # `is_deleted`, [6]
    # `updated_by`, [7]
    # `role_id`, [8]
    # `is_default`, [9]
    # `is_customer`, [10]
    # `company_name`, [11]
    # `company_address`, [12]
    # `company_telephone`, [13]
    # `company_fax`, [14]
    # `company_website`, [15]
    # `company_sales_contact`, [16]
    # `company_purchase_contact`, [17]
    # `company_business`, [18]
    # `company_business_type`, [19]
    # `company_sales_email`, [20]
    # `company_purchase_email`, [21]
    # `company_reg_number`, [22]
    # `company_vat_number` [23]

    result = []
    c_group_list = customer_group_get()
    for group in c_group_list:
        group_list = list(group)
        if len (group_list):
            group_action = """
                    <a href="customer_group_edit_view.py?group_id=%s&company_name=%s">
                        <img class="host_opr" title="View Customer Group Details" src="images/new/info.png" alt="view"/>
                    </a>
                    &nbsp;
                    <a href="customer_group_edit_view.py?group_id=%s&company_name=%s">
                        <img class="host_opr" title="Edit Customer Group Details" src='images/new/edit.png' alt='edit'/>
                    </a>
                    &nbsp;
                    <a class="ajax_caller" href="customer_group_delete_ajax.py?group_id=%s">
                        <img class="host_opr" title="Edit Customer Group Details" src='images/new/delete.png' alt='delete'/>
                    </a>
                    """ %(group_list[0], group_list[11], group_list[0], group_list[11], group_list[0])
            result.append(
                [
                    group_list[1],
                    group_list[11],
                    group_list[12],
                    group_list[13],
                    group_list[15],
                    group_list[18],
                    group_list[22],
                    group_list[23],
                    group_list[16],
                    group_list[17],
                    group_action
                ]
            )
    html.write(json.dumps(result))

def customer_group_get_details_ajax(h):
    """

    """
    global html
    html = h
    group_id = html.var("group_id")
    c_group_detail = customer_group_get_one(group_id)[0]
    # `group_id`,
    # `group_name`,
    # `description`,
    # `timestamp`,
    # `created_by`,
    # `creation_time`,
    # `is_deleted`,
    # `updated_by`,
    # `role_id`,
    # `is_default`,
    # `is_customer`,
    # `company_name`,
    # `company_address`,
    # `company_telephone`,
    # `company_fax`,
    # `company_website`,
    # `company_sales_contact`,
    # `company_purchase_contact`,
    # `company_business`,
    # `company_business_type`,
    # `company_sales_email`,
    # `company_purchase_email`,
    # `company_reg_number`,
    # `company_vat_number` 
    result = {"success" : 0, "message" : "Customer Group Details Fetched Successfully"}
    group_details = {
        "group_id" : group_id,
        "group_name" : c_group_detail[1],
        "description" : c_group_detail[2],
        # "timestamp" : str(c_group_detail[3]),
        # "created_by" : c_group_detail[4],
        # "creation_time" : c_group_detail[5],
        # "is_deleted" : c_group_detail[6],
        # "updated_by" : c_group_detail[7],
        # "role_id" : c_group_detail[8],
        # "is_default" : c_group_detail[9] ,
        # "is_customer" : c_group_detail[10] ,
        "company_name" : c_group_detail[11],
        "company_address" : c_group_detail[12],
        "company_telephone" : c_group_detail[13],
        "company_fax" : c_group_detail[14],
        "company_website" : c_group_detail[15],
        "company_sales_contact" : c_group_detail[16],
        "company_purchase_contact" : c_group_detail[17],
        "company_business" : c_group_detail[18],
        "company_business_type" : c_group_detail[19],
        "company_sales_email" : c_group_detail[20],
        "company_purchase_email" : c_group_detail[21],
        "company_reg_number" : c_group_detail[22],
        "company_vat_number" : c_group_detail[23]
    }
    result["group_details"] = group_details

    html.write(json.dumps(result))

def customer_group_post_ajax(h):
    """
    call this function to add a new customer group
    """
    global html
    html = h

    ##
    #Created By
    ##
    created_by = html.req.session.get('username')
    if created_by is None:
        created_by = "SuperAdmin"    

    details_list = [
                'group_name',
                'company_name',
                'company_address',
                'company_telephone',
                'company_fax',
                'company_website',
                'company_sales_contact',
                'company_purchase_contact',
                'company_business',
                'company_business_type',
                'company_sales_email',
                'company_purchase_email',
                'company_reg_number',
                # 'created_by', put created by manually
                # 'is_customer',
                'company_vat_number',
                'description'
                ]
    group_details = {}
    group_details["created_by"] = created_by #created by what main user ?
    # group_details["group_id"] = uuid.uuid1() #user id is uuid
    # group_details["is_customer"] = 1 #yes this is a customer
    for details in details_list:
        if html.var(details) != None and len(html.var(details)) > 0:
            group_details[details] = html.var(details)
        else:
            group_details[details] = "unknown"

        if details == "company_name":
                group_details["company_name"] = group_details["group_name"]

    result = customer_group_post(group_details)
    html.write(json.dumps(result))
    pass

def customer_group_put_ajax(h):
    """
    """
    global html
    html = h

    details_list = [
                'group_name',
                'company_name',
                'company_address',
                'company_telephone',
                'company_fax',
                'company_website',
                'company_sales_contact',
                'company_purchase_contact',
                'company_business',
                'company_business_type',
                'company_sales_email',
                'company_purchase_email',
                'company_reg_number',
                # 'created_by', put created by manually
                # 'is_customer',
                'company_vat_number',
                'description'
            ]

    group_details = {}
    group_id = html.var("group_id")
    group_details["group_id"] = group_id

    updated_by = html.req.session.get('username')
    if updated_by is None:
        updated_by = "SuperAdmin"

    group_details["updated_by"] = updated_by

    for details in details_list:
        if html.var(details) != None and len(html.var(details)) > 0:
            group_details[details] = html.var(details)
        else:
            group_details[details] = "unknown"

        if details == "company_name":
                group_details["company_name"] = group_details["group_name"]

    result = customer_group_put(group_details)
    html.write(json.dumps(result))

def customer_group_delete_ajax(h):
    """"
    """
    global html
    html = h
    group_id = html.var("group_id")
    result = customer_group_delete(group_id)
    html.write(json.dumps(result))

##############################################################################
############################Customer Login ###################################

def customer_login_post(user_details):
    """
    prepare a system login for the customer
    """
    db_conn = DB_Conn()
    db = db_conn.db_connect()
    query = """
    INSERT INTO `user_login`
    (
        `user_login_id`,
        `user_id`,
        `user_name`,
        `password`,
        `timestamp`,
        `created_by`,
        `creation_time`,
        `is_deleted`,
        `updated_by`,
        `nms_id`,
        `change_password_date`,
        `failed_login_attempts`,
        `failed_login_time`
    ) 
    VALUES 
    (
        UUID(),
        \"%(user_id)s\", 
        \"%(user_name)s\", 
        SHA("%(password)s"), 
        '0000-00-00 00:00:00',
        \"%(created_by)s\",
        \"%(creation_time)s\",
        0,
        NULL,
        NULL,
        NOW(),
        0,
        '0000-00-00 00:00:00'
    )
    """ %(user_details)

    cursor = db.cursor()
    result = {"success" : 1, "message" : "Customer Login can not be created"}
    try:
        if cursor.execute(query):
            db.commit()
            result = {"success" : 0, "message" : "Customer Login created Successfully"}
    except Exception as e:
        result = {"success" : 1, "message" : "Customer Login can not be created. Error \"\'%s\'\" " % (e) }
    finally:
        cursor.close()
        db.close()

    return result

def customer_login_put(user_details):
    """
    prepare a system login for the customer
    """
    db_conn = DB_Conn()
    db = db_conn.db_connect()
    query = """
    UPDATE `user_login` 
    SET `old_password`= `password`, 
    `password` =  SHA('%(password)s'), 
    `change_password_date` = NOW() 
    WHERE `user_id` = \"%(user_id)s\"
    """ % (user_details)

    cursor = db.cursor()
    result = {"success" : 0, "message" : "Customer Login not updated"}
    try:
        if cursor.execute(query):
            db.commit()
            result = {"success" : 0, "message" : "Customer Login updated Successfully"}
    except Exception as e:
        result = {"success" : 1, "message" : "Customer Login can not be created. Error \"\'%s\'\" " % (e) }
    finally:
        cursor.close()
        db.close()

    return result

##############################################################################
###################Customer And Customer Groups Common########################

def customer_group_customer_widget():
    """
    seect widget for cutomer and customer group
    """
    widget = "<select id='groups' name='groups'>"

    all_groups = customer_group_get_all()
    for group in all_groups:
        group = list(group)
        widget += "<option value='%s'> %s </option>" %(group[0], group[1])
    widget += "</select>"
    return widget

def customer_group_customer_post(user_id, group_id):
    """
    post the relationship between customer and customer group
    """
    db_conn = DB_Conn()
    db = db_conn.db_connect()
    user_group_user_details = {}
    user_group_user_details["user_group_id"] = uuid.uuid1()
    user_group_user_details["user_id"] = user_id
    user_group_user_details["group_id"] = group_id

    query = """
    INSERT INTO `users_groups`
    (
        `user_group_id`, 
        `user_id`, 
        `group_id`
    ) 
    VALUES 
    (
        \"%(user_group_id)s\",
        \"%(user_id)s\",
        \"%(group_id)s\"
    )
    """ %(user_group_user_details)
    cursor = db.cursor()
    result = {"success" : 1, "message" : "Customer can not be added to the Group"}
    try:
        if cursor.execute(query):
            db.commit()
            result = {"success" : 0, "message" : "Customer added Successfully"}
    except Exception as e:
        result = {"success" : 1, "message" : "Customer can not be added to the Group. Error \"\'%s\'\" " % (e) }
    finally:
        cursor.close()
        db.close()
    return result

def customer_group_customer_put(user_id, group_id):
    """
    update the relationship between customer and customer group
    """
    db_conn = DB_Conn()
    db = db_conn.db_connect()

    user_group_user_details = {}
    user_group_user_details["user_id"] = user_id
    user_group_user_details["group_id"] = group_id

    query = """
    Update `users_groups`
    SET `group_id` = \"%(group_id)s\"
    WHERE `user_id` = \"%(user_id)s\" 
    """ %(user_group_user_details)
    cursor = db.cursor()
    result = {"success" : 0, "message" : "Customer's Group is not updated"}
    try:
        if cursor.execute(query):
            db.commit()
            result = {"success" : 0, "message" : "Customer updated Successfully"}
    except Exception as e:
        result = {"success" : 1, "message" : "Customer can not be updated in the Group. Error \"\'%s\'\" \
                            Query \"\'%s\'\" " % (e, query) }
    finally:
        cursor.close()
        db.close()
    return result
