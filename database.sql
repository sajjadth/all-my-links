CREATE DATABASE all_my_links;

USE all_my_links;

CREATE TABLE users (
	user_id INT AUTO_INCREMENT,
    username VARCHAR(25) UNIQUE,
    email VARCHAR(25) NOT NULL,
    password VARCHAR(256) NOT NULL,
    isDeleted BOOL DEFAULT(FALSE),
    created_at DATE NOT NULL,
    updated_at DATE,
    display_name VARCHAR(256),
    discription VARCHAR(256),
    PRIMARY KEY(user_id,username));

CREATE TABLE links (
	link_id INT AUTO_INCREMENT,
    platform VARCHAR(20) NOT NULL,
    username VARCHAR(100) NOT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY(link_id),
    FOREIGN KEY(user_id) REFERENCES users(user_id));