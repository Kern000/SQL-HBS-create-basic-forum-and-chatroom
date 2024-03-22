CREATE DATABASE mooglemarket;

USE mooglemarket;

CREATE TABLE Users (
    userId INT AUTO_INCREMENT PRIMARY KEY,
    userName VARCHAR(100) NOT NULL,
    pwd VARCHAR(100) NOT NULL
);

CREATE TABLE Threads (
    threadId INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    subTitle VARCHAR(255),
    threadInitialContent TEXT,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES Users (userId)
);

CREATE TABLE Posts (
    postId INT AUTO_INCREMENT PRIMARY KEY,
    postContent TEXT,
    thread_id INT,
    user_id INT,
    FOREIGN KEY (thread_id) REFERENCES Threads (threadId),
    FOREIGN KEY (user_id) REFERENCES Users (userId)
);

CREATE TABLE Chats (
    chatId INT AUTO_INCREMENT PRIMARY KEY,
    content VARCHAR(255),
    user_id INT
);


CREATE TABLE Users_Chats_Room (
    usersChatsId INT AUTO_INCREMENT PRIMARY KEY,
    user_id1 INT,
    user_id2 INT,
    chat_id INT,
    FOREIGN KEY (user_id1) REFERENCES Users (userId),
    FOREIGN KEY (user_id2) REFERENCES Users (userId),
    FOREIGN KEY (chat_id) REFERENCES Chats (chatid)
);

