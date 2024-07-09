-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: examination
-- ------------------------------------------------------
-- Server version	8.0.37

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `teacher`
--

DROP TABLE IF EXISTS `teacher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teacher` (
  `teacher_id` int NOT NULL,
  `Fname` varchar(50) DEFAULT NULL,
  `Minit` varchar(50) DEFAULT NULL,
  `Lname` varchar(50) DEFAULT NULL,
  `e_mail` varchar(100) DEFAULT NULL,
  `Pnumber` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`teacher_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher`
--

LOCK TABLES `teacher` WRITE;
/*!40000 ALTER TABLE `teacher` DISABLE KEYS */;
INSERT INTO `teacher` VALUES (1,'Taffy',NULL,'Braund','gbraund0@friendfeed.com','583-570-6954'),(2,'Faunie',NULL,'Doul','fdoul1@goo.gl','227-656-3313'),(3,'Rhianon',NULL,'Boylund','hboylund2@nasa.gov','430-230-6272'),(4,'Linnie',NULL,'Huitson','shuitson3@drupal.org','693-488-0286'),(5,'Lyndsay',NULL,'Sauven','bsauven4@ask.com','403-812-9504'),(6,'Sonni','Penny','Friar','pfriar5@jimdo.com','694-238-4286'),(7,'Barrett',NULL,'Mangeney','pmangeney6@google.com.br','482-767-6147'),(8,'Ringo',NULL,'Morriss','smorriss7@europa.eu','588-556-5739'),(9,'Ramsey','Harri','Swalwel','hswalwel8@mapquest.com','359-871-3124'),(10,'Jacynth',NULL,'Belamy','ebelamy9@feedburner.com','144-861-7084'),(11,'Zebadiah','Norri','Jopling','njoplinga@sohu.com','832-418-0238'),(12,'Tiebout',NULL,'Tregonna','ttregonnab@ovh.net','603-244-4179'),(13,'Henka',NULL,'Bartlet','mbartletc@dion.ne.jp','353-393-4377'),(14,'Roselin',NULL,'Audrey','aaudreyd@intel.com','211-735-1932'),(15,'Dee dee',NULL,'Torricina','ftorricinae@topsy.com','114-925-4264'),(16,'Barron','Merrill','Purdy','mpurdyf@purevolume.com','505-121-9692'),(17,'Mabel','Alford','Player','aplayerg@liveinternet.ru','539-904-9280'),(18,'Britt',NULL,'Rubinovitsch','srubinovitschh@yelp.com','103-797-1655'),(19,'Lind','Thebault','Van Halen','tvanhaleni@bandcamp.com','536-806-8686'),(20,'Dale','Steffie','Curgenven','scurgenvenj@illinois.edu','507-884-0606'),(21,'Denis','Forrester','Gomby','fgombyk@studiopress.com','760-268-3002'),(22,'Antons',NULL,'Alenichev','malenichevl@posterous.com','155-791-3381'),(23,'Julian',NULL,'Tregale','ctregalem@about.me','775-611-0554'),(24,'Zorana',NULL,'Timmis','atimmisn@house.gov','701-346-6458'),(25,'Kenon',NULL,'Whellans','twhellanso@businessweek.com','218-586-3208'),(26,'Gwenore',NULL,'Gierardi','mgierardip@geocities.com','927-603-7555'),(27,'Michaella',NULL,'Burford','aburfordq@usgs.gov','534-547-1024'),(28,'Briny','Patrizia','Sammon','psammonr@artisteer.com','278-291-6500'),(29,'Miguela','Norry','Wink','nwinks@howstuffworks.com','929-633-1166'),(30,'Audrie',NULL,'Winship','rwinshipt@adobe.com','252-268-1644');
/*!40000 ALTER TABLE `teacher` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-28 21:03:24
