/*
Navicat MySQL Data Transfer

Source Server         : book
Source Server Version : 50617
Source Host           : localhost:3306
Source Database       : a_book

Target Server Type    : MYSQL
Target Server Version : 50617
File Encoding         : 65001

Date: 2019-01-13 13:36:44
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `book`
-- ----------------------------
DROP TABLE IF EXISTS `book`;
CREATE TABLE `book` (
  `ISBN` varchar(20) NOT NULL,
  `bookName` varchar(40) CHARACTER SET utf8 DEFAULT NULL,
  `bookAuthor` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  `bookMain` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `bookPubish` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  `bookPrice` float(6,2) DEFAULT NULL,
  `pubishDate` datetime DEFAULT NULL,
  `bookState` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  `addDate` datetime DEFAULT NULL,
  `sortId` varchar(20) DEFAULT NULL,
  `managerId` int(11) DEFAULT NULL,
  PRIMARY KEY (`ISBN`),
  KEY `sortId` (`sortId`),
  KEY `managerId` (`managerId`),
  CONSTRAINT `book_ibfk_1` FOREIGN KEY (`sortId`) REFERENCES `booksorts` (`sortId`),
  CONSTRAINT `book_ibfk_2` FOREIGN KEY (`managerId`) REFERENCES `manager` (`managerId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of book
-- ----------------------------
INSERT INTO `book` VALUES ('1', '三国演义', '吴承恩', '桃园三结义', null, '0.00', '0000-00-00 00:00:00', null, '0000-00-00 00:00:00', '1', null);
INSERT INTO `book` VALUES ('2', '红楼梦', '曹雪芹', '贾宝玉', null, '31.00', '0000-00-00 00:00:00', null, '0000-00-00 00:00:00', '1', null);
INSERT INTO `book` VALUES ('3', '水浒传', '施耐庵', '108位好汉', null, '20.00', '0000-00-00 00:00:00', null, '0000-00-00 00:00:00', '1', null);
INSERT INTO `book` VALUES ('4', '西游记', '吴承恩', '西天取经', null, '12.00', '2017-07-03 16:00:00', null, '2017-11-10 16:00:00', '1', null);
INSERT INTO `book` VALUES ('5', 'java', '淘宝团队', '后台宝书', null, '55.00', '2018-10-31 16:00:00', null, '2018-12-31 16:00:00', '4', null);
INSERT INTO `book` VALUES ('6', '小时代', '郭敬明', '都市爱情故事', null, '20.00', '2011-01-01 00:00:00', null, '2014-04-04 00:00:00', '2', null);
INSERT INTO `book` VALUES ('7', '数据库概论', '王珊', '数据库教材', null, '60.00', '2008-08-08 00:00:00', null, '2011-04-07 00:00:00', '3', null);
INSERT INTO `book` VALUES ('8', '博弈论', '张成科', '博弈论上课教材', null, '40.00', '2017-07-07 00:00:00', null, '2020-01-01 00:00:00', '3', null);
INSERT INTO `book` VALUES ('9', '测试', '我', '', null, '0.00', '0000-00-00 00:00:00', null, '0000-00-00 00:00:00', '3', null);

-- ----------------------------
-- Table structure for `booksorts`
-- ----------------------------
DROP TABLE IF EXISTS `booksorts`;
CREATE TABLE `booksorts` (
  `sortId` varchar(20) NOT NULL,
  `sortName` varchar(20) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`sortId`),
  UNIQUE KEY `sortName` (`sortName`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of booksorts
-- ----------------------------
INSERT INTO `booksorts` VALUES ('4', '技术');
INSERT INTO `booksorts` VALUES ('3', '教材');
INSERT INTO `booksorts` VALUES ('1', '文学');
INSERT INTO `booksorts` VALUES ('2', '青春');

-- ----------------------------
-- Table structure for `borrow`
-- ----------------------------
DROP TABLE IF EXISTS `borrow`;
CREATE TABLE `borrow` (
  `studentId` int(11) NOT NULL DEFAULT '0',
  `ISBN` varchar(20) NOT NULL DEFAULT '',
  `borrowDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `returnDate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`studentId`,`ISBN`),
  KEY `ISBN` (`ISBN`),
  CONSTRAINT `borrow_ibfk_1` FOREIGN KEY (`studentId`) REFERENCES `student` (`studentId`),
  CONSTRAINT `borrow_ibfk_2` FOREIGN KEY (`ISBN`) REFERENCES `book` (`ISBN`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of borrow
-- ----------------------------
INSERT INTO `borrow` VALUES ('1', '1', '2019-01-09 22:32:38', '2019-01-15 23:09:35');
INSERT INTO `borrow` VALUES ('1', '2', '2018-01-01 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `borrow` VALUES ('1', '6', '2019-01-09 22:32:38', '0000-00-00 00:00:00');
INSERT INTO `borrow` VALUES ('2', '3', '2018-08-07 08:00:00', '2019-01-15 00:00:00');

-- ----------------------------
-- Table structure for `manager`
-- ----------------------------
DROP TABLE IF EXISTS `manager`;
CREATE TABLE `manager` (
  `managerId` int(11) NOT NULL AUTO_INCREMENT,
  `managerName` varchar(20) CHARACTER SET utf8 NOT NULL,
  `managerSex` enum('男','女') CHARACTER SET utf8 DEFAULT NULL,
  `managerTel` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  `managerPassword` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`managerId`),
  UNIQUE KEY `managerName` (`managerName`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of manager
-- ----------------------------
INSERT INTO `manager` VALUES ('1', 'admin', '女', '13142517454', '123');
INSERT INTO `manager` VALUES ('2', 'manager', '男', '12345679', '456');
INSERT INTO `manager` VALUES ('3', 'abc', '男', '1234584', '789');
INSERT INTO `manager` VALUES ('4', 'baby', '女', '', '425');
INSERT INTO `manager` VALUES ('5', '石头', '男', '1111', '456');
INSERT INTO `manager` VALUES ('6', '小迪', '女', '456', '421');
INSERT INTO `manager` VALUES ('7', '白敬亭', '男', '1245124', '123');
INSERT INTO `manager` VALUES ('8', 'cc', '男', '1112', '111');

-- ----------------------------
-- Table structure for `student`
-- ----------------------------
DROP TABLE IF EXISTS `student`;
CREATE TABLE `student` (
  `studentId` int(11) NOT NULL AUTO_INCREMENT,
  `studentName` varchar(20) CHARACTER SET utf8 NOT NULL,
  `studentAge` int(11) DEFAULT NULL,
  `studentSex` enum('男','女') CHARACTER SET utf8 DEFAULT NULL,
  `studentSdept` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  `studentGroup` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  `studentPassword` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`studentId`),
  UNIQUE KEY `studentName` (`studentName`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of student
-- ----------------------------
INSERT INTO `student` VALUES ('1', 'xmm', '20', '男', '信管', '16级', '456');
INSERT INTO `student` VALUES ('2', 'aa', '21', '女', '电商', ' 17级', '456');
INSERT INTO `student` VALUES ('3', '片寄凉太', '20', '男', '工商管理', '18级', '456');
INSERT INTO `student` VALUES ('4', 'cc', '16', '男', '信管', '17级', null);
INSERT INTO `student` VALUES ('5', 'kimi', '21', '男', '', '', null);
INSERT INTO `student` VALUES ('6', 'cindy', '20', '女', '应数', '信技', null);
INSERT INTO `student` VALUES ('7', '天天', '12', '女', '', '', '1');
INSERT INTO `student` VALUES ('8', 'carry', '21', '男', '', '', null);
