const express = require("express");
const hbs = require("hbs");
const wax = require("wax-on");
const { createConnection } = require("mysql2/promise")
require("dotenv").config();

let app = express();
app.set("view engine", "hbs");
app.use(express.static("public"));
app.use(express.urlencoded({extended:false}));

wax.on(hbs.handlebars);
wax.setLayoutPath("./views/layouts");

const helpers = require("handlebars-helpers")({
        "handlebars": hbs.handlebars
    })

let connection;

hbs.registerHelper('ifEquals', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

async function main(){

    connection = await createConnection({
        'host':process.env.DB_HOST,
        'user':process.env.DB_USER,
        'database':process.env.DB_NAME,
        'password':process.env.DB_PASSWORD
    })


    app.get("/threads", async function (req, res) {
        let [threads] = await connection.execute("SELECT Threads.*, Users.userName FROM Threads JOIN USERS ON Threads.user_id = USERS.userId ORDER BY Threads.threadId");
        res.render("index", {
            threadsData: threads
        });
    })

    app.get("/threads/:userId/:threadId", async function (req,res){
        let userId = req.params.userId;
        let threadId = req.params.threadId;
        let [threadPosts] = await connection.execute(`  SELECT  Posts.*, 
                                                                Threads.*, 
                                                                Users.userName 
                                                        FROM Threads 
                                                        LEFT JOIN Posts ON Threads.threadId = Posts.thread_id 
                                                        LEFT JOIN Users ON Posts.user_id = Users.userId 
                                                        WHERE Threads.user_id = ${userId}
                                                        AND Threads.threadId = ${threadId} 
                                                        ORDER BY Posts.postId
                                                        `)
        res.render("posts", {
            threadPosts:threadPosts,
        })
    })

    app.get("/chatroom/:id1/:id2", async function (req,res){

        let userId1 = req.params.id1;
        let userId2 = req.params.id2;

        let [chatPosts] = await connection.execute(`SELECT Users_Chats_Room.*, Chats.* FROM Users_Chats_Room JOIN Chats ON Users_Chats_Room.usersChatsId = Chats.chatId WHERE user_id1=${userId1} AND user_id2=${userId2} ORDER BY Chats.chatId`);
        console.log(chatPosts)

        res.render("chats", {
            chatPosts: chatPosts
        })
    })

    app.get("/createThread/:userId", async (req,res)=> {
        
        let [threadInfo] = await connection.execute(`SELECT threadId, title FROM Threads`);
        console.log(threadInfo);

        res.render("create-thread",{
            threadInfo: threadInfo
        })
    })

    app.post("/createThread/:userId", async(req,res)=>{
               
        let user_id = req.params.userId
        let {title, subTitle, threadInitialContent} = req.body;
        let query = "INSERT INTO Threads (title, subTitle, threadInitialContent, user_id) VALUES (?, ?, ?, ?)"
        let binding = [title, subTitle, threadInitialContent, user_id];
        console.log("binding", binding);
        try {
            await connection.execute(query,binding);
            res.redirect("/threads")
        } catch (error){
            res.status(500).json({"error": "Add new thread"});
        }
    })

    app.get("/updateThread/:userId/:threadId", async(req,res)=>{
        let userId = req.params.userId;
        let threadId = req.params.threadId;

        let [threadInfo] = await connection.execute(`SELECT * from Threads WHERE user_id = ${userId} AND threadId = ${threadId}`);
        console.log("update here", threadInfo)
        res.render("update",{
            threadInfo: threadInfo
        })
    })

    app.post("/updateThread/:userId/:threadId", async(req,res)=>{
        let {threadId, title, subTitle, threadInitialContent, user_id} = req.body;
        let query = `   UPDATE Threads SET  title=?,
                                            subTitle=?,
                                            threadInitialContent=?
                        WHERE Threads.threadId = ${threadId} 
                        AND Threads.user_id = ${user_id}
                    `
        let binding = [title, subTitle, threadInitialContent];
        
        try {
            await connection.execute(query, binding);
            console.log("here also ok");
            res.redirect(`/threads`);
        } catch (error) {
            res.status(500)
        }
    })
}



app.get("/", (req,res)=> res.send("Hello, World"));

app.listen(3000, ()=>{
    console.log("Server is running")
})

main();




