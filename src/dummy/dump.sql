-- MariaDB dump 10.19-11.3.2-MariaDB, for osx10.19 (arm64)
--
-- Host: localhost    Database: 
-- ------------------------------------------------------
-- Server version	11.3.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `ticketpong`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `ticketpong` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;

USE `ticketpong`;

--
-- Table structure for table `BOXOFFICE`
--

DROP TABLE IF EXISTS `BOXOFFICE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `BOXOFFICE` (
  `mt20id` varchar(255) NOT NULL,
  `manage_id` varchar(255) NOT NULL,
  `rnum` int(11) DEFAULT NULL,
  `prfdtcnt` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`mt20id`),
  KEY `BOXOFFICE_PERFORMANCE_manage_id_fk` (`manage_id`),
  CONSTRAINT `BOXOFFICE_PERFORMANCE_manage_id_fk` FOREIGN KEY (`manage_id`) REFERENCES `PERFORMANCE` (`manage_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BOXOFFICE`
--

LOCK TABLES `BOXOFFICE` WRITE;
/*!40000 ALTER TABLE `BOXOFFICE` DISABLE KEYS */;
INSERT INTO `BOXOFFICE` VALUES
('PF226005','manage1',22,'0'),
('PF230842','manage1',41,'0'),
('PF233713','manage1',26,'0'),
('PF233790','manage1',9,'0'),
('PF233973','manage1',32,'0'),
('PF234043','manage1',38,'0'),
('PF234061','manage1',21,'0'),
('PF234256','manage1',23,'0'),
('PF234262','manage1',10,'0'),
('PF234451','manage1',30,'0'),
('PF234505','manage1',7,'0'),
('PF234672','manage1',3,'0'),
('PF234851','manage1',14,'0'),
('PF235085','manage1',11,'0'),
('PF235117','manage1',33,'0'),
('PF235212','manage1',35,'0'),
('PF235388','manage1',29,'0'),
('PF235580','manage1',40,'0'),
('PF235670','manage1',28,'0'),
('PF236062','manage1',6,'0'),
('PF236064','manage1',12,'0'),
('PF236190','manage1',19,'0'),
('PF236239','manage1',37,'0'),
('PF236318','manage1',42,'0'),
('PF236703','manage1',15,'0'),
('PF237272','manage1',39,'0'),
('PF237933','manage1',20,'0'),
('PF237943','manage1',50,'0'),
('PF238075','manage1',31,'0'),
('PF238076','manage1',34,'0'),
('PF238077','manage1',45,'0'),
('PF238082','manage1',43,'0'),
('PF238092','manage1',17,'0'),
('PF238095','manage1',16,'0'),
('PF238098','manage1',27,'0'),
('PF238100','manage1',44,'0'),
('PF238102','manage1',25,'0'),
('PF238103','manage1',5,'0'),
('PF238104','manage1',2,'0'),
('PF238130','manage1',47,'0'),
('PF238156','manage1',46,'0'),
('PF238161','manage1',4,'0'),
('PF238260','manage1',13,'0'),
('PF238277','manage1',1,'0'),
('PF238280','manage1',24,'0'),
('PF238282','manage1',36,'0'),
('PF238290','manage1',18,'0'),
('PF238364','manage1',49,'0'),
('PF238457','manage1',8,'0'),
('PF238468','manage1',48,'0');
/*!40000 ALTER TABLE `BOXOFFICE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DEVICES`
--

DROP TABLE IF EXISTS `DEVICES`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `DEVICES` (
  `device_id` varchar(20) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `device_name` varchar(255) NOT NULL,
  `macaddress` varchar(255) NOT NULL,
  PRIMARY KEY (`device_id`),
  KEY `DEVICES_MEMBER_user_id_fk` (`user_id`),
  CONSTRAINT `DEVICES_MEMBER_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `MEMBER` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DEVICES`
--

LOCK TABLES `DEVICES` WRITE;
/*!40000 ALTER TABLE `DEVICES` DISABLE KEYS */;
/*!40000 ALTER TABLE `DEVICES` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DISCOUNT`
--

DROP TABLE IF EXISTS `DISCOUNT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `DISCOUNT` (
  `code` varchar(20) NOT NULL,
  `card_name` varchar(20) NOT NULL,
  `discountrate` int(11) NOT NULL,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DISCOUNT`
--

LOCK TABLES `DISCOUNT` WRITE;
/*!40000 ALTER TABLE `DISCOUNT` DISABLE KEYS */;
/*!40000 ALTER TABLE `DISCOUNT` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MANAGE`
--

DROP TABLE IF EXISTS `MANAGE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `MANAGE` (
  `manage_id` varchar(255) NOT NULL,
  `manage_name` varchar(255) NOT NULL,
  `manage_password` varchar(255) NOT NULL,
  `manage_phone` varchar(255) NOT NULL,
  `manage_auth` varchar(255) NOT NULL,
  `manage_part` varchar(255) NOT NULL,
  PRIMARY KEY (`manage_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MANAGE`
--

LOCK TABLES `MANAGE` WRITE;
/*!40000 ALTER TABLE `MANAGE` DISABLE KEYS */;
INSERT INTO `MANAGE` VALUES
('manage1','manage1','$2a$10$Rne2iRxmLrTKWWvGqTiyoub6wSlB5fJ7Z1fisXcHgCM1Py7N0ethC','010-1234-1234','주관리자','사장'),
('manage2','manage2','$2a$10$AW75Lrd7g8Jbnwn8/uREfu11jF.4mJrtc2EXZtVKO7yJGdi5wnuA.','010-2345-2345','부관리자','부장'),
('manage3','manage3','$2a$10$2Sh8tfONv9cXDuksz31J9OLbaBz70wQ9CqxGWiROwk1bzwRWvxnKa','010-3456-3456','부관리자','팀장'),
('manage4','manage4','$2a$10$FtO/.TBLAsi.g/VQLXQRXuvWlGemUOg6HVnbegW.oHQ/sl5RG796i','010-4567-4567','일반관리자','사원'),
('manage5','manage5','$2a$10$JWCLYfo2w5OQrKmum1CJSuURllRQogWAkZkLZCHYm5C04p7RkyVbe','010-5678-5678','일반관리자','인턴');
/*!40000 ALTER TABLE `MANAGE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MEMBER`
--

DROP TABLE IF EXISTS `MEMBER`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `MEMBER` (
  `user_id` varchar(255) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `user_phone` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `detailAddress` varchar(255) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MEMBER`
--

LOCK TABLES `MEMBER` WRITE;
/*!40000 ALTER TABLE `MEMBER` DISABLE KEYS */;
INSERT INTO `MEMBER` VALUES
('member1','member1','$2a$10$rJSsLFeIQR7pyjRQd0zv2eielT8zPANOzTEOKuMI1pnZWKSLqCA7S','member1@gmail.com','010-0987-0987','서울특별시','역삼동'),
('member2','member2','$2a$10$Jqg2rwj1R0vA7VcelGQJguun2QbD4m0sG9aorp2JhVapp0dyVuHhO','member2@gmail.com','010-9876-9876','서울특별시','역삼동'),
('member3','member3','$2a$10$MYjMwwChplH7.Hbi/WratuxNmzncCUB7xhbxhVIznPH0Da/QXqyma','member3@gmail.com','010-8765-8765','서울특별시','역삼동');
/*!40000 ALTER TABLE `MEMBER` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PERFORMANCE`
--

DROP TABLE IF EXISTS `PERFORMANCE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PERFORMANCE` (
  `mt20id` varchar(255) NOT NULL,
  `manage_id` varchar(255) NOT NULL,
  `mt10id` varchar(255) NOT NULL,
  `prfnm` varchar(255) NOT NULL,
  `prfpdfrom` varchar(255) NOT NULL,
  `prfpdto` varchar(255) NOT NULL,
  `prfruntime` varchar(255) NOT NULL,
  `pcseguidance` varchar(255) NOT NULL,
  `genrenm` varchar(255) NOT NULL,
  `prfstate` varchar(255) NOT NULL,
  `updatedate` varchar(255) NOT NULL,
  `poster` varchar(255) NOT NULL,
  `styurl` varchar(255) NOT NULL,
  `dtguidance` varchar(255) NOT NULL,
  `post` bit(1) NOT NULL,
  `prfage` varchar(255) NOT NULL,
  PRIMARY KEY (`mt20id`),
  KEY `PERFORMANCE_MANAGE_manage_id_fk` (`manage_id`),
  KEY `PERFORMANCE_PERFORMANCEHALL_mt10id_fk` (`mt10id`),
  CONSTRAINT `PERFORMANCE_MANAGE_manage_id_fk` FOREIGN KEY (`manage_id`) REFERENCES `MANAGE` (`manage_id`),
  CONSTRAINT `PERFORMANCE_PERFORMANCEHALL_mt10id_fk` FOREIGN KEY (`mt10id`) REFERENCES `PERFORMANCEHALL` (`mt10id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PERFORMANCE`


LOCK TABLES `PERFORMANCE` WRITE; 

USE PERFORMANCE; 
/*!40000 ALTER TABLE `PERFORMANCE` DISABLE KEYS */;
INSERT INTO `PERFORMANCE` VALUES
('PF226005','manage1','FC001233','빨래 [대학로]','2023.1
0.12','2024.05.26','2시간 45분','R석 66,000원, S석 55,000원, 시야제한석 20,000원','뮤지컬','공연중','2023-09-18 15:00:00','http://www.kopis.or.kr/upload/pfmPoster/PF_PF226005_230918_103152.gif','http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF226005_230918_1031520.jpg','목요일 ~ 금요일(19:30), 토요일 ~ 일요일(14:00,18:30), HOL(14:00,15:00,18:30), 수요일(15:00,19:30)','','만 13세 이상'),
('PF230842','manage1','FC001722','WORLD DJ FESTIVAL','2024.06.15','2024.06.16','8시간','슈퍼얼리버드 양일권 199,000원, 슈퍼얼리버드 1일권(토) 109,000원, 슈퍼얼리버드 1일권(일) 99,000원','대중음악','공연예정','2023-11-27 15:00:00','http://www.kopis.or.kr/upload/pfmPoster/PF_PF230842_231127_093824.gif','http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF230842_231127_0938240.jpg','토요일 ~ 일요일(14:00)','','만 19세 이상'),
('PF233713','manage1','FC001247','제16회 서울재즈페스티벌','2024.05.31','2024.06.02','-','3일권 420,000원','대중음악','공연예정','2024-01-10 15:00:00','http://www.kopis.or.kr/upload/pfmPoster/PF_PF233713_240110_140645.jpg','http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF233713_240110_0206450.jpg','금요일(12:00)','','전체관람가'),
('PF233790','manage1','FC000011','마리 앙투아네트','2024.02.27','2024.05.26','3시간','VIP석 170,000원, R석 140,000원, S석 110,000원, A석 80,000원','뮤지컬','공연중','2024-01-12 15:00:00','http://www.kopis.or.kr/upload/pfmPoster/PF_PF233790_240112_094823.gif','http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF233790_240404_0919041.jpg','화요일(19:30), 수요일(14:30,19:30), 목요일 ~ 금요일(19:30), 토요일(14:00,19:00), 일요일(15:00), HOL(14:00,19:00)','','만 7세 이상'),
('PF233973','manage1','FC001239','레미제라블 [대구]','2024.03.21','2024.04.07','3시간','VIP석 180,000원, R석 150,000원, S석 120,000원, A석 90,000원, B석 60,000원','뮤지컬','공연중','2024-01-16 15:00:00','http://www.kopis.or.kr/upload/pfmPoster/PF_PF233973_240116_103148.gif','http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF233973_240116_1031480.jpg','화요일 ~ 금요일(19:30), 토요일(14:00,19:00), 일요일(14:00)','','만 7세 이상'),
('PF234043','manage1','FC001247','톤앤뮤직 페스티벌','2024.06.15','2024.06.16','8시간 20분','스페셜 1일권(토) 99,000원, 얼리버드 1일권(일) 79,000원, 얼리버드 양일권 129,000원','대중음악','공연예정','2024-03-06 18:00:00','http://www.kopis.or.kr/upload/pfmPoster/PF_PF234043_240306_160738.gif','http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF234043_240306_0407381.jpg','토요일 ~ 일요일(13:00)','','만 12세 이상'),
('PF234061','manage1','FC001592','HIPHOPPLAYA FESTIVAL','2024.05.04','2024.05.05','8시간','2일권 189,000원, 1일권 119,000원, Premium GA 1 Day 199,000원','대중음악','공연예정','2024-01-18 15:00:00','http://www.kopis.or.kr/upload/pfmPoster/PF_PF234061_240222_103328.gif','http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF234061_240222_1033281.jpg','토요일 ~ 일요일(12:00)','','만 13세 이상'),
('PF234256','manage1','FC001370','넥스트 투 노멀','2024.03.05','2024.05.19','2시간 20분','VIP석 130,000원, R석 110,000원, S석 80,000원, A석 60,000원','뮤지컬','공연중','2024-01-22 15:00:00','http://www.kopis.or.kr/upload/pfmPoster/PF_PF234256_240122_094251.gif','http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF234256_240122_0942510.jpg','화요일 ~ 금요일(19:30), 토요일(15:00,19:00), 일요일(14:00,18:00)','','만 9세 이상'),
('PF234262','manage1','FC001208','파과: 뭉그러진 과일','2024.03.15','2024.05.26','2시간 20분','VIP석 120,000원, OP석 120,000원, R석 90,000원, S석 60,000원','뮤지컬','공연중','2024-01-22 15:00:00','http://www.kopis.or.kr/upload/pfmPoster/PF_PF234262_240122_095947.gif','http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF234262_240312_1134181.jpg','화요일 ~ 금요일(20:00), 토요일(15:00,19:00), 일요일(14:00,18:00), HOL(14:00,18:00)','','만 13세 이상'),
('PF234451','manage1','FC000014','디어 에반 핸슨 (Dear Evan Hansen)','2024.03.28','2024.06.23','2시간 40분','VIP석 160,000원, R석 130,000원, S석 100,000원, A석 70,000원','뮤지컬','공연중','2024-01-25 15:00:00','http://www.kopis.or.kr/upload/pfmPoster/PF_PF234451_240125_101338.gif','http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF234451_240125_1013380.jpg','화요일 ~ 목요일(19:30), 금요일(14:30,19:30), 토요일(14:00,19:00), 일요일(15:00), HOL(14:00,19:00)','','만 13세 이상'),
('PF234505','manage1','FC000382','오즈 [대학로]','2024.02.27','2024.04.28','1시간 40분','R석 60,000원, S석 50,000원, A석 40,000원','뮤지컬','공연중','2024-01-26 15:00:00','http://www.kopis.or.kr/upload/pfmPoster/PF_PF234505_240126_092604.gif','http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF234505_240126_0926041.jpg','월요일(20:00), 수요일(16:00,20:00), 목요일 ~ 금요일(20:00), 토요일(15:00,19:00), 일요일(14:00,18:00), HOL(14:00,18:00)','','만 7세 이상'),
('PF234672','manage1','FC000012','헤드윅','2024.03.22','2024.06.23','2시간 15분','VIP석 150,000원, R석 130,000원, S석 100,000원, A석 80,000원','뮤지컬','공연중','2024-01-30 15:00:02','http://www.kopis.or.kr/upload/pfmPoster/PF_PF234672_240130_092901.gif','http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF234672_240130_0929010.jpg','화요일 ~ 금요일(19:30), 토요일 ~ 일요일(14:00,18:30), HOL(15:00)','','만 16세 이상'),
('PF234851','manage1','FC000010','그레이트 코멧','2024.03.26','2024.06.16','2시간 40분','코멧석 160,000원, VIP석 160,000원, 발코니A석 140,000원, 발코니B석 110,000원, S석 100,000원, A석 80,000원, B석 50,000원','뮤지컬','공연중','2024-02-02 15:00:00','http://www.kopis.or.kr/upload/pfmPoster/PF_PF234851_240202_095453.gif','http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF234851_240202_0954530.jpg','화요일 ~ 금요일(19:30), 토요일 ~ 일요일(14:00,18:30), HOL(14:00,18:30)','','만 6세 이상'),
('PF235085','manage1','FC001236','난설','2024.03.12','2024.06.02','1시간 40분','R석 70,000원, S석 50,000원','뮤지컬','공연중','2024-02-07 15:00:00','http://www.kopis.or.kr/upload/pfmPoster/PF_PF235085_240207_095210.jpg','http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF235085_240207_0952111.jpg','화요일(20:00), 수요일(16:00,20:00), 목요일 ~ 금요일(20:00), 토요일(15:00,19:00), 일요일(14:00,18:00), HOL(14:00,18:00)','','만 13세 이상'),
('PF235117','manage1','FC001236','이프아이월유 (IF I WERE YOU)','2024.03.12','2024.06.01','1시간 30분','R석 70,000원, S석 60,000원','뮤지컬','공연중','2024-02-07 15:00:00','http://www.kopis.or.kr/upload/pfmPoster/PF_PF235117_240207_110631.jpg','http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF235117_240207_1106311.jpg','화요일 ~ 금요일(20:00), 토요일(15:00,19:00), 일요일(14:00,18:00), HOL(14:00,18:00)','','만 12세 이상'),
('PF235212','manage1','FC001528','브론테','2024.03.04','2024.06.02','1시간 40분','R석 70,000원, S석 60,000원, A석 40,000원','뮤지컬','공연중','2024-02-08 15:00:00','http://www.kopis.or.kr/upload/pfmPoster/PF_PF235212_240208_110054.gif','http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF235212_240208_1100540.jpg','화요일 ~ 목요일(20:00), 금요일(16:00,20:00), 토요일(15:00,19:00), 일요일(14:00,18:00), HOL(14:00,18:00)','','만 7세 이상'),
('PF235388','manage1','FC001877','더 라스트맨','2024.03.05','2024.05.26','1시간 40분','R석 66,000원, S석 44,000원','뮤지컬','공연중','2024-02-14 15:00:00','http://www.kopis.or.kr/upload/pfmPoster/PF_PF235388_240214_095242.gif','http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF235388_240214_0952420.jpg','화요일(20:00), 수요일(16:00,20:00), 목요일(20:00), 금요일(16:00,20:00), 토요일 ~ 일요일(14:00,18:00), HOL(14:00,18:00)','','만 12세 이상'),
('PF235580','manage1','FC001236','광염 소나타 [대학로]','2024.03.16','2024.06.09','1시간 40분','R석 77,000원, S석 66,000원','뮤지컬','공연중','2024-02-16 15:00:00','http://www.kopis.or.kr/upload/pfmPoster/PF_PF235580_240216_100834.jpg','http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF235580_240216_1008340.png','화요일(20:00), 수요일(16:00,20:00), 목요일 ~ 금요일(20:00), 토요일(15:00,19:00), 일요일(14:00,18:00), HOL(14:00,18:00)','','만 13세 이상'),
('PF235670','manage1','FC001233','웨스턴 스토리 [대학로]','2024.03.13','2024.06.09','2시간 25분','R석 88,000원, S석 66,000원, A석 44,000원, 시야제한석 77,000원','뮤지컬','공연중','2024-02-19 15:00:00','http://www.kopis.or.kr/upload/pfmPoster/PF_PF235670_240219_105822.gif','http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF235670_240219_1058220.jpg','화요일(19:30), 수요일(15:00,19:30), 목요일 ~ 금요일(19:30), 토요일 ~ 일요일(14:00,18:30), HOL(14:00,18:30)','','만 13세 이상'),
('PF236062','manage1','FC001247','LOVESOME: 마음 방울 채집','2024.04.27','2024.04.28','9시간','1일권 110,000원, 잔디 마당권 99,000원, KSPO권 99,000원','대중음악','공연예정','2024-02-23 15:00:00','http://www.kopis.or.kr/upload/pfmPoster/PF_PF236062_240223_121108.gif','http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF236062_240223_1211080.jpg','토요일 ~ 일요일(13:00)','','만 7세 이상'),
('PF236064','manage1','FC000008','파가니니','2024.04.06','2024.06.02','2시간 30분','VIP석 99,000원, R석 88,000원, S석 66,000원, A석 44,000원','뮤지컬','공연예정','2024-02-23 15:00:00','http://www.kopis.or.kr/upload/pfmPoster/PF_PF236064_240223_123024.gif','http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF236064_240223_1230240.jpg','화요일 ~ 금요일(19:30), 토요일 ~ 일요일(14:00,18:30), HOL(14:00,18:30)','','만 7세 이상'),
('PF236190','manage1','FC000031','일 테노레','2024.03.29','2024.05.19','2시간 50분','OP석 160,000원, VIP석 160,000원, R석 140,000원, S석 110,000원, A석 80,000원','뮤지컬','공연중','2024-02-26 15:00:00','http://www.kopis.or.kr/upload/pfmPoster/PF_PF236190_240226_132839.gif','http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF236190_240226_0128390.jpg','화요일 ~ 금요일(19:30), 토요일 ~ 일요일(14:00,19:00), HOL(14:00,19:00)','','만 7세 이상'),
('PF236239','manage1','FC001793','히사이시 조 & 지브리 영화음악 콘서트, Film & His Own Music','2024.03.21','2024.06.16','2시간','R석 110,000원, S석 90,000원, A석 70,000원, B석 50,000원','서양음악(클래식)','공연중','2024-03-07 15:45:24','http://www.kopis.or.kr/upload/pfmPoster/PF_PF236239_240403_143924.gif','http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF236239_240329_1254181.jpg','목요일 ~ 금요일(19:30), 토요일 ~ 일요일(14:00,19:00)','','만 7세 이상'),
('PF236241','manage1','FC000743','제23회 광양매화축제, 신춘음악회 [광양]','2024.03.08','2024.03.08','1시간 40분','전석 5,000원','대중음악','공연완료','2024-02-27 15:00:00','http://www.kopis.or.kr/upload/pfmPoster/PF_PF236241_240227_102418.png','http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF236241_240227_1024191.png','금요일(19:30)','','24개월 이상'),
('PF236250','manage1','FC002090','ACOUSTIC LIVE NIGHT','2024.03.01','2024.03.01','2시간 30분','전석 40,000원','대중음악','공연완료','2024-02-27 15:00:00','http://www.kopis.or.kr/upload/pfmPoster/PF_PF236250_240227_104307.gif','http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF236250_240227_1043070.jpg','HOL(18:00)','','전체 관람가'),
('PF236295','manage1','FC000001','문진성 클라리넷 독주회','2024.03.31','2024.03.31','1시간 25분','전석 30,000원','서양음악(클래식)','공연완료','2024-02-28 15:00:00','http://www.kopis.or.kr/upload/pfmPoster/PF_PF236295_240228_100159.gif','http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF236295_240228_1001590.jpg','일요일(14:00)','','만 7세 이상'),
('PF236296','manage1','FC000001','국립심포니오케스트라, 존 윌리엄스 영화음악 콘서트','2024.03.23','2024.03.23','1시간 40분','R석 70,000원, S석 50,000원, A석 30,000원, B석 10,000원','서양음악(클래식)','공연완료','2024-02-28 15:00:00','http://www.kopis.or.kr/upload/pfmPoster/PF_PF236296_240228_101142.gif','http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF236296_240228_1011420.jpg','토요일(17:00)','','만 7세 이상'),
('PF236298','manage1','FC000001','피호영 & 피예나 바이올린 듀오 콘서트: VIOLON ET VIOLON','2024.03.17','2024.03.17','1시간 30분','전석 20,000원','서양음악(클래식)','공연완료','2024-02-28 15:00:00','http://www.kopis.or.kr/upload/pfmPoster/PF_PF236298_240228_101340.gif','http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF236298_240228_1013400.jpg','일요일(20:00)','','만 7세 이상'),
('PF236308','manage1','FC000001','제197회 국립합창단 정기연주회: 전쟁 그리고 평화','2024.03.19','2024.03.19','1시간 35분','R석 50,000원, S석 30,000원, A석 20,000원','서양음악(클래식)','공연완료','2024-02-28 15:00:00','http://www.kopis.or.kr/upload/pfmPoster/PF_PF236308_240228_103707.gif','http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF236308_240228_1037070.jpg','화요일(19:30)','','만 7세 이상'),
('PF236318','manage1','FC002162','스쿨 오브 락 월드투어 [부산]','2024.04.02','2024.04.14','2시간 40분','VIP석 170,000원, R석 140,000원, S석 110,000원, A석 90,000원, B석 60,000원','뮤지컬','공연중','2024-03-04 18:00:00','http://www.kopis.or.kr/upload/pfmPoster/PF_PF236318_240228_105535.jpg','http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF236318_240304_0508171.jpg','화요일 ~ 목요일(19:30), 금요일(14:30,19:30), 토요일(14:00,19:00), 일요일(15:00), HOL(14:00,19:00)','','만 7세 이상'),
('PF236396','manage1','FC001370','서울아카데미앙상블 청소년과 함께 하는 음악회','2024.03.08','2024.03.08','1시간 40분','전석 10,000원','서양음악(클래식)','공연완료','2024-02-29 15:00:00','http://www.kopis.or.kr/upload/pfmPoster/PF_PF236396_240229_110213.gif','http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF236396_240229_1102131.jpg','금요일(19:30)','','만 7세 이상'),
('PF236402','manage1','FC000127','제38회 성균관대학교 오케스트라 정기 봄 연주회','2024.03.02','2024.03.02','2시간','전석무료 ','서양음악(클래식)','공연완료','2024-03-06 18:00:00','http://www.kopis.or.kr/upload/pfmPoster/PF_PF236402_240229_111811.png','http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF236402_240229_1118110.png','토요일(18:00)','','36개월 이상'),
('PF236422','manage1','FC000001','파체, One Suite Day','2024.03.16','2024.03.16','1시간 50분','전석 50,000원','서양음악(클래식)','공연완료','2024-02-29 15:00:00','http://www.kopis.or.kr/upload/pfmPoster/PF_PF236422_240229_124201.gif','http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF236422_240229_1242010.jpg','토요일(20:00)','','만 7세 이상'),
('PF236454','manage1','FC000009','제19회 한양가야금연주단 정기연주회','2024.03.10','2024.03.10','1시간 30분','전석무료 ','한국음악(국악)','공연완료','2024-03-04 15:00:00','http://www.kopis.or.kr/upload/pfmPoster/PF_PF236454_240304_102101.png','http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF236454_240304_1021010.jpg','일요일(17:00)','','만 7세 이상'),
('PF236463','manage1','FC000808','제5회 엘리트 심포니 오케스트라 정기연주회 [경기]','2024.03.30','2024.03.30','1시간 40분','R석 40,000원, S석 30,000원, A석 20,000원','서양음악(클래식)','공연완료','2024-03-04 15:00:00','http://www.kopis.or.kr/upload/pfmPoster/PF_PF236463_240304_104000.gif','http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF236463_240304_1040000.jpg','토요일(19:00)','','만 7세 이상'),
('PF236466','manage1','FC003195','드로잉더뮤직, 영아티스트 콘서트: 한예은 첼로 독주회','2024.03.09','2024.03.09','1시간 10분','전석 10,000원','서양음악(클래식)','공연완료','2024-03-04 15:00:00','http://www.kopis.or.kr/upload/pfmPoster/PF_PF236466_240304_104933.gif','http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF236466_240304_1049330.jpg','토요일(14:00)','','만 7세 이상'),
('PF236477','manage1','FC000009','최정윤 해금 독주회','2024.03.26','2024.03.26','1시간','전석무료 ','한국음악(국악)','공연완료','2024-03-04 15:00:00','http://www.kopis.or.kr/upload/pfmPoster/PF_PF236477_240304_111320.jpg','http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF236477_240304_1113200.jpg','화요일(19:30)','','만 7세 이상'),
('PF236543','manage1','FC001081','인피니티 플라잉 (INFINITY FLYING) [경주]','2024.03.23','2024.11.30','1시간 20분','전석 40,000원','뮤지컬','공연중','2024-03-04 15:00:00','http://www.kopis.or.kr/upload/pfmPoster/PF_PF236543_240318_130612.gif','http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF236543_240318_0106124.jpg','수요일 ~ 금요일(14:30), 토요일 ~ 일요일(14:30)','','36개월 이상'),
('PF236703','manage1','FC002083','SEVENTEEN TOUR, FOLLOW AGAIN [인천]','2024.03.30','2024.03.31','3시간','VIP석 198,000원, R석 154,000원, S석 132,000원','대중음악','공연완료','2024-03-06 15:00:00','http://www.kopis.or.kr/upload/pfmPoster/PF_PF236703_240306_092731.gif','http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF236703_240306_0927310.jpg','토요일(18:00), 일요일(17:00)','','만 9세 이상'),
('PF236706','manage1','FC002226','오병이어','2024.03.16','2024.06.29','45분','전석 30,000원','뮤지컬','공연중','2024-03-06 15:00:00','http://www.kopis.or.kr/upload/pfmPoster/PF_PF236706_240306_093811.gif','http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF236706_240306_0938110.jpg','토요일(11:00)','','36개월 이상'),
('PF236734','manage1','FC001142','거먕빛','2024.03.22','2024.03.24','1시간 20분','전석 30,000원','연극','공연완료','2024-03-06 15:00:00','http://www.kopis.or.kr/upload/pfmPoster/PF_PF236734_240306_103545.gif','http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF236734_240306_1035450.jpg','금요일(19:00), 토요일(15:00,19:00), 일요일(14:00,18:00)','','만 12세 이상'),
('PF236936','manage1','FC000005','제11회 현대일본희곡 낭독공연, 가타부이, 1972','2024.03.22','2024.03.24','1시간 50분','전석 10,000원','연극','공연완료','2024-03-08 15:00:00','http://www.kopis.or.kr/upload/pfmPoster/PF_PF236936_240308_103015.jpg','http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF236936_240308_1030151.jpg','금요일(19:30), 일요일(14:00)','','만 12세 이상'),
('PF236948','manage1','FC000005','제11회 현대일본희곡 낭독공연, 조지오웰, 침묵의 소리','2024.03.23','2024.03.23','2시간','전석 10,000원','연극','공연완료','2024-03-08 15:00:00','http://www.kopis.or.kr/upload/pfmPoster/PF_PF236948_240308_105256.jpg','http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF236948_240308_1052560.jpeg','금요일 ~ 토요일(14:00,18:00)','','만 12세 이상'),
('PF236971','manage1','FC001142','디오스미오','2024.03.28','2024.04.07','1시간 10분','전석 20,000원','연극','공연중','2024-03-08 15:00:00','http://www.kopis.or.kr/upload/pfmPoster/PF_PF236971_240308_114513.gif','http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF236971_240308_1145134.jpg','월요일 ~ 금요일(20:00), 토요일 ~ 일요일(15:00,19:00)','','만 15세 이상'),
('PF237017','manage1','FC000838','그대 없이는 못살아 [부산]','2024.03.29','2024.03.31','1시간 15분','전석 20,000원','연극','공연완료','2024-03-11 15:00:00','http://www.kopis.or.kr/upload/pfmPoster/PF_PF237017_240311_094616.png','http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF237017_240311_0946164.png','금요일(19:30), 토요일(15:30,19:00), 일요일(15:00)','','만 11세 이상'),
('PF237066','manage1','FC003388','개미와 베짱이 [고잔]','2024.03.23','2024.03.31','45분','전석 20,000원','연극','공연완료','2024-03-11 15:00:00','http://www.kopis.or.kr/upload/pfmPoster/PF_PF237066_240311_113715.jpg','http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF237066_240311_1137150.jpg','토요일 ~ 일요일(12:00,14:00)','','전체 관람가'),
('PF237141','manage1','FC001208','창작공감: 희곡, 입체낭독공연: 오함마백씨행장 완판본','2024.03.15','2024.03.16','1시간 10분','전석무료 ','연극','공연완료','2024-03-11 18:00:00','http://www.kopis.or.kr/upload/pfmPoster/PF_PF237141_240311_150219.png','http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF237141_240311_0302190.png','금요일(19:30), 토요일(15:00,19:00)','','만 11세 이상'),
('PF237166','manage1','FC001845','더블플롯: 검은손님 & 돗가비사냥','2024.03.12','2024.03.31','1시간 40분','전석 40,000원','연극','공연완료','2024-03-12 15:00:00','http://www.kopis.or.kr/upload/pfmPoster/PF_PF237166_240312_100424.gif','http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF237166_240312_1004240.jpg','화요일 ~ 금요일(20:00), 토요일 ~ 일요일(19:00)','','만 14세 이상'),
('PF237228','manage1','FC000005','제7회 중국희곡 낭독공연, 나는 반금련이 아니야','2024.03.30','2024.03.31','2시간','전석 10,000원','연극','공연완료','2024-03-13 15:00:00','http://www.kopis.or.kr/upload/pfmPoster/PF_PF237228_240313_102526.png','http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF237228_240313_1025261.png','토요일(19:00), 일요일(15:00)','','만 12세 이상'),
('PF237272','manage1','FC001513','너의 이름은. 공식 필름콘서트 [서울(앵콜)]','2024.04.10','2024.04.10','2시간','R석 140,000원, S석 120,000원, A석 90,000원, B석 60,000원','서양음악(클래식)','공연예정','2024-03-13 15:00:00','http://www.kopis.or.kr/upload/pfmPoster/PF_PF237272_240313_120900.gif','http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF237272_240313_1209000.jpg','HOL(15:00,19:30)','','만 7세 이상'),
('PF237277','manage1','FC000005','제7회 중국희곡 낭독공연, 제일 가까운 장애인 화장실이 어디죠?','2024.03.27','2024.03.28','2시간','전석 10,000원','연극','공연완료','2024-03-13 15:00:00','http://www.kopis.or.kr/upload/pfmPoster/PF_PF237277_240313_124026.png','http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF237277_240313_1240263.png','수요일 ~ 목요일(19:30)','','만 13세 이상'),
('PF237279','manage1','FC000005','제7회 중국희곡 낭독공연, 원칙','2024.03.29','2024.03.30','1시간 40분','전석 10,000원','연극','공연완료','2024-03-14 15:00:00','http://www.kopis.or.kr/upload/pfmPoster/PF_PF237279_240313_124135.png','http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF237279_240313_1243390.jpeg','금요일(19:30), 토요일(15:00)','','만 12세 이상'),
('PF237309','manage1','FC000879','더 클라운 [거창]','2024.03.28','2024.03.28','1시간 20분','전석 10,000원','뮤지컬','공연완료','2024-03-14 15:00:00','http://www.kopis.or.kr/upload/pfmPoster/PF_PF237309_240314_094346.jpg','http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF237309_240314_0943461.jpg','목요일(19:30)','','만 7세 이상'),
('PF237394','manage1','FC001236','이프아이월유 (IF I WERE YOU) 관객콜','2024.03.21','2024.03.21','1시간 10분','전석 10,000원','뮤지컬','공연완료','2024-03-14 15:00:00','http://www.kopis.or.kr/upload/pfmPoster/PF_PF237394_240314_132111.jpg','http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF237394_240314_0121112.jpg','목요일(15:00)','','만 12세 이상'),
('PF237479','manage1','FC000198','페인터즈 [경향아트힐]','2024.03.25','2024.04.30','1시간 15분','VIP석 70,000원, R석 50,000원','뮤지컬','공연중','2024-03-15 15:00:00','http://www.kopis.or.kr/upload/pfmPoster/PF_PF237479_240315_133619.jpg','http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF237479_240315_0136190.jpg','월요일 ~ 금요일(17:00,20:00), 토요일 ~ 일요일(17:00,20:00)','','전체 관람가'),
('PF237801','manage1','FC001209','아버지를 위하여','2024.03.28','2024.04.07','1시간 30분','전석 40,000원','연극','공연중','2024-03-21 18:00:00','http://www.kopis.or.kr/upload/pfmPoster/PF_PF237801_240321_093345.gif','http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF237801_240321_0933450.jpg','월요일(20:00), 수요일 ~ 금요일(20:00), 토요일(15:00,19:00), 일요일(16:00)','','만 15세 이상'),
('PF237867','manage1','FC002674','타오르는 어둠 속에서 [부산]','2024.03.28','2024.03.31','2시간 45분','전석 20,000원','연극','공연완료','2024-03-21 15:00:00','http://www.kopis.or.kr/upload/pfmPoster/PF_PF237867_240321_130557.jpg','http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF237867_240321_0105571.jpg','목요일 ~ 금요일(19:30), 토요일 ~ 일요일(15:00)','','만 12세 이상'),
('PF237933','manage1','FC001592','PEAK FESTIVAL','2024.06.01','2024.06.02','9시간','양일권 149,000원, 일일권(토) 109,000원, 일일권(일) 109,000원','대중음악','공연예정','2024-04-02 18:00:00','http://www.kopis.or.kr/upload/pfmPoster/PF_PF237933_240322_133947.jpg','http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF237933_240402_0449172.jpg','토요일 ~ 일요일(12:00)','','전체 관람가'),
('PF237943','manage1','FC000001','유니버설발레단 케네스 맥밀란의 로미오와 줄리엣','2024.05.10','2024.05.12','2시간 45분','R석 150,000원, S석 130,000원, A석 100,000원, B석 60,000원, C석 30,000원','무용','공연예정','2024-03-22 15:00:00','http://www.kopis.or.kr/upload/pfmPoster/PF_PF237943_240322_142123.jpg','http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF237943_240322_0221230.jpg','금요일(19:30), 토요일 ~ 일요일(14:00,19:00)','','만 7세 이상'),
('PF238075','manage1','FC001247','빌드업 콘서트 [서울]','2024.06.15','2024.06.16','2시간 30분','VIP석 132,000원, R석 121,000원, S석 110,000원','대중음악','공연예정','2024-03-26 15:00:00','http://www.kopis.or.kr/upload/pfmPoster/PF_PF238075_240326_104159.gif','http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF238075_240326_1041590.jpg','토요일(13:30,18:00), 일요일(13:30)','','만 7세 이상'),
('PF238076','manage1','FC000497','미스터트롯2 진선미 콘서트: 트롯트립 [부산]','2024.06.08','2024.06.08','2시간','SR석 154,000원, R석 132,000원, S석 110,000원','대중음악','공연예정','2024-03-26 15:00:00','http://www.kopis.or.kr/upload/pfmPoster/PF_PF238076_240326_104647.gif','http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF238076_240326_1046470.jpg','토요일(13:00,18:00)','','만 7세 이상'),
('PF238077','manage1','FC001363','미스터트롯2 진선미 콘서트: 트롯트립 [대구]','2024.05.11','2024.05.11','2시간','SR석 154,000원, R석 132,000원, S석 110,000원','대중음악','공연예정','2024-03-26 15:00:00','http://www.kopis.or.kr/upload/pfmPoster/PF_PF238077_240326_105200.gif','http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF238077_240326_1052000.jpg','토요일(13:00,18:00)','','만 7세 이상'),
('PF238082','manage1','FC000477','미스터트롯2 진선미 콘서트: 트롯트립 [전주]','2024.06.22','2024.06.22','2시간','SR석 154,000원, R석 132,000원, S석 110,000원','대중음악','공연예정','2024-03-26 15:00:00','http://www.kopis.or.kr/upload/pfmPoster/PF_PF238082_240326_111054.gif','http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF238082_240326_1110550.jpg','토요일(13:00,18:00)','','만 7세 이상'),
('PF238092','manage1','FC000205','VANNER 1ST CONCERT, THE FLAG: A TO V [서울]','2024.04.26','2024.04.28','2시간','전석 143,000원','대중음악','공연예정','2024-03-26 15:00:00','http://www.kopis.or.kr/upload/pfmPoster/PF_PF238092_240329_141224.jpg','http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF238092_240326_1257590.png','금요일(20:00), 토요일(18:00), 일요일(17:00)','','만 6세 이상'),
('PF238095','manage1','FC000001','천 개의 파랑','2024.05.12','2024.05.26','2시간 20분','R석 90,000원, S석 60,000원, A석 30,000원','뮤지컬','공연예정','2024-03-26 15:00:00','http://www.kopis.or.kr/upload/pfmPoster/PF_PF238095_240326_131838.gif','http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF238095_240326_0118380.jpg','화요일(19:30), 수요일(14:30,19:30), 목요일 ~ 금요일(19:30), 토요일(14:00,19:00), 일요일(14:00), HOL(14:00,19:00)','','만 7세 이상'),
('PF238098','manage1','FC000016','미스터트롯2 진선미 콘서트: 트롯트립 [성남]','2024.04.20','2024.04.20','2시간','SR석 154,000원, R석 132,000원, S석 110,000원','대중음악','공연예정','2024-03-26 15:00:00','http://www.kopis.or.kr/upload/pfmPoster/PF_PF238098_240326_133157.gif','http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF238098_240326_0131570.jpg','토요일(14:00,19:00)','','만 7세 이상'),
('PF238100','manage1','FC000521','미스터트롯2 진선미 콘서트: 트롯트립 [춘천]','2024.06.01','2024.06.01','2시간','SR석 154,000원, R석 132,000원, S석 110,000원','대중음악','공연예정','2024-03-26 15:00:00','http://www.kopis.or.kr/upload/pfmPoster/PF_PF238100_240326_134430.gif','http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF238100_240326_0144300.jpg','토요일(13:00,18:00)','','만 7세 이상'),
('PF238102','manage1','FC001928','손태진 & 에녹 디너콘서트','2024.06.07','2024.06.08','3시간','R석 300,000원, S석 280,000원','대중음악','공연예정','2024-03-26 15:00:00','http://www.kopis.or.kr/upload/pfmPoster/PF_PF238102_240326_135956.gif','http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF238102_240326_0159560.jpg','금요일(19:00), 토요일(13:00,18:00)','','만 7세 이상'),
('PF238103','manage1','FC001908','LiSA LiVE is Smile Always ASiA TOUR [서울]','2024.07.20','2024.07.20','1시간 30분','전석 132,000원','대중음악','공연예정','2024-03-26 15:00:00','http://www.kopis.or.kr/upload/pfmPoster/PF_PF238103_240326_140911.jpg','http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF238103_240326_0209110.jpg','토요일(19:00)','','만 7세 이상'),
('PF238104','manage1','FC001837','DAY6 CONCERT: Welcome to the Show','2024.04.12','2024.04.14','-','스탠딩 154,000원, 지정석 154,000원','대중음악','공연예정','2024-03-26 15:00:00','http://www.kopis.or.kr/upload/pfmPoster/PF_PF238104_240326_142917.jpg','http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF238104_240326_0229170.jpg','금요일(20:00), 토요일(18:00), 일요일(17:00)','','만 7세 이상'),
('PF238130','manage1','FC000127','미스터트롯2 진선미 콘서트: 트롯트립 [고양]','2024.06.15','2024.06.15','2시간','SR석 154,000원, R석 132,000원, S석 110,000원','대중음악','공연예정','2024-03-27 15:00:00','http://www.kopis.or.kr/upload/pfmPoster/PF_PF238130_240327_102942.gif','http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF238130_240327_1029420.jpg','토요일(13:00,18:00)','','만 7세 이상'),
('PF238156','manage1','FC001296','미스터트롯2 진선미 콘서트: 트롯트립 [대전]','2024.06.29','2024.06.29','2시간','SR석 154,000원, R석 132,000원, S석 110,000원','대중음악','공연예정','2024-03-27 15:00:00','http://www.kopis.or.kr/upload/pfmPoster/PF_PF238156_240327_124344.gif','http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF238156_240327_1243440.jpg','토요일(13:00,18:00)','','만 7세 이상'),
('PF238161','manage1','FC002679','나훈아 라스트 콘서트: 고마웠습니다! [청주]','2024.05.11','2024.05.11','2시간','R석 165,000원, S석 143,000원, A석 121,000원','대중음악','공연예정','2024-03-27 15:00:00','http://www.kopis.or.kr/upload/pfmPoster/PF_PF238161_240327_125135.jpg','http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF238161_240327_1251353.jpg','토요일(15:00,19:30)','','만 10세 이상'),
('PF238260','manage1','FC001247','P1Harmony LIVE TOUR, P1ustage H: UTOP1A','2024.04.27','2024.04.28','2시간','스탠딩VIP 154,000원, 스탠딩R 132,000원, S석 121,000원, A석 99,000원','대중음악','공연예정','2024-03-28 18:00:00','http://www.kopis.or.kr/upload/pfmPoster/PF_PF238260_240328_131820.PNG','http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF238260_240328_0118200.jpg','토요일(19:00), 일요일(17:00)','','만 7세 이상'),
('PF238277','manage1','FC003347','SEVENTEEN TOUR, FOLLOW AGAIN [서울]','2024.04.27','2024.04.28','3시간','VIP석 198,000원, R석 154,000원, S석 132,000원','대중음악','공연예정','2024-03-28 15:00:00','http://www.kopis.or.kr/upload/pfmPoster/PF_PF238277_240328_135657.gif','http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF238277_240328_0156571.jpg','토요일(18:00), 일요일(17:00)','','만 9세 이상'),
('PF238280','manage1','FC001384','6시 퇴근 [대학로]','2024.05.17','2024.08.11','1시간 50분','R석 66,000원, S석 55,000원','뮤지컬','공연예정','2024-03-28 15:00:00','http://www.kopis.or.kr/upload/pfmPoster/PF_PF238280_240328_140834.gif','http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF238280_240328_0208340.jpg','화요일 ~ 금요일(20:00), 토요일(15:00,19:00), 일요일(14:00,18:00), HOL(14:00,18:00)','','만 13세 이상'),
('PF238282','manage1','FC000001','제14회 대한민국발레축제, BALLET LAYER','2024.06.05','2024.06.07','1시간 50분','R석 70,000원, S석 50,000원, A석 20,000원','무용','공연예정','2024-03-28 15:00:00','http://www.kopis.or.kr/upload/pfmPoster/PF_PF238282_240328_141509.gif','http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF238282_240328_0215090.jpg','수요일 ~ 금요일(19:30)','','만 7세 이상'),
('PF238290','manage1','FC000031','김재환 팬콘서트: Wind Tale','2024.04.27','2024.04.27','1시간 30분','전석 110,000원','대중음악','공연예정','2024-03-28 18:00:00','http://www.kopis.or.kr/upload/pfmPoster/PF_PF238290_240328_143519.gif','http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF238290_240328_0235190.jpg','토요일(14:00,18:00)','','만 7세 이상'),
('PF238364','manage1','FC003045','로스트아크 OST 전국투어 콘서트: SOUND OF LOST ARK [서울]','2024.04.05','2024.04.05','1시간 20분','R석 50,000원, S석 40,000원, A석 30,000원','서양음악(클래식)','공연중','2024-03-29 15:00:00','http://www.kopis.or.kr/upload/pfmPoster/PF_PF238364_240329_131111.gif','http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF238364_240329_0111110.jpg','금요일(20:00)','','만 19세 이상'),
('PF238457','manage1','FC001592','메가필드뮤직페스티벌','2024.06.15','2024.06.16','9시간','1일권 110,000원','대중음악','공연예정','2024-04-01 18:00:00','http://www.kopis.or.kr/upload/pfmPoster/PF_PF238457_240401_142701.gif','http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF238457_240401_0227010.jpg','토요일 ~ 일요일(12:00)','','전체 관람가'),
('PF238468','manage1','FC000518','유키 구라모토 내한 25주년 기념 콘서트, GENTLE MIND [구미]','2024.05.31','2024.05.31','1시간 50분','VIP석 50,000원, R석 40,000원, S석 30,000원, A석 20,000원','서양음악(클래식)','공연예정','2024-04-04 18:00:00','http://www.kopis.or.kr/upload/pfmPoster/PF_PF238468_240401_151410.gif','http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF238468_240401_0314100.jpg','금요일(19:30)','','만 7세 이상');
/*!40000 ALTER TABLE `PERFORMANCE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PERFORMANCEHALL`
--

DROP TABLE IF EXISTS `PERFORMANCEHALL`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PERFORMANCEHALL` (
  `mt10id` varchar(255) NOT NULL,
  `fcltynm` varchar(255) NOT NULL,
  `la` varchar(255) NOT NULL,
  `lo` varchar(255) NOT NULL,
  `telno` varchar(20) NOT NULL,
  `sidonm` varchar(255) NOT NULL,
  `adres` varchar(255) NOT NULL,
  PRIMARY KEY (`mt10id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PERFORMANCEHALL`
--

LOCK TABLES `PERFORMANCEHALL` WRITE;
/*!40000 ALTER TABLE `PERFORMANCEHALL` DISABLE KEYS */;
INSERT INTO `PERFORMANCEHALL` VALUES
('FC000001','예술의전당 [서울]','37.4786896','127.01182410000001','02-580-1300','서울','서울특별시 서초구 남부순환로 2406 (서초동)'),
('FC000005','국립극단 [명동]','37.563999','126.98417380000001','00-1644-2003','서울','서울특별시 중구 명동길 35 (명동1가)'),
('FC000008','국립중앙박물관 극장 용','37.5234203','126.97993989999998','00-1544-5955','서울','서울특별시 용산구 서빙고로 137 (용산동6가)'),
('FC000009','국립국악원','37.4786094','127.01130690000002','02-580-3300','서울','서울특별시 서초구 남부순환로 2364 (서초동) 국립국악원'),
('FC000010','유니버설아트센터','37.5505555','127.08826240000008','070-7124-1740','서울','서울특별시 광진구 천호대로 664 (능동)'),
('FC000011','디큐브링크아트센터','37.5084321','126.88873319999993','02-2211-3000','서울','서울특별시 구로구 경인로 662 (신도림동, 디큐브시티)'),
('FC000012','샤롯데씨어터','37.5105162','127.10056299999997','00-1644-0078','서울','서울특별시 송파구 올림픽로 240 (잠실동)'),
('FC000014','충무아트센터','37.5660139','127.01481309999997','02-2230-6601','서울','서울특별시 중구 퇴계로 387 (흥인동)'),
('FC000016','성남아트센터','37.4027309','127.13124349999998','031-783-8000','경기','경기도 성남시 분당구 성남대로 808 (야탑동)'),
('FC000031','블루스퀘어','37.5408717','127.00244010000006','00-1544-1591','서울','서울특별시 용산구 이태원로 294 (한남동)'),
('FC000127','고양아람누리','37.6614074','126.77433789999998','00-1577-7766','경기','경기도 고양시 일산동구 중앙로 1286 (마두동) 고양아람누리'),
('FC000198','경향아트힐','37.5681269','126.96995219999997','02-722-4400','서울','서울특별시 중구 정동길 3 (정동)'),
('FC000205','예스24 라이브홀 (구. 악스코리아)','37.5456881','127.1079671','02-457-5114','서울','서울특별시 광진구 구천면로 20 (광장동)'),
('FC000382','티오엠씨어터(구. 문화공간필링)','37.5822467','127.00371659999996','00-1544-8303','서울','서울특별시 종로구 대학로8가길 85 (동숭동)'),
('FC000477','한국소리문화의전당','35.855245','127.13766699999996','063-270-8000','전북','전라북도 전주시 덕진구 소리로 31 (덕진동1가) 소리문화전당'),
('FC000497','부산시민회관','35.138781','129.06525499999998','051-630-5200','부산','부산광역시 동구 자성로133번길 16 (범일동)'),
('FC000518','구미시문화예술회관','36.1183785442842','128.348984109841','054-480-4560','경북','경상북도 구미시 송정대로 89 (송정동 75)'),
('FC000521','강원대학교 백령아트센터','37.8691718944428','127.744539492098','033-250-7201','강원','강원도 춘천시 강원대학길 1 (효자동)'),
('FC000743','광양시문화예술회관','34.9799827','127.58758920000002','061-797-2529','전남','전라남도 광양시 광양읍 향교길 9-30'),
('FC000808','과천시민회관','37.4279091','126.98950450000007','02-504-7300','경기','경기도 과천시 통영로 5 (중앙동)'),
('FC000838','가온아트홀 [부산]','35.1381412947754','129.065077043576','00-1600-1602','부산','부산광역시 동구 자성로 133번길 10'),
('FC000879','거창문화센터','35.6742953691642','127.910316706376','055-940-8460','경남','경상남도 거창군 수남로 2181 거창군교육문화센터'),
('FC001081','경주세계문화엑스포','35.8320536','129.28811599999995','054-748-3011','경북','경상북도 경주시 경감로 614 (천군동)'),
('FC001142','R&J씨어터(구. 연진아트홀)','37.5802937','127.00526530000002','02-747-1912','서울','서울특별시 종로구 낙산길 14 (동숭동)'),
('FC001208','홍익대 대학로 아트센터','37.5769696','127.00203310000006','02-742-0300','서울','서울특별시 종로구 대학로 57 (연건동)'),
('FC001209','공간아울','37.5818372','127.00227960000007','02-3675-0116','서울','서울특별시 종로구 대학로 120 (동숭동)'),
('FC001233','유니플렉스','37.5811328','127.00369969999997','02-766-2115','서울','서울특별시 종로구 대학로12길 64 (동숭동)'),
('FC001236','예스24 스테이지(구. DCF대명문화공장)','37.5827158','127.00324840000007','02-742-9637','서울','서울특별시 종로구 대학로12길 21 (동숭동)'),
('FC001239','계명아트센터','35.8570982','128.48714700000005','053-580-6600','대구','대구광역시 달서구 달구벌대로 1095 - 0 계명대학교'),
('FC001247','올림픽공원','37.52112','127.12836360000005','02-410-1114','서울','서울특별시 송파구 올림픽로 424 올림픽공원 (방이동)'),
('FC001296','충남대학교 정심화국제문화회관','36.3679381','127.3442986','042-821-8081','대전','대전광역시 유성구 대학로 99'),
('FC001363','경북대학교','35.8898417','128.61269530000004','053-950-7122','대구','대구광역시 북구 대학로 80 (산격동)'),
('FC001370','광림아트센터','37.5238342','127.02511649999997','02-2056-5787','서울','서울특별시 강남구 논현로163길 33 (신사동)'),
('FC001384','SH아트홀','37.5798541','127.0035752','02-747-2265','서울','서울특별시 종로구 동숭길 25 (동숭동)'),
('FC001513','롯데콘서트홀','37.5130605','127.10349500000007','00-1544-7744','서울','서울특별시 송파구 올림픽로 300 (신천동) 롯데월드몰 8층 롯데문화재단'),
('FC001528','링크아트센터드림','37.5820171','127.00353629999995','02-3481-8843','서울','서울특별시 종로구 동숭길 123 (동숭동)'),
('FC001592','난지한강공원','37.559665','126.88937149999992','02-3780-0611','서울','서울특별시 마포구 한강난지로 162 (상암동)'),
('FC001722','서울랜드','37.4347742','127.01673249999999','02-509-6000','경기','경기도 과천시 광명로 181 (막계동)'),
('FC001793','연세대학교 백주년기념관','37.5620902','126.93805689999999','02-2123-3697','서울','서울특별시 서대문구 연세로 50 (신촌동)'),
('FC001837','잠실종합운동장','37.5140929','127.07495340000003','02-2240-8800','서울','서울특별시 송파구 올림픽로 25 (잠실동)'),
('FC001845','VERY(베리컴퍼니)','37.5822989','127.00477669999998','02-3674-2525','서울','서울특별시 종로구 동숭3길 30 (동숭동)'),
('FC001877','서경대학교 공연예술센터','37.5820171','127.00353629999995','02-940-7114','서울','서울특별시 종로구 동숭길 148 (혜화동)'),
('FC001908','고려대학교 화정체육관','37.592940','127.024903','02-3290-4097','서울','서울특별시 성북구 안암로 145 (안암동5가)'),
('FC001928','더케이호텔 [서울]','37.4682875','127.0330648','02-571-8100','서울','서울특별시 서초구 바우뫼로 12길 70 (양재동)'),
('FC002083','인천아시아드주경기장','37.5465314','126.6639609','032-456-2100','인천','인천광역시 서구 봉수대로 806 (연희동)'),
('FC002090','CLUB bender(클럽 벤더)','37.5500517','126.923351','02-6406-5646','서울','서울특별시 마포구 와우산로14길 4 (상수동) 지하1층'),
('FC002162','드림씨어터 [부산]','35.1482786','129.0654385','00-1833-3755','부산','부산광역시 남구 전포대로 133 (문현동)'),
('FC002226','광야아트센터','37.5238653','127.0396166','02-741-9182','서울','서울특별시 강남구 선릉로 806 (청담동)'),
('FC002674','공간소극장 [대연역]','35.1342618','129.0944425','051-611-8518','부산','부산광역시 남구 수영로 지하 242 (대연동)'),
('FC002679','청주대학교','36.6508565','127.4951991','043-229-8114','충북','충청북도 청주시 청원구 대성로 298 (내덕동)'),
('FC003045','LG아트센터 서울','37.565363','126.8293888','00-1661-0017','서울','서울특별시 강서구 마곡중앙로 136(마곡동)'),
('FC003195','거암아트홀','37.5195101','127.019106','-','서울','서울특별시 강남구 강남대로 652(신사동)'),
('FC003347','서울월드컵경기장','37.5682884','126.897273','02-2128-2002','서울','서울특별시 마포구 월드컵로 240(성산동)'),
('FC003388','NC백화점','37.3132936','126.8309972','-','경기','경기도 안산시 단원구 광덕대로 194(고잔동)');
/*!40000 ALTER TABLE `PERFORMANCEHALL` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `RESERVATION`
--

DROP TABLE IF EXISTS `RESERVATION`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `RESERVATION` (
  `imp_uid` varchar(255) NOT NULL,
  `mt20id` varchar(255) NOT NULL,
  `manage_id` varchar(255) NOT NULL,
  `mt10id` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `res_date` date NOT NULL,
  `paid_amount` int(11) NOT NULL,
  `success` bit(1) NOT NULL,
  `watchstate` bit(1) NOT NULL,
  `prestate` bit(1) NOT NULL,
  `selectdate` date NOT NULL,
  `selecttime` time NOT NULL,
  `selectseat` varchar(255) NOT NULL,
  `people` int(11) NOT NULL,
  PRIMARY KEY (`imp_uid`),
  KEY `RESERVATION_MEMBER_user_id_fk` (`user_id`),
  KEY `RESERVATION_PERFORMANCE_manage_id_fk` (`manage_id`),
  KEY `RESERVATION_PERFORMANCE_mt10id_fk` (`mt10id`),
  KEY `RESERVATION_PERFORMANCE_mt20id_fk` (`mt20id`),
  CONSTRAINT `RESERVATION_MEMBER_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `MEMBER` (`user_id`),
  CONSTRAINT `RESERVATION_PERFORMANCE_manage_id_fk` FOREIGN KEY (`manage_id`) REFERENCES `PERFORMANCE` (`manage_id`),
  CONSTRAINT `RESERVATION_PERFORMANCE_mt10id_fk` FOREIGN KEY (`mt10id`) REFERENCES `PERFORMANCE` (`mt10id`),
  CONSTRAINT `RESERVATION_PERFORMANCE_mt20id_fk` FOREIGN KEY (`mt20id`) REFERENCES `PERFORMANCE` (`mt20id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RESERVATION`
--

LOCK TABLES `RESERVATION` WRITE;
/*!40000 ALTER TABLE `RESERVATION` DISABLE KEYS */;
/*!40000 ALTER TABLE `RESERVATION` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `REVIEW`
--

DROP TABLE IF EXISTS `REVIEW`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `REVIEW` (
  `pre_id` varchar(255) NOT NULL,
  `imp_uid` varchar(255) NOT NULL,
  `mt20id` varchar(255) NOT NULL,
  `manage_id` varchar(255) NOT NULL,
  `mt10id` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `pretitle` varchar(255) NOT NULL,
  `precontent` text NOT NULL,
  `predate` datetime NOT NULL,
  `prestar` varchar(20) NOT NULL,
  `recommend` int(11) NOT NULL,
  PRIMARY KEY (`pre_id`),
  KEY `REVIEW_RESERVATION_imp_uid_fk` (`imp_uid`),
  KEY `REVIEW_RESERVATION_user_id_fk` (`user_id`),
  KEY `REVIEW_RESERVATION_manage_id_fk` (`manage_id`),
  KEY `REVIEW_RESERVATION_mt10id_fk` (`mt10id`),
  KEY `REVIEW_RESERVATION_mt20id_fk` (`mt20id`),
  CONSTRAINT `REVIEW_RESERVATION_imp_uid_fk` FOREIGN KEY (`imp_uid`) REFERENCES `RESERVATION` (`imp_uid`),
  CONSTRAINT `REVIEW_RESERVATION_manage_id_fk` FOREIGN KEY (`manage_id`) REFERENCES `RESERVATION` (`manage_id`),
  CONSTRAINT `REVIEW_RESERVATION_mt10id_fk` FOREIGN KEY (`mt10id`) REFERENCES `RESERVATION` (`mt10id`),
  CONSTRAINT `REVIEW_RESERVATION_mt20id_fk` FOREIGN KEY (`mt20id`) REFERENCES `RESERVATION` (`mt20id`),
  CONSTRAINT `REVIEW_RESERVATION_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `RESERVATION` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `REVIEW`
--

LOCK TABLES `REVIEW` WRITE;
/*!40000 ALTER TABLE `REVIEW` DISABLE KEYS */;
/*!40000 ALTER TABLE `REVIEW` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-05 10:23:57
