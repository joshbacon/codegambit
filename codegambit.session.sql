
-- @block
CREATE TABLE IF NOT EXISTS Users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(32) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE
);

-- @block
INSERT INTO Users (name, email)
VALUES (
    'LFolker',
    'lfolker@mta.ca'
);



-- @block
CREATE TABLE Games (
    id int PRIMARY KEY AUTO_INCREMENT,
    w_id INT NOT NULL,
    b_id INT NOT NULL,
    winner_id INT NOT NULL,
    date_played DATETIME NOT NULL
);

-- @block
CREATE TABLE Lessons (
    id INT PRIMARY KEY AUTO_INCREMENT,
    lesson_id INT NOT NULL,
    user_id INT NOT NULL
);

-- @block
CREATE TABLE Completed_Lessons (
    id INT PRIMARY KEY AUTO_INCREMENT,
    category VARCHAR(10)NOT NULL,
    rating INT NOT NULL,
    title VARCHAR(100) NOT NULL UNIQUE,
    fen VARCHAR(100) NOT NULL,
    playing_as VARCHAR(1) NOT NULL,
    moves VARCHAR(255) NOT NULL,
    goal VARCHAR(100) NOT NULL
);


-- @block
SELECT * FROM Users;

-- @block
SHOW TABLES



-- @block
ALTER TABLE Users ADD [COLUMN] name VARCHAR(36) NOT NULL UNIQUE;