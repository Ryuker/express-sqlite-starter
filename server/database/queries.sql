-- database: /Users/joeri/Repositories/Github/projects/starters/docker/express-sqlite/express-sqlite-starter/server/database/data.db

-- Use the ▷ button in the top right corner to run the entire file.

-- Create a new table
CREATE TABLE users(
  id INTEGER PRIMARY KEY, 
  first_name TEXT NOT NULL, 
  last_name TEXT NOT NULL , 
  username TEXT NOT NULL , 
  password TEXT NOT NULL , 
  email TEXT NOT NULL,
);

CREATE TABLE events(
  id INTEGER PRIMARY KEY, 
  event_name TEXT NOT NULL, 
  date TEXT NOT NULL , 
  address TEXT NOT NULL , 
  host TEXT NOT NULL , 
);

CREATE TABLE events_users(
  event_user_id INTEGER PRIMARY KEY,
  event_id INT,
  user_id INT,
  FOREIGN KEY (event_id) 
    REFERENCES events(id)
      ON UPDATE CASCADE
      ON DELETE CASCADE  ,
  FOREIGN KEY (user_id) 
    REFERENCES users(id)
      ON UPDATE CASCADE
      ON DELETE CASCADE
);


--  Drop a table
DROP TABLE users;


SELECT * FROM users;

-- Add one user
INSERT INTO users(first_name, last_name, username, password, email) 
VALUES ('tim','timmerson','tim_user','testfour','tim@gmail.com');


-- Add all users
INSERT INTO users(first_name, last_name, username, password, email) 
VALUES 
  ('fred','fredson','fred_user','testone','fred@gmail.com'),
  ('bob','bobson','bob_user','testtwo','bob@gmail.com'),
  ('mike','mikeson','mike_user','testthree','mike@gmail.com'),
  ('tim','timmerson','tim_user','testfour','tim@gmail.com'),
  ('dave','daverson','dave_user','testfive','dave@gmail.com');


-- Select data explorations
SELECT username FROM users;

SELECT password FROM users
WHERE username = "fred_user";

SELECT password FROM users
WHERE first_name IN ("fred" , "mike");

-- Select any username that starts with m 
--  - we use m% to indicate this
SELECT email FROM users
WHERE username LIKE "m%";

-- Select any username that has 'mike' in any position 
--  - we use %m% to indicate this
--  https://www.w3schools.com/sql/sql_like.asp
SELECT email FROM users
WHERE username LIKE "%mike%";

-- Select - Starts with and ends with
-- - we use m%e
SELECT email FROM users
WHERE username LIKE "m%e";

-- Updating
UPDATE users 
SET email = 'mikenot@gmail.com'
WHERE username = 'mike_user';

UPDATE users 
SET email = 'mikenot@gmail.com'
WHERE username LIKE "%mike%";


-- Deleting
DELETE FROM users 
WHERE username = "mike_user";

