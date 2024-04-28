DROP DATABASE IF EXISTS `quiz`;
CREATE DATABASE  IF NOT EXISTS `quiz`;
USE `quiz`;

SET NAMES utf8;
SET GLOBAL time_zone = '+07:00';
SET time_zone = '+07:00';

DROP TABLE IF EXISTS `user`;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fullName` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(256) COLLATE utf8mb4_unicode_ci NOT NULL,
  `roleId` tinyint(1) NOT NULL DEFAULT '0',
  `registeredAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `lastLogin` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_phone` (`phone`),
  UNIQUE KEY `uq_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO user (fullName, phone, email, password, roleId)
VALUES
('Admin', '0123456789', 'admin@gmail.com', '$2a$08$khg4E2DthOVpKJLUqAcEVe0Ktj1UURsAkbbG7KytTqHIivjYYSnqC', 1),
('Jone Dane', '123456789', 'user@gmail.com', '$2a$12$WJpNPPG6Mq2.eSQSImDgnuCL1AJ7uOPRg4wzOF6l55gY.I.jdm4zu', 0),
('Dominic', '012345985', 'dominic@gmail.com', '$2a$10$qzkvAYXuaZH2HGlmx9LNbOMcAVZgTOISaf9RzBQYWifo9aL0QBA1y', 0);

-- admin@gmail.com - admin
-- user@gmail.com - user
-- dominic@gmail.com - dominic



DROP TABLE IF EXISTS `quiz_topic`;
SET character_set_client = utf8mb4 ;
CREATE TABLE `quiz_topic` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(75) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO quiz_topic (name)
VALUES
('English'),
('Toán'),
('Sinh Học'),
('Hoá'),
('Lý'),
('Sử'),
('Địa'),
('GDCD'),
('Thể dục'),
('Công nghệ'),
('Trí tuệ nhân tạo'),
('Công cụ văn phòng');




DROP TABLE IF EXISTS `quiz`;
SET character_set_client = utf8mb4 ;
CREATE TABLE `quiz` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `userId` bigint(20) NOT NULL,
  `title` varchar(75) COLLATE utf8mb4_unicode_ci NOT NULL,
  `topic` varchar(75) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `subTitle` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `length` bigint(20) NOT NULL,
  `played` bigint(20) NOT NULL,
  `score` smallint(6) NOT NULL ,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_quiz_user` (`userId`),
  CONSTRAINT `fk_quiz_user` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO quiz (userId, title, topic, image, subTitle, length, played, score)
VALUES
(1, 'Trắc nghiệm ngữ pháp Tiếng Anh', 'English',  '/assets/images/quiz/english.jpg', 'Trắc nghiệm ngữ pháp Tiếng Anh',  10, 1000, 100),

(1, 'Thi thử THPT môn Sinh Học', 'Sinh Học',  '/assets/images/quiz/sinhhoc.webp', 'Thi thử THPT môn Sinh Học online - Đề minh họa năm 2024 của Bộ GD&ĐT', 30, 41000, 100);



DROP TABLE IF EXISTS `quiz_question`;
SET character_set_client = utf8mb4 ;
CREATE TABLE `quiz_question` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `quizId` bigint(20) NOT NULL,
  `title` text COLLATE utf8mb4_unicode_ci  NOT NULL,
  `difficult` varchar(75) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `score` smallint(6) NOT NULL DEFAULT '0',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_question_quiz` (`quizId`),
  CONSTRAINT `fk_question_quiz` FOREIGN KEY (`quizId`) REFERENCES `quiz` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO quiz_question (quizId, title , difficult, type, score)
VALUES
(1,'Theo thuyết tiến hóa tổng hợp hiện đại, phát biểu nào sau đây về tiến hóa nhỏ là đúng?', 'easy', 'singlechoice', 10),
(1,'Theo thuyết tiến hóa tổng hợp hiện đại, phát biểu nào sau đây về tiến hóa nhỏ là đúng?', 'easy', 'singlechoice', 10),
(1,'Theo thuyết tiến hóa tổng hợp hiện đại, phát biểu nào sau đây về tiến hóa nhỏ là đúng?', 'easy', 'singlechoice', 10),
(1,'Theo thuyết tiến hóa tổng hợp hiện đại, phát biểu nào sau đây về tiến hóa nhỏ là đúng?', 'easy', 'singlechoice', 10),
(1,'Theo thuyết tiến hóa tổng hợp hiện đại, phát biểu nào sau đây về tiến hóa nhỏ là đúng?', 'easy', 'singlechoice', 10),
(1,'Theo thuyết tiến hóa tổng hợp hiện đại, phát biểu nào sau đây về tiến hóa nhỏ là đúng?', 'easy', 'singlechoice', 10),
(1,'Theo thuyết tiến hóa tổng hợp hiện đại, phát biểu nào sau đây về tiến hóa nhỏ là đúng?', 'easy', 'singlechoice', 10),
(1,'Theo thuyết tiến hóa tổng hợp hiện đại, phát biểu nào sau đây về tiến hóa nhỏ là đúng?', 'easy', 'singlechoice', 10),
(1,'Theo thuyết tiến hóa tổng hợp hiện đại, phát biểu nào sau đây về tiến hóa nhỏ là đúng?', 'easy', 'singlechoice', 10),
(1,'Theo thuyết tiến hóa tổng hợp hiện đại, phát biểu nào sau đây về tiến hóa nhỏ là đúng?', 'easy', 'singlechoice', 10),

(1,'Theo thuyết tiến hóa tổng hợp hiện đại, phát biểu nào sau đây về tiến hóa nhỏ là đúng?', 'medium', 'singlechoice',  10),
(1,'Theo thuyết tiến hóa tổng hợp hiện đại, phát biểu nào sau đây về tiến hóa nhỏ là đúng?', 'medium', 'singlechoice',  10),
(1,'Theo thuyết tiến hóa tổng hợp hiện đại, phát biểu nào sau đây về tiến hóa nhỏ là đúng?', 'medium', 'singlechoice',  10),
(1,'Theo thuyết tiến hóa tổng hợp hiện đại, phát biểu nào sau đây về tiến hóa nhỏ là đúng?', 'medium', 'singlechoice',  10),
(1,'Theo thuyết tiến hóa tổng hợp hiện đại, phát biểu nào sau đây về tiến hóa nhỏ là đúng?', 'medium', 'singlechoice',  10),
(1,'Theo thuyết tiến hóa tổng hợp hiện đại, phát biểu nào sau đây về tiến hóa nhỏ là đúng?', 'medium', 'singlechoice',  10),
(1,'Theo thuyết tiến hóa tổng hợp hiện đại, phát biểu nào sau đây về tiến hóa nhỏ là đúng?', 'medium', 'singlechoice',  10),
(1,'Theo thuyết tiến hóa tổng hợp hiện đại, phát biểu nào sau đây về tiến hóa nhỏ là đúng?', 'medium', 'singlechoice',  10),
(1,'Theo thuyết tiến hóa tổng hợp hiện đại, phát biểu nào sau đây về tiến hóa nhỏ là đúng?', 'medium', 'singlechoice',  10),
(1,'Theo thuyết tiến hóa tổng hợp hiện đại, phát biểu nào sau đây về tiến hóa nhỏ là đúng?', 'medium', 'singlechoice',  10),

(1,'Theo thuyết tiến hóa tổng hợp hiện đại, phát biểu nào sau đây về tiến hóa nhỏ là đúng?', 'hard', 'singlechoice',  10),
(1,'Theo thuyết tiến hóa tổng hợp hiện đại, phát biểu nào sau đây về tiến hóa nhỏ là đúng?', 'hard', 'singlechoice',  10),
(1,'Theo thuyết tiến hóa tổng hợp hiện đại, phát biểu nào sau đây về tiến hóa nhỏ là đúng?', 'hard', 'singlechoice',  10),
(1,'Theo thuyết tiến hóa tổng hợp hiện đại, phát biểu nào sau đây về tiến hóa nhỏ là đúng?', 'hard', 'singlechoice',  10),
(1,'Theo thuyết tiến hóa tổng hợp hiện đại, phát biểu nào sau đây về tiến hóa nhỏ là đúng?', 'hard', 'singlechoice',  10),
(1,'Theo thuyết tiến hóa tổng hợp hiện đại, phát biểu nào sau đây về tiến hóa nhỏ là đúng?', 'hard', 'singlechoice',  10),
(1,'Theo thuyết tiến hóa tổng hợp hiện đại, phát biểu nào sau đây về tiến hóa nhỏ là đúng?', 'hard', 'singlechoice',  10),
(1,'Theo thuyết tiến hóa tổng hợp hiện đại, phát biểu nào sau đây về tiến hóa nhỏ là đúng?', 'hard', 'singlechoice',  10),
(1,'Theo thuyết tiến hóa tổng hợp hiện đại, phát biểu nào sau đây về tiến hóa nhỏ là đúng?', 'hard', 'singlechoice',  10),
(1,'Theo thuyết tiến hóa tổng hợp hiện đại, phát biểu nào sau đây về tiến hóa nhỏ là đúng?', 'hard', 'singlechoice',  10),


(2,'Theo thuyết tiến hóa tổng hợp hiện đại, phát biểu nào sau đây về tiến hóa nhỏ là đúng?', 'easy', 'singlechoice',  10),
(2,'Theo thuyết tiến hóa tổng hợp hiện đại, phát biểu nào sau đây về tiến hóa nhỏ là đúng?', 'easy', 'singlechoice',  10),
(2,'Theo thuyết tiến hóa tổng hợp hiện đại, phát biểu nào sau đây về tiến hóa nhỏ là đúng?', 'easy', 'singlechoice',  10),
(2,'Theo thuyết tiến hóa tổng hợp hiện đại, phát biểu nào sau đây về tiến hóa nhỏ là đúng?', 'easy', 'singlechoice',  10),
(2,'Theo thuyết tiến hóa tổng hợp hiện đại, phát biểu nào sau đây về tiến hóa nhỏ là đúng?', 'easy', 'singlechoice',  10),
(2,'Theo thuyết tiến hóa tổng hợp hiện đại, phát biểu nào sau đây về tiến hóa nhỏ là đúng?', 'easy', 'singlechoice',  10),
(2,'Theo thuyết tiến hóa tổng hợp hiện đại, phát biểu nào sau đây về tiến hóa nhỏ là đúng?', 'easy', 'singlechoice',  10),
(2,'Theo thuyết tiến hóa tổng hợp hiện đại, phát biểu nào sau đây về tiến hóa nhỏ là đúng?', 'easy', 'singlechoice',  10),
(2,'Theo thuyết tiến hóa tổng hợp hiện đại, phát biểu nào sau đây về tiến hóa nhỏ là đúng?', 'easy', 'singlechoice',  10),
(2,'Theo thuyết tiến hóa tổng hợp hiện đại, phát biểu nào sau đây về tiến hóa nhỏ là đúng?', 'easy', 'singlechoice',  10),

(2,'Theo thuyết tiến hóa tổng hợp hiện đại, phát biểu nào sau đây về tiến hóa nhỏ là đúng?', 'medium', 'singlechoice',  10),
(2,'Theo thuyết tiến hóa tổng hợp hiện đại, phát biểu nào sau đây về tiến hóa nhỏ là đúng?', 'medium', 'singlechoice',  10),
(2,'Theo thuyết tiến hóa tổng hợp hiện đại, phát biểu nào sau đây về tiến hóa nhỏ là đúng?', 'medium', 'singlechoice',  10),
(2,'Theo thuyết tiến hóa tổng hợp hiện đại, phát biểu nào sau đây về tiến hóa nhỏ là đúng?', 'medium', 'singlechoice',  10),
(2,'Theo thuyết tiến hóa tổng hợp hiện đại, phát biểu nào sau đây về tiến hóa nhỏ là đúng?', 'medium', 'singlechoice',  10),
(2,'Theo thuyết tiến hóa tổng hợp hiện đại, phát biểu nào sau đây về tiến hóa nhỏ là đúng?', 'medium', 'singlechoice',  10),
(2,'Theo thuyết tiến hóa tổng hợp hiện đại, phát biểu nào sau đây về tiến hóa nhỏ là đúng?', 'medium', 'singlechoice',  10),
(2,'Theo thuyết tiến hóa tổng hợp hiện đại, phát biểu nào sau đây về tiến hóa nhỏ là đúng?', 'medium', 'singlechoice',  10),
(2,'Theo thuyết tiến hóa tổng hợp hiện đại, phát biểu nào sau đây về tiến hóa nhỏ là đúng?', 'medium', 'singlechoice',  10),
(2,'Theo thuyết tiến hóa tổng hợp hiện đại, phát biểu nào sau đây về tiến hóa nhỏ là đúng?', 'medium', 'singlechoice',  10),

(2,'Theo thuyết tiến hóa tổng hợp hiện đại, phát biểu nào sau đây về tiến hóa nhỏ là đúng?', 'hard', 'singlechoice',  10),
(2,'Theo thuyết tiến hóa tổng hợp hiện đại, phát biểu nào sau đây về tiến hóa nhỏ là đúng?', 'hard', 'singlechoice',  10),
(2,'Theo thuyết tiến hóa tổng hợp hiện đại, phát biểu nào sau đây về tiến hóa nhỏ là đúng?', 'hard', 'singlechoice',  10),
(2,'Theo thuyết tiến hóa tổng hợp hiện đại, phát biểu nào sau đây về tiến hóa nhỏ là đúng?', 'hard', 'singlechoice',  10),
(2,'Theo thuyết tiến hóa tổng hợp hiện đại, phát biểu nào sau đây về tiến hóa nhỏ là đúng?', 'hard', 'singlechoice',  10),
(2,'Theo thuyết tiến hóa tổng hợp hiện đại, phát biểu nào sau đây về tiến hóa nhỏ là đúng?', 'hard', 'singlechoice',  10),
(2,'Theo thuyết tiến hóa tổng hợp hiện đại, phát biểu nào sau đây về tiến hóa nhỏ là đúng?', 'hard', 'singlechoice',  10),
(2,'Theo thuyết tiến hóa tổng hợp hiện đại, phát biểu nào sau đây về tiến hóa nhỏ là đúng?', 'hard', 'singlechoice',  10),
(2,'Theo thuyết tiến hóa tổng hợp hiện đại, phát biểu nào sau đây về tiến hóa nhỏ là đúng?', 'hard', 'singlechoice',  10),
(2,'Theo thuyết tiến hóa tổng hợp hiện đại, phát biểu nào sau đây về tiến hóa nhỏ là đúng?', 'hard', 'singlechoice',  10);









DROP TABLE IF EXISTS `quiz_answer`;
SET character_set_client = utf8mb4 ;
CREATE TABLE `quiz_answer` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `quizId` bigint(20) NOT NULL,
  `questionId` bigint(20) NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `correct` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_answer_quiz` (`quizId`),
  KEY `idx_answer_question` (`questionId`),
  CONSTRAINT `fk_answer_question` FOREIGN KEY (`questionId`) REFERENCES `quiz_question` (`id`),
  CONSTRAINT `fk_answer_quiz` FOREIGN KEY (`quizId`) REFERENCES `quiz` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


INSERT INTO quiz_answer (quizId, questionId, content ,correct)
VALUES
(1, 1,'Tiến hóa nhỏ là quá trình làm biến đổi cấu trúc di truyền của quần thể.', 0),
(1, 1,'Mỗi cá thể trong quần thể là đơn vị nhỏ nhất có thể tiến hóa.', 0),
(1, 1,'Kết quả của tiến hóa nhỏ là tạo thành các đơn vị phân loại trên loài.', 1),
(1, 1,'Tiến hóa nhỏ là quá trình biến đổi trên quy mô lớn, trải qua hàng triệu năm.', 0),

(1, 2,'Tiến hóa nhỏ là quá trình làm biến đổi cấu trúc di truyền của quần thể.', 0),
(1, 2,'Mỗi cá thể trong quần thể là đơn vị nhỏ nhất có thể tiến hóa.', 0),
(1, 2,'Kết quả của tiến hóa nhỏ là tạo thành các đơn vị phân loại trên loài.', 1),
(1, 2,'Tiến hóa nhỏ là quá trình biến đổi trên quy mô lớn, trải qua hàng triệu năm.', 0),

(1, 3,'Tiến hóa nhỏ là quá trình làm biến đổi cấu trúc di truyền của quần thể.', 0),
(1, 3,'Mỗi cá thể trong quần thể là đơn vị nhỏ nhất có thể tiến hóa.', 0),
(1, 3,'Kết quả của tiến hóa nhỏ là tạo thành các đơn vị phân loại trên loài.', 1),
(1, 3,'Tiến hóa nhỏ là quá trình biến đổi trên quy mô lớn, trải qua hàng triệu năm.', 0),

(1, 4,'Tiến hóa nhỏ là quá trình làm biến đổi cấu trúc di truyền của quần thể.', 0),
(1, 4,'Mỗi cá thể trong quần thể là đơn vị nhỏ nhất có thể tiến hóa.', 0 ),
(1, 4,'Kết quả của tiến hóa nhỏ là tạo thành các đơn vị phân loại trên loài.', 1),
(1, 4,'Tiến hóa nhỏ là quá trình biến đổi trên quy mô lớn, trải qua hàng triệu năm.', 0),

(1, 5,'Tiến hóa nhỏ là quá trình làm biến đổi cấu trúc di truyền của quần thể.', 0),
(1, 5,'Mỗi cá thể trong quần thể là đơn vị nhỏ nhất có thể tiến hóa.', 0),
(1, 5,'Kết quả của tiến hóa nhỏ là tạo thành các đơn vị phân loại trên loài.', 1),
(1, 5,'Tiến hóa nhỏ là quá trình biến đổi trên quy mô lớn, trải qua hàng triệu năm.', 0),


(1, 6,'Tiến hóa nhỏ là quá trình làm biến đổi cấu trúc di truyền của quần thể.', 0),
(1, 6,'Mỗi cá thể trong quần thể là đơn vị nhỏ nhất có thể tiến hóa.', 0),
(1, 6,'Kết quả của tiến hóa nhỏ là tạo thành các đơn vị phân loại trên loài.', 1),
(1, 6,'Tiến hóa nhỏ là quá trình biến đổi trên quy mô lớn, trải qua hàng triệu năm.', 0),

(1, 7,'Tiến hóa nhỏ là quá trình làm biến đổi cấu trúc di truyền của quần thể.', 0),
(1, 7,'Mỗi cá thể trong quần thể là đơn vị nhỏ nhất có thể tiến hóa.', 0),
(1, 7,'Kết quả của tiến hóa nhỏ là tạo thành các đơn vị phân loại trên loài.', 1),
(1, 7,'Tiến hóa nhỏ là quá trình biến đổi trên quy mô lớn, trải qua hàng triệu năm.', 0),

(1, 8,'Tiến hóa nhỏ là quá trình làm biến đổi cấu trúc di truyền của quần thể.', 0),
(1, 8,'Mỗi cá thể trong quần thể là đơn vị nhỏ nhất có thể tiến hóa.', 0),
(1, 8,'Kết quả của tiến hóa nhỏ là tạo thành các đơn vị phân loại trên loài.', 1),
(1, 8,'Tiến hóa nhỏ là quá trình biến đổi trên quy mô lớn, trải qua hàng triệu năm.', 0),

(1, 9,'Tiến hóa nhỏ là quá trình làm biến đổi cấu trúc di truyền của quần thể.', 0),
(1, 9,'Mỗi cá thể trong quần thể là đơn vị nhỏ nhất có thể tiến hóa.', 0),
(1, 9,'Kết quả của tiến hóa nhỏ là tạo thành các đơn vị phân loại trên loài.', 1),
(1, 9,'Tiến hóa nhỏ là quá trình biến đổi trên quy mô lớn, trải qua hàng triệu năm.', 0),

(1, 10,'Tiến hóa nhỏ là quá trình làm biến đổi cấu trúc di truyền của quần thể.', 0),
(1, 10,'Mỗi cá thể trong quần thể là đơn vị nhỏ nhất có thể tiến hóa.', 0),
(1, 10,'Kết quả của tiến hóa nhỏ là tạo thành các đơn vị phân loại trên loài.', 1),
(1, 10,'Tiến hóa nhỏ là quá trình biến đổi trên quy mô lớn, trải qua hàng triệu năm.', 0),



(1, 11,'Tiến hóa nhỏ là quá trình làm biến đổi cấu trúc di truyền của quần thể.', 0),
(1, 11,'Mỗi cá thể trong quần thể là đơn vị nhỏ nhất có thể tiến hóa.', 0),
(1, 11,'Kết quả của tiến hóa nhỏ là tạo thành các đơn vị phân loại trên loài.', 1),
(1, 11,'Tiến hóa nhỏ là quá trình biến đổi trên quy mô lớn, trải qua hàng triệu năm.', 0),

(1, 12,'Tiến hóa nhỏ là quá trình làm biến đổi cấu trúc di truyền của quần thể.', 0),
(1, 12,'Mỗi cá thể trong quần thể là đơn vị nhỏ nhất có thể tiến hóa.', 0),
(1, 12,'Kết quả của tiến hóa nhỏ là tạo thành các đơn vị phân loại trên loài.', 1),
(1, 12,'Tiến hóa nhỏ là quá trình biến đổi trên quy mô lớn, trải qua hàng triệu năm.', 0),


(1, 13,'Tiến hóa nhỏ là quá trình làm biến đổi cấu trúc di truyền của quần thể.', 0),
(1, 13,'Mỗi cá thể trong quần thể là đơn vị nhỏ nhất có thể tiến hóa.', 0),
(1, 13,'Kết quả của tiến hóa nhỏ là tạo thành các đơn vị phân loại trên loài.', 1),
(1, 13,'Tiến hóa nhỏ là quá trình biến đổi trên quy mô lớn, trải qua hàng triệu năm.', 0),


(1, 14,'Tiến hóa nhỏ là quá trình làm biến đổi cấu trúc di truyền của quần thể.', 0),
(1, 14,'Mỗi cá thể trong quần thể là đơn vị nhỏ nhất có thể tiến hóa.', 0),
(1, 14,'Kết quả của tiến hóa nhỏ là tạo thành các đơn vị phân loại trên loài.', 1),
(1, 14,'Tiến hóa nhỏ là quá trình biến đổi trên quy mô lớn, trải qua hàng triệu năm.', 0),


(1, 15,'Tiến hóa nhỏ là quá trình làm biến đổi cấu trúc di truyền của quần thể.', 0),
(1, 15,'Mỗi cá thể trong quần thể là đơn vị nhỏ nhất có thể tiến hóa.', 0),
(1, 15,'Kết quả của tiến hóa nhỏ là tạo thành các đơn vị phân loại trên loài.', 1),
(1, 15,'Tiến hóa nhỏ là quá trình biến đổi trên quy mô lớn, trải qua hàng triệu năm.', 0),

(1, 16,'Tiến hóa nhỏ là quá trình làm biến đổi cấu trúc di truyền của quần thể.', 0),
(1, 16,'Mỗi cá thể trong quần thể là đơn vị nhỏ nhất có thể tiến hóa.', 0),
(1, 16,'Kết quả của tiến hóa nhỏ là tạo thành các đơn vị phân loại trên loài.', 1),
(1, 16,'Tiến hóa nhỏ là quá trình biến đổi trên quy mô lớn, trải qua hàng triệu năm.', 0),


(1, 16,'Tiến hóa nhỏ là quá trình làm biến đổi cấu trúc di truyền của quần thể.', 0),
(1, 16,'Mỗi cá thể trong quần thể là đơn vị nhỏ nhất có thể tiến hóa.', 0),
(1, 16,'Kết quả của tiến hóa nhỏ là tạo thành các đơn vị phân loại trên loài.', 1),
(1, 16,'Tiến hóa nhỏ là quá trình biến đổi trên quy mô lớn, trải qua hàng triệu năm.', 0),


(1, 17,'Tiến hóa nhỏ là quá trình làm biến đổi cấu trúc di truyền của quần thể.', 0),
(1, 17,'Mỗi cá thể trong quần thể là đơn vị nhỏ nhất có thể tiến hóa.', 0),
(1, 17,'Kết quả của tiến hóa nhỏ là tạo thành các đơn vị phân loại trên loài.', 1),
(1, 17,'Tiến hóa nhỏ là quá trình biến đổi trên quy mô lớn, trải qua hàng triệu năm.', 0),


(1, 18,'Tiến hóa nhỏ là quá trình làm biến đổi cấu trúc di truyền của quần thể.', 0),
(1, 18,'Mỗi cá thể trong quần thể là đơn vị nhỏ nhất có thể tiến hóa.', 0),
(1, 18,'Kết quả của tiến hóa nhỏ là tạo thành các đơn vị phân loại trên loài.', 1),
(1, 18,'Tiến hóa nhỏ là quá trình biến đổi trên quy mô lớn, trải qua hàng triệu năm.', 0),


(1, 19,'Tiến hóa nhỏ là quá trình làm biến đổi cấu trúc di truyền của quần thể.', 0),
(1, 19,'Mỗi cá thể trong quần thể là đơn vị nhỏ nhất có thể tiến hóa.', 0),
(1, 19,'Kết quả của tiến hóa nhỏ là tạo thành các đơn vị phân loại trên loài.', 1),
(1, 19,'Tiến hóa nhỏ là quá trình biến đổi trên quy mô lớn, trải qua hàng triệu năm.', 0),

(1, 20,'Tiến hóa nhỏ là quá trình làm biến đổi cấu trúc di truyền của quần thể.', 0),
(1, 20,'Mỗi cá thể trong quần thể là đơn vị nhỏ nhất có thể tiến hóa.', 0),
(1, 20,'Kết quả của tiến hóa nhỏ là tạo thành các đơn vị phân loại trên loài.', 1),
(1, 20,'Tiến hóa nhỏ là quá trình biến đổi trên quy mô lớn, trải qua hàng triệu năm.', 0),


(1, 21,'Tiến hóa nhỏ là quá trình làm biến đổi cấu trúc di truyền của quần thể.', 0),
(1, 21,'Mỗi cá thể trong quần thể là đơn vị nhỏ nhất có thể tiến hóa.', 0),
(1, 21,'Kết quả của tiến hóa nhỏ là tạo thành các đơn vị phân loại trên loài.', 1),
(1, 21,'Tiến hóa nhỏ là quá trình biến đổi trên quy mô lớn, trải qua hàng triệu năm.', 0),


(1, 22,'Tiến hóa nhỏ là quá trình làm biến đổi cấu trúc di truyền của quần thể.', 0),
(1, 22,'Mỗi cá thể trong quần thể là đơn vị nhỏ nhất có thể tiến hóa.', 0),
(1, 22,'Kết quả của tiến hóa nhỏ là tạo thành các đơn vị phân loại trên loài.', 1),
(1, 22,'Tiến hóa nhỏ là quá trình biến đổi trên quy mô lớn, trải qua hàng triệu năm.', 0),


(1, 23,'Tiến hóa nhỏ là quá trình làm biến đổi cấu trúc di truyền của quần thể.', 0),
(1, 23,'Mỗi cá thể trong quần thể là đơn vị nhỏ nhất có thể tiến hóa.', 0),
(1, 23,'Kết quả của tiến hóa nhỏ là tạo thành các đơn vị phân loại trên loài.', 1),
(1, 23,'Tiến hóa nhỏ là quá trình biến đổi trên quy mô lớn, trải qua hàng triệu năm.', 0),


(1, 24,'Tiến hóa nhỏ là quá trình làm biến đổi cấu trúc di truyền của quần thể.', 0),
(1, 24,'Mỗi cá thể trong quần thể là đơn vị nhỏ nhất có thể tiến hóa.', 0),
(1, 24,'Kết quả của tiến hóa nhỏ là tạo thành các đơn vị phân loại trên loài.', 1),
(1, 24,'Tiến hóa nhỏ là quá trình biến đổi trên quy mô lớn, trải qua hàng triệu năm.', 0),


(1, 25,'Tiến hóa nhỏ là quá trình làm biến đổi cấu trúc di truyền của quần thể.', 0),
(1, 25,'Mỗi cá thể trong quần thể là đơn vị nhỏ nhất có thể tiến hóa.', 0),
(1, 25,'Kết quả của tiến hóa nhỏ là tạo thành các đơn vị phân loại trên loài.', 1),
(1, 25,'Tiến hóa nhỏ là quá trình biến đổi trên quy mô lớn, trải qua hàng triệu năm.', 0),

(1, 26,'Tiến hóa nhỏ là quá trình làm biến đổi cấu trúc di truyền của quần thể.', 0),
(1, 26,'Mỗi cá thể trong quần thể là đơn vị nhỏ nhất có thể tiến hóa.', 0),
(1, 26,'Kết quả của tiến hóa nhỏ là tạo thành các đơn vị phân loại trên loài.', 1),
(1, 26,'Tiến hóa nhỏ là quá trình biến đổi trên quy mô lớn, trải qua hàng triệu năm.', 0),

(1, 27,'Tiến hóa nhỏ là quá trình làm biến đổi cấu trúc di truyền của quần thể.', 0),
(1, 27,'Mỗi cá thể trong quần thể là đơn vị nhỏ nhất có thể tiến hóa.', 0),
(1, 27,'Kết quả của tiến hóa nhỏ là tạo thành các đơn vị phân loại trên loài.', 1),
(1, 27,'Tiến hóa nhỏ là quá trình biến đổi trên quy mô lớn, trải qua hàng triệu năm.', 0),


(1, 28,'Tiến hóa nhỏ là quá trình làm biến đổi cấu trúc di truyền của quần thể.', 0),
(1, 28,'Mỗi cá thể trong quần thể là đơn vị nhỏ nhất có thể tiến hóa.', 0),
(1, 28,'Kết quả của tiến hóa nhỏ là tạo thành các đơn vị phân loại trên loài.', 1),
(1, 28,'Tiến hóa nhỏ là quá trình biến đổi trên quy mô lớn, trải qua hàng triệu năm.', 0),


(1, 29,'Tiến hóa nhỏ là quá trình làm biến đổi cấu trúc di truyền của quần thể.', 0),
(1, 29,'Mỗi cá thể trong quần thể là đơn vị nhỏ nhất có thể tiến hóa.', 0),
(1, 29,'Kết quả của tiến hóa nhỏ là tạo thành các đơn vị phân loại trên loài.', 1),
(1, 29,'Tiến hóa nhỏ là quá trình biến đổi trên quy mô lớn, trải qua hàng triệu năm.', 0),

(1, 30,'Tiến hóa nhỏ là quá trình làm biến đổi cấu trúc di truyền của quần thể.', 0),
(1, 30,'Mỗi cá thể trong quần thể là đơn vị nhỏ nhất có thể tiến hóa.', 0),
(1, 30,'Kết quả của tiến hóa nhỏ là tạo thành các đơn vị phân loại trên loài.', 1),
(1, 30,'Tiến hóa nhỏ là quá trình biến đổi trên quy mô lớn, trải qua hàng triệu năm.', 0),

(2, 31,'Tiến hóa nhỏ là quá trình làm biến đổi cấu trúc di truyền của quần thể.', 0),
(2, 31,'Mỗi cá thể trong quần thể là đơn vị nhỏ nhất có thể tiến hóa.', 0),
(2, 31,'Kết quả của tiến hóa nhỏ là tạo thành các đơn vị phân loại trên loài.', 1),
(2, 31,'Tiến hóa nhỏ là quá trình biến đổi trên quy mô lớn, trải qua hàng triệu năm.', 0),

(2, 32,'Tiến hóa nhỏ là quá trình làm biến đổi cấu trúc di truyền của quần thể.', 0),
(2, 32,'Mỗi cá thể trong quần thể là đơn vị nhỏ nhất có thể tiến hóa.', 0),
(2, 32,'Kết quả của tiến hóa nhỏ là tạo thành các đơn vị phân loại trên loài.', 1),
(2, 32,'Tiến hóa nhỏ là quá trình biến đổi trên quy mô lớn, trải qua hàng triệu năm.', 0),

(2, 33,'Tiến hóa nhỏ là quá trình làm biến đổi cấu trúc di truyền của quần thể.', 0),
(2, 33,'Mỗi cá thể trong quần thể là đơn vị nhỏ nhất có thể tiến hóa.', 0),
(2, 33,'Kết quả của tiến hóa nhỏ là tạo thành các đơn vị phân loại trên loài.', 1),
(2, 33,'Tiến hóa nhỏ là quá trình biến đổi trên quy mô lớn, trải qua hàng triệu năm.', 0),

(2, 34,'Tiến hóa nhỏ là quá trình làm biến đổi cấu trúc di truyền của quần thể.', 0),
(2, 34,'Mỗi cá thể trong quần thể là đơn vị nhỏ nhất có thể tiến hóa.', 0 ),
(2, 34,'Kết quả của tiến hóa nhỏ là tạo thành các đơn vị phân loại trên loài.', 1),
(2, 34,'Tiến hóa nhỏ là quá trình biến đổi trên quy mô lớn, trải qua hàng triệu năm.', 0),

(2, 35,'Tiến hóa nhỏ là quá trình làm biến đổi cấu trúc di truyền của quần thể.', 0),
(2, 35,'Mỗi cá thể trong quần thể là đơn vị nhỏ nhất có thể tiến hóa.', 0),
(2, 35,'Kết quả của tiến hóa nhỏ là tạo thành các đơn vị phân loại trên loài.', 1),
(2, 35,'Tiến hóa nhỏ là quá trình biến đổi trên quy mô lớn, trải qua hàng triệu năm.', 0),


(2, 36,'Tiến hóa nhỏ là quá trình làm biến đổi cấu trúc di truyền của quần thể.', 0),
(2, 36,'Mỗi cá thể trong quần thể là đơn vị nhỏ nhất có thể tiến hóa.', 0),
(2, 36,'Kết quả của tiến hóa nhỏ là tạo thành các đơn vị phân loại trên loài.', 1),
(2, 36,'Tiến hóa nhỏ là quá trình biến đổi trên quy mô lớn, trải qua hàng triệu năm.', 0),

(2, 37,'Tiến hóa nhỏ là quá trình làm biến đổi cấu trúc di truyền của quần thể.', 0),
(2, 37,'Mỗi cá thể trong quần thể là đơn vị nhỏ nhất có thể tiến hóa.', 0),
(2, 37,'Kết quả của tiến hóa nhỏ là tạo thành các đơn vị phân loại trên loài.', 1),
(2, 37,'Tiến hóa nhỏ là quá trình biến đổi trên quy mô lớn, trải qua hàng triệu năm.', 0),

(2, 38,'Tiến hóa nhỏ là quá trình làm biến đổi cấu trúc di truyền của quần thể.', 0),
(2, 38,'Mỗi cá thể trong quần thể là đơn vị nhỏ nhất có thể tiến hóa.', 0),
(2, 38,'Kết quả của tiến hóa nhỏ là tạo thành các đơn vị phân loại trên loài.', 1),
(2, 38,'Tiến hóa nhỏ là quá trình biến đổi trên quy mô lớn, trải qua hàng triệu năm.', 0),

(2, 39,'Tiến hóa nhỏ là quá trình làm biến đổi cấu trúc di truyền của quần thể.', 0),
(2, 39,'Mỗi cá thể trong quần thể là đơn vị nhỏ nhất có thể tiến hóa.', 0),
(2, 39,'Kết quả của tiến hóa nhỏ là tạo thành các đơn vị phân loại trên loài.', 1),
(2, 39,'Tiến hóa nhỏ là quá trình biến đổi trên quy mô lớn, trải qua hàng triệu năm.', 0),

(2, 40,'Tiến hóa nhỏ là quá trình làm biến đổi cấu trúc di truyền của quần thể.', 0),
(2, 40,'Mỗi cá thể trong quần thể là đơn vị nhỏ nhất có thể tiến hóa.', 0),
(2, 40,'Kết quả của tiến hóa nhỏ là tạo thành các đơn vị phân loại trên loài.', 1),
(2, 40,'Tiến hóa nhỏ là quá trình biến đổi trên quy mô lớn, trải qua hàng triệu năm.', 0),



(2, 41,'Tiến hóa nhỏ là quá trình làm biến đổi cấu trúc di truyền của quần thể.', 0),
(2, 41,'Mỗi cá thể trong quần thể là đơn vị nhỏ nhất có thể tiến hóa.', 0),
(2, 41,'Kết quả của tiến hóa nhỏ là tạo thành các đơn vị phân loại trên loài.', 1),
(2, 41,'Tiến hóa nhỏ là quá trình biến đổi trên quy mô lớn, trải qua hàng triệu năm.', 0),

(2, 42,'Tiến hóa nhỏ là quá trình làm biến đổi cấu trúc di truyền của quần thể.', 0),
(2, 42,'Mỗi cá thể trong quần thể là đơn vị nhỏ nhất có thể tiến hóa.', 0),
(2, 42,'Kết quả của tiến hóa nhỏ là tạo thành các đơn vị phân loại trên loài.', 1),
(2, 42,'Tiến hóa nhỏ là quá trình biến đổi trên quy mô lớn, trải qua hàng triệu năm.', 0),


(2, 43,'Tiến hóa nhỏ là quá trình làm biến đổi cấu trúc di truyền của quần thể.', 0),
(2, 43,'Mỗi cá thể trong quần thể là đơn vị nhỏ nhất có thể tiến hóa.', 0),
(2, 43,'Kết quả của tiến hóa nhỏ là tạo thành các đơn vị phân loại trên loài.', 1),
(2, 43,'Tiến hóa nhỏ là quá trình biến đổi trên quy mô lớn, trải qua hàng triệu năm.', 0),


(2, 44,'Tiến hóa nhỏ là quá trình làm biến đổi cấu trúc di truyền của quần thể.', 0),
(2, 44,'Mỗi cá thể trong quần thể là đơn vị nhỏ nhất có thể tiến hóa.', 0),
(2, 44,'Kết quả của tiến hóa nhỏ là tạo thành các đơn vị phân loại trên loài.', 1),
(2, 44,'Tiến hóa nhỏ là quá trình biến đổi trên quy mô lớn, trải qua hàng triệu năm.', 0),


(2, 45,'Tiến hóa nhỏ là quá trình làm biến đổi cấu trúc di truyền của quần thể.', 0),
(2, 45,'Mỗi cá thể trong quần thể là đơn vị nhỏ nhất có thể tiến hóa.', 0),
(2, 45,'Kết quả của tiến hóa nhỏ là tạo thành các đơn vị phân loại trên loài.', 1),
(2, 45,'Tiến hóa nhỏ là quá trình biến đổi trên quy mô lớn, trải qua hàng triệu năm.', 0),

(2, 46,'Tiến hóa nhỏ là quá trình làm biến đổi cấu trúc di truyền của quần thể.', 0),
(2, 46,'Mỗi cá thể trong quần thể là đơn vị nhỏ nhất có thể tiến hóa.', 0),
(2, 46,'Kết quả của tiến hóa nhỏ là tạo thành các đơn vị phân loại trên loài.', 1),
(2, 46,'Tiến hóa nhỏ là quá trình biến đổi trên quy mô lớn, trải qua hàng triệu năm.', 0),


(2, 46,'Tiến hóa nhỏ là quá trình làm biến đổi cấu trúc di truyền của quần thể.', 0),
(2, 46,'Mỗi cá thể trong quần thể là đơn vị nhỏ nhất có thể tiến hóa.', 0),
(2, 46,'Kết quả của tiến hóa nhỏ là tạo thành các đơn vị phân loại trên loài.', 1),
(2, 46,'Tiến hóa nhỏ là quá trình biến đổi trên quy mô lớn, trải qua hàng triệu năm.', 0),


(2, 47,'Tiến hóa nhỏ là quá trình làm biến đổi cấu trúc di truyền của quần thể.', 0),
(2, 47,'Mỗi cá thể trong quần thể là đơn vị nhỏ nhất có thể tiến hóa.', 0),
(2, 47,'Kết quả của tiến hóa nhỏ là tạo thành các đơn vị phân loại trên loài.', 1),
(2, 47,'Tiến hóa nhỏ là quá trình biến đổi trên quy mô lớn, trải qua hàng triệu năm.', 0),


(2, 48,'Tiến hóa nhỏ là quá trình làm biến đổi cấu trúc di truyền của quần thể.', 0),
(2, 48,'Mỗi cá thể trong quần thể là đơn vị nhỏ nhất có thể tiến hóa.', 0),
(2, 48,'Kết quả của tiến hóa nhỏ là tạo thành các đơn vị phân loại trên loài.', 1),
(2, 48,'Tiến hóa nhỏ là quá trình biến đổi trên quy mô lớn, trải qua hàng triệu năm.', 0),


(2, 49,'Tiến hóa nhỏ là quá trình làm biến đổi cấu trúc di truyền của quần thể.', 0),
(2, 49,'Mỗi cá thể trong quần thể là đơn vị nhỏ nhất có thể tiến hóa.', 0),
(2, 49,'Kết quả của tiến hóa nhỏ là tạo thành các đơn vị phân loại trên loài.', 1),
(2, 49,'Tiến hóa nhỏ là quá trình biến đổi trên quy mô lớn, trải qua hàng triệu năm.', 0),

(2, 50,'Tiến hóa nhỏ là quá trình làm biến đổi cấu trúc di truyền của quần thể.', 0),
(2, 50,'Mỗi cá thể trong quần thể là đơn vị nhỏ nhất có thể tiến hóa.', 0),
(2, 50,'Kết quả của tiến hóa nhỏ là tạo thành các đơn vị phân loại trên loài.', 1),
(2, 50,'Tiến hóa nhỏ là quá trình biến đổi trên quy mô lớn, trải qua hàng triệu năm.', 0),


(2, 51,'Tiến hóa nhỏ là quá trình làm biến đổi cấu trúc di truyền của quần thể.', 0),
(2, 51,'Mỗi cá thể trong quần thể là đơn vị nhỏ nhất có thể tiến hóa.', 0),
(2, 51,'Kết quả của tiến hóa nhỏ là tạo thành các đơn vị phân loại trên loài.', 1),
(2, 51,'Tiến hóa nhỏ là quá trình biến đổi trên quy mô lớn, trải qua hàng triệu năm.', 0),


(2, 52,'Tiến hóa nhỏ là quá trình làm biến đổi cấu trúc di truyền của quần thể.', 0),
(2, 52,'Mỗi cá thể trong quần thể là đơn vị nhỏ nhất có thể tiến hóa.', 0),
(2, 52,'Kết quả của tiến hóa nhỏ là tạo thành các đơn vị phân loại trên loài.', 1),
(2, 52,'Tiến hóa nhỏ là quá trình biến đổi trên quy mô lớn, trải qua hàng triệu năm.', 0),


(2, 53,'Tiến hóa nhỏ là quá trình làm biến đổi cấu trúc di truyền của quần thể.', 0),
(2, 53,'Mỗi cá thể trong quần thể là đơn vị nhỏ nhất có thể tiến hóa.', 0),
(2, 53,'Kết quả của tiến hóa nhỏ là tạo thành các đơn vị phân loại trên loài.', 1),
(2, 53,'Tiến hóa nhỏ là quá trình biến đổi trên quy mô lớn, trải qua hàng triệu năm.', 0),


(2, 54,'Tiến hóa nhỏ là quá trình làm biến đổi cấu trúc di truyền của quần thể.', 0),
(2, 54,'Mỗi cá thể trong quần thể là đơn vị nhỏ nhất có thể tiến hóa.', 0),
(2, 54,'Kết quả của tiến hóa nhỏ là tạo thành các đơn vị phân loại trên loài.', 1),
(2, 54,'Tiến hóa nhỏ là quá trình biến đổi trên quy mô lớn, trải qua hàng triệu năm.', 0),


(2, 55,'Tiến hóa nhỏ là quá trình làm biến đổi cấu trúc di truyền của quần thể.', 0),
(2, 55,'Mỗi cá thể trong quần thể là đơn vị nhỏ nhất có thể tiến hóa.', 0),
(2, 55,'Kết quả của tiến hóa nhỏ là tạo thành các đơn vị phân loại trên loài.', 1),
(2, 55,'Tiến hóa nhỏ là quá trình biến đổi trên quy mô lớn, trải qua hàng triệu năm.', 0),

(2, 56,'Tiến hóa nhỏ là quá trình làm biến đổi cấu trúc di truyền của quần thể.', 0),
(2, 56,'Mỗi cá thể trong quần thể là đơn vị nhỏ nhất có thể tiến hóa.', 0),
(2, 56,'Kết quả của tiến hóa nhỏ là tạo thành các đơn vị phân loại trên loài.', 1),
(2, 56,'Tiến hóa nhỏ là quá trình biến đổi trên quy mô lớn, trải qua hàng triệu năm.', 0),

(2, 57,'Tiến hóa nhỏ là quá trình làm biến đổi cấu trúc di truyền của quần thể.', 0),
(2, 57,'Mỗi cá thể trong quần thể là đơn vị nhỏ nhất có thể tiến hóa.', 0),
(2, 57,'Kết quả của tiến hóa nhỏ là tạo thành các đơn vị phân loại trên loài.', 1),
(2, 57,'Tiến hóa nhỏ là quá trình biến đổi trên quy mô lớn, trải qua hàng triệu năm.', 0),


(2, 58,'Tiến hóa nhỏ là quá trình làm biến đổi cấu trúc di truyền của quần thể.', 0),
(2, 58,'Mỗi cá thể trong quần thể là đơn vị nhỏ nhất có thể tiến hóa.', 0),
(2, 58,'Kết quả của tiến hóa nhỏ là tạo thành các đơn vị phân loại trên loài.', 1),
(2, 58,'Tiến hóa nhỏ là quá trình biến đổi trên quy mô lớn, trải qua hàng triệu năm.', 0),


(2, 59,'Tiến hóa nhỏ là quá trình làm biến đổi cấu trúc di truyền của quần thể.', 0),
(2, 59,'Mỗi cá thể trong quần thể là đơn vị nhỏ nhất có thể tiến hóa.', 0),
(2, 59,'Kết quả của tiến hóa nhỏ là tạo thành các đơn vị phân loại trên loài.', 1),
(2, 59,'Tiến hóa nhỏ là quá trình biến đổi trên quy mô lớn, trải qua hàng triệu năm.', 0),

(2, 60,'Tiến hóa nhỏ là quá trình làm biến đổi cấu trúc di truyền của quần thể.', 0),
(2, 60,'Mỗi cá thể trong quần thể là đơn vị nhỏ nhất có thể tiến hóa.', 0),
(2, 60,'Kết quả của tiến hóa nhỏ là tạo thành các đơn vị phân loại trên loài.', 1),
(2, 60,'Tiến hóa nhỏ là quá trình biến đổi trên quy mô lớn, trải qua hàng triệu năm.', 0);



DROP TABLE IF EXISTS `take`;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `take` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `userId` bigint(20) NOT NULL,
  `quizId` bigint(20) NOT NULL,
  `status` smallint(6) NOT NULL DEFAULT '1',
  `difficult` varchar(75) COLLATE utf8mb4_unicode_ci NOT NULL,
  `take_score` smallint(6) NOT NULL DEFAULT '0',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `startedAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `finishedAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `content` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`),
  KEY `idx_take_user` (`userId`),
  KEY `idx_take_quiz` (`quizId`),
  CONSTRAINT `fk_take_quiz` FOREIGN KEY (`quizId`) REFERENCES `quiz` (`id`),
  CONSTRAINT `fk_take_user` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO take (userId, quizId, status ,difficult, take_score)
VALUES
(1,1,1,'easy',90),
(1,1,1,'medium',80),
(1,2,1,'easy',100),
(2,1,1,'easy',100);




DROP TABLE IF EXISTS `take_answer`;
SET character_set_client = utf8mb4 ;
CREATE TABLE `take_answer` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `takeId` bigint(20) NOT NULL,
  `quizId` bigint(20) NOT NULL,
  `questionId` bigint(20) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `content` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`),
  KEY `idx_answer_take` (`takeId`),
  KEY `idx_tanswer_question` (`questionId`),
  CONSTRAINT `fk_answer_take` FOREIGN KEY (`takeId`) REFERENCES `take` (`id`),
  CONSTRAINT `fk_tanswer_question` FOREIGN KEY (`questionId`) REFERENCES `quiz_question` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO take_answer (takeId, quizId, questionId, active)
VALUES
(1,1,1,0),
(1,1,2,1),
(1,1,3,1),
(1,1,4,1),
(1,1,5,1),
(1,1,6,1),
(1,1,7,1),
(1,1,8,1),
(1,1,9,1),
(1,1,10,1),

(2,1,11,1),
(2,1,12,1),
(2,1,13,1),
(2,1,14,1),
(2,1,15,1),
(2,1,16,1),
(2,1,17,0),
(2,1,18,1),
(2,1,19,1),
(2,1,20,0),

(3,2,31,1),
(3,2,32,1),
(3,2,33,1),
(3,2,34,1),
(3,2,35,1),
(3,2,36,1),
(3,2,37,1),
(3,2,38,1),
(3,2,39,1),
(3,2,40,1),

(4,2,41,1),
(4,2,42,1),
(4,2,43,1),
(4,2,44,1),
(4,2,45,1),
(4,2,46,1),
(4,2,47,1),
(4,2,48,1),
(4,2,49,1),
(4,2,50,1);

