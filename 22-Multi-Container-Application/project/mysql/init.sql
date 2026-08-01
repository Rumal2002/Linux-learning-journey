CREATE DATABASE IF NOT EXISTS day22db;

USE day22db;

CREATE TABLE IF NOT EXISTS messages (

    id INT AUTO_INCREMENT PRIMARY KEY,

    message VARCHAR(255) NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

INSERT INTO messages (message)
VALUES
('Welcome to the Docker Compose Multi-Container Application');
