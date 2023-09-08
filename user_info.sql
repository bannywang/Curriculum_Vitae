CREATE DATABASE `personal_resume`;

USE `personal_resume`;

CREATE TABLE `user_info` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `account` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(10) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `create_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SELECT * FROM `user_info`
