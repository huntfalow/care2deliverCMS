-- phpMyAdmin SQL Dump
-- version 4.0.4.2
-- http://www.phpmyadmin.net
--
-- Machine: localhost
-- Genereertijd: 19 jun 2017 om 10:31
-- Serverversie: 5.6.13
-- PHP-versie: 5.4.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Databank: `care2deliver`
--
CREATE DATABASE IF NOT EXISTS `care2deliver` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `care2deliver`;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `tblcategory`
--

CREATE TABLE IF NOT EXISTS `tblcategory` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `headCategoryId` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `faName` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=13 ;

--
-- Gegevens worden uitgevoerd voor tabel `tblcategory`
--

INSERT INTO `tblcategory` (`id`, `headCategoryId`, `name`, `faName`) VALUES
(9, 1, 'Zakenvervoer', 'fa-black-tie'),
(12, 1, 'test', 'fa-tag');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `tblgeneratedtables`
--

CREATE TABLE IF NOT EXISTS `tblgeneratedtables` (
  `Identity` varchar(250) NOT NULL,
  PRIMARY KEY (`Identity`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Gegevens worden uitgevoerd voor tabel `tblgeneratedtables`
--

INSERT INTO `tblgeneratedtables` (`Identity`) VALUES
('testIdentity');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `tblheadcategory`
--

CREATE TABLE IF NOT EXISTS `tblheadcategory` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Gegevens worden uitgevoerd voor tabel `tblheadcategory`
--

INSERT INTO `tblheadcategory` (`id`, `name`) VALUES
(1, 'personen'),
(2, 'Goederen');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `tbllangs`
--

CREATE TABLE IF NOT EXISTS `tbllangs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `langName` varchar(50) NOT NULL,
  `tag` varchar(5) NOT NULL,
  `defaultLang` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Gegevens worden uitgevoerd voor tabel `tbllangs`
--

INSERT INTO `tbllangs` (`id`, `langName`, `tag`, `defaultLang`) VALUES
(1, 'Nederlands', 'NL', 0),
(2, 'Engels', 'EN', 1);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `tbllangtext`
--

CREATE TABLE IF NOT EXISTS `tbllangtext` (
  `langId` int(11) NOT NULL,
  `categoryId` int(11) NOT NULL,
  `titel` varchar(100) NOT NULL,
  `text` text NOT NULL,
  PRIMARY KEY (`langId`,`categoryId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Gegevens worden uitgevoerd voor tabel `tbllangtext`
--

INSERT INTO `tbllangtext` (`langId`, `categoryId`, `titel`, `text`) VALUES
(1, 9, 'nederlandse titel', '<p>jeej het werkt</p>\n'),
(1, 12, 'testTitel', '<p>test</p>\n'),
(2, 9, 'fr titel', '<p>engelse tekst jeej</p>\n\n<ul>\n	<li>puntjes</li>\n</ul>\n\n<ol>\n	<li>rang 1</li>\n	<li>rag 2</li>\n	<li>rang 3</li>\n</ol>\n\n<p>&nbsp;</p>\n'),
(2, 12, 'sdgqsdgqsdg', '<p>qsdgqsqgqg</p>\n');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `testidentity`
--

CREATE TABLE IF NOT EXISTS `testidentity` (
  `langId` int(6) unsigned NOT NULL,
  `json` varchar(50000) NOT NULL,
  PRIMARY KEY (`langId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Gegevens worden uitgevoerd voor tabel `testidentity`
--

INSERT INTO `testidentity` (`langId`, `json`) VALUES
(1, '{"ApiUrl":"\\/api\\/dynamicFormsApi.php","Title":"Dit is een test hoofdtitel van mij","Identity":"testIdentity","GeneratedSections":[{"Title":"basisgegevens","Size":"half","ValueKeys":[{"Key":"naam","ContentType":"string","Label":"Naam","Value":"mijnnaam"},{"Key":"voornaam","ContentType":"string","Label":"Voornaam","Value":"mijnvoornaam"},{"Key":"leeftijd","ContentType":"number","Label":"Leeftijd","Value":"50"},{"Key":"cds","ContentType":"string","Label":"cds","Value":"mijnllllt"}]},{"Title":"blok 2","Size":"half","ValueKeys":[{"Key":"test","ContentType":"string","Label":"Test","Value":"bloktest"},{"Key":"nentext","ContentType":"html","Label":"Nog een ckeditor","Value":"<strong>blabla<\\/strong>sssss"}]},{"Title":"over mij","Size":"full","ValueKeys":[{"Key":"titel","ContentType":"string","Label":"Titel","Value":"Onze visie"},{"Key":"tekst","ContentType":"html","Label":"Content","Value":"<p>Bij Care2Deliver staan&nbsp;<strong>stiptheid, comfort, kwaliteit en dienstverlening<\\/strong>&nbsp;tegen een&nbsp;<strong>correcte prijs<\\/strong>&nbsp;hoog in het vaandel. Wij brengen u&nbsp;<strong>zorgeloos<\\/strong>&nbsp;en&nbsp;<strong>veilig<\\/strong>&nbsp;op uw bestemming.&nbsp;<strong>Extra dienstverlening<\\/strong>&nbsp;is bij ons ook zeer belangrijk. Onze service eindigt niet noodzakelijk bij het afzetten aan de ingang van de luchthaven, het ziekenhuis of de dokterspraktijk. Indien u het wenst,&nbsp;<strong>begeleiden<\\/strong>&nbsp;we u tot aan de incheck-balie van de luchthaven en&nbsp;<strong>helpen<\\/strong>&nbsp;u bij het&nbsp;<strong>inchecken<\\/strong>&nbsp;van de vlucht. Desgewenst&nbsp;<strong>helpen<\\/strong>&nbsp;we u bij het&nbsp;<strong>aanmelden<\\/strong>&nbsp;in het ziekenhuis en\\/of&nbsp;<strong>begeleiden<\\/strong>&nbsp;u tot bij de dokter.<\\/p>\\n"}]}]}'),
(2, '{"ApiUrl":"\\/api\\/dynamicFormsApi.php","Title":"Dit is een test hoofdtitel van mij","Identity":"testIdentity","GeneratedSections":[{"Title":"basisgegevens","Size":"half","ValueKeys":[{"Key":"naam","ContentType":"string","Label":"Naam","Value":""},{"Key":"voornaam","ContentType":"string","Label":"Voornaam","Value":"sdgqsgdqsgd"},{"Key":"leeftijd","ContentType":"number","Label":"Leeftijd","Value":5},{"Key":"cds","ContentType":"string","Label":"cds","Value":"mijndefault"}]},{"Title":"blok 2","Size":"half","ValueKeys":[{"Key":"test","ContentType":"string","Label":"Test","Value":""},{"Key":"nentext","ContentType":"html","Label":"Nog een ckeditor","Value":"<strong>blabla<\\/strong>sssss"}]},{"Title":"over mij","Size":"full","ValueKeys":[{"Key":"titel","ContentType":"string","Label":"Titel","Value":""},{"Key":"tekst","ContentType":"html","Label":"Content","Value":"lalalaa"}]}]}');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
