USE mooglemarket;

INSERT INTO Users (userName, pwd) VALUES
("meow1", "meow1"),
("meow2", "meow2"),
("meow3", "meow3");

INSERT INTO Threads (title, subTitle, threadInitialContent, user_id) 
VALUES 
("How to eat vegetables pt 1", "A serious vegetable documentary", "Just do it.", 1),
("How to eat vegetables pt 2", "Attack of the killer tomatoes", "T-O-M-A-T-O.", 2),
("How to eat vegetables pt 3", "I carrot about you", "No one cares for you like vegetables.", 3),
("How to eat vegetables pt 4", "Vegetables always say, I'll be back", "Thumbs up sign, always.", 1);

INSERT INTO Posts (postContent, thread_id, user_id)
VALUES
("No, meat is better.", 1, 1),
("Haha", 1, 1),
("No, vegetables is better", 2, 1),
("Wait... You guys get to eat meat and vegetables?", 4, 1),
("Meow", 3, 3),
("Meow?", 2, 3);

INSERT INTO Chats (content, user_id) VALUES 
("Hello, how are you?", 1),
("I am fine thank you.", 2),
("What is so fine about you?", 1),
("I have the finest moo", 2),
("A woooo", 1);

INSERT INTO Users_Chats_Room (user_id1, user_id2, chat_id) VALUES
(1, 2, 1),
(1, 2, 2),
(1, 2, 3),
(1, 2, 4),
(1, 2, 5);





