
/* Alter host table */
ALTER TABLE  `hosts` ADD  `device_path` VARCHAR( 128 ) NULL DEFAULT NULL ,
ADD  `number_of_ports` INT NULL DEFAULT  '0', ADD  `phone_no` VARCHAR(16) NULL DEFAULT NULL;

/* Insert nms Instance name*/
INSERT INTO `nms_instance` (`nms_id`, `nms_name`, `longitude`, `latitude`, `timestamp`) VALUES ('e4674eeb-a628-11e3-b0a3-08002745f64f', 'nms', '76.77898', '26.1756852', CURRENT_TIMESTAMP);

/* Insert new device type 'SB-Smart' */
INSERT INTO `device_type` (`device_type_id`, `device_name`, `sdm_discovery_id`, `sdm_discovery_value`, `vnl_discovery_value`, `ping_discovery_value`, `snmp_discovery_value`, `upnp_discovery_value`, `icon_name`, `mib_name`, `mib_path`, `table_prefix`, `is_generic`, `is_deleted`, `sequence`) VALUES ('sbs', 'SB-Smart', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, 'sbs_', '0', '0', '5');

/* Insert service details */
INSERT INTO `service_templates` (`service_template_id`, `device_type_id`, `template_name`, `service_description`, `check_command`, `max_check_attempts`, `normal_check_interval`, `retry_check_interval`, `remark`, `is_deleted`) VALUES ('08528079-a694-11e3-904d-08002745f64f', 'sbs', 'SB-Smart Monitoring', 'SB-Smart Monitoring', 'sbsmart_service', '5', '1', '1', 'To get data from SB-Smart API', '0');

/* insert ivis device type */
INSERT INTO `nms`.`device_type` (`device_type_id`, `device_name`, `sdm_discovery_id`, `sdm_discovery_value`, `vnl_discovery_value`, `ping_discovery_value`, `snmp_discovery_value`, `upnp_discovery_value`, `icon_name`, `mib_name`, `mib_path`, `table_prefix`, `is_generic`, `is_deleted`, `sequence`) VALUES ('ivis', 'Ivis', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, 'ivis', '1', '0', '6');

/* device type icon change for ivis */
UPDATE  `nms`.`device_type` SET  `icon_name` =  'ivis.png' WHERE  `device_type`.`device_type_id` =  'ivis';

/* update localhost nms id */
UPDATE  `nms`.`hosts` SET  `nms_id` =  'e4674eeb-a628-11e3-b0a3-08002745f64f' WHERE  `hosts`.`host_id` =1;

/* Add Service Parameter Table*/
CREATE TABLE IF NOT EXISTS `service_parameter` (
  `service_parameter_id` int(8) NOT NULL AUTO_INCREMENT,
  `device_type_id` varchar(16) NOT NULL,
  `parameter_name` varchar(32) DEFAULT NULL,
  `parameter_index` int(8) DEFAULT NULL,
  `parameter_type` varchar(16) DEFAULT NULL,
  `parameter_unit` varchar(8) DEFAULT NULL,
  `min_value` varchar(32) DEFAULT NULL,
  `max_value` varchar(32) DEFAULT NULL,
  `query_param` varchar(8) DEFAULT NULL,
  `is_active` smallint(6) DEFAULT NULL,
  PRIMARY KEY (`service_parameter_id`),
  KEY `device_type_id` (`device_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

ALTER TABLE `service_parameter`
  ADD CONSTRAINT `service_parameter_ibfk_1` FOREIGN KEY (`device_type_id`) REFERENCES `device_type` (`device_type_id`) ON DELETE CASCADE ON UPDATE CASCADE;


/* Insert Parameter Data */
INSERT INTO `service_parameter` (`service_parameter_id`, `device_type_id`, `parameter_name`, `parameter_index`, `parameter_type`, `min_value`, `max_value`, `query_param`, `is_active`) VALUES ('1', 'sbs', 'Temperature', '1', 'float', '0', '100', 't', '1');
INSERT INTO `service_parameter` (`service_parameter_id`, `device_type_id`, `parameter_name`, `parameter_index`, `parameter_type`, `min_value`, `max_value`, `query_param`, `is_active`) VALUES ('2', 'sbs', 'Humidity', '2', 'float', '0', '100', 'h', '1');
INSERT INTO `service_parameter` (`service_parameter_id`, `device_type_id`, `parameter_name`, `parameter_index`, `parameter_type`, `min_value`, `max_value`, `query_param`, `is_active`) VALUES ('3', 'sbs', 'Analog-1', '3', 'float', null, null, 'a1', '1');
INSERT INTO `service_parameter` (`service_parameter_id`, `device_type_id`, `parameter_name`, `parameter_index`, `parameter_type`, `min_value`, `max_value`, `query_param`, `is_active`) VALUES ('4', 'sbs', 'Analog-2', '4', 'float', null, null, 'a2', '1');
INSERT INTO `service_parameter` (`service_parameter_id`, `device_type_id`, `parameter_name`, `parameter_index`, `parameter_type`, `min_value`, `max_value`, `query_param`, `is_active`) VALUES ('5', 'sbs', 'Analog-3', '5', 'float', null, '100', 'a3', '1');
INSERT INTO `service_parameter` (`service_parameter_id`, `device_type_id`, `parameter_name`, `parameter_index`, `parameter_type`, `min_value`, `max_value`, `query_param`, `is_active`) VALUES ('6', 'sbs', 'Analog-4', '6', 'float', null, '100', 'a4', '1');
INSERT INTO `service_parameter` (`service_parameter_id`, `device_type_id`, `parameter_name`, `parameter_index`, `parameter_type`, `min_value`, `max_value`, `query_param`, `is_active`) VALUES ('7', 'sbs', 'Digtal-1', '7', 'string', null, '100', 'd1', '1');
INSERT INTO `service_parameter` (`service_parameter_id`, `device_type_id`, `parameter_name`, `parameter_index`, `parameter_type`, `min_value`, `max_value`, `query_param`, `is_active`) VALUES ('8', 'sbs', 'Digtal-2', '8', 'string', null, '100', 'd2', '1');
INSERT INTO `service_parameter` (`service_parameter_id`, `device_type_id`, `parameter_name`, `parameter_index`, `parameter_type`, `min_value`, `max_value`, `query_param`, `is_active`) VALUES ('9', 'sbs', 'Digtal-3', '9', 'string', null, '100', 'd3', '1');
INSERT INTO `service_parameter` (`service_parameter_id`, `device_type_id`, `parameter_name`, `parameter_index`, `parameter_type`, `min_value`, `max_value`, `query_param`, `is_active`) VALUES ('10', 'sbs', 'Digtal-4', '10', 'string', null, '100', 'd4', '1');
INSERT INTO `service_parameter` (`service_parameter_id`, `device_type_id`, `parameter_name`, `parameter_index`, `parameter_type`, `min_value`, `max_value`, `query_param`, `is_active`) VALUES ('11', 'sbs', 'Phase-R (Voltage)', '11', 'float', null, null, 'prv', '1');
INSERT INTO `service_parameter` (`service_parameter_id`, `device_type_id`, `parameter_name`, `parameter_index`, `parameter_type`, `min_value`, `max_value`, `query_param`, `is_active`) VALUES ('12', 'sbs', 'Phase-R (Current)', '12', 'float', null, null, 'prc', '1');
INSERT INTO `service_parameter` (`service_parameter_id`, `device_type_id`, `parameter_name`, `parameter_index`, `parameter_type`, `min_value`, `max_value`, `query_param`, `is_active`) VALUES ('13', 'sbs', 'Phase-R (Enrgy)', '13', 'float', null, null, 'pre', '1');
INSERT INTO `service_parameter` (`service_parameter_id`, `device_type_id`, `parameter_name`, `parameter_index`, `parameter_type`, `min_value`, `max_value`, `query_param`, `is_active`) VALUES ('14', 'sbs', 'Phase-B (Voltage)', '14', 'float', null, null, 'pbv', '1');
INSERT INTO `service_parameter` (`service_parameter_id`, `device_type_id`, `parameter_name`, `parameter_index`, `parameter_type`, `min_value`, `max_value`, `query_param`, `is_active`) VALUES ('15', 'sbs', 'Phase-B (Current)', '15', 'float', null, null, 'pbc', '1');
INSERT INTO `service_parameter` (`service_parameter_id`, `device_type_id`, `parameter_name`, `parameter_index`, `parameter_type`, `min_value`, `max_value`, `query_param`, `is_active`) VALUES ('16', 'sbs', 'Phase-B (Enrgy)', '16', 'float', null, null, 'pbe', '1');
INSERT INTO `service_parameter` (`service_parameter_id`, `device_type_id`, `parameter_name`, `parameter_index`, `parameter_type`, `min_value`, `max_value`, `query_param`, `is_active`) VALUES ('17', 'sbs', 'Phase-Y (Voltage)', '17', 'float', null, null, 'pyv', '1');
INSERT INTO `service_parameter` (`service_parameter_id`, `device_type_id`, `parameter_name`, `parameter_index`, `parameter_type`, `min_value`, `max_value`, `query_param`, `is_active`) VALUES ('18', 'sbs', 'Phase-Y (Current)', '18', 'float', null, null, 'pyc', '1');
INSERT INTO `service_parameter` (`service_parameter_id`, `device_type_id`, `parameter_name`, `parameter_index`, `parameter_type`, `min_value`, `max_value`, `query_param`, `is_active`) VALUES ('19', 'sbs', 'Phase-Y (Enrgy)', '19', 'float', null, null, 'pye', '1');

/* Add Host Service Parameter Table*/
CREATE TABLE IF NOT EXISTS `host_service_parameter` (
  `host_service_parameter_id` int(8) NOT NULL AUTO_INCREMENT,
  `host_id` int(10) unsigned NOT NULL,
  `service_parameter_id` int(8) NOT NULL,
  `is_active` smallint(6) DEFAULT NULL,
  PRIMARY KEY (`host_service_parameter_id`),
  KEY `host_id` (`host_id`),
  KEY `service_parameter_id` (`service_parameter_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

ALTER TABLE `host_service_parameter`
  ADD CONSTRAINT `host_service_parameter_ibfk_2` FOREIGN KEY (`host_id`) REFERENCES `hosts` (`host_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `host_service_parameter_ibfk_1` FOREIGN KEY (`service_parameter_id`) REFERENCES `service_parameter` (`service_parameter_id`) ON DELETE CASCADE ON UPDATE CASCADE;


/* host service parameter data */
CREATE TABLE IF NOT EXISTS `host_service_parameter_data` (
  `host_service_parameter_data_id` int(16) unsigned NOT NULL,
  `host_id` int(10) unsigned NOT NULL,
  `service_data` varchar(128) DEFAULT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`host_service_parameter_data_id`),
  KEY `host_id` (`host_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;


ALTER TABLE `host_service_parameter_data`
  ADD CONSTRAINT `host_service_parameter_data_ibfk_1` FOREIGN KEY (`host_id`) REFERENCES `hosts` (`host_id`) ON DELETE CASCADE ON UPDATE CASCADE;

/* host service details */
CREATE TABLE IF NOT EXISTS `host_service_details` (
  `host_service_details_id` int(16) unsigned NOT NULL AUTO_INCREMENT,
  `host_id` int(10) unsigned NOT NULL,
  `username` varchar(64) DEFAULT NULL,
  `password` varchar(64) DEFAULT NULL,
  `user_id` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`host_service_details_id`),
  KEY `host_id` (`host_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

ALTER TABLE `host_service_details`
  ADD CONSTRAINT `host_service_details_ibfk_1` FOREIGN KEY (`host_id`) REFERENCES `hosts` (`host_id`) ON DELETE CASCADE ON UPDATE CASCADE;

/* to manage relay status */
ALTER TABLE  `host_service_details` ADD  `service_status` VARCHAR( 128 ) NULL DEFAULT NULL;

/* to manage min/max values */
ALTER TABLE  `host_service_parameter` ADD  `min_value` VARCHAR( 32 ) NULL DEFAULT NULL ,
ADD  `max_value` VARCHAR( 32 ) NULL DEFAULT NULL ,
ADD  `min_arm` VARCHAR( 16 ) NULL DEFAULT NULL ,
ADD  `max_arm` VARCHAR( 16 ) NULL DEFAULT NULL;

