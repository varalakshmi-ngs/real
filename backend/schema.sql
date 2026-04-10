-- Real Temple Project Database Schema (MySQL)
-- Generated from backend/models.js

SET FOREIGN_KEY_CHECKS = 0;

-- 1. Users Table
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_VALUE NOT NULL PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Contacts Table
CREATE TABLE IF NOT EXISTS `contacts` (
  `id` INT AUTO_VALUE NOT NULL PRIMARY KEY,
  `first_name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `mobile` VARCHAR(255) NOT NULL,
  `subject` VARCHAR(255) NOT NULL,
  `message` TEXT NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Testimonials Table
CREATE TABLE IF NOT EXISTS `testimonials` (
  `id` INT AUTO_VALUE NOT NULL PRIMARY KEY,
  `image` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `comment` TEXT NOT NULL,
  `is_approved` ENUM('initiall', 'approved', 'rejected') DEFAULT 'initiall',
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. PrayerRequests Table
CREATE TABLE IF NOT EXISTS `prayer_requests` (
  `id` INT AUTO_VALUE NOT NULL PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `for_whom` VARCHAR(255) NOT NULL,
  `prayer_type` VARCHAR(255) NOT NULL,
  `language` VARCHAR(255) NOT NULL,
  `city` VARCHAR(255) NOT NULL,
  `mobile` VARCHAR(255) NOT NULL,
  `message` TEXT NOT NULL,
  `is_prayer` TINYINT(1) DEFAULT 0,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. Donations Table
CREATE TABLE IF NOT EXISTS `donations` (
  `id` INT AUTO_VALUE NOT NULL PRIMARY KEY,
  `full_name` VARCHAR(255),
  `mobile` VARCHAR(255),
  `email` VARCHAR(255),
  `amount` DECIMAL(10, 2),
  `purpose` VARCHAR(255),
  `order_id` VARCHAR(255),
  `payment_id` VARCHAR(255),
  `payment_status` ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
  `tv_channel` VARCHAR(255),
  `ad_count` INT,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 6. Events Table
CREATE TABLE IF NOT EXISTS `events` (
  `id` INT AUTO_VALUE NOT NULL PRIMARY KEY,
  `event_name` VARCHAR(255) NOT NULL,
  `date` DATETIME NOT NULL,
  `description` TEXT NOT NULL,
  `event_type` VARCHAR(255) NOT NULL,
  `start_time` VARCHAR(255) NOT NULL,
  `end_time` VARCHAR(255) NOT NULL,
  `location` VARCHAR(255) NOT NULL,
  `image` VARCHAR(255),
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 7. Blogs Table
CREATE TABLE IF NOT EXISTS `blogs` (
  `id` INT AUTO_VALUE NOT NULL PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `author` VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  `category` VARCHAR(255) NOT NULL,
  `image` VARCHAR(255),
  `location` VARCHAR(255),
  `date` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 8. GalleryCategories Table
CREATE TABLE IF NOT EXISTS `gallery_categories` (
  `id` INT AUTO_VALUE NOT NULL PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 9. GalleryImages Table
CREATE TABLE IF NOT EXISTS `gallery_images` (
  `id` INT AUTO_VALUE NOT NULL PRIMARY KEY,
  `image` VARCHAR(255) NOT NULL,
  `category_id` INT,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  FOREIGN KEY (`category_id`) REFERENCES `gallery_categories`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 10. HomePages Table
CREATE TABLE IF NOT EXISTS `home_pages` (
  `id` INT AUTO_VALUE NOT NULL PRIMARY KEY,
  `hero_title` VARCHAR(255),
  `hero_sub_text` TEXT,
  `hero_button_text` VARCHAR(255),
  `hero_button_link` VARCHAR(255),
  `hero_image` VARCHAR(255),
  `pastor_name` VARCHAR(255),
  `pastor_description` TEXT,
  `pastor_image` VARCHAR(255),
  `latest_heading` VARCHAR(255),
  `latest_description` TEXT,
  `latest_host_name` VARCHAR(255),
  `latest_title` VARCHAR(255),
  `latest_youtube_link` VARCHAR(255),
  `latest_thumbnail_image` VARCHAR(255),
  `morning_service` VARCHAR(255),
  `evening_service` VARCHAR(255),
  `sunday_school` VARCHAR(255),
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 11. Videos Table
CREATE TABLE IF NOT EXISTS `videos` (
  `id` INT AUTO_VALUE NOT NULL PRIMARY KEY,
  `youtube_link` VARCHAR(255) NOT NULL,
  `speaker_name` VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  `sub_text` VARCHAR(255) NOT NULL,
  `thumbnail_image` VARCHAR(255) NOT NULL,
  `home_page_id` INT,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  FOREIGN KEY (`home_page_id`) REFERENCES `home_pages`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 12. WeekendPrograms Table
CREATE TABLE IF NOT EXISTS `weekend_programs` (
  `id` INT AUTO_VALUE NOT NULL PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `sub_text` TEXT NOT NULL,
  `button_text` VARCHAR(255) NOT NULL,
  `youtube_link` VARCHAR(255) NOT NULL,
  `date` VARCHAR(255) NOT NULL,
  `time` VARCHAR(255) NOT NULL,
  `location` VARCHAR(255) NOT NULL,
  `home_page_id` INT,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  FOREIGN KEY (`home_page_id`) REFERENCES `home_pages`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 13. AboutPages Table
CREATE TABLE IF NOT EXISTS `about_pages` (
  `id` INT AUTO_VALUE NOT NULL PRIMARY KEY,
  `hero_title` VARCHAR(255),
  `hero_sub_text` TEXT,
  `hero_image` VARCHAR(255),
  `pastor_name` VARCHAR(255),
  `pastor_title` VARCHAR(255),
  `pastor_description` TEXT,
  `pastor_image` VARCHAR(255),
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 14. TeamMembers Table
CREATE TABLE IF NOT EXISTS `team_members` (
  `id` INT AUTO_VALUE NOT NULL PRIMARY KEY,
  `name` VARCHAR(255),
  `designation` VARCHAR(255),
  `description` TEXT,
  `image` VARCHAR(255),
  `about_page_id` INT,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  FOREIGN KEY (`about_page_id`) REFERENCES `about_pages`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 15. SocialLinks Table
CREATE TABLE IF NOT EXISTS `social_links` (
  `id` INT AUTO_VALUE NOT NULL PRIMARY KEY,
  `facebook` VARCHAR(255),
  `instagram` VARCHAR(255),
  `youtube` VARCHAR(255),
  `twitter` VARCHAR(255),
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 16. Magazines Table
CREATE TABLE IF NOT EXISTS `magazines` (
  `id` INT AUTO_VALUE NOT NULL PRIMARY KEY,
  `pdf` VARCHAR(255) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `sub_title` VARCHAR(255),
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 17. Services Table
CREATE TABLE IF NOT EXISTS `services` (
  `id` INT AUTO_VALUE NOT NULL PRIMARY KEY,
  `day` VARCHAR(255) NOT NULL UNIQUE,
  `department` VARCHAR(255) NOT NULL,
  `service1` VARCHAR(255) NOT NULL,
  `service2` VARCHAR(255),
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

SET FOREIGN_KEY_CHECKS = 1;
