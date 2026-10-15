CREATE DATABASE `web2`
CHARACTER SET utf8 COLLATE utf8_general_ci;

USE `web2`;

CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `firstname` varchar(45) NOT NULL default '',
  `lastname` varchar(45) NOT NULL default '',
  `login` varchar(12) NOT NULL default '',
  `password` varchar(40) NOT NULL default '',
  PRIMARY KEY  (`id`)
)
ENGINE = MYISAM
CHARACTER SET utf8 COLLATE utf8_general_ci;

INSERT INTO `users` (`id`,`firstname`,`lastname`,`login`,`password`) VALUES
 (1,'First1','Last1','Login1',sha1('login1')),
 (2,'First2','Last2','Login2',sha1('login2')),
 (3,'First3','Last3','Login3',sha1('login3')),
 (4,'First4','Last4','Login4',sha1('login4')),
 (5,'First5','Last5','Login5',sha1('login5'));
