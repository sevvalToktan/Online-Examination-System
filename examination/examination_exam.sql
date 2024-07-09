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
-- Table structure for table `exam`
--

DROP TABLE IF EXISTS `exam`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exam` (
  `exam_id` int NOT NULL,
  `date` date DEFAULT NULL,
  `subject` varchar(50) DEFAULT NULL,
  `time` varchar(50) DEFAULT NULL,
  `Duration` int DEFAULT NULL,
  PRIMARY KEY (`exam_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exam`
--

LOCK TABLES `exam` WRITE;
/*!40000 ALTER TABLE `exam` DISABLE KEYS */;
INSERT INTO `exam` VALUES (1,'2024-06-04','Mathematics for Beginners','11:15 PM',90),(2,'2024-06-08','Literature Analysis','11:23 AM',120),(3,'2024-06-10','History of Art','3:08 AM',90),(4,'2024-06-04','Computer Science Fundamentals','9:24 AM',60),(5,'2024-06-06','Literature Analysis','9:32 AM',90),(6,'2024-06-11','History of Art','4:03 AM',60),(7,'2024-06-03','History of Art','1:33 AM',90),(8,'2024-06-12','Mathematics for Beginners','8:03 AM',90),(9,'2024-06-05','History of Art','7:28 PM',90),(10,'2024-06-06','Introduction to Biology','3:34 AM',150),(11,'2024-06-02','History of Art','1:44 AM',90),(12,'2024-06-03','Computer Science Fundamentals','9:42 PM',60),(13,'2024-06-08','Mathematics for Beginners','1:12 PM',60),(14,'2024-06-11','History of Art','11:07 AM',150),(15,'2024-06-09','Computer Science Fundamentals','9:44 PM',90),(16,'2024-06-11','Computer Science Fundamentals','2:00 PM',90),(17,'2024-06-05','Literature Analysis','12:16 PM',90),(18,'2024-06-03','Introduction to Biology','12:24 PM',150),(19,'2024-06-06','Literature Analysis','6:51 AM',90),(20,'2024-06-04','Mathematics for Beginners','10:01 PM',60),(21,'2024-06-11','Literature Analysis','2:52 AM',90),(22,'2024-06-03','Literature Analysis','12:32 AM',90),(23,'2024-06-05','Literature Analysis','5:13 AM',150),(24,'2024-06-05','History of Art','11:09 PM',60),(25,'2024-06-11','History of Art','3:44 AM',120);
/*!40000 ALTER TABLE `exam` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-28 21:03:25
