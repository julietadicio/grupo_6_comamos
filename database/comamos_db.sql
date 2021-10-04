-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-09-2021 a las 02:36:11
-- Versión del servidor: 10.4.20-MariaDB
-- Versión de PHP: 8.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `comamos_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orders`
--

CREATE TABLE `orders` (
  `idOrder` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_restaurant` int(11) NOT NULL,
  `estado` varchar(45) COLLATE utf8_bin NOT NULL,
  `comensales` int(11) NOT NULL,
  `fecha_reserva` datetime NOT NULL,
  `total` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `orders`
--

INSERT INTO `orders` (`idOrder`, `id_user`, `id_restaurant`, `estado`, `comensales`, `fecha_reserva`, `total`) VALUES
(1, 1, 1, 'Pendiente', 2, '2021-05-31 00:05:10', 600),
(2, 2, 1, 'Pendiente', 4, '2021-06-24 00:24:18', 2700),
(3, 1, 1, 'Cancelada', 2, '2021-06-24 11:45:14', 1200),
(4, 1, 1, 'Completada', 4, '2021-06-24 01:23:11', 2700);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orders_products`
--

CREATE TABLE `orders_products` (
  `id` int(11) NOT NULL,
  `id_order` int(11) NOT NULL,
  `id_product` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `orders_products`
--

INSERT INTO `orders_products` (`id`, `id_order`, `id_product`, `cantidad`) VALUES
(1, 1, 1, 2),
(2, 2, 2, 3),
(3, 3, 1, 1),
(4, 3, 2, 1),
(5, 4, 2, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `idPlato` int(11) NOT NULL,
  `plato` varchar(100) COLLATE utf8_bin NOT NULL,
  `descripcion` varchar(255) COLLATE utf8_bin NOT NULL,
  `imagen` varchar(255) COLLATE utf8_bin NOT NULL,
  `categoria` varchar(45) COLLATE utf8_bin NOT NULL,
  `precio` int(11) NOT NULL,
  `id_restaurant` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`idPlato`, `plato`, `descripcion`, `imagen`, `categoria`, `precio`, `id_restaurant`) VALUES
(1, 'Ensalada Caprese', 'Mozzarella fior di late, tomate natural, albahaca fresca y olivas negras', '/img/products/1628857560455.jpeg', 'Ensaladas', 300, 1),
(2, 'Pizza Margherita', 'Pomodoro italiano, mozzarella fior di latte y albahaca', '/img/products/1629579083453.jpeg', 'Pizzas', 900, 1),
(3, 'Curry Gamba Style', 'Langostinos salteados al curry, hojas de lechuga morada y francesa, palta, gajos de naranjas al vivo y vinagreta cítrica de yogurth natural', '/img/products/1629579261486.webp', 'Mariscos', 1100, 3),
(4, 'Risotto de Arroz Carnaroli y ojo de bife braseado', 'Con azafrán español y ojo de bife braseado al vino tinto', '/img/products/1629579308261.webp', 'Risotto', 920, 3),
(5, 'Creppe de Dulce de Leche', 'Incluye bocha de helado a elección', '/img/products/1629579344986.webp', 'Postres', 450, 3),
(6, 'Twenty Vegan (20 unidades)', 'Vegan Boricua, Tibet roll, Maki Shinkin, Kinoko roll', '/img/products/1629580158158.jpeg', 'Sushi', 1550, 4),
(7, 'Veggie Chaufa Wok', 'Salteado de arroz, huevo, palta y vegetales (pimientos, zanahoria, cebollas, negui). Acompañado con papas fritas y salsa huancaína', '/img/products/1629580192624.jpeg', 'Vegano', 810, 4),
(9, 'Pizza calabresa', 'Queso mozzarella con rodajas de calabresa', '/img/products/1631836819584.jpeg', 'Pizzas', 800, 10),
(10, 'Botella de Coca-Cola', 'Botella de vidrio Coca-Cola 350 ml', '/img/products/1631837295060.jpeg', 'Bebidas', 70, 10),
(11, 'Pizza portuguesa', 'Cebolla morada, aceitunas negras, pimiento rojo y verde.', '/img/products/1631837566120.jpg', 'Pizzas', 980, 10),
(12, 'Pizza calabresa', 'Queso mozarella con rodajas de calabresa', '/img/products/1631837627947.jpeg', 'Pizzas', 800, 10),
(13, 'Copa de vino', 'Vino Rutini Cabernet-Malbec', '/img/products/1631837799875.jpeg', 'Bebidas', 250, 10),
(14, 'Sprite', 'Gaseosa 1,5 lts', '/img/products/1631837919901.jpeg', 'Bebidas', 150, 10),
(15, 'Asado de tira para 2', 'Asado de tira para compartir, acompañado de papas fritas.', '/img/products/1631838786123.jpeg', 'Carnes', 1500, 11),
(16, 'Media docena de empanadas', '6 empanadas de carne/pollo/jamos y queso.', '/img/products/1631838928448.jpeg', 'Empanadas', 600, 11),
(17, 'Cerveza Corona', 'Botella Corona 710cc', '/img/products/1631839041830.jpeg', 'Bebidas', 160, 11),
(18, 'Limonada', 'Vaso 500ml de agua con limon y menta.', '/img/products/1631839148660.jpeg', 'Bebidas', 100, 11),
(19, 'Latas Coca-Cola', 'Latitas 350ml Coca-Cola', '/img/products/1631839274812.jpeg', 'Bebidas', 80, 11),
(20, 'Lasagna', 'Lasagna de queso y carne con salsa bolognesa', '/img/products/1631839497989.jpeg', 'Pastas', 550, 12),
(21, 'Fideos Caseros', 'Fideos caseros con jamon cocido y salsa blanca.', '/img/products/1631839555401.jpeg', 'Pastas', 450, 12),
(22, 'Tiramisu', 'Postre tiramisu para 2 personas.', '/img/products/1631839630362.jpeg', 'Postres', 300, 12),
(23, 'Picada italiana', 'Picada italiana para compartir entre 3 personas', '/img/products/1631839704241.jpeg', 'Picadas', 1150, 12),
(24, 'Aperol', 'Aperol Spritz, Coctel/Aperitivo.', '/img/products/1631839794671.jpeg', 'Bebidas', 400, 12),
(25, 'Limoncello', 'Limoncello 850ml', '/img/products/1631839861921.jpeg', 'Bebidas', 700, 12),
(26, 'Tacos', '3 tacos de carne ', '/img/products/1631840119672.jpeg', 'Carnes', 600, 13),
(27, 'Enchiladas', '4 enchiladas de pollo desmenuzado.', '/img/products/1631840174673.jpeg', 'Pollos', 680, 13),
(28, 'Chips con guacamole', 'Chips con harina de maiz con guacamole para disfrutar', '/img/products/1631840303557.jpeg', 'Entradas', 570, 13),
(29, 'Jarrito 473ml', 'Bebida mexicana sin alcohol sabor mandarina.', '/img/products/1631840405623.jpeg', 'Bebidas', 90, 13),
(30, 'Jarrito Tamarind 473ml', 'Bebida mexicana sin alcohol sabor tamarindo', '/img/products/1631840453666.jpeg', 'Bebidas', 90, 13),
(31, 'Cerveza Modelo', 'Botella de cerveza modelo 355ml ', '/img/products/1631840539267.jpeg', 'Bebidas', 140, 13);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `restaurants`
--

CREATE TABLE `restaurants` (
  `idRestaurant` int(11) NOT NULL,
  `nombre` varchar(45) COLLATE utf8_bin NOT NULL,
  `direccion` varchar(45) COLLATE utf8_bin NOT NULL,
  `capacidad` int(11) NOT NULL,
  `email` varchar(45) COLLATE utf8_bin NOT NULL,
  `password` varchar(255) COLLATE utf8_bin NOT NULL,
  `perfil` varchar(45) COLLATE utf8_bin NOT NULL,
  `avatar` varchar(255) COLLATE utf8_bin NOT NULL,
  `mapa` varchar(255) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `restaurants`
--

INSERT INTO `restaurants` (`idRestaurant`, `nombre`, `direccion`, `capacidad`, `email`, `password`, `perfil`, `avatar`, `mapa`) VALUES
(1, 'Pizzeria Villa Crespo', 'Charcas 4636', 20, 'villacrespopizzas@hotmail.com', '$2a$10$4B2qWPeK3ein9E013fl3Vev58ZppujWlBWPIJ/5iVNk.1AzS8cWxi', 'negocio', '/img/avatars/1629662473335.jpg', ''),
(3, 'Amalia Restaurante', 'Humberto 1º 299', 30, 'amaliarestaruante@hotmail.com', '$2a$10$4cgD2iW96V9pYju3nHeeH.DBcllA/z1uFT4v8zGMTD7dY0Pv6GP4G', 'negocio', '/img/avatars/1629579213776.jpg', ''),
(4, 'Kotten, Nikkei and Veggie', 'Jorge Luis Borges 1891', 45, 'nandv@gmail.com', '$2a$10$23mkNPK6ChH9akfe52HYJOvWwQe2O1QgWHmZPAINgwpIWEDX78kE6', 'negocio', '/img/avatars/1629580091520.jpeg', ''),
(10, 'la pizzada', 'Av. aconquija 1300', 50, 'lapizzada@gmail.com', '$2a$10$2JMbWVL6NCaGXZTl121Ls.zObI/pe2vHwEGswF5fKaoi5bhHPgdFK', 'negocio', '/img/avatars/user-buisness-avatar.jpg', NULL),
(11, 'Tarantino', 'Av. Ejército del Norte 196', 80, 'tarantino@gmail.com', '$2a$10$zJsSrXMmi08miTK8ZgcbwOLDqVZQAp6tB1htKzd6/xFr3N8Kqtb/m', 'negocio', '/img/avatars/user-buisness-avatar.jpg', NULL),
(12, 'Positano', 'Av. Mate de Luna 2890', 40, 'positano@gmail.com', '$2a$10$XuLDP0nC9zJsad7gDfhrVOfoLFlWx47j8/WpcRt8n6iZEMRoCiA/O', 'negocio', '/img/avatars/user-buisness-avatar.jpg', NULL),
(13, 'Mexican Island', 'parana 839', 30, 'mexicanisland@gmail.com', '$2a$10$bTpO8SGV5JPvMBVxVbC6pOGkd3DqmELFbc/LTJowZTf8fDVCcuTn6', 'negocio', '/img/avatars/user-buisness-avatar.jpg', NULL),
(14, 'Sao Sushi', 'Florida 37', 60, 'saosushi@gmail.com', '$2a$10$DwNobJf9QyYjQw2u80zPqeSlsWlhco7DwgpieCWhMGpN7a2venCKC', 'negocio', '/img/avatars/user-buisness-avatar.jpg', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tables`
--

CREATE TABLE `tables` (
  `idTable` int(11) NOT NULL,
  `name` varchar(45) COLLATE utf8_bin NOT NULL,
  `ubication` varchar(45) COLLATE utf8_bin NOT NULL,
  `capacity` int(11) NOT NULL,
  `status` varchar(45) COLLATE utf8_bin NOT NULL,
  `id_restaurant` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `tables`
--

INSERT INTO `tables` (`idTable`, `name`, `ubication`, `capacity`, `status`, `id_restaurant`) VALUES
(1, 'Mesa 1', 'Exterior', 2, 'abierta', 1),
(3, 'Mesa 2', 'Exterior', 3, 'abierta', 1),
(4, 'Mesa 3', 'Interior', 4, 'abierta', 1),
(5, 'Mesa 4', 'Exterior', 4, 'abierta', 1),
(6, 'Mesa 5', 'Exterior', 5, 'abierta', 1),
(7, 'Mesa 6', 'Exterior', 2, 'abierta', 1),
(8, 'Mesa 1', 'Interior', 4, 'abierta', 3),
(9, 'Mesa 2', 'Ventana', 2, 'abierta', 3),
(10, 'Mesa 3', 'Vereda', 2, 'abierta', 3),
(11, 'Mesa 4', 'Interior', 6, 'abierta', 3),
(12, 'Mesa 5', 'Interior', 4, 'abierta', 3),
(13, 'Mesa 6', 'Interior', 6, 'abierta', 3),
(14, 'Mesa 7', 'Exterior', 2, 'cerrada', 3),
(15, 'Mesa 8', 'Interior', 4, 'abierta', 3),
(16, 'Mesa 1', 'Interior', 2, 'abierta', 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `idUser` int(11) NOT NULL,
  `nombre` varchar(45) COLLATE utf8_bin NOT NULL,
  `apellido` varchar(45) COLLATE utf8_bin NOT NULL,
  `email` varchar(45) COLLATE utf8_bin NOT NULL,
  `password` varchar(255) COLLATE utf8_bin NOT NULL,
  `perfil` varchar(10) COLLATE utf8_bin NOT NULL,
  `avatar` varchar(255) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`idUser`, `nombre`, `apellido`, `email`, `password`, `perfil`, `avatar`) VALUES
(1, 'Alejandro', 'Pascuale', 'alegpascuale@gmail.com', '$2a$10$xdAzQlOsk8i1orGxNOpDB.v.NAsbVXDUHnbWPfPbrYZRzwqfVZmzS', 'usuario', '/img/avatars/1629661014957.jpeg'),
(2, 'Martin', 'Gottero', 'test@gmail.com', '$2a$10$hyEsNBjZ2Ei.G4hf4fg6se2pL4Hp/Lx3CPFeahu8dOJ3hXpsiTnL.', 'usuario', '/img/avatars/1629649792387.jpg'),
(6, 'Benjamin', 'Falcon', 'benjafalcond@gmail.com', '$2a$10$UntNX1mqP3ptCBq3StK.N.vjx/yndgfIocKQcdGE7QWjEVK93iqOm', 'usuario', '/img/avatars/Usuario-registro.png');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`idOrder`);

--
-- Indices de la tabla `orders_products`
--
ALTER TABLE `orders_products`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`idPlato`),
  ADD KEY `restaurant_idx` (`id_restaurant`);

--
-- Indices de la tabla `restaurants`
--
ALTER TABLE `restaurants`
  ADD PRIMARY KEY (`idRestaurant`);

--
-- Indices de la tabla `tables`
--
ALTER TABLE `tables`
  ADD PRIMARY KEY (`idTable`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`idUser`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `orders`
--
ALTER TABLE `orders`
  MODIFY `idOrder` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `orders_products`
--
ALTER TABLE `orders_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `idPlato` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de la tabla `restaurants`
--
ALTER TABLE `restaurants`
  MODIFY `idRestaurant` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `tables`
--
ALTER TABLE `tables`
  MODIFY `idTable` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
