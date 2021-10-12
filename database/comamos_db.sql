-- MySQL dump 10.13  Distrib 8.0.25, for macos11 (x86_64)
--
-- Host: 127.0.0.1    Database: comamos_db
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
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `idOrder` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `id_restaurant` int NOT NULL,
  `estado` varchar(45) NOT NULL,
  `comensales` int NOT NULL,
  `fecha_reserva` datetime NOT NULL,
  `total` int NOT NULL,
  PRIMARY KEY (`idOrder`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,1,14,'Pendiente',4,'2021-10-14 23:00:00',1780),(2,2,1,'Cancelada',4,'2021-06-24 00:24:18',2700),(3,1,1,'Confirmada',2,'2021-06-24 11:45:14',1200),(4,1,1,'Completada',4,'2021-06-24 01:23:11',2700),(5,1,1,'Pendiente',4,'2021-10-13 23:00:00',600),(6,1,14,'Pendiente',2,'2021-10-15 23:22:00',800),(7,1,10,'Pendiente',2,'2021-10-13 23:22:00',1500),(8,1,14,'Pendiente',4,'2021-10-16 23:43:00',1780),(9,1,12,'Pendiente',1,'2021-10-21 23:43:00',600),(10,1,11,'Pendiente',3,'2021-10-20 23:43:00',1150),(11,2,11,'Pendiente',2,'2021-10-13 14:03:00',2000),(12,2,4,'Pendiente',1,'2021-10-14 14:04:00',810),(13,2,11,'Pendiente',2,'2021-10-14 14:07:00',900);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders_products`
--

DROP TABLE IF EXISTS `orders_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders_products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_order` int NOT NULL,
  `id_product` int NOT NULL,
  `cantidad` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders_products`
--

LOCK TABLES `orders_products` WRITE;
/*!40000 ALTER TABLE `orders_products` DISABLE KEYS */;
INSERT INTO `orders_products` VALUES (2,2,2,3),(3,3,1,1),(4,3,2,1),(5,4,2,3),(25,6,9,1),(26,7,15,1),(27,8,9,1),(28,8,11,1),(29,9,26,1),(30,10,23,1),(31,11,22,2),(32,11,25,2),(33,12,7,1),(34,13,21,2);
/*!40000 ALTER TABLE `orders_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Ensalada Caprese','Mozzarella fior di late, tomate natural, albahaca fresca y olivas negras','/img/products/1628857560455.jpeg','Entrada',300,1),(2,'Pizza Margherita','Pomodoro italiano, mozzarella fior di latte y albahaca','/img/products/1629579083453.jpeg','Plato Principal',900,1),(3,'Curry Gamba Style','Langostinos salteados al curry, hojas de lechuga morada y francesa, palta, gajos de naranjas al vivo y vinagreta cítrica de yogurth natural','/img/products/1629579261486.webp','Plato Principal',1100,3),(4,'Risotto de Arroz Carnaroli y ojo de bife braseado','Con azafrán español y ojo de bife braseado al vino tinto','/img/products/1629579308261.webp','Plato Principal',920,3),(5,'Creppe de Dulce de Leche','Incluye bocha de helado a elección','/img/products/1629579344986.webp','Postre',450,3),(6,'Twenty Vegan (20 unidades)','Vegan Boricua, Tibet roll, Maki Shinkin, Kinoko roll','/img/products/1629580158158.jpeg','Plato Principal',1550,4),(7,'Veggie Chaufa Wok','Salteado de arroz, huevo, palta y vegetales (pimientos, zanahoria, cebollas, negui). Acompañado con papas fritas y salsa huancaína','/img/products/1629580192624.jpeg','Plato Principal',810,4),(9,'Pizza calabresa','Queso mozzarella con rodajas de calabresa','/img/products/1631836819584.jpeg','Plato Principal',800,14),(10,'Botella de Coca-Cola','Botella de vidrio Coca-Cola 350 ml','/img/products/1631837295060.jpeg','Bebida',70,14),(11,'Pizza portuguesa','Cebolla morada, aceitunas negras, pimiento rojo y verde.','/img/products/1631837566120.jpg','Plato Principal',980,14),(12,'Pizza calabresa','Queso mozarella con rodajas de calabresa','/img/products/1631837627947.jpeg','Plato Principal',800,14),(13,'Copa de vino','Vino Rutini Cabernet-Malbec','/img/products/1631837799875.jpeg','Bebida',250,10),(14,'Sprite','Gaseosa 1,5 lts','/img/products/1631837919901.jpeg','Bebida',150,10),(15,'Asado de tira para 2','Asado de tira para compartir, acompañado de papas fritas.','/img/products/1631838786123.jpeg','Plato Principal',1500,10),(16,'Media docena de empanadas','6 empanadas de carne/pollo/jamos y queso.','/img/products/1631838928448.jpeg','Entrada',600,10),(17,'Cerveza Corona','Botella Corona 710cc','/img/products/1631839041830.jpeg','Bebida',160,10),(18,'Limonada','Vaso 500ml de agua con limon y menta.','/img/products/1631839148660.jpeg','Bebida',100,10),(19,'Latas Coca-Cola','Latitas 350ml Coca-Cola','/img/products/1631839274812.jpeg','Bebida',80,10),(20,'Lasagna','Lasagna de queso y carne con salsa bolognesa','/img/products/1631839497989.jpeg','Plato Principal',550,11),(21,'Fideos Caseros','Fideos caseros con jamon cocido y salsa blanca.','/img/products/1631839555401.jpeg','Plato Principal',450,11),(22,'Tiramisu','Postre tiramisu para 2 personas.','/img/products/1631839630362.jpeg','Postre',300,11),(23,'Picada italiana','Picada italiana para compartir entre 3 personas','/img/products/1631839704241.jpeg','Plato Principal',1150,11),(24,'Aperol','Aperol Spritz, Coctel/Aperitivo.','/img/products/1631839794671.jpeg','Bebida',400,11),(25,'Limoncello','Limoncello 850ml','/img/products/1631839861921.jpeg','Bebida',700,11),(26,'Tacos','3 tacos de carne ','/img/products/1631840119672.jpeg','Plato Principal',600,12),(27,'Enchiladas','4 enchiladas de pollo desmenuzado.','/img/products/1631840174673.jpeg','Entrada',680,12),(28,'Chips con guacamole','Chips con harina de maiz con guacamole para disfrutar','/img/products/1631840303557.jpeg','Entrada',570,12),(29,'Jarrito 473ml','Bebida mexicana sin alcohol sabor mandarina.','/img/products/1631840405623.jpeg','Bebida',90,12),(30,'Jarrito Tamarind 473ml','Bebida mexicana sin alcohol sabor tamarindo','/img/products/1631840453666.jpeg','Bebida',90,12),(31,'Cerveza Modelo','Botella de cerveza modelo 355ml ','/img/products/1631840539267.jpeg','Bebida',140,12);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restaurants`
--

DROP TABLE IF EXISTS `restaurants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `restaurants` (
  `idRestaurant` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `direccion` varchar(45) NOT NULL,
  `capacidad` int NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `perfil` varchar(45) NOT NULL,
  `avatar` varchar(255) NOT NULL,
  PRIMARY KEY (`idRestaurant`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurants`
--

LOCK TABLES `restaurants` WRITE;
/*!40000 ALTER TABLE `restaurants` DISABLE KEYS */;
INSERT INTO `restaurants` VALUES (1,'Pizzeria Villa Crespo','Charcas 4636, CABA',20,'villacrespopizzas@hotmail.com','$2a$10$z3DNHOvYOIJHphes8a.it./dlKmQvhM3xh3h5IVClR049cP50TOsW','negocio','/img/avatars/1629662473335.jpg'),(3,'Amalia Restaurante','Humberto 1º 299, San Telmo, Buenos Aires',30,'amaliarestaruante@hotmail.com','$2a$10$4cgD2iW96V9pYju3nHeeH.DBcllA/z1uFT4v8zGMTD7dY0Pv6GP4G','negocio','/img/avatars/1629579213776.jpg'),(4,'Kotten, Nikkei and Veggie','Jorge Luis Borges 1891, Buenos Aires',45,'nandv@gmail.com','$2a$10$23mkNPK6ChH9akfe52HYJOvWwQe2O1QgWHmZPAINgwpIWEDX78kE6','negocio','/img/avatars/1629580091520.jpeg'),(9,'Restaurant España','San Martín 2644, Santa Fe',65,'restaurantespania@hotmail.com','$2a$10$eU.H5ND3w4Zx8vV8GFfQue/QFvbjtWYdbMHvLNgRaQIo9K/dnymd2','negocio','/img/avatars/1629916282610.jpeg'),(10,'la pizzada','Av. aconquija 1300',50,'lapizzada@gmail.com','$2a$10$a0/C/kIEszGkKkwWf3RxyuXNJQEKvtukuCgRb.9CZKj3efTXqq2xC','negocio','/img/avatars/1634049784956.jpg'),(11,'Tarantino','Av. Ejército del Norte 196',80,'tarantino@gmail.com','$2a$10$SEC2lG.VJ7rmJOAp3G1JDe7N.luYcY2fZ68NJbB6lWjvJgrb0Ny2q','negocio','/img/avatars/1634050185358.jpg'),(12,'Positano','Av. Mate de Luna 2890',40,'positano@gmail.com','$2a$10$DsbV2vmrYU2RXcZIuUltfunoGortw6/SOcmD14A6dRycKFDN.mV9y','negocio','/img/avatars/1634050291223.jpg'),(13,'Mexican Island','parana 839',30,'mexicanisland@gmail.com','$2a$10$Ei7z8hmd6bn1h9hAproM0eyLlB1IDEAQhca8DAxAXU2dLtZmtn/5S','negocio','/img/avatars/1634050350537.jpg'),(14,'Sao Sushi','Florida 37',60,'saosushi@gmail.com','$2a$10$kTC8r3gBxAgQy1sWVd3DiOOBExjBk.lKahIDk.xuYQgmM/9ulV/pW','negocio','/img/avatars/1634050394019.jpg');
/*!40000 ALTER TABLE `restaurants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tables`
--

DROP TABLE IF EXISTS `tables`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tables` (
  `idTable` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `ubication` varchar(45) NOT NULL,
  `capacity` int NOT NULL,
  `status` varchar(45) NOT NULL,
  `id_restaurant` int NOT NULL,
  PRIMARY KEY (`idTable`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tables`
--

LOCK TABLES `tables` WRITE;
/*!40000 ALTER TABLE `tables` DISABLE KEYS */;
INSERT INTO `tables` VALUES (1,'Mesa 1','Exterior',2,'abierta',1),(3,'Mesa 2','Exterior',3,'abierta',1),(4,'Mesa 3','Interior',4,'abierta',1),(6,'Mesa 5','Exterior',5,'abierta',1),(7,'Mesa 6','Exterior',2,'abierta',1),(8,'Mesa 1','Interior',4,'abierta',3),(9,'Mesa 2','Ventana',2,'abierta',3),(10,'Mesa 3','Vereda',2,'abierta',3),(11,'Mesa 4','Interior',6,'abierta',3),(12,'Mesa 5','Interior',4,'abierta',3),(13,'Mesa 6','Interior',6,'abierta',3),(14,'Mesa 7','Exterior',2,'cerrada',3),(15,'Mesa 8','Interior',4,'abierta',3),(16,'Mesa 1','Interior',2,'abierta',4),(17,'Mesa Familiar','Interior',6,'abierta',9),(18,'Mesa 7','Interior',4,'cerrada',1);
/*!40000 ALTER TABLE `tables` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `idUser` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `apellido` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `perfil` varchar(10) NOT NULL,
  `avatar` varchar(255) NOT NULL,
  PRIMARY KEY (`idUser`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Alejandro','Saidel','alegpascuale@gmail.com','$2a$10$gVw28IwlfB4vUGANXGEhU.2taWnm0d4WHXpnXlAAtcraFAWRDCW2i','usuario','/img/avatars/1630956736660.JPG'),(2,'Martin','Gottero','test@gmail.com','$2a$10$OQEyfL440tER6sDbZex.sOgMSTLvdI1OT.ihdUfgTBrZCSAu1vwVG','usuario','/img/avatars/1629649792387.jpg'),(15,'Explicabo Aut occae','Voluptatibus aut est','himyzol@mailinator.com','$2a$10$DjZXskAI.JIQDvB3AJb3vuvgOwODxOaclLYf8eSQSgyzyZhD45AXW','usuario','/img/avatars/1631791442766.jpeg');
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

-- Dump completed on 2021-10-12 11:58:06
