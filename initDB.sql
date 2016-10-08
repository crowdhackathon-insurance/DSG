CREATE TABLE `raw_scores` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `username` varchar(40) NOT NULL,
 `year` int(11) NOT NULL,
 `month` int(11) NOT NULL,
 `gen_score` int(11) NOT NULL,
 `placeholder1` int(11) NOT NULL,
 `placeholder2` int(11) NOT NULL,
 `placeholder3` int(11) NOT NULL,
 PRIMARY KEY (`id`)
);

CREATE TABLE `rewards` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `name` text NOT NULL,
 `url` text NOT NULL,
 `thumb` text NOT NULL,
 `rank` int(11) NOT NULL,
 `claimed_by` int(11) DEFAULT NULL,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8