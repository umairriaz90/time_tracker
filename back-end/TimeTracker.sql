-- MySQL dump 10.16  Distrib 10.2.13-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: TimeTracker
-- ------------------------------------------------------
-- Server version	10.2.13-MariaDB-10.2.13+maria~xenial-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `migration_versions`
--

DROP TABLE IF EXISTS `migration_versions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migration_versions` (
  `version` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migration_versions`
--

LOCK TABLES `migration_versions` WRITE;
/*!40000 ALTER TABLE `migration_versions` DISABLE KEYS */;
INSERT INTO `migration_versions` VALUES ('20180506040145'),('20180507182859'),('20180508014822'),('20180508032209'),('20180509010053');
/*!40000 ALTER TABLE `migration_versions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `task`
--

DROP TABLE IF EXISTS `task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `task` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `start_date` datetime NOT NULL,
  `finish_date` datetime DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `duration` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=231 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task`
--

LOCK TABLES `task` WRITE;
/*!40000 ALTER TABLE `task` DISABLE KEYS */;
INSERT INTO `task` VALUES (14,'kronique tyler','kroner chronic tyler','2018-05-09 10:34:43','2018-05-09 10:34:43','completed',156001),(16,'35 is an awesome track','whats the track name use shazam','2018-05-09 10:37:59','2018-05-09 10:39:13','completed',51701),(24,'new record','new record','2018-05-09 21:15:37','2018-05-09 21:16:20','completed',6901),(37,'chal btata hu','chalte hai hum phir','2018-05-10 00:06:17','2018-05-10 00:09:37','completed',163101),(39,'new task un named','spy mission invoked','2018-05-10 01:27:35','2018-05-10 01:28:50','completed',22101),(40,'test task1','test description','2018-05-10 01:28:50','2018-05-10 01:30:59','completed',12300),(50,'now it\'s working','really is it working ???','2018-05-10 02:14:09','2018-05-10 02:17:33','completed',133200),(56,'new name task name','acha description ','2018-05-10 03:33:12','2018-05-10 03:34:20','completed',11101),(176,'fixing my phone','get your phone fixed man','2018-10-05 12:20:22','2018-05-11 03:01:00','completed',280701),(181,'just woke up again','why do i sleep so much or may be i just love coding','2018-05-11 03:24:31','2018-05-11 08:49:04','completed',18756291),(198,'forging','devil spell','2018-05-11 10:16:43','2018-05-11 10:23:35','completed',63502),(217,'sdlfkjdslfkj','sdlfkjsdlkfjlsdkfjljk','2018-05-11 11:07:48','2018-05-11 11:09:48','completed',3601),(230,NULL,'null','2018-05-11 12:55:22','2018-05-11 12:57:39','pending',0);
/*!40000 ALTER TABLE `task` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trackedtime`
--

DROP TABLE IF EXISTS `trackedtime`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `trackedtime` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(250) COLLATE utf8mb4_unicode_ci NOT NULL,
  `duration` bigint(20) NOT NULL,
  `submitdate` date DEFAULT NULL,
  `submitdone` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=114 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trackedtime`
--

LOCK TABLES `trackedtime` WRITE;
/*!40000 ALTER TABLE `trackedtime` DISABLE KEYS */;
INSERT INTO `trackedtime` VALUES (1,'testing',43600,'2018-05-06',1),(2,'UI interface',47200,'2018-05-06',1),(3,'Java service',149600,'2018-05-06',1),(4,'joker Again !',193800,'2018-05-06',1),(5,'khan ui ODONOMY',1701,'2018-05-07',1),(6,'monday',3001,'2018-05-07',1),(7,'new task sleep party people',219800,'2018-05-07',1),(8,'',219800,'2018-05-07',1),(9,'sleep party people ',109901,'2018-05-07',1),(10,'',77001,'2018-05-07',1),(11,'mandatory to fill in',77001,'2018-05-07',1),(12,'I love rock music',89301,'2018-05-07',1),(13,'karaya ka bhara',89301,'2018-05-07',1),(14,'new one so the tracker is already running and its counting',42802,'2018-05-07',1),(15,'again listening to patience but I have got no patience',83801,'2018-05-07',1),(16,'jolly mode',89301,'2018-05-07',1),(17,'anda muk gaye ',64601,'2018-05-07',1),(18,'chasdlkfjdslkfjldskjfldsjlfjdslkfjlkdsjf',114299,'2018-05-07',1),(19,'my jornam is not a mornam dslfkjlsdkfj',63600,NULL,0),(20,'',0,NULL,0),(21,'',0,NULL,0),(22,'',0,NULL,0),(23,'',89301,NULL,0),(24,'',89301,NULL,0),(25,'',89301,NULL,0),(26,'',89301,NULL,0),(27,'',89301,NULL,0),(28,'',89301,NULL,0),(29,'',89301,NULL,0),(30,'',89301,NULL,0),(31,'',89301,NULL,0),(32,'',0,NULL,0),(33,'',0,NULL,0),(34,'',0,NULL,0),(35,'',89301,NULL,0),(36,'',89301,NULL,0),(37,'',0,NULL,0),(38,'',89301,NULL,0),(39,'',0,NULL,0),(40,'',0,NULL,0),(41,'',0,NULL,0),(42,'',106901,NULL,0),(43,'',106901,NULL,0),(44,'',106901,NULL,0),(45,'',106901,NULL,0),(46,'',106901,NULL,0),(47,'',106901,NULL,0),(48,'',0,NULL,0),(49,'',106901,NULL,0),(50,'',106901,NULL,0),(51,'',106901,NULL,0),(52,'',0,NULL,0),(53,'',0,NULL,0),(54,'',0,NULL,0),(55,'moron',106901,NULL,0),(56,'',106901,NULL,0),(57,'',106901,NULL,0),(58,'',0,NULL,0),(59,'dark hat linux',89301,NULL,0),(60,'',0,NULL,0),(61,'',0,NULL,0),(62,'',0,NULL,0),(63,'',0,NULL,0),(64,'this is not my song but it sounds like rock music ',89415,'2018-05-07',1),(65,'',0,NULL,0),(66,'it must set the counter to zero ',94523,'2018-05-07',1),(67,'',0,NULL,0),(68,'if you fall apart it was a really did was ko',89301,'2018-05-07',1),(69,'',92403,NULL,0),(70,'',0,NULL,0),(71,'',0,NULL,0),(72,'',0,NULL,0),(73,'joker description',63600,NULL,0),(74,'',0,NULL,0),(75,'joker description',63600,NULL,0),(76,'',0,NULL,0),(77,'jlkoioioioioioioioioioioioiioioioioioioioioioioioioioioioioi',63600,NULL,0),(78,'',0,NULL,0),(79,'',0,NULL,0),(80,'',0,NULL,0),(81,'ioioioioioioioioioioioioi',66705,NULL,0),(82,'',0,NULL,0),(83,'oioioioioioioioioioioioioioioioioioioioioioioioioioioioioioioioi',85908,NULL,0),(84,'',0,NULL,0),(85,'',0,NULL,0),(86,'',0,NULL,0),(87,'',0,NULL,0),(88,'',0,NULL,0),(89,'joker nachooo libre',63600,NULL,0),(90,'',0,NULL,0),(91,'uiopmdslksdlfkdsflkjdsfkldsflkdsfslfkjdsfdskf',63600,NULL,0),(92,'',0,NULL,0),(93,'uiopioioiuoiuoiuoiuoiuoioiuoiuoiuoiuo',63600,NULL,0),(94,'',0,NULL,0),(95,'sdlfkjsdlkfjldskfjlskdjflkds',65501,NULL,0),(96,'',0,NULL,0),(97,'',0,NULL,0),(98,'',0,NULL,0),(99,'joker is a Korean guy',63600,NULL,0),(100,'',0,NULL,0),(101,'uiopiopiopiopiopiopiooioioioioioioioioioioioioioioioioioioioioioioioioioioi',63600,NULL,0),(102,'',0,NULL,0),(103,'lsdkfjldskfjldskfjlkdsfjldskfjldsfjldsfkjldsfkjldsfkjldskfjldskfjldskfjldskfjdslfkjdslfkjdslfkjdlsfkjdsfkl',63600,NULL,0),(104,'',0,NULL,0),(105,'ioioioioioioioioioioioioioioioioioioioioioioioioioioioioioioioioioioioioioioi',63600,NULL,0),(106,'',0,NULL,0),(107,'',63600,NULL,0),(108,'',0,NULL,0),(109,'junior full stack developer ',63600,NULL,0),(110,'',0,NULL,0),(111,'ui autonomy',63600,NULL,0),(112,'',0,NULL,0),(113,'',0,NULL,0);
/*!40000 ALTER TABLE `trackedtime` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-05-11 13:00:13
