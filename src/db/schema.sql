-- Create the events table
CREATE TABLE events (
  id INT PRIMARY KEY,
  category VARCHAR(255),
  title VARCHAR(255),
  description TEXT,
  location VARCHAR(255),
  date DATE,
  time TIME,
  petsAllowed BOOLEAN,
  organizer VARCHAR(255)
);

-- Create the books table
CREATE TABLE books (
  id INT PRIMARY KEY,
  title VARCHAR(255),
  author_name VARCHAR(255),
  description TEXT,
  groups VARCHAR(255)
);
