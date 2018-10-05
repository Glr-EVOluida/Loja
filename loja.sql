-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: 04-Out-2018 às 00:53
-- Versão do servidor: 10.1.35-MariaDB
-- versão do PHP: 7.2.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `loja`
--
CREATE DATABASE IF NOT EXISTS `loja` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `loja`;

-- --------------------------------------------------------

--
-- Estrutura da tabela `clientes`
--

CREATE TABLE `clientes` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `endereco` text NOT NULL,
  `cep` varchar(20) NOT NULL,
  `telefone` varchar(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(100) NOT NULL,
  `img` text NOT NULL,
  `admin` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `clientes`
--

INSERT INTO `clientes` (`id`, `nome`, `endereco`, `cep`, `telefone`, `email`, `senha`, `img`, `admin`) VALUES
(1, 'Admin', 'Rua irineu', '00000-000', '(00) 0 0000 -0000', 'adminbaratudo@gmail.com', '70ffa655d8f0e9305ecafe04ad5e29a9', 'admin.jpg', 1),
(2, 'Junior Alvess', 'Rua Dr. José Torquato', '59920-000', '(84) 9 9466 1363', 'erisvan.junior.a@gmail.com', '36f17c3939ac3e7b2fc9396fa8e953ea', '1538584748487.jpg', 0),
(3, 'Rudinilly Rodrigues Nogueira', 'ST. João Ribeiro', '63460-000', '(88) 9 9930 9004', 'rudinilly@gmail.com', 'bfcd3eee9746714ca4fcba684344bbc0', '1538506769668.jpg', 0),
(4, 'Mauricio Aires De Freitas', 'Sitio Trindade', '63460-000', '(88) 9 9993 8628', 'mauricio@gmail.com', '110eff7d40a3779f4513c1be6f8fffcf', '1538594015338.jpg', 0);

-- --------------------------------------------------------

--
-- Estrutura da tabela `compras`
--

CREATE TABLE `compras` (
  `id` int(11) NOT NULL,
  `preco` float NOT NULL,
  `idCliente` int(11) NOT NULL,
  `idProdutos` text NOT NULL,
  `qntProdutos` text NOT NULL,
  `data` varchar(20) NOT NULL,
  `estado` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `compras`
--

INSERT INTO `compras` (`id`, `preco`, `idCliente`, `idProdutos`, `qntProdutos`, `data`, `estado`) VALUES
(9, 45643.2, 1, '1,2', '4,8', '2/10/2018', 'Em Processamento'),
(10, 209314, 1, '18,3', '232,1', '2/10/2018', 'Em Processamento'),
(11, 3840, 2, '1,18', '1,1', '2/10/2018', 'Em Processamento'),
(12, 899, 2, '18', '1', '2/10/2018', 'Em Processamento'),
(13, 2941, 2, '1', '1', '2/10/2018', 'Em Processamento'),
(14, 2941, 2, '1', '1', '2/10/2018', 'Em Processamento'),
(15, 5710.9, 4, '1,18,21,11', '1,1,1,1', '2/10/2018', 'Em Processamento'),
(16, 899, 4, '18', '1', '2/10/2018', 'Em Processamento');

-- --------------------------------------------------------

--
-- Estrutura da tabela `produtos`
--

CREATE TABLE `produtos` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `preco` float NOT NULL,
  `descricao` text NOT NULL,
  `marca` varchar(255) NOT NULL,
  `categoria` varchar(255) NOT NULL,
  `views` int(11) NOT NULL,
  `img` text NOT NULL,
  `quantidade` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `produtos`
--

INSERT INTO `produtos` (`id`, `nome`, `preco`, `descricao`, `marca`, `categoria`, `views`, `img`, `quantidade`) VALUES
(1, 'A515-51-51UX Notebook Acer', 2941, '@b Processador: ~b @br- Intel® Core™ i5-7200U @br- 2.5 GHz - 3.1 GHz com função Turbo Boost @br- 3 MB Cache @br @b Tela: ~b @br- 15.6\" LED HD - Resolução 1366 x 768 @br@b Memória: ~b @br- 8 GB (2 x 4 GB) tipo DDR4 @br- Frequência 2133 MHz @br- Expansível até 20 GB (2 slots no total) @br @b Placa Gráfica: ~b @br- Integrada ao processador @br @b Bateria: ~b @br- Até 7 horas de autonomia @br', 'Acer', 'Notebook', 22, '1538497592190.jpg', 86),
(2, 'Console Playstation 4 Pro', 4234.9, 'Experimente uma nova e autêntica aventura Spider-Man com o novo Console Red PS4 Pro totalmente personalizado com o ícone Spider, Controle sem fios Dualshock 4, jogo Spider-Man da Marvel e conteúdo digital.Este não é o Homem-Aranha que você conheceu ou já viu antes. Este é um experiente Peter Parker, que é mais habilidoso no combate ao grande crime em Nova York. Ao mesmo tempo, ele está lutando para equilibrar sua caótica vida pessoal e carreira, enquanto o destino de milhões de nova-iorquinos descansa em seus ombros.Recursos do Spider-Man PS4 Pro da Marvel4K TV Enhanced. Quando reproduzido em uma TV 4K, o Spider-Man da Marvel produz uma resolução dinâmica de 4K de 2160p alcançada através de injeção temporal.HD TV Enhanced. Os leitores de TV HD 1080p se beneficiarão da maior clareza de imagem através da super amostragem.Compatível com HDR. Os jogadores com monitores HDR podem experimentar o jogo em HDR (High Dynamic Range Color).Obs. O entretenimento 4K requer acesso a um serviço de streaming de conteúdo compatível com 4K, uma conexão de internet robusta e um monitor 4K compatível.CaracterísticasModelo PS4 Pro Marvel Spider-ManMarca SonyCapacidade 1TBCor Tema Spider-ManEspecificaçõesMemória Interna 1TbGPU AMD Radeon 4.20 TFLOPSProcessador AMD Jaguar x84-64 de 8 núcleosMemória RAM GDDR5 8GBVoltagem BivoltDrive Óptico BD 6-Speed CAV e DVD 8-speed CAVPortas USB 3.0 (x2), HDMI 2.0a, S/PDIFComunicação Ethernet 10/100/1000, Wi-Fi 802.11 a/b/g/n/ac, Bluetooth 4.0Mídia Física Blu-Ray e DVDConteúdo da Embalagem1 Console PS4 Pro personalizado1 Controle DualShock 4 personalizado1 Cabo de Energia1 Cabo HDMI1 Cabo USBJogo Marvel Spider-ManManuaisGarantia3 meses de garantia conforme certificado de garantia junto a nota fiscalInformações de Acordo com o Fabricante', 'Sony', 'Console', 6, '1538498018568.jpg', 490),
(3, ' Galaxy J5 ', 746.1, 'Pro Dual Chip @br Android 7.0 @br Tela 5,2\" @brOcta-Core 1.6 GHz @br 32GB @br 4G @brCâmera 13MP @brPreto', ' Samsung', 'Smartphones', 7, '1538498398128.jpg', 4),
(4, 'Smartphone LG Q6', 986.2, 'Smartphone LG Q6 Plus Dual Chip Android 7.0 Tela 5.5\" Full Hd  Snapdragon MSM8940 64GB 4G Câmera 13MP - Rose Gold', 'LG ', 'Smartphones', 4, '1538498764934.jpg', 66),
(5, 'Notebook Lenovo 320-15IAP', 1479.9, '@b Processador: ~b @brN3350 @br Cache: 2MB @br bClock: 1.1GHZ (2.4GHZ em Burst) @br@b Armazenamento: ~b @br1TB 5400RPM @br', 'Lenovo', 'Notebook', 3, '1538498780341.jpg', 49),
(6, 'Console Xbox One X', 3199.9, 'No Xbox One X os jogos rodam muito melhor. Com 40 porcento de poder a mais do que qualquer outro console, experimente os verdadeiros jogos 4K. Os jogos ficam com uma ótima resolução, funcionam sem problemas e carregam rapidamente, mesmo em uma tela de 1080p. O Xbox One X também funciona com todos os seus jogos e acessórios do Xbox One, bem como o Xbox Live, uma rede multiplayer avançada, que lhe oferece mais maneiras de jogar. Especificações Plataforma: Xbox One X Conexão: HDMI-In/Out, Portas USB e Wifi embutido, Blu-ray Mídias Compatíveis: Blu-ray Espaço de armazenamento: 1 TB Modelo: CYV-00006 Voltagem: Bivolt Cor: Preto Garantia: 12 meses Dimensões e Peso Dimensões do Produto sem Embalagem (AxLxP): 127x468,8x309,1 mm Peso do Produto sem Embalagem: 5,58 kg Itens Inclusos 01 Console XBOX One X 01 Controle sem Fio Xbox One X 01 Fonte de Alimentação Universal (Bivolt) 01 Cabo HDMI 01 Manual de Instruções Plataforma: Console Xbox One Plataforma: Xbox One Tipo de Mídia: Blu-ray', 'Microsoft', 'Console', 5, '1538498804110.jpg', 500),
(9, 'Computador Gamer G-Fire', 2335.9, '@b Processador: ~b @br AMD A10 9700 3.5/3.8 GHz, 10 núcleos (4 CPU 6 GPU)', 'G-Fire', 'PCs', 5, '1538499451609.jpg', 100),
(10, 'Notebook Gamer  NVIDIA GeForce', 3789.7, ' GTX 1050 Core i5-7300HQ 8GB 1TB Tela Full HD 15.6” Windows 10 Odyssey NP800G5M-XG1BR', 'Samsung', 'Notebook', 5, '1538499914672.jpg', 13),
(11, 'Console Playstation 3', 1629.9, '@b Especificações: ~b @br@br@b CPU: ~b Cell Broadband EngineTM. @br@b GPU: ~b RSX®. @br@b Saída de áudio: ~b LPCM 7.1 canais, Dolby Digital, Dolby Digital Plus,  Dolby TrueHD, DTS, DTS-HD,AAC. @br@b Memória: ~b RAM XDR principal de 256 MB, VRAM GDDR3 de 256 MB. @br@b Dimensão do armazenamento: ~b 500GB @br@b Entradas/saídas** USB de alta   velocidade (USB 2.0): ~b 2. @br@b Funcionamento em rede: ~b Ethernet (10BASE-T, 100BASE-TX, 1000BASE-T) × 1.IEEE 802.11 b/g. @br@b Bluetooth® 2.0 (EDR). ~b @br@b Comando: ~b Comando sem fios (Bluetooth®). @br@b Saída AV: ~b Resolução - 1080p, 1080i, 720p, 480p, 480i, 576p, 576i. @br@b Conector HDMI OUT***x 1. ~b @br@b Saída AV MULTI OUT x 1. ~b @br@b Saída Digital out (optical) x 1. ~b @br@b Unidade BD/DVD/CD (apenas leitura) Velocidade de leitura máxima: ~b BD × 2 (BD-ROM). DVD × 8 (DVD-ROM). CD × 24 (CD-ROM). @br@b Alimentação: ~b 110/220v (Bivolt) @br@b Consumo de energia: ~b aprox. 190 W. @br@b Dimensões externas (excluindo a secção saliente na sua extensão máxima): ~b aprox. 290 × 60 × 230 mm (largura × altura × comprimento). @br@b Peso: ~b aprox. 2,1 kg', 'Sony', 'Console', 7, '1538500035002.jpg', 496),
(12, 'WebCam Logitech', 282.24, '@bCaracterísticas~b@br- Marca: Logitech@br- Modelo: C920 @br  @bEspecificações:~b- Videochamada Full HD de 1080p (até 1920 x 1080 pixels) com a versão mais recente do Skype para Windows- Videochamada HD de 720p (até 1280 x 720 pixels) com clientes para os quais há suporte- Gravação de vídeo Full HD (até 1920 x 1080 pixels) com um sistema recomendado- Tecnologia Logitech Fluid Crystal- Compactação de vídeo H.264- Microfones duais estéreos incríveis com redução de ruído automática- Correção automática de pouca luz- USB 2.0 de alta velocidade certificado (pronto para USB 3.0)- Clipe universal pronto para tripés que se ajusta a monitores de laptop, LCD ou CRTRequisitos do sistema: - Windows® 7, Windows 8 ou Windows 10', 'Logitech', 'Perifericos', 12, '1538500278061.jpg', 56),
(13, 'Headset Gamer Razer Kraken Essential Com Microfone - P2', 299.9, '@bCaracterísticas:~b@br- Marca: Razer@br- Modelo: Kraken Essential  @br @bEspecificações:~b@br- Mecanismo avançado de som surround virtual 7.1@br- Microfone unidirecional analógico@br- Drivers potentes para alta qualidade sonora durante os jogos@br- Conchas auriculares fechadas para um isolamento acústico ideal@br @bRequisitos do sistema:~b @br -  PC/Mac com porta P2@br- Input Power: 50 mW@br- Windows® 10 / Windows® 8 / Windows® 7 / Mac OS X (v10.8 - 10.11)@br- Conexão com a internet (para instalação do driver)@br- Pelo menos 100 MB de espaço livre em disco rígido', 'Razer', 'Perifericos', 10, '1538500706364.jpg', 45),
(14, 'Console Super NES Classic', 849.91, '@b Especificações: ~b @br@br@b - Idioma: ~b Inglês @br@b - Classificação: ~b de Livre a  12 anos @br @br@b Jogos: ~b @br@br- Contra III: The Alien Wars @br- Donkey Kong Country @br- EarthBound @br- Final Fantasy III @br- F-Zero @br- Kirby Super Star @br- Kirby’s Dream Course @br- The Legend of Zelda: A Link to the Past @br- Mega Man X @br- Secret of Mana @br- Star Fox @br- Star Fox 2 @br- Street Fighter II Turbo: Hyper Fighting @br- Super Castlevania IV @br- Super Ghouls ’n Ghosts @br- Super Mario Kart @br- Super Mario RPG: Legend of the  Seven Stars @br- Super Mario World @br- Super Metroid @br - Super Punch-Out!! @br- Yoshi’s Island @br', 'Nintendo', 'Console', 1, '1538501079660.jpg', 500),
(15, 'PlayStation 4 Slim', 1640.65, 'Qual a melhor forma da melhor marca fazer o melhor console do mundo? Começando do zero. Inovando em processador, chip gráfico e memória RAM, a Sony criou a referência em console para jogos mundial quando o assunto é alto desempenho. O PlayStation 4 Slim, revoluciona com seus desenvolvedores de potencial incomparável e design elegante. Com uma unidade Blu-ray 6x mais veloz para um desempenho ágil e um controle Dualshock 4, esse Play4 é a junção das melhores tecnologias tornando as suas futuras experiências, seja com filmes ou jogos, inesquecíveis.', 'Sony', 'Console', 0, '1538501443030.jpg', 500),
(16, 'Galaxy J5 Pro', 743, '@bMODELO~b@brSamsung Galaxy J5@bDIMENSÕES~b@br142.1 x 71.8 x 7.9 mm@bOS~b@brAndroid 5.1 Lollipop@bMEMÓRIA~b@br16 GB (até 128GB)', ' Samsung  ', 'Smartphones', 0, '1538501819557.jpg', 210),
(17, 'Playstation 4 Slim', 1919.9, '@b As diferenças entre a Slim e a PS4 original: ~b @br @br Console mais fino e com cantos suavizados e melhor acabamento. @br Cerca de 40 porcento menor, medindo 26.5cm x 26.5cm x 3.8cm, comparado com os 27.5cm x 30cm x 5.3cm da original. @br Os botões físicos para ligar e ejetar discos está logo abaixo do drive de discos. @br A barra de luz foi removida em prol de uma luz no novo botão de iniciar. @br Duas entradas USB 3.0 afastadas uma da outra na frente. @br A base do console tem várias \"pernas\" compostas por plásticos na forma dos símbolos PlayStation. @br Os símbolos quadrado, triângulo, círculo e X estão estampados na lateral do console, o círculo também age como elemento da parte onde se coloca o stand. @br @br @b Funcionalidades e equipamento da PS4 Slim comparados com os do original: ~b @br @br Saída óptica foi removida da traseira do console. @br Comando DualShock 4 melhorado que já vem com o console. @br Duas opções para o disco rígido - 500G ou 1TB. @br Capacidade para trocar o disco rígido com um painel dedicado na traseira. @br Redução no ruído da ventoinha, aquecimento, consumo de energia (cerca de 41 porcento menos quando no menu principal). @br Melhorias do WiFi Improvements - 5GB IEEE 802.11 a/b/g/n/ac suportados (também o são no modelo Pro). @br', 'Sony', 'Console', 1, '1538502392313.jpg', 500),
(18, 'GALAXY J6 PRETO', 899, '@bVERSÃO DO SISTEMA  OPERACIONAL ~b@br8.0@br @bCOBERTURA~b@brQuad Band@br  @bOPERADORA~b@brDesbloqueado@br @bCÂMERA FOTOGRÁFICA ~b@br 13 MP@br @bCÂMERA FRONTAL~b@br8MP@br @bFLASH LED~b@brSim', 'Samsung', 'Smartphones', 21, '1538502676433.jpg', 227),
(19, 'Smartwatch U8 ', 56.13, '@brCor: Preto @brMaterial: Plástico E Silicone @brCódigo: 3428 @brTela: Touch Screen Colorida @brResolução Da Tela: 128x128 Px @brTamanho Da Tela: 1,44 Polegadas @brInterface De I/O: 5pin', 'Android', 'Gadgets', 3, '1538503281921.jpg', 245),
(20, 'Spinner Fidget Olho do Dragão', 32, 'Produto Raro e de ótima qualidade', 'Desconhecida', 'Gadgets', 1, '1538506315840.jpg', 20),
(21, 'Relógio Smartwatch Multilaser ', 241, '@bCONECTIVIDADE E HANDS-FREE ~b@brReceba notificações de redes sociais e atenda ligações.@br@bFUNÇÕES ~b@br Relógio com 3 opções de personalização, despertador, cronômetro, agenda de contatos/tarefas e pedômetro.@br @bDESIGN, ESTILO E PRATICIDADE ~b@br Acabamento emborrachado e tela LCD touch screen de 1,54”. @br @b TIRE FOTOS E OUÇA SUAS MÚSICAS ~b@br Acione remotamente o disparo de fotos e controle sua playlist do Smartphone pelo Smartwatch. ANTI-PERDASaiba sempre onde deixou o seu Smartphone por meio da função anti-perdido. ATUALIZAÇÃO DOS APLICATIVOSReceba notificações de atualização dos aplicativos através do Smartphone. ', 'Multilaser ', 'Gadgets', 10, '1538506336096.jpg', 542),
(22, 'Mi band  2', 90, '@bMarca ~b@brxiaomi@br @bModelo ~b@brXMSH04HM@br @b Material ~b@br liga de alumínio, elastômero termoplástico', 'Xiaomi', 'Gadgets', 6, '1538507904755.jpg', 345),
(23, 'Xbox One S ', 1259.1, 'Xbox One S com os 3 jogos do Minecraft, 40 porcento Menor, 500GB de armazenamento e fonte de alimentação interna.@br@brExperimente os melhores jogos, incluindo clássicos do Xbox 360, em um console 40 porcento menor. Não se engane com o tamanho: com uma fonte de alimentação interna e até 1TB de armazenamento interno, o Xbox One S é o Xbox mais avançado que já existiu.@br@brCom resolução quatro vezes maior que o HD padrão, o Ultra HD 4K oferece o vídeo mais nítido e realístico possível.@br@brConfigure seu Xbox One S para ligar outros dispositivos, como TV, receptor de áudio/vídeo, receptor de cabo/satélite. Se você estiver jogando ou assistindo a um filme, o IR Blaster integrado iniciará a ação com mais rapidez, permitindo que você se esqueça dos controles remotos.', 'Microsoft', 'Console', 0, '1538508059916.jpg', 500),
(27, 'PlayStation 4 Slim CUH-2115B', 2799, '@b Características gerais: ~b @br @br@b MODELO ~b Play Station 4 Slim CUH-2115B @br@b COR ~bCamuflado @br@b PROCESSADOR ~b CPUx84-64 AMD “Jaguar”, 8 núcleos @br@b MEMÓRIA RAM ~bGDDR5 8GB @br@b CONECTIVIDADE WIRELESS ~bBluetooth 4.0 - Wi-Fi @br@b VOLTAGEM ~b110-220V @br@b CAPACIDADE DE ARMAZENAMENTO ~b1TB @br@b GPU ~b1.84 TFLOPS baseado em AMD Radeon @br@b MARCA ~bSony @br@b INTERFACE ~bUSB - HDMI - Ethernet - Auxiliar @br@b PESO BRUTO ~b (gr)3420 @br@b DIMENSÕES DA EMBALAGEM (cm) ~b43 x 34 x 9.3 @br@b INCLUI ~bFone de ouvido - Cabo HDMI - Controle DualShock 4 - Cabo USB - Cabo de alimentação - Jogo Call of Duty WWII @br@b LEITOR ÓPTICO ~bBD 6-Speed CAV e DVD 8-speed CAV @br', 'Sony', 'Console', 3, '1538508778598.jpg', 500),
(28, 'Mouse Gamer HyperX Pulsefire', 299, '@bCaracterísticas:~b@br- Marca: HyperX@br- Modelo: HX-MC002B @br @bEspecificações:~b@br- Cor: Preto com cinza@br- O anel de luzes proporciona efeitos RGB dinâmicos em 360°@br- Sensor Pixart 3389 com DPI nativo de até 16.000@br- Switches Omron confiáveis com capacidade para 50 milhões de cliques@br- Fácil personalização com o software HyperX NGenuity@br - Memória integrada para armazenar personalizações@br- Skates grandes para um deslizar suave.', 'HyperX', 'Perifericos', 3, '1538509022060.jpg', 123),
(29, 'Computador PC Gamer G-Fire Hermes', 1429.9, '@b Especificações: ~b @br @br@b Processador: ~b @br @br- AMD A6 7400K @br- Velocidade: 3.5/3.9GHz @br- 06 núcleos (2 CPU   4 GPU) @br  @br@b Placa de Vídeo: ~b @br @br- Radeon R5  até 2GB (integrada ao processador) @br- Clock: 756Mhz @br  @br@b Placa Mãe: ~b @br @br- Socket FM2  @br  @br@b Memória RAM: ~b @br @br- Capacidade: 4GB @br- Tipo: DDR3 @br- Clock: 1600Mhz @br  @br@b Armazenamento: ~b @br @br- Capacidade: 500 GB @br @br @b Conectividade: ~b @br @br- Rede: PCIEx1 Gigabit 10/100/1000Mb/s @br  @br@b Alimentação: ~b @br @br- Fonte: 200W Real @br- Voltagem: Bivolt @br  @br@b Sistema Operacional: ~b @br @br- Windows 10 avaliações 60 dias @br  @br@b Gabinete: ~b @br @br- Gamer Ninja HTSY137B6S @br- Cor: Preto @br- Com 1 Cooler Azul Frontal incluso @br', 'G-Fire', 'PCs', 1, '1538509733203.jpg', 500),
(30, 'Teclado Kit Gamer   Mouse Gamer V-100 USB Para Jogos Azul', 139, '@bConectividade: ~b USB@br @b Macro:  ~b Não@br  @bDPI:  ~b 1600@br  @b Mecânico:  ~b Não@br  @b Led:  ~b Vermelho,azul e roxo@br  @b Cor do Mouse:  ~b Dourado', 'uthink', 'Perifericos', 1, '1538509844139.jpg', 345),
(31, 'Inspiron I15-3567-A10P', 2087, '@br intel Core 6ª i3 @br4GB @br1TB @brTela LED 15,6\" @brWindows 10 - Preto', 'Dell ', 'Notebook', 1, '1538510107285.jpg', 35),
(32, 'Inspiron 5675-D50', 4749, '@br AMD Radeon™ RX 570@br AMD Ryzen™ 7 1700X, 8GB @br1TB @brGravador de DVD@brHDMI e Linux', ' Dell ', 'PCs', 1, '1538583992972.jpg', 99),
(33, 'Pixma G3100V', 799, '@br Wireless @br Impressora@br Copiadora @br Scanner', 'Canon', 'Gadgets', 0, '1538584254270.jpg', 677),
(34, 'Mouse Gamer Riotoro RGB 4000', 103, '@br RGB@br 4000 DPI@br  Preto @br Uruz Z5 @br Lightning MR-600L', 'Riotoro', 'Perifericos', 1, '1538585141959.jpg', 345),
(35, 'PC Gamer XERE EDITION', 3939.1, ' @b Placa de Vídeo : ~b GEFORCE GTX 1060 3GB GDDR5(Nvidia) @br  @b Processador : ~b (LGA 1151) INTEL CORE I3 8100 3.6GHz 6MB CACHE  @br @b Placa Mãe : ~b PLACA MÃE H310 @br @b  Memória(8GB) : ~b  MEMÓRIA (1x8GB) DDR4 2400MHz @br @b Hard Disk : ~b1000GB HD SATA 3 6.0Gb/s @br @b Gabinete : ~b AEROCOOL - AERO 500 BRANCO E PRETO @br @b  Fonte : ~b500W - 500W 80 PLUS BRONZE - Consulte Marca', 'ChipArt', 'PCs', 4, '1538586497623.jpg', 500),
(36, 'PC Gamer MOBA BOX II', 3870.42, '@b Placa de Vídeo : ~b GEFORCE GTX 1050TI 4GB GDDR5(Nvidia) @br @b Processador : ~b (LGA 1151) INTEL CORE I3 8100 3.6GHz 6MB CACHE @br @b Placa Mãe : ~bPLACA MÃE H310 @br  @b Memória(8GB) : ~b - MEMÓRIA (1x8GB) DDR4 2400MHz @br @b  Hard Disk : ~b1000GB HD SATA 3 6.0Gb/s @br @b Fonte : ~b 500W - 500W 80 PLUS BRONZE - Consulte Marca @br@b  Gabinete : ~b GABINETE NZXT S340 BLACK - CA-S340W-B1 @br', 'ChipArt', 'PCs', 2, '1538586897419.jpg', 500),
(37, 'Teclado Mecânico Gamer Kumara Switch Outemu Brown K552 ABNT 2', 240.9, '@bEspecificações:~b@brTeclado Mecânico de Alto Desempenho@br12 Teclas para controle Multimídia@brControle de Iluminação \"On-The-Fly\"@brSistema Nº Key Rollover para Anti-Ghosting em todas as Teclas@brFuncionamento da Tecla Win Alternável (Pressione FN Win para Desligar / Ligar a Tecla)@brPadrão ABNT2 - Feito Especialmente para o Mercado Brasileiro@brO primeiro do Mundo em ABNT2 com teclas Padrão Double Injection@brFabricado com o Renomado Switch Mecânico Outemu: Brown@brOutemu Brown: Feedback Tátil, Resistência Média, Sem Clique Audível@brIluminação com Leds Vermelhos@brConstrução Robusta em Metal e Plástico ABS para maior Durabilidade@brSwitch removíve', 'Redragon', 'Perifericos', 5, '1538587362802.jpg', 400),
(38, 'PC Gamer VINICCIUS 13', 8283.51, '@b Placa de Vídeo : ~bGEFORCE GTX 1070TI 8GB (Nvidia) @br @b Processador : ~b (LGA 1151) INTEL CORE I7 8700 3.2GHz 12MB CACHE @br @b Componentes : ~b PLACA MÃE Z370, LGA1151 CHIPSET INTEL Z370 @br @b Memória : ~b 2x (8GB) - MEMÓRIA (1x8GB) DDR4 2400MHz @br @b Hard Disk : ~b 1000GB HD SATA 3 6.0Gb/s @br @b Fonte : ~b 600W - 600W 80 PLUS - Consulte Marca @br @b BLACK FRIDAY : ~b GABINETE GAMEMAX GAMER VEGA M909 RGB @br', 'ChipArt', 'PCs', 1, '1538587389461.jpg', 500),
(39, 'PC Gamer CARNAGE KILLER', 18661.3, ' @b Placa de Vídeo : ~b GEFORCE GTX 1080TI 11GB GDDR5X (Nvidia)@br @b Processador : ~b (LGA 1151) INTEL CORE I7 8700K 3.7GHz 12MB CACHE (SEM COOLER)@br @b Water Cooler : ~b WATER COOLER CAPTAIN 240 EX WHITE RGB, DP-GS-H12L-CT240RGB-WH@br @b Placa Mãe : ~b PLACA MÃE GIGABYTE Z370XP SLI, LGA1151 CHIPSET INTEL Z370@br @b Memória : ~b 4x (8GB) - MEMÓRIA (1x8GB) DDR4 2400MHz@br @b SSD : ~b SSD 960GB SATA 3 (CONSULTE MARCA)@br @b Hard Disk : ~b 2000GB HD SATA 3 6.0Gb/s@br @b Fonte : ~b FONTE GAMER SEMI-MODULAR 1050W 80 PLUS SILVER GAMEMAX GM1050@br @b Gabinete : ~b GABINETE COOLER MASTER COSMOS C700P LED RGB, MCC-C700P-MG5N-S00@br @b Sistema Operacional : ~b WINDOWS 10 PRO 64 BIT OEM @br', 'ChipArt', 'PCs', 1, '1538587890946.jpg', 500),
(40, 'PC Gamer ASSASIN', 6169.5, ' @b Placa de Vídeo : ~b GEFORCE GTX 1060 6GB GDDR5(Nvidia)@br @b Processador : ~b (LGA 1151) INTEL CORE I5 8400 2.8GHz 9MB CACHE@br @b Placa Mãe : ~b PLACA MÃE H310@br @b Memória(8GB) : ~b - MEMÓRIA (1x8GB) DDR4 2400MHz@br @b Hard Disk : ~b 1000GB HD SATA 3 6.0Gb/s@br @b Fonte : ~b 500W - 500W 80 PLUS BRONZE - Consulte Marca@br @b Gabinete : ~b GABINETE NZXT S340 WHITE - CA-S340W-W1@br @b Sistema Operacional : ~b WINDOWS 10 PRO 64 BIT OEM @br', 'ChipArt', 'PCs', 1, '1538588376027.jpg', 500),
(41, 'Monitor LG LED', 786, '@b Características: ~b@br - Marca: LG @br- Modelo: 23MP55HQ-P@br @b Especificações: ~b@br - Tamanho do Painel (medido na diagonal): 23\"@br - Tipo de Painel: IPS@br - Profundidade de cor (Número de cores): 16,7 milhões de cores@br - Pixel Pitch (mm): 0,2652 (H) x 0,2652 (V)@br - Relação de Aspecto: 16:9@br - Resolução Nativa: 1920 x 1080@br - Brilho: 250 cd/m2@br - Contraste Ratio (Typ.): 1.000:1@br- CR dinâmico (DCR): 5.000.000:1@br - Tempo de Resposta: 5ms@br - Tratamento de superfície: Revestimento duro (3H), Anti-reflexo@br - Ângulo de visão (HxV): 178º / 178º', 'LG', 'Perifericos', 1, '1538588544534.jpg', 67),
(44, 'NVIDIA  GEFORCE GTX 1050', 1164, '@b Interface: ~b@br- PCI Express 3.0@br @b Chipset: ~b@br - Fabricante: NVIDIA@br - GPU: GeForce GTX 1050 Ti@br - Clock do Núcleo: 1290 MHz@br - Impulso do Clock: 1392 MHz@br - Núcleos CUDA: 768@br @b Memória:  ~b @br - Clock eficaz: 7010 MHz@br - Tamanho da memória: 4GB@br - Interface de memória: 128-bit@br - Tipo de memória: GDDR5', 'EVGA', 'Perifericos', 3, '1538589213138.jpg', 789),
(47, 'Iphone 8', 3384, '@b Marca ~b@brApple@br @b Linha ~b@br iPhone@br @b Modelo ~b@br iPhone 8@br @b Memória interna ~b@br64 GB@br @b Memória RAM ~b@br 2 GB@br @b Operadora ~b@br Desbloqueado@br @b Sistema operacional ~b@br iOS@br @b Resolução da câmera~b@br 12 Mpx@br @b Resolução da câmera ~b @br frontal 7 Mpx@br @b Resolução de vídeo ~b @br frontal7 Mpx@br @b Zoom óptico ~b @br 5x@br @b Zoom digital ~b@br 5 x', 'Apple', 'Smartphones', 1, '1538590695334.jpg', 345),
(48, 'Teclado Gamer Multimidia Preto KG-10BK', 30.9, '@bEspecificações:~b@brTeclado Gamer ABNT 2@brTeclas de alta qualidade@brEstrutura desenvolvida com sistema de antirespingo.@brResistente a pequenos derramamentos de líquidos', 'C3 Tech', 'Perifericos', 1, '1538590714744.jpg', 300),
(49, 'Sony Xperia XA1', 978, '@b Sistema Operacional  ~b@br Android 7.0 (Nougat)@br @b Processador ~b@br Media Tek MT6757 Octa-Core (2.4Ghz x4   1.6Ghzx4)@br @br RAM  ~b@br3GB@br @b Tecnologia ~b@br 4G', 'Xperia', 'Smartphones', 0, '1538591234269.jpg', 354),
(50, 'Asus Zenfone Go', 567, '@b Dual Chip Rede 4G@brMemória max: 16gb@brMemória RAM: 1gb@brTamanho da tela: 5\"@brCâmera traseira: 13MP@brCâmera frontal: 5MP', ' asus', 'Smartphones', 0, '1538591651472.jpg', 347),
(51, 'Smartphone Blu Vivo XI 32GB', 1515, '@b Plataforma~b@br Android@br @b Versão~b@brAndroid 8.1 Oreo@br @b Resolução~b@br1080p@br @b FPS da Gravação~b@br 30 fps@br @b Memória Interna ~b@br 32 GB@br @b Memória RAM~b@br 3 GB@br @b Memória Expansível@br 128 GB', 'blu', 'Smartphones', 1, '1538592500503.jpg', 23),
(52, 'JOYSTICK ', 200, '@b Tipo: ~b@br  Gamepads @br @b Número do Modelo: ~b @brPG-9023 Gamepad sem Fios @br @b Tipo de Interface:  ~b@brBluetooth@br @b Tipo: ~b @br  Gamepad sem fio Bluetooth Ipega PG-9023 @br @b Tamanho do produto: ~b 18 * 15 * 8 centímetros @br @b Classificação do jogo de vídeo:  ~b @br Nível de entrada, febre de grau, o nível de elite, hardcoreTipo de interface: controlador de jogos Bluetooth', 'Ipega', 'Gadgets', 0, '1538593559408.jpg', 343),
(53, '', 125, '@br- HD Novo, retirado de máquina e colocado em case originais da Seagate@br- Case acompanha todos os acessórios, cabo, fonte e caixa original.@br- Envio imediato', 'Seagate', 'Gadgets', 0, '1538594275482.jpg', 456),
(54, 'Caixa de Som Bluetooth JBL Pulse 3', 678, '@br @bAlto-falante~b@br3 x 40mm@br @b Voltagem~b@br3.7V@br @bConectividade ~b@brBluetooth 4.2', 'JBL', 'Gadgets', 0, '1538594644082.jpg', 456);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `compras`
--
ALTER TABLE `compras`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `produtos`
--
ALTER TABLE `produtos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `compras`
--
ALTER TABLE `compras`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `produtos`
--
ALTER TABLE `produtos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
