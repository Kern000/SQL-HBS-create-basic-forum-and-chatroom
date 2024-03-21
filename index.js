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

let connection;

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
}



app.get("/", (req,res)=> res.send("Hello, World"));

app.listen(3000, ()=>{
    console.log("Server is running")
})

main();




