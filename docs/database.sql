-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema g1oo2
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema g1oo2
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `g1oo2` DEFAULT CHARACTER SET utf8 ;
USE `g1oo2` ;

-- -----------------------------------------------------
-- Table `g1oo2`.`classes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `g1oo2`.`classes` (
  `id_class` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_class`))
ENGINE = InnoDB
AUTO_INCREMENT = 47
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `g1oo2`.`people`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `g1oo2`.`people` (
  `id_person` INT(11) NOT NULL AUTO_INCREMENT COMMENT '\n',
  `name` VARCHAR(45) NOT NULL,
  `stars` TINYINT(4) NOT NULL,
  `image` VARCHAR(45) NULL DEFAULT 'default.jpg',
  `id_class` INT(11) NOT NULL,
  PRIMARY KEY (`id_person`),
  INDEX `fk_people_classes_idx` (`id_class` ASC),
  CONSTRAINT `fk_people_classes`
    FOREIGN KEY (`id_class`)
    REFERENCES `g1oo2`.`classes` (`id_class`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 28
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
