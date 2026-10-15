CREATE DATABASE IF NOT EXISTS `exercise`
CHARACTER SET utf8 COLLATE utf8_general_ci;

USE `exercise`;

CREATE TABLE `employee` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `name` varchar(45) NOT NULL default '',
  `address` varchar(70) NOT NULL default '',
  `age` int NOT NULL,
  PRIMARY KEY (`id`)
)
ENGINE = MYISAM
CHARACTER SET utf8 COLLATE utf8_general_ci;

INSERT INTO `employee` (`name`, `address`, `age`) VALUES
('Mark Smith', 'Debrecen', 35),
('Eva Watson', 'Szeged', 20),
('Tom Hurt', 'Budapest', 23);
