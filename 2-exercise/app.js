const express = require("express");
const mysql = require("mysql2");
const app = express();
const port = 4000;

// Replace these with your own name and Neptun code before the exam check
const studentName = "Tanvir Hasan";
const neptunCode = "NEPTUN";

app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "web2"
});

db.connect(err => {
    if (err)
        console.log("Database connection error");
    else
        console.log("Database connected");
});

function header() {
    return studentName + " " + neptunCode + "<br>";
}

app.get("/", (req, res) => {
    db.query("SELECT * FROM users ORDER BY id", (err, rows) => {
        if (err) {
            res.send(header() + "Database error!");
            return;
        }
        let html = header();
        html += "<h2>Users</h2>";
        html += "<a href='/new'>New user</a><br><br>";
        html += "<table border='1' cellpadding='5'>";
        html += "<tr><th>ID</th><th>Firstname</th><th>Lastname</th><th>Login</th><th>Password</th><th>Action</th></tr>";
        rows.forEach(row => {
            html += "<tr><td>" + row.id + "</td><td>" + row.firstname + "</td><td>" + row.lastname + "</td><td>" + row.login + "</td><td>" + row.password + "</td><td>";
            html += `
            <form method="get" action="/edit/${row.id}" style="display:inline">
                <input type="submit" value="Edit">
            </form>
            <form method="get" action="/delete/${row.id}" style="display:inline">
                <input type="submit" value="Delete">
            </form>`;
            html += "</td></tr>";
        });
        html += "</table>";
        res.send(html);
    });
});

app.get("/new", (req, res) => {
    let html = header();
    html += `<h2>New user</h2>
    <form method="post" action="/insert">
        Firstname:<br><input name="firstname"><br>
        Lastname:<br><input name="lastname"><br>
        Login:<br><input name="login"><br>
        Password:<br><input name="password"><br>
        <input type="submit" value="Save">
    </form>
    <a href="/">Back</a>`;
    res.send(html);
});

app.post("/insert", (req, res) => {
    db.query(
        "INSERT INTO users(firstname,lastname,login,password) VALUES(?,?,?,?)",
        [req.body.firstname, req.body.lastname, req.body.login, req.body.password],
        () => res.redirect("/")
    );
});

app.get("/edit/:id", (req, res) => {
    db.query(
        "SELECT * FROM users WHERE id=?",
        [req.params.id],
        (err, rows) => {
            if (err || rows.length === 0) {
                res.send(header() + "Record not found");
                return;
            }
            let u = rows[0];
            let html = header();
            html += `<h2>Update user</h2>
            <form method="post" action="/update">
                <input type="hidden" name="id" value="${u.id}">
                Firstname:<br><input name="firstname" value="${u.firstname}"><br>
                Lastname:<br><input name="lastname" value="${u.lastname}"><br>
                Login:<br><input name="login" value="${u.login}"><br>
                Password:<br><input name="password" value="${u.password}"><br>
                <input type="submit" value="Save">
            </form>
            <br>
            <a href="/">Back</a>`;
            res.send(html);
        }
    );
});

app.post("/update", (req, res) => {
    db.query(
        "UPDATE users SET firstname=?, lastname=?, login=?, password=? WHERE id=?",
        [req.body.firstname, req.body.lastname, req.body.login, req.body.password, req.body.id],
        () => res.redirect("/")
    );
});

app.get("/delete/:id", (req, res) => {
    db.query(
        "DELETE FROM users WHERE id=?",
        [req.params.id],
        () => res.redirect("/")
    );
});

app.listen(port, () => {
    console.log("Server: http://localhost:" + port);
});
