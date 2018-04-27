/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50716
Source Host           : localhost:3306
Source Database       : db_blog

Target Server Type    : MYSQL
Target Server Version : 50716
File Encoding         : 65001

Date: 2018-04-27 20:09:10
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `onethink_users`
-- ----------------------------
DROP TABLE IF EXISTS `onethink_users`;
CREATE TABLE `onethink_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `userpass` varchar(50) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `imgurl` varchar(200) DEFAULT NULL,
  `device` varchar(10) DEFAULT NULL,
  `createAt` varchar(20) DEFAULT NULL,
  `updateAt` varchar(20) DEFAULT NULL,
  `state` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of onethink_users
-- ----------------------------
INSERT INTO `onethink_users` VALUES ('1', 'machine', 'e10adc3949ba59abbe56e057f20f883e', '1724554570@qq.com', '', '', '1524822384', '1524822384', '1');
