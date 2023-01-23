
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
-- SELECT id, name, email FROM Users WHERE id = 1;
SELECT * FROM Completed_Lessons

-- @block
ALTER TABLE temp RENAME Lessons


-- @block
INSERT INTO Completed_Lessons (lesson_id, user_id)
VALUES (1, 3)

-- @block
SELECT * FROM Users


-- @block
-- ALTER TABLE Games ADD COLUMN moves VARCHAR(500) NOT NULL;
ALTER TABLE Games CHANGE COLUMN date_played date_played DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP;