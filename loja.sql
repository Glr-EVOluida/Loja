CREATE DATABASE loja;
USE loja;

CREATE TABLE `clientes` (
  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `endereco` text NOT NULL,
  `cep` varchar(20) NOT NULL,
  `telefone` varchar(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(100) NOT NULL,
  `img` text NOT NULL
);

CREATE TABLE `compras` (
  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `preco` float NOT NULL,
  `idCliente` int(11) NOT NULL FOREIGN KEY,
  `idProdutos` int(11) NOT NULL FOREIGN KEY,
  `qntProdutos` int(11) NOT NULL,
  `frete` float NOT NULL,
  `data` varchar(20) NOT NULL
);

CREATE TABLE `produtos` (
  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `preco` float NOT NULL,
  `descricao` text NOT NULL,
  `marca` varchar(255) NOT NULL,
  `categoria` varchar(255) NOT NULL,
  `views` int(11) NOT NULL,
  `img` text NOT NULL,
  `quantidade` int(11) NOT NULL
);