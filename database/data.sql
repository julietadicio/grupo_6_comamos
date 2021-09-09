CREATE DATABASE  IF NOT EXISTS `comamos_db` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_bin */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `comamos_db`;
-- MySQL dump 10.13  Distrib 8.0.25, for macos11 (x86_64)
--
-- Host: localhost    Database: comamos_db
-- ------------------------------------------------------
-- Server version	8.0.25

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
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `idOrder` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `id_restaurant` int NOT NULL,
  `estado` varchar(45) NOT NULL,
  `comensales` int NOT NULL,
  `fecha_reserva` datetime NOT NULL,
  `total` int NOT NULL,
  PRIMARY KEY (`idOrder`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,1,1,'Pendiente',2,'2021-05-31 00:05:10',600),(2,2,1,'Pendiente',4,'2021-06-24 00:24:18',2700),(3,1,1,'Cancelada',2,'2021-06-24 11:45:14',1200),(4,1,1,'Completada',4,'2021-06-24 01:23:11',2700);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders_products`
--

DROP TABLE IF EXISTS `orders_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `orders_products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_order` int NOT NULL,
  `id_product` int NOT NULL,
  `cantidad` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders_products`
--

LOCK TABLES `orders_products` WRITE;
/*!40000 ALTER TABLE `orders_products` DISABLE KEYS */;
INSERT INTO `orders_products` VALUES (1,1,1,2),(2,2,2,3),(3,3,1,1),(4,3,2,1),(5,4,2,3);
/*!40000 ALTER TABLE `orders_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `idPlato` int NOT NULL AUTO_INCREMENT,
  `plato` varchar(100) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `imagen` varchar(255) NOT NULL,
  `categoria` varchar(45) NOT NULL,
  `precio` int NOT NULL,
  `id_restaurant` int NOT NULL,
  PRIMARY KEY (`idPlato`),
  KEY `restaurant_idx` (`id_restaurant`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Ensalada Caprese','Mozzarella fior di late, tomate natural, albahaca fresca y olivas negras','/img/products/1628857560455.jpeg','Ensaladas',300,1),(2,'Pizza Margherita','Pomodoro italiano, mozzarella fior di latte y albahaca','/img/products/1629579083453.jpeg','Pizzas',900,1),(3,'Curry Gamba Style','Langostinos salteados al curry, hojas de lechuga morada y francesa, palta, gajos de naranjas al vivo y vinagreta cítrica de yogurth natural','/img/products/1629579261486.webp','Mariscos',1100,3),(4,'Risotto de Arroz Carnaroli y ojo de bife braseado','Con azafrán español y ojo de bife braseado al vino tinto','/img/products/1629579308261.webp','Risotto',920,3),(5,'Creppe de Dulce de Leche','Incluye bocha de helado a elección','/img/products/1629579344986.webp','Postres',450,3),(6,'Twenty Vegan (20 unidades)','Vegan Boricua, Tibet roll, Maki Shinkin, Kinoko roll','/img/products/1629580158158.jpeg','Sushi',1550,4),(7,'Veggie Chaufa Wok','Salteado de arroz, huevo, palta y vegetales (pimientos, zanahoria, cebollas, negui). Acompañado con papas fritas y salsa huancaína','/img/products/1629580192624.jpeg','Vegano',810,4);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restaurants`
--

DROP TABLE IF EXISTS `restaurants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `restaurants` (
  `idRestaurant` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `direccion` varchar(45) NOT NULL,
  `capacidad` int NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `perfil` varchar(45) NOT NULL,
  `avatar` varchar(255) NOT NULL,
  `mapa` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idRestaurant`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurants`
--

LOCK TABLES `restaurants` WRITE;
/*!40000 ALTER TABLE `restaurants` DISABLE KEYS */;
INSERT INTO `restaurants` VALUES (1,'Pizzeria Villa Crespo','Charcas 4636',20,'villacrespopizzas@hotmail.com','$2a$10$4B2qWPeK3ein9E013fl3Vev58ZppujWlBWPIJ/5iVNk.1AzS8cWxi','negocio','/img/avatars/1629662473335.jpg',''),(3,'Amalia Restaurante','Humberto 1º 299',30,'amaliarestaruante@hotmail.com','$2a$10$4cgD2iW96V9pYju3nHeeH.DBcllA/z1uFT4v8zGMTD7dY0Pv6GP4G','negocio','/img/avatars/1629579213776.jpg',''),(4,'Kotten, Nikkei and Veggie','Jorge Luis Borges 1891',45,'nandv@gmail.com','$2a$10$23mkNPK6ChH9akfe52HYJOvWwQe2O1QgWHmZPAINgwpIWEDX78kE6','negocio','/img/avatars/1629580091520.jpeg','');
/*!40000 ALTER TABLE `restaurants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tables`
--

DROP TABLE IF EXISTS `tables`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `tables` (
  `idTable` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `ubication` varchar(45) NOT NULL,
  `capacity` int NOT NULL,
  `status` varchar(45) NOT NULL,
  `id_restaurant` int NOT NULL,
  PRIMARY KEY (`idTable`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tables`
--

LOCK TABLES `tables` WRITE;
/*!40000 ALTER TABLE `tables` DISABLE KEYS */;
INSERT INTO `tables` VALUES (1,'Mesa 1','Exterior',2,'abierta',1),(3,'Mesa 2','Exterior',3,'abierta',1),(4,'Mesa 3','Interior',4,'abierta',1),(5,'Mesa 4','Exterior',4,'abierta',1),(6,'Mesa 5','Exterior',5,'abierta',1),(7,'Mesa 6','Exterior',2,'abierta',1),(8,'Mesa 1','Interior',4,'abierta',3),(9,'Mesa 2','Ventana',2,'abierta',3),(10,'Mesa 3','Vereda',2,'abierta',3),(11,'Mesa 4','Interior',6,'abierta',3),(12,'Mesa 5','Interior',4,'abierta',3),(13,'Mesa 6','Interior',6,'abierta',3),(14,'Mesa 7','Exterior',2,'cerrada',3),(15,'Mesa 8','Interior',4,'abierta',3),(16,'Mesa 1','Interior',2,'abierta',4);
/*!40000 ALTER TABLE `tables` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `idUser` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `apellido` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `perfil` varchar(10) NOT NULL,
  `avatar` varchar(255) NOT NULL,
  PRIMARY KEY (`idUser`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Alejandro','Pascuale','alegpascuale@gmail.com','$2a$10$xdAzQlOsk8i1orGxNOpDB.v.NAsbVXDUHnbWPfPbrYZRzwqfVZmzS','usuario','/img/avatars/1629661014957.jpeg'),(2,'Martin','Gottero','test@gmail.com','$2a$10$hyEsNBjZ2Ei.G4hf4fg6se2pL4Hp/Lx3CPFeahu8dOJ3hXpsiTnL.','usuario','/img/avatars/1629649792387.jpg');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-08-24  8:52:59
