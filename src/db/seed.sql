-- Insert the provided data into the events table
INSERT INTO events (id, category, title, description, location, date, time, petsAllowed, organizer) VALUES
(1, 'Music', 'Concert', 'A live concert', 'London', '2021-07-01', '19:00:00', FALSE, 'Live Nation'),
(2, 'Music', 'Festival', 'A music festival', 'Manchester', '2021-07-15', '12:00:00', TRUE, 'Festival Republic'),
(3, 'Sports', 'Football Match', 'A football match', 'Liverpool', '2021-08-01', '15:00:00', FALSE, 'Premier League'),
(4, 'Music', 'Jazz Night', 'An evening of smooth jazz', 'New Orleans', '2021-09-10', '19:00:00', TRUE, 'Jazz Fest'),
(5, 'Theatre', 'Shakespeare in the Park', 'A performance of Hamlet', 'Central Park', '2021-10-05', '18:00:00', FALSE, 'NYC Theatre Group'),
(6, 'Food', 'Food Truck Festival', 'A variety of food trucks offering delicious meals', 'San Francisco', '2021-11-20', '12:00:00', TRUE, 'Foodie Events');

-- Insert the provided data into the books table
INSERT INTO books (id, title, author_name, description, groups) VALUES
(1, 'The Great Gatsby', 'F. Scott Fitzgerald', 'A novel set in the Jazz Age', 'Fiction,Classic'),
(2, 'To Kill a Mockingbird', 'Harper Lee', 'A novel about racial injustice', 'Fiction,Classic'),
(3, '1984', 'George Orwell', 'A dystopian novel', 'Fiction,Dystopian'),
(4, 'The Catcher in the Rye', 'J.D. Salinger', 'A novel about teenage rebellion', 'Fiction,Classic'),
(5, 'Moby-Dick', 'Herman Melville', 'A novel about a sea captain\'s obsession', 'Fiction,Adventure'),
(6, 'Pride and Prejudice', 'Jane Austen', 'A novel about manners and marriage', 'Fiction,Romance');