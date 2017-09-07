-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: localhost    Database: indiortours
-- ------------------------------------------------------
-- Server version	5.7.11

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `amenities`
--

DROP TABLE IF EXISTS `amenities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `amenities` (
  `id` int(11) NOT NULL,
  `name` varchar(200) CHARACTER SET utf8 NOT NULL,
  `amtype` varchar(100) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `amenities_translation`
--

DROP TABLE IF EXISTS `amenities_translation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `amenities_translation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `attrid` int(10) unsigned NOT NULL,
  `lang` varchar(10) DEFAULT NULL,
  `trans_name` varchar(250) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3691 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pt_accounts`
--

DROP TABLE IF EXISTS `pt_accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_accounts` (
  `accounts_id` int(11) NOT NULL AUTO_INCREMENT,
  `ai_title` varchar(5) DEFAULT NULL,
  `ai_first_name` varchar(50) DEFAULT NULL,
  `ai_last_name` varchar(50) DEFAULT NULL,
  `accounts_email` varchar(255) NOT NULL,
  `accounts_password` varchar(50) NOT NULL,
  `ai_dob` varchar(50) DEFAULT NULL,
  `ai_country` varchar(5) DEFAULT NULL,
  `ai_state` varchar(250) DEFAULT NULL,
  `ai_city` varchar(250) DEFAULT NULL,
  `ai_address_1` text,
  `ai_address_2` text,
  `ai_mobile` varchar(20) DEFAULT NULL,
  `ai_fax` int(20) DEFAULT NULL,
  `ai_postal_code` varchar(50) DEFAULT NULL,
  `ai_passport` varchar(50) DEFAULT NULL,
  `ai_website` varchar(100) DEFAULT NULL,
  `ai_image` varchar(35) DEFAULT NULL,
  `accounts_type` enum('webadmin','admin','supplier','customers','guest') NOT NULL,
  `accounts_is_admin` tinyint(4) NOT NULL DEFAULT '0',
  `accounts_created_at` datetime DEFAULT NULL,
  `accounts_updated_at` datetime DEFAULT NULL,
  `accounts_status` enum('yes','no') NOT NULL DEFAULT 'yes',
  `accounts_verified` tinyint(4) DEFAULT '1',
  `accounts_last_login` bigint(20) DEFAULT NULL,
  `accounts_permissions` text,
  `appliedfor` text,
  `facebook_id` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`accounts_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pt_admin_notes`
--

DROP TABLE IF EXISTS `pt_admin_notes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_admin_notes` (
  `notes_id` int(11) NOT NULL AUTO_INCREMENT,
  `notes_user` int(11) NOT NULL,
  `notes_desc` text,
  PRIMARY KEY (`notes_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pt_app_settings`
--

DROP TABLE IF EXISTS `pt_app_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_app_settings` (
  `id` int(11) NOT NULL,
  `user` varchar(50) CHARACTER SET latin1 NOT NULL,
  `site_title` varchar(70) NOT NULL,
  `home_title` varchar(250) DEFAULT NULL,
  `site_url` varchar(100) CHARACTER SET latin1 NOT NULL,
  `ssl_url` tinyint(2) DEFAULT NULL,
  `tag_line` varchar(255) DEFAULT NULL,
  `site_name` varchar(100) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `copyright` varchar(100) NOT NULL,
  `seo_status` smallint(6) NOT NULL DEFAULT '1',
  `keywords` text,
  `meta_description` text,
  `header_logo_img` varchar(30) CHARACTER SET latin1 NOT NULL,
  `footer_logo_img` varchar(35) DEFAULT NULL,
  `favicon_img` varchar(30) CHARACTER SET latin1 DEFAULT NULL,
  `currency_sign` varchar(5) DEFAULT NULL,
  `currency_code` varchar(10) DEFAULT NULL,
  `google` text,
  `mapApi` varchar(250) DEFAULT NULL,
  `javascript` text,
  `reviews` enum('Yes','No') NOT NULL DEFAULT 'No',
  `gallery_approve` smallint(6) NOT NULL DEFAULT '1',
  `video_uploads` smallint(6) NOT NULL DEFAULT '0',
  `default_lang` varchar(100) NOT NULL DEFAULT 'english_us',
  `multi_lang` smallint(6) NOT NULL DEFAULT '1',
  `date_f` varchar(50) DEFAULT NULL,
  `date_f_js` varchar(50) DEFAULT NULL,
  `license_key` varchar(50) DEFAULT NULL,
  `local_key` text,
  `secret_key` varchar(50) DEFAULT NULL,
  `default_city` int(11) DEFAULT NULL,
  `default_theme` varchar(75) DEFAULT 'default',
  `offline_message` text,
  `site_offline` smallint(6) DEFAULT '0',
  `multi_curr` tinyint(4) NOT NULL DEFAULT '0',
  `booking_expiry` tinyint(4) DEFAULT '1',
  `booking_cancellation` tinyint(4) NOT NULL DEFAULT '1',
  `coupon_code_length` tinyint(4) NOT NULL DEFAULT '8',
  `coupon_code_type` varchar(8) NOT NULL DEFAULT 'numeric',
  `secure_admin_key` varchar(10) DEFAULT NULL,
  `secure_admin_status` tinyint(4) DEFAULT '0',
  `secure_supplier_key` varchar(10) DEFAULT NULL,
  `secure_supplier_status` tinyint(4) DEFAULT '0',
  `allow_registration` tinyint(4) DEFAULT '1',
  `user_reg_approval` enum('Yes','No') NOT NULL DEFAULT 'No',
  `allow_supplier_registration` tinyint(4) NOT NULL DEFAULT '1',
  `default_gateway` varchar(200) DEFAULT NULL,
  `searchbox` varchar(50) DEFAULT NULL,
  `rss` tinyint(4) DEFAULT '1',
  `updates_check` smallint(6) DEFAULT '24',
  `restrict_website` enum('Yes','No') NOT NULL DEFAULT 'No',
  `mobile_redirect_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pt_blog`
--

DROP TABLE IF EXISTS `pt_blog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_blog` (
  `post_id` int(11) NOT NULL AUTO_INCREMENT,
  `post_title` varchar(250) NOT NULL,
  `post_slug` varchar(255) DEFAULT NULL,
  `post_desc` text,
  `post_category` int(11) DEFAULT NULL,
  `post_meta_keywords` text,
  `post_meta_desc` text,
  `post_order` int(11) NOT NULL,
  `post_related` varchar(200) DEFAULT NULL,
  `post_img` varchar(255) DEFAULT NULL,
  `post_status` enum('Yes','No') NOT NULL DEFAULT 'Yes',
  `post_created_at` bigint(20) NOT NULL,
  `post_updated_at` bigint(20) NOT NULL,
  `post_visits` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`post_id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pt_blog_categories`
--

DROP TABLE IF EXISTS `pt_blog_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_blog_categories` (
  `cat_id` int(11) NOT NULL AUTO_INCREMENT,
  `cat_name` varchar(250) CHARACTER SET utf8 NOT NULL,
  `cat_slug` varchar(250) DEFAULT NULL,
  `cat_status` enum('Yes','No') NOT NULL DEFAULT 'Yes',
  PRIMARY KEY (`cat_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pt_blog_categories_translation`
--

DROP TABLE IF EXISTS `pt_blog_categories_translation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_blog_categories_translation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cat_id` int(11) NOT NULL,
  `cat_name` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `trans_lang` varchar(20) CHARACTER SET latin1 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pt_blog_translation`
--

DROP TABLE IF EXISTS `pt_blog_translation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_blog_translation` (
  `trans_id` int(11) NOT NULL AUTO_INCREMENT,
  `trans_title` text,
  `trans_desc` text,
  `item_id` int(11) NOT NULL,
  `trans_keywords` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `trans_meta_desc` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `trans_lang` varchar(255) CHARACTER SET latin1 NOT NULL,
  PRIMARY KEY (`trans_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pt_booked_cars`
--

DROP TABLE IF EXISTS `pt_booked_cars`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_booked_cars` (
  `booked_id` int(11) NOT NULL AUTO_INCREMENT,
  `booked_car_id` int(11) NOT NULL,
  `booked_pickupdate` date DEFAULT NULL,
  `booked_pickuptime` varchar(25) DEFAULT NULL,
  `booked_pickuplocation` varchar(25) NOT NULL,
  `booked_dropofflocation` varchar(25) DEFAULT NULL,
  `booked_dropoffDate` date DEFAULT NULL,
  `booked_dropoffTime` varchar(25) DEFAULT NULL,
  `booked_booking_id` int(11) NOT NULL,
  `booked_booking_status` varchar(10) NOT NULL,
  PRIMARY KEY (`booked_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pt_booked_rooms`
--

DROP TABLE IF EXISTS `pt_booked_rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_booked_rooms` (
  `booked_id` int(11) NOT NULL AUTO_INCREMENT,
  `booked_room_id` int(11) NOT NULL,
  `booked_room_count` tinyint(4) NOT NULL,
  `booked_checkin` date DEFAULT NULL,
  `booked_checkout` date DEFAULT NULL,
  `booked_extra_bed` tinyint(4) DEFAULT '0',
  `booked_booking_id` int(11) NOT NULL,
  `booked_booking_status` varchar(10) NOT NULL,
  PRIMARY KEY (`booked_id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pt_bookings`
--

DROP TABLE IF EXISTS `pt_bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_bookings` (
  `booking_id` int(11) NOT NULL AUTO_INCREMENT,
  `booking_ref_no` varchar(17) DEFAULT NULL,
  `booking_type` varchar(50) NOT NULL,
  `booking_item` int(11) NOT NULL,
  `booking_subitem` text,
  `booking_extras` varchar(255) DEFAULT NULL,
  `booking_date` bigint(20) NOT NULL,
  `booking_expiry` bigint(20) NOT NULL,
  `booking_user` int(11) NOT NULL,
  `booking_status` varchar(10) NOT NULL,
  `booking_payment_type` varchar(100) DEFAULT NULL,
  `booking_additional_notes` text,
  `booking_total` double NOT NULL,
  `booking_amount_paid` double NOT NULL DEFAULT '0',
  `booking_remaining` double NOT NULL,
  `booking_checkin` date DEFAULT NULL,
  `booking_checkout` date DEFAULT NULL,
  `booking_nights` tinyint(4) DEFAULT NULL,
  `booking_adults` tinyint(4) DEFAULT '1',
  `booking_child` tinyint(4) DEFAULT '0',
  `booking_deposit` double NOT NULL,
  `booking_tax` double NOT NULL,
  `booking_paymethod_tax` double NOT NULL,
  `booking_extras_total_fee` double DEFAULT '0',
  `booking_extra_beds` int(11) DEFAULT '0',
  `booking_extra_beds_charges` double DEFAULT '0',
  `booking_curr_code` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `booking_curr_symbol` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `booking_coupon` varchar(10) DEFAULT NULL,
  `booking_coupon_rate` double DEFAULT NULL,
  `booking_payment_date` bigint(20) DEFAULT NULL,
  `booking_cancellation_request` tinyint(4) NOT NULL DEFAULT '0',
  `booking_txn_id` varchar(255) DEFAULT NULL,
  `booking_show` tinyint(4) DEFAULT '1',
  `booking_guest_info` text,
  `book_token` text,
  `booking_logs` text,
  PRIMARY KEY (`booking_id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pt_car_aprice`
--

DROP TABLE IF EXISTS `pt_car_aprice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_car_aprice` (
  `cp_id` int(11) NOT NULL AUTO_INCREMENT,
  `cp_car_id` int(11) NOT NULL,
  `cp_basic` double NOT NULL,
  `cp_discount` double DEFAULT NULL,
  `cp_from` bigint(20) NOT NULL,
  `cp_to` bigint(20) NOT NULL,
  PRIMARY KEY (`cp_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pt_car_images`
--

DROP TABLE IF EXISTS `pt_car_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_car_images` (
  `cimg_id` int(11) NOT NULL AUTO_INCREMENT,
  `cimg_car_id` int(11) NOT NULL,
  `cimg_type` varchar(20) NOT NULL,
  `cimg_image` text,
  `cimg_order` int(11) DEFAULT NULL,
  `cimg_approved` tinyint(6) DEFAULT '0',
  PRIMARY KEY (`cimg_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pt_car_locations`
--

DROP TABLE IF EXISTS `pt_car_locations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_car_locations` (
  `id` int(11) NOT NULL,
  `position` tinyint(4) NOT NULL,
  `pickup_location_id` int(11) NOT NULL,
  `dropoff_location_id` int(11) NOT NULL,
  `price` double NOT NULL,
  `car_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pt_car_unavailability`
--

DROP TABLE IF EXISTS `pt_car_unavailability`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_car_unavailability` (
  `cun_id` int(11) NOT NULL,
  `cun_car_id` int(11) NOT NULL,
  `cun_from` bigint(20) NOT NULL,
  `cun_to` bigint(20) NOT NULL,
  `cun_status` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`cun_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pt_cars`
--

DROP TABLE IF EXISTS `pt_cars`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_cars` (
  `car_id` int(11) NOT NULL AUTO_INCREMENT,
  `car_title` varchar(250) NOT NULL,
  `car_slug` varchar(250) DEFAULT NULL,
  `car_desc` text,
  `car_stars` tinyint(4) DEFAULT NULL,
  `car_is_featured` enum('yes','no') DEFAULT 'no',
  `car_featured_from` bigint(20) DEFAULT NULL,
  `car_featured_to` bigint(20) DEFAULT NULL,
  `car_owned_by` int(11) NOT NULL,
  `car_type` int(11) DEFAULT NULL,
  `car_passengers` tinyint(4) DEFAULT NULL,
  `car_doors` tinyint(4) DEFAULT NULL,
  `car_transmission` varchar(15) DEFAULT NULL,
  `car_baggage` varchar(5) DEFAULT NULL,
  `car_airport_pickup` varchar(3) DEFAULT NULL,
  `car_cancel_anytime` varchar(3) DEFAULT NULL,
  `car_free_amend` varchar(3) DEFAULT NULL,
  `car_unlimited_mile` varchar(3) DEFAULT NULL,
  `car_basic_price` double NOT NULL,
  `car_basic_discount` double DEFAULT NULL,
  `car_meta_title` varchar(250) DEFAULT NULL,
  `car_meta_keywords` text,
  `car_meta_desc` text,
  `car_payment_opt` text,
  `car_policy` text,
  `car_address` varchar(250) DEFAULT NULL,
  `car_latitude` varchar(25) DEFAULT NULL,
  `car_longitude` varchar(25) DEFAULT NULL,
  `car_location` text,
  `car_mapaddress` varchar(250) DEFAULT NULL,
  `car_country` varchar(100) DEFAULT NULL,
  `car_city_address` varchar(200) DEFAULT NULL,
  `car_city` varchar(255) DEFAULT NULL,
  `car_zip` varchar(10) DEFAULT NULL,
  `car_status` enum('Yes','No') NOT NULL DEFAULT 'Yes',
  `car_order` int(11) DEFAULT NULL,
  `car_related` varchar(200) DEFAULT NULL,
  `car_comm_fixed` double DEFAULT NULL,
  `car_comm_percentage` double DEFAULT NULL,
  `car_tax_fixed` double DEFAULT '0',
  `car_tax_percentage` double DEFAULT '0',
  `car_email` varchar(200) DEFAULT NULL,
  `car_featured_forever` varchar(8) DEFAULT NULL,
  `car_created_at` bigint(20) DEFAULT NULL,
  `thumbnail_image` varchar(200) DEFAULT 'blank.jpg',
  `module` varchar(50) DEFAULT 'cars',
  PRIMARY KEY (`car_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pt_cars_translation`
--

DROP TABLE IF EXISTS `pt_cars_translation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_cars_translation` (
  `trans_id` int(11) NOT NULL AUTO_INCREMENT,
  `trans_title` text,
  `trans_desc` text,
  `trans_policy` text,
  `metatitle` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `metadesc` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `metakeywords` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `item_id` int(11) NOT NULL,
  `trans_lang` varchar(255) CHARACTER SET latin1 NOT NULL,
  PRIMARY KEY (`trans_id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pt_cars_types_settings`
--

DROP TABLE IF EXISTS `pt_cars_types_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_cars_types_settings` (
  `sett_id` int(11) NOT NULL AUTO_INCREMENT,
  `sett_name` varchar(200) NOT NULL,
  `sett_type` varchar(20) NOT NULL,
  `sett_selected` enum('Yes','No') DEFAULT 'No',
  `sett_status` enum('Yes','No') NOT NULL DEFAULT 'Yes',
  PRIMARY KEY (`sett_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pt_cars_types_settings_translation`
--

DROP TABLE IF EXISTS `pt_cars_types_settings_translation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_cars_types_settings_translation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sett_id` int(11) NOT NULL,
  `trans_name` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `trans_lang` varchar(10) CHARACTER SET latin1 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pt_cms`
--

DROP TABLE IF EXISTS `pt_cms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_cms` (
  `page_id` int(11) NOT NULL,
  `page_slug` varchar(255) NOT NULL,
  `page_external_link` varchar(250) DEFAULT NULL,
  `page_header_order` smallint(6) NOT NULL DEFAULT '0',
  `page_footer_order` smallint(6) NOT NULL DEFAULT '0',
  `page_header_menu` smallint(6) NOT NULL DEFAULT '0',
  `page_footer_col` smallint(6) NOT NULL DEFAULT '0',
  `page_parent` int(11) NOT NULL DEFAULT '0',
  `page_status` enum('Yes','No') NOT NULL DEFAULT 'Yes',
  `page_target` varchar(7) NOT NULL DEFAULT '_self',
  `page_icon` varchar(255) DEFAULT NULL,
  `page_divider` smallint(6) NOT NULL DEFAULT '0',
  PRIMARY KEY (`page_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pt_cms_content`
--

DROP TABLE IF EXISTS `pt_cms_content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_cms_content` (
  `content_id` int(11) NOT NULL,
  `content_page_id` int(11) NOT NULL,
  `content_lang_id` varchar(100) NOT NULL,
  `content_page_title` text NOT NULL,
  `content_body` text,
  `content_meta_keywords` text,
  `content_meta_desc` text,
  `content_created` datetime DEFAULT NULL,
  `content_updated` datetime DEFAULT NULL,
  `content_special` smallint(6) NOT NULL DEFAULT '0',
  PRIMARY KEY (`content_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pt_contact_page`
--

DROP TABLE IF EXISTS `pt_contact_page`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_contact_page` (
  `contact_id` int(11) NOT NULL,
  `contact_long` varchar(10) DEFAULT NULL,
  `contact_lat` varchar(10) DEFAULT NULL,
  `contact_address` text,
  `contact_city` varchar(70) DEFAULT NULL,
  `contact_country` varchar(100) DEFAULT NULL,
  `contact_email` varchar(100) DEFAULT NULL,
  `contact_phone` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`contact_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pt_coupons`
--

DROP TABLE IF EXISTS `pt_coupons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_coupons` (
  `id` int(10) NOT NULL,
  `code` varchar(250) NOT NULL,
  `value` decimal(10,2) NOT NULL DEFAULT '0.00',
  `startdate` bigint(20) DEFAULT NULL,
  `expirationdate` bigint(20) DEFAULT NULL,
  `maxuses` int(10) NOT NULL DEFAULT '0',
  `uses` int(10) NOT NULL DEFAULT '0',
  `forever` enum('Yes','No') DEFAULT 'Yes',
  `status` enum('Yes','No') NOT NULL DEFAULT 'Yes',
  PRIMARY KEY (`id`),
  UNIQUE KEY `code_2` (`code`),
  KEY `code` (`code`(32))
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pt_coupons_assign`
--

DROP TABLE IF EXISTS `pt_coupons_assign`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_coupons_assign` (
  `id` int(11) NOT NULL,
  `couponid` int(11) NOT NULL,
  `module` varchar(20) NOT NULL,
  `item` varchar(11) NOT NULL DEFAULT 'all',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pt_currencies`
--

DROP TABLE IF EXISTS `pt_currencies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_currencies` (
  `id` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `symbol` varchar(6) COLLATE utf8_unicode_ci DEFAULT NULL,
  `code` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `rate` float NOT NULL DEFAULT '1',
  `decimals` tinyint(1) NOT NULL DEFAULT '2',
  `symbol_placement` enum('before','after') CHARACTER SET latin1 NOT NULL DEFAULT 'before',
  `primary_order` tinyint(1) NOT NULL DEFAULT '0',
  `is_default` enum('Yes','No') COLLATE utf8_unicode_ci NOT NULL DEFAULT 'No',
  `is_active` enum('Yes','No') COLLATE utf8_unicode_ci NOT NULL DEFAULT 'Yes',
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pt_ean_booking`
--

DROP TABLE IF EXISTS `pt_ean_booking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_ean_booking` (
  `book_id` int(11) NOT NULL,
  `book_user` int(11) NOT NULL,
  `book_checkin` varchar(20) NOT NULL,
  `book_checkout` varchar(20) NOT NULL,
  `book_hotelid` varchar(50) NOT NULL,
  `book_hotel` text CHARACTER SET utf8 NOT NULL,
  `book_stars` tinyint(4) NOT NULL DEFAULT '1',
  `book_location` text CHARACTER SET utf8,
  `book_roomname` text CHARACTER SET utf8,
  `book_roomtotal` double DEFAULT NULL,
  `book_tax` double DEFAULT NULL,
  `book_total` double DEFAULT NULL,
  `book_currency` varchar(10) CHARACTER SET utf8 NOT NULL DEFAULT 'USD',
  `book_email` varchar(100) CHARACTER SET utf8 NOT NULL,
  `book_itineraryid` varchar(100) NOT NULL,
  `book_confirmation` varchar(100) DEFAULT NULL,
  `book_cancelnumber` varchar(100) DEFAULT NULL,
  `book_nights` tinyint(4) DEFAULT NULL,
  `book_date` bigint(20) NOT NULL,
  `book_thumbnail` text,
  `book_response` text CHARACTER SET utf8,
  PRIMARY KEY (`book_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pt_email_templates`
--

DROP TABLE IF EXISTS `pt_email_templates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_email_templates` (
  `temp_id` int(11) NOT NULL,
  `temp_name` varchar(75) CHARACTER SET utf8 NOT NULL,
  `temp_title` varchar(75) CHARACTER SET utf8 DEFAULT NULL,
  `temp_body` text CHARACTER SET utf8 NOT NULL,
  `temp_subject` varchar(250) CHARACTER SET utf8 DEFAULT NULL,
  `temp_vars` text,
  PRIMARY KEY (`temp_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pt_extras`
--

DROP TABLE IF EXISTS `pt_extras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_extras` (
  `extras_id` int(11) NOT NULL,
  `extras_title` varchar(250) NOT NULL,
  `extras_desc` text,
  `extras_from` bigint(20) DEFAULT NULL,
  `extras_to` bigint(20) DEFAULT NULL,
  `extras_module` varchar(75) DEFAULT 'hotels',
  `extras_for` text,
  `extras_basic_price` double NOT NULL,
  `extras_discount` double DEFAULT NULL,
  `extras_image` varchar(100) DEFAULT 'blank.jpg',
  `extras_status` enum('Yes','No') NOT NULL,
  `extras_forever` varchar(7) DEFAULT NULL,
  PRIMARY KEY (`extras_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pt_extras_translation`
--

DROP TABLE IF EXISTS `pt_extras_translation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_extras_translation` (
  `trans_id` int(11) NOT NULL,
  `trans_extras_id` int(11) NOT NULL,
  `trans_title` varchar(255) DEFAULT NULL,
  `trans_desc` text,
  `trans_lang` varchar(100) CHARACTER SET latin1 NOT NULL,
  PRIMARY KEY (`trans_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pt_fb_settings`
--

DROP TABLE IF EXISTS `pt_fb_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_fb_settings` (
  `id` int(11) NOT NULL,
  `app_id` varchar(250) DEFAULT NULL,
  `app_secret` varchar(250) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pt_front_settings`
--

DROP TABLE IF EXISTS `pt_front_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_front_settings` (
  `front_id` int(11) NOT NULL,
  `front_for` varchar(50) DEFAULT NULL,
  `front_icon` varchar(200) DEFAULT NULL,
  `front_homepage` smallint(6) DEFAULT NULL,
  `front_homepage_order` varchar(10) DEFAULT NULL,
  `front_homepage_hero` varchar(100) DEFAULT NULL,
  `front_latest` tinyint(4) DEFAULT NULL,
  `front_popular` tinyint(4) DEFAULT '3',
  `front_popular_order` varchar(10) DEFAULT NULL,
  `front_listings` smallint(6) DEFAULT NULL,
  `front_listings_order` varchar(10) DEFAULT NULL,
  `front_homepage_small_hero` varchar(200) DEFAULT NULL,
  `front_top_cities` varchar(75) DEFAULT NULL,
  `front_search` smallint(6) DEFAULT NULL,
  `front_search_order` varchar(10) DEFAULT NULL,
  `front_search_min_price` double DEFAULT NULL,
  `front_search_max_price` double DEFAULT NULL,
  `front_related` tinyint(4) DEFAULT '5',
  `front_checkin_time` varchar(15) DEFAULT NULL,
  `front_checkout_time` varchar(15) DEFAULT NULL,
  `front_txtsearch` tinyint(4) DEFAULT '1',
  `front_search_country` varchar(10) DEFAULT NULL,
  `front_search_state` int(11) DEFAULT NULL,
  `front_search_city` varchar(255) DEFAULT NULL,
  `front_tax_fixed` double DEFAULT '0',
  `front_tax_percentage` double DEFAULT '0',
  `front_fb_comments` tinyint(4) DEFAULT '0',
  `front_sharing` tinyint(4) DEFAULT '1',
  `cid` varchar(150) DEFAULT NULL,
  `apikey` varchar(250) DEFAULT NULL,
  `secret` varchar(250) DEFAULT NULL,
  `linktarget` varchar(7) DEFAULT '_self',
  `header_title` varchar(150) DEFAULT NULL,
  `meta_keywords` text,
  `meta_description` text,
  `load_headerfooter` tinyint(4) DEFAULT '0',
  `testing_mode` tinyint(4) DEFAULT '0',
  `currency` varchar(10) DEFAULT 'USD',
  `language` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`front_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pt_gallery`
--

DROP TABLE IF EXISTS `pt_gallery`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_gallery` (
  `id` int(11) NOT NULL,
  `image` varchar(127) NOT NULL,
  `title` varchar(127) NOT NULL,
  `description` text NOT NULL,
  `active` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pt_hotel_images`
--

DROP TABLE IF EXISTS `pt_hotel_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_hotel_images` (
  `himg_id` int(11) NOT NULL,
  `himg_hotel_id` int(11) NOT NULL,
  `himg_type` varchar(20) NOT NULL,
  `himg_image` text,
  `himg_order` int(11) DEFAULT NULL,
  `himg_approved` tinyint(6) DEFAULT '0',
  PRIMARY KEY (`himg_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pt_hotels`
--

DROP TABLE IF EXISTS `pt_hotels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_hotels` (
  `hotel_id` int(11) NOT NULL,
  `hotel_title` varchar(250) NOT NULL,
  `hotel_slug` varchar(255) DEFAULT NULL,
  `hotel_desc` text,
  `hotel_surroundings` text,
  `hotel_services` text,
  `hotel_admin_review` text,
  `hotel_stars` enum('1','2','3','4','5','6','7') DEFAULT NULL,
  `hotel_ratings` int(11) DEFAULT NULL,
  `hotel_is_featured` enum('yes','no') DEFAULT 'no',
  `hotel_featured_from` bigint(20) DEFAULT NULL,
  `hotel_featured_to` bigint(20) DEFAULT NULL,
  `hotel_owned_by` int(11) NOT NULL,
  `hotel_type` int(11) DEFAULT NULL,
  `hotel_city` varchar(255) DEFAULT NULL,
  `hotel_basic_price` double DEFAULT NULL,
  `hotel_basic_discount` double DEFAULT NULL,
  `hotel_map_address` varchar(250) DEFAULT NULL,
  `hotel_map_zip` varchar(10) DEFAULT NULL,
  `hotel_map_city` varchar(200) DEFAULT NULL,
  `hotel_map_country` varchar(50) DEFAULT NULL,
  `hotel_latitude` varchar(20) DEFAULT NULL,
  `hotel_longitude` varchar(20) DEFAULT NULL,
  `hotel_meta_title` varchar(250) DEFAULT NULL,
  `hotel_meta_keywords` text,
  `hotel_meta_desc` text,
  `hotel_amenities` text,
  `hotel_payment_opt` text,
  `hotel_adults` tinyint(4) DEFAULT NULL,
  `hotel_children` tinyint(4) DEFAULT NULL,
  `hotel_check_in` varchar(15) DEFAULT NULL,
  `hotel_check_out` varchar(15) DEFAULT NULL,
  `hotel_policy` text,
  `hotel_status` enum('Yes','No') NOT NULL DEFAULT 'Yes',
  `hotel_order` int(11) DEFAULT NULL,
  `hotel_related` varchar(200) DEFAULT NULL,
  `hotel_comm_fixed` double DEFAULT '0',
  `hotel_comm_percentage` double DEFAULT '0',
  `hotel_tax_fixed` double DEFAULT '0',
  `hotel_tax_percentage` double DEFAULT '0',
  `hotel_email` varchar(200) DEFAULT NULL,
  `hotel_phone` varchar(20) DEFAULT NULL,
  `hotel_website` varchar(250) DEFAULT NULL,
  `hotel_featured_forever` varchar(8) DEFAULT NULL,
  `hotel_trusted` tinyint(4) DEFAULT '1',
  `hotel_refundable` tinyint(4) DEFAULT '1',
  `hotel_best_price` tinyint(4) DEFAULT '1',
  `hotel_arrivalpay` tinyint(4) DEFAULT '1',
  `tripadvisor_id` varchar(100) DEFAULT NULL,
  `thumbnail_image` varchar(200) DEFAULT 'blank.jpg',
  `module` varchar(50) DEFAULT 'hotels',
  `hotel_created_at` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`hotel_id`),
  FULLTEXT KEY `hotel_title` (`hotel_title`),
  FULLTEXT KEY `hotel_city` (`hotel_city`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pt_hotels_translation`
--

DROP TABLE IF EXISTS `pt_hotels_translation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_hotels_translation` (
  `trans_id` int(11) NOT NULL,
  `trans_title` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `trans_desc` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `trans_policy` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `metatitle` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `metadesc` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `metakeywords` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `item_id` int(11) NOT NULL,
  `trans_lang` varchar(255) CHARACTER SET latin1 NOT NULL,
  PRIMARY KEY (`trans_id`),
  FULLTEXT KEY `trans_title` (`trans_title`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pt_hotels_types_settings`
--

DROP TABLE IF EXISTS `pt_hotels_types_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_hotels_types_settings` (
  `sett_id` int(11) NOT NULL,
  `sett_name` varchar(200) NOT NULL,
  `sett_type` varchar(20) NOT NULL,
  `sett_selected` enum('Yes','No') DEFAULT 'Yes',
  `sett_status` enum('Yes','No') NOT NULL DEFAULT 'Yes',
  `sett_img` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`sett_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pt_hotels_types_settings_translation`
--

DROP TABLE IF EXISTS `pt_hotels_types_settings_translation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_hotels_types_settings_translation` (
  `id` int(11) NOT NULL,
  `sett_id` int(11) NOT NULL,
  `trans_name` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `trans_lang` varchar(10) CHARACTER SET latin1 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pt_locations`
--

DROP TABLE IF EXISTS `pt_locations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_locations` (
  `id` int(11) NOT NULL,
  `country` varchar(150) CHARACTER SET utf8 NOT NULL,
  `location` text CHARACTER SET utf8 NOT NULL,
  `latitude` varchar(25) DEFAULT NULL,
  `longitude` varchar(25) DEFAULT NULL,
  `user` int(11) DEFAULT NULL,
  `status` enum('Yes','No') NOT NULL DEFAULT 'Yes',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pt_locations_copy`
--

DROP TABLE IF EXISTS `pt_locations_copy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_locations_copy` (
  `id` int(11) NOT NULL,
  `country` varchar(150) CHARACTER SET utf8 NOT NULL,
  `location` text CHARACTER SET utf8 NOT NULL,
  `latitude` varchar(25) DEFAULT NULL,
  `longitude` varchar(25) DEFAULT NULL,
  `user` int(11) DEFAULT NULL,
  `status` enum('Yes','No') NOT NULL DEFAULT 'Yes',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pt_locations_translation`
--

DROP TABLE IF EXISTS `pt_locations_translation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_locations_translation` (
  `id` int(11) NOT NULL,
  `loc_id` int(11) NOT NULL,
  `loc_name` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `trans_lang` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pt_mailserver`
--

DROP TABLE IF EXISTS `pt_mailserver`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_mailserver` (
  `mail_fromemail` varchar(200) DEFAULT NULL,
  `mail_id` int(11) NOT NULL,
  `mail_hostname` varchar(200) DEFAULT NULL,
  `mail_username` varchar(250) DEFAULT NULL,
  `mail_password` varchar(50) DEFAULT NULL,
  `mail_port` varchar(10) DEFAULT '25',
  `mail_default` varchar(10) DEFAULT 'phpmailer',
  `mail_secure` varchar(10) DEFAULT NULL,
  `mail_header` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `mail_footer` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  PRIMARY KEY (`mail_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pt_menus`
--

DROP TABLE IF EXISTS `pt_menus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_menus` (
  `menu_id` int(11) NOT NULL,
  `menu_title` varchar(255) NOT NULL,
  `order` tinyint(4) DEFAULT NULL,
  `status` tinyint(4) DEFAULT '1',
  `coltype` varchar(10) DEFAULT NULL,
  `menu_items` text,
  PRIMARY KEY (`menu_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pt_menus_translation`
--

DROP TABLE IF EXISTS `pt_menus_translation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_menus_translation` (
  `trans_id` int(11) NOT NULL,
  `trans_menu_id` int(11) NOT NULL,
  `trans_title` varchar(255) DEFAULT NULL,
  `trans_lang` varchar(100) CHARACTER SET latin1 NOT NULL,
  PRIMARY KEY (`trans_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pt_mobile_settings`
--

DROP TABLE IF EXISTS `pt_mobile_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_mobile_settings` (
  `settingsKey` text CHARACTER SET utf8 NOT NULL,
  `settingsValue` text CHARACTER SET utf8
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pt_modules`
--

DROP TABLE IF EXISTS `pt_modules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_modules` (
  `module_id` int(11) NOT NULL,
  `module_name` varchar(50) NOT NULL,
  `module_display_name` varchar(50) NOT NULL,
  `module_status` tinyint(6) NOT NULL DEFAULT '1',
  `module_front` smallint(6) DEFAULT '1',
  PRIMARY KEY (`module_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pt_newsletter`
--

DROP TABLE IF EXISTS `pt_newsletter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_newsletter` (
  `newsletter_id` int(11) NOT NULL,
  `newsletter_subscribers` varchar(100) NOT NULL,
  `newsletter_type` enum('admin','supplier','customers','guest','subscribers') NOT NULL DEFAULT 'subscribers',
  `newsletter_status` enum('Yes','No') NOT NULL DEFAULT 'Yes',
  PRIMARY KEY (`newsletter_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pt_offer_images`
--

DROP TABLE IF EXISTS `pt_offer_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_offer_images` (
  `oimg_id` int(11) NOT NULL,
  `oimg_offer_id` int(11) NOT NULL,
  `oimg_image` varchar(35) NOT NULL,
  `oimg_order` int(11) NOT NULL,
  `oimg_approved` smallint(6) NOT NULL DEFAULT '1',
  PRIMARY KEY (`oimg_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pt_offers_translation`
--

DROP TABLE IF EXISTS `pt_offers_translation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_offers_translation` (
  `trans_id` int(11) NOT NULL,
  `trans_offer_id` int(11) NOT NULL,
  `trans_title` varchar(255) DEFAULT NULL,
  `trans_desc` text,
  `trans_lang` varchar(100) CHARACTER SET latin1 NOT NULL,
  PRIMARY KEY (`trans_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pt_payment_gateways`
--

DROP TABLE IF EXISTS `pt_payment_gateways`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_payment_gateways` (
  `payment_id` varchar(50) NOT NULL,
  `payment_name` varchar(200) DEFAULT NULL,
  `payment_username` text,
  `payment_apikey` text,
  `payment_password` text,
  `payment_signature` text,
  `payment_testmode` varchar(10) DEFAULT NULL,
  `payment_development_mode` varchar(10) DEFAULT NULL,
  `payment_percentage` double DEFAULT '0',
  `payment_status` tinyint(4) NOT NULL DEFAULT '1',
  `payment_show` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`payment_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pt_paymentgateways`
--

DROP TABLE IF EXISTS `pt_paymentgateways`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_paymentgateways` (
  `gateway` text NOT NULL,
  `setting` text NOT NULL,
  `value` text NOT NULL,
  `order` int(1) NOT NULL,
  KEY `gateway_setting` (`gateway`(32),`setting`(32)),
  KEY `setting_value` (`setting`(32),`value`(32))
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pt_reviews`
--

DROP TABLE IF EXISTS `pt_reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_reviews` (
  `review_id` int(11) NOT NULL,
  `review_booking_id` int(11) DEFAULT NULL,
  `review_user` int(11) DEFAULT NULL,
  `review_name` varchar(250) NOT NULL,
  `review_email` varchar(250) DEFAULT NULL,
  `review_date` bigint(20) NOT NULL,
  `review_comment` text NOT NULL,
  `review_module` enum('Hotels','Cars','Tours') NOT NULL,
  `review_itemid` int(11) NOT NULL,
  `review_clean` enum('1','2','3','4','5','6','7','8','9','10') NOT NULL,
  `review_comfort` enum('1','2','3','4','5','6','7','8','9','10') NOT NULL,
  `review_location` enum('1','2','3','4','5','6','7','8','9','10') NOT NULL,
  `review_facilities` enum('1','2','3','4','5','6','7','8','9','10') NOT NULL,
  `review_staff` enum('1','2','3','4','5','6','7','8','9','10') NOT NULL,
  `review_overall` double NOT NULL,
  `review_status` enum('Yes','No') NOT NULL,
  PRIMARY KEY (`review_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pt_room_images`
--

DROP TABLE IF EXISTS `pt_room_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_room_images` (
  `rimg_id` int(11) NOT NULL,
  `rimg_room_id` int(11) NOT NULL,
  `rimg_type` varchar(20) DEFAULT NULL,
  `rimg_image` varchar(255) NOT NULL,
  `rimg_order` int(11) NOT NULL,
  `rimg_approved` smallint(6) NOT NULL DEFAULT '1',
  PRIMARY KEY (`rimg_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pt_rooms`
--

DROP TABLE IF EXISTS `pt_rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_rooms` (
  `room_id` int(11) NOT NULL,
  `room_hotel` int(11) NOT NULL,
  `room_title` varchar(255) DEFAULT NULL,
  `room_basic_price` double NOT NULL,
  `room_basic_discount` double DEFAULT NULL,
  `room_desc` text,
  `room_adults` tinyint(4) DEFAULT NULL,
  `room_children` tinyint(4) DEFAULT NULL,
  `room_min_stay` tinyint(4) DEFAULT '1',
  `room_amenities` text,
  `room_order` int(11) NOT NULL DEFAULT '0',
  `room_type` int(11) DEFAULT NULL,
  `extra_bed` tinyint(4) DEFAULT '0',
  `extra_bed_charges` double DEFAULT '0',
  `room_added_on` bigint(20) NOT NULL,
  `room_quantity` tinyint(4) NOT NULL DEFAULT '1',
  `room_status` enum('Yes','No') NOT NULL DEFAULT 'Yes',
  `thumbnail_image` varchar(200) DEFAULT 'blank.jpg',
  PRIMARY KEY (`room_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pt_rooms_availabilities`
--

DROP TABLE IF EXISTS `pt_rooms_availabilities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_rooms_availabilities` (
  `id` int(10) unsigned NOT NULL,
  `room_id` int(10) unsigned NOT NULL DEFAULT '0',
  `y` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '0 - current year, 1 - next year',
  `m` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `d1` smallint(6) unsigned NOT NULL DEFAULT '0',
  `d2` smallint(6) unsigned NOT NULL DEFAULT '0',
  `d3` smallint(6) unsigned NOT NULL DEFAULT '0',
  `d4` smallint(6) unsigned NOT NULL DEFAULT '0',
  `d5` smallint(6) unsigned NOT NULL DEFAULT '0',
  `d6` smallint(6) unsigned NOT NULL DEFAULT '0',
  `d7` smallint(6) unsigned NOT NULL DEFAULT '0',
  `d8` smallint(6) unsigned NOT NULL DEFAULT '0',
  `d9` smallint(6) unsigned NOT NULL DEFAULT '0',
  `d10` smallint(6) unsigned NOT NULL DEFAULT '0',
  `d11` smallint(6) unsigned NOT NULL DEFAULT '0',
  `d12` smallint(6) unsigned NOT NULL DEFAULT '0',
  `d13` smallint(6) unsigned NOT NULL DEFAULT '0',
  `d14` smallint(6) unsigned NOT NULL DEFAULT '0',
  `d15` smallint(6) unsigned NOT NULL DEFAULT '0',
  `d16` smallint(6) unsigned NOT NULL DEFAULT '0',
  `d17` smallint(6) unsigned NOT NULL DEFAULT '0',
  `d18` smallint(6) unsigned NOT NULL DEFAULT '0',
  `d19` smallint(6) unsigned NOT NULL DEFAULT '0',
  `d20` smallint(6) unsigned NOT NULL DEFAULT '0',
  `d21` smallint(6) unsigned NOT NULL DEFAULT '0',
  `d22` smallint(6) unsigned NOT NULL DEFAULT '0',
  `d23` smallint(6) unsigned NOT NULL DEFAULT '0',
  `d24` smallint(6) unsigned NOT NULL DEFAULT '0',
  `d25` smallint(6) unsigned NOT NULL DEFAULT '0',
  `d26` smallint(6) unsigned NOT NULL DEFAULT '0',
  `d27` smallint(6) unsigned NOT NULL DEFAULT '0',
  `d28` smallint(6) unsigned NOT NULL DEFAULT '0',
  `d29` smallint(6) unsigned NOT NULL DEFAULT '0',
  `d30` smallint(6) unsigned NOT NULL DEFAULT '0',
  `d31` smallint(6) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `room_id` (`room_id`),
  KEY `y` (`y`),
  KEY `m` (`m`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pt_rooms_prices`
--

DROP TABLE IF EXISTS `pt_rooms_prices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_rooms_prices` (
  `id` int(10) unsigned NOT NULL,
  `room_id` int(10) unsigned NOT NULL DEFAULT '0',
  `date_from` date DEFAULT NULL,
  `date_to` date DEFAULT NULL,
  `adults` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `children` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `extra_bed_charge` decimal(10,2) unsigned NOT NULL DEFAULT '0.00',
  `mon` decimal(10,2) NOT NULL DEFAULT '0.00',
  `tue` decimal(10,2) NOT NULL DEFAULT '0.00',
  `wed` decimal(10,2) NOT NULL DEFAULT '0.00',
  `thu` decimal(10,2) NOT NULL DEFAULT '0.00',
  `fri` decimal(10,2) NOT NULL DEFAULT '0.00',
  `sat` decimal(10,2) NOT NULL DEFAULT '0.00',
  `sun` decimal(10,2) NOT NULL DEFAULT '0.00',
  `is_default` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `room_id` (`room_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pt_rooms_translation`
--

DROP TABLE IF EXISTS `pt_rooms_translation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_rooms_translation` (
  `trans_id` int(11) NOT NULL,
  `trans_title` text,
  `trans_desc` text,
  `item_id` int(11) NOT NULL,
  `trans_lang` varchar(255) CHARACTER SET latin1 NOT NULL,
  PRIMARY KEY (`trans_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pt_sessions`
--

DROP TABLE IF EXISTS `pt_sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_sessions` (
  `session_id` varchar(40) NOT NULL DEFAULT '0',
  `ip_address` varchar(45) NOT NULL DEFAULT '0',
  `user_agent` varchar(120) NOT NULL,
  `last_activity` int(10) unsigned NOT NULL DEFAULT '0',
  `user_data` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`session_id`),
  KEY `last_activity_idx` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pt_sliders`
--

DROP TABLE IF EXISTS `pt_sliders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_sliders` (
  `slide_id` int(11) NOT NULL,
  `slide_position` varchar(15) DEFAULT 'main',
  `slide_title_text` text,
  `slide_desc_text` text,
  `slide_optional_text` text,
  `slide_link` text,
  `slide_link_name` varchar(200) DEFAULT NULL,
  `slide_image` varchar(35) DEFAULT NULL,
  `slide_status` enum('Yes','No') NOT NULL DEFAULT 'Yes',
  `slide_order` smallint(6) NOT NULL DEFAULT '1',
  PRIMARY KEY (`slide_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pt_sliders_translation`
--

DROP TABLE IF EXISTS `pt_sliders_translation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_sliders_translation` (
  `trans_id` int(11) NOT NULL,
  `trans_title` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `trans_desc` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `trans_optional` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `item_id` int(11) NOT NULL,
  `trans_lang` varchar(255) CHARACTER SET latin1 NOT NULL,
  PRIMARY KEY (`trans_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pt_socials`
--

DROP TABLE IF EXISTS `pt_socials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_socials` (
  `social_id` int(11) NOT NULL,
  `social_name` varchar(250) NOT NULL,
  `social_link` text NOT NULL,
  `social_position` varchar(6) DEFAULT NULL,
  `social_order` smallint(6) DEFAULT '1',
  `social_status` enum('Yes','No') NOT NULL DEFAULT 'Yes',
  `social_icon` varchar(255) NOT NULL,
  PRIMARY KEY (`social_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pt_special_offers`
--

DROP TABLE IF EXISTS `pt_special_offers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_special_offers` (
  `offer_id` int(11) NOT NULL,
  `offer_title` varchar(200) NOT NULL,
  `offer_desc` text NOT NULL,
  `offer_price` varchar(5) DEFAULT '0',
  `offer_from` bigint(20) DEFAULT NULL,
  `offer_to` bigint(20) DEFAULT NULL,
  `offer_forever` varchar(8) DEFAULT 'forever',
  `offer_slug` varchar(255) DEFAULT NULL,
  `offer_order` tinyint(4) DEFAULT NULL,
  `offer_thumb` varchar(200) DEFAULT 'blank.jpg',
  `offer_phone` varchar(50) DEFAULT NULL,
  `offer_email` varchar(150) DEFAULT NULL,
  `offer_status` enum('Yes','No') DEFAULT 'Yes',
  PRIMARY KEY (`offer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pt_tour_images`
--

DROP TABLE IF EXISTS `pt_tour_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_tour_images` (
  `timg_id` int(11) NOT NULL,
  `timg_tour_id` int(11) NOT NULL,
  `timg_type` varchar(20) NOT NULL,
  `timg_image` text,
  `timg_order` int(11) DEFAULT NULL,
  `timg_approved` tinyint(6) DEFAULT '0',
  PRIMARY KEY (`timg_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pt_tour_locations`
--

DROP TABLE IF EXISTS `pt_tour_locations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_tour_locations` (
  `id` int(11) NOT NULL,
  `position` tinyint(4) NOT NULL,
  `location_id` int(11) NOT NULL,
  `tour_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pt_tours`
--

DROP TABLE IF EXISTS `pt_tours`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_tours` (
  `tour_id` int(11) NOT NULL,
  `tour_title` varchar(250) NOT NULL,
  `tour_slug` varchar(250) DEFAULT NULL,
  `tour_desc` text,
  `tour_stars` tinyint(4) DEFAULT NULL,
  `tour_is_featured` enum('yes','no') NOT NULL DEFAULT 'no',
  `tour_featured_from` bigint(20) DEFAULT NULL,
  `tour_featured_to` bigint(20) DEFAULT NULL,
  `tour_owned_by` int(11) NOT NULL,
  `tour_type` int(11) DEFAULT NULL,
  `tour_location` text,
  `tour_latitude` varchar(25) DEFAULT NULL,
  `tour_longitude` varchar(25) DEFAULT NULL,
  `tour_mapaddress` varchar(200) DEFAULT NULL,
  `tour_basic_price` double DEFAULT NULL,
  `tour_basic_discount` double DEFAULT NULL,
  `tour_max_adults` smallint(6) NOT NULL DEFAULT '1',
  `tour_max_child` smallint(6) DEFAULT '0',
  `tour_max_infant` smallint(6) DEFAULT '0',
  `tour_adult_price` double NOT NULL DEFAULT '0',
  `tour_child_price` double NOT NULL DEFAULT '0',
  `tour_infant_price` double NOT NULL DEFAULT '0',
  `adult_status` tinyint(4) DEFAULT '1',
  `child_status` tinyint(4) DEFAULT '0',
  `infant_status` tinyint(4) DEFAULT '0',
  `tour_days` tinyint(4) DEFAULT NULL,
  `tour_nights` tinyint(4) DEFAULT NULL,
  `tour_meta_title` varchar(250) DEFAULT NULL,
  `tour_meta_keywords` text,
  `tour_meta_desc` text,
  `tour_amenities` text,
  `tour_exclusions` text,
  `tour_payment_opt` text,
  `tour_privacy` text,
  `tour_status` enum('Yes','No') NOT NULL DEFAULT 'Yes',
  `tour_order` int(11) DEFAULT NULL,
  `tour_related` varchar(200) DEFAULT NULL,
  `tour_comm_fixed` double DEFAULT NULL,
  `tour_comm_percentage` double DEFAULT NULL,
  `tour_tax_fixed` double DEFAULT '0',
  `tour_tax_percentage` double DEFAULT '0',
  `tour_email` varchar(200) DEFAULT NULL,
  `tour_phone` varchar(25) DEFAULT NULL,
  `tour_website` varchar(150) DEFAULT NULL,
  `tour_fulladdress` text,
  `tour_featured_forever` varchar(8) DEFAULT NULL,
  `tour_created_at` bigint(20) DEFAULT NULL,
  `thumbnail_image` varchar(200) DEFAULT 'blank.jpg',
  `module` varchar(50) DEFAULT 'tours',
  PRIMARY KEY (`tour_id`),
  FULLTEXT KEY `tour_title` (`tour_title`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pt_tours_maps`
--

DROP TABLE IF EXISTS `pt_tours_maps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_tours_maps` (
  `map_id` int(11) NOT NULL,
  `map_city_name` varchar(250) CHARACTER SET latin1 NOT NULL,
  `map_city_lat` varchar(15) CHARACTER SET latin1 NOT NULL,
  `map_city_long` varchar(15) CHARACTER SET latin1 NOT NULL,
  `map_city_type` varchar(7) CHARACTER SET latin1 NOT NULL,
  `map_tour_id` int(11) NOT NULL,
  `map_order` int(11) DEFAULT '0',
  PRIMARY KEY (`map_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pt_tours_translation`
--

DROP TABLE IF EXISTS `pt_tours_translation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_tours_translation` (
  `trans_id` int(11) NOT NULL,
  `trans_title` text,
  `trans_desc` text,
  `trans_policy` text,
  `metatitle` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `metadesc` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `metakeywords` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `item_id` int(11) NOT NULL,
  `trans_lang` varchar(255) CHARACTER SET latin1 NOT NULL,
  PRIMARY KEY (`trans_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pt_tours_types_settings`
--

DROP TABLE IF EXISTS `pt_tours_types_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_tours_types_settings` (
  `sett_id` int(11) NOT NULL,
  `sett_name` varchar(200) NOT NULL,
  `sett_type` varchar(20) NOT NULL,
  `sett_selected` enum('Yes','No') DEFAULT 'Yes',
  `sett_status` enum('Yes','No') NOT NULL DEFAULT 'Yes',
  `sett_img` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`sett_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pt_tours_types_settings_translation`
--

DROP TABLE IF EXISTS `pt_tours_types_settings_translation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_tours_types_settings_translation` (
  `id` int(11) NOT NULL,
  `sett_id` int(11) NOT NULL,
  `trans_name` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `trans_lang` varchar(10) CHARACTER SET latin1 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pt_updates`
--

DROP TABLE IF EXISTS `pt_updates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_updates` (
  `updateslist` text NOT NULL,
  `lastchecked` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pt_watermark`
--

DROP TABLE IF EXISTS `pt_watermark`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_watermark` (
  `wm_name` varchar(5) NOT NULL,
  `wm_type` varchar(5) NOT NULL,
  `wm_position` varchar(5) NOT NULL,
  `wm_trans` smallint(6) NOT NULL,
  `wm_image` varchar(30) NOT NULL,
  `wm_text` varchar(255) NOT NULL,
  `wm_font_color` varchar(7) NOT NULL,
  `wm_font_size` smallint(6) NOT NULL,
  `wm_status` smallint(6) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pt_widgets`
--

DROP TABLE IF EXISTS `pt_widgets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_widgets` (
  `widget_id` int(11) NOT NULL,
  `widget_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `widget_content` text,
  `widget_status` enum('Yes','No') DEFAULT 'Yes',
  PRIMARY KEY (`widget_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pt_wishlist`
--

DROP TABLE IF EXISTS `pt_wishlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_wishlist` (
  `wish_id` int(11) NOT NULL,
  `wish_user` int(11) NOT NULL,
  `wish_itemid` int(11) NOT NULL,
  `wish_module` varchar(50) DEFAULT NULL,
  `wish_date` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`wish_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-06-06 12:19:22
