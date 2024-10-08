CREATE DATABASE IF NOT EXISTS ucl;
USE ucl;

CREATE TABLE IF NOT EXISTS students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Change authentication method for the root user (or specify another user if needed)
ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'rootpassword';

-- Flush privileges to ensure the changes take effect
FLUSH PRIVILEGES;

-- Insert three students into the students table
INSERT INTO students (name, email) VALUES 
('Santiago De Simone', 'sds@example.com'),
('Jianian Zheng', 'jz@example.com'),
('Gavin Hor', 'gh@example.com'),
('Bingfan Xu', 'bx@example.com');


