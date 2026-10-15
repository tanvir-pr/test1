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
    database: "exercise"
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
    db.query("SELECT * FROM employee ORDER BY id", (err, rows) => {
        if (err) {
            res.send(header() + "Database error!");
            return;
        }
        let html = header();
        html += "<h2>Employees</h2>";
        html += "<a href='/new'>Adds a new employee</a><br><br>";
        html += "<table border='1' cellpadding='5'>";
        html += "<tr><th>ID</th><th>Name</th><th>Address</th><th>Age</th><th>Action</th></tr>";
        rows.forEach(row => {
            html += "<tr><td>" + row.id + "</td><td>" + row.name + "</td><td>" + row.address + "</td><td>" + row.age + "</td><td>";
            html += `<a href="/edit/${row.id}">Edit</a> `;
            html += `<a href="/delete/${row.id}">Delete</a>`;
            html += "</td></tr>";
        });
        html += "</table>";
        res.send(html);
    });
});

app.get("/new", (req, res) => {
    let html = header();
    html += `<h2>New employee</h2>
    <form method="post" action="/insert">
        Name:<br><input name="name"><br>
        Address:<br><input name="address"><br>
        Age:<br><input name="age"><br>
        <input type="submit" value="Save">
    </form>
    <a href="/">Back</a>`;
    res.send(html);
});

app.post("/insert", (req, res) => {
    db.query(
        "INSERT INTO employee(name,address,age) VALUES(?,?,?)",
        [req.body.name, req.body.address, req.body.age],
        () => res.redirect("/")
    );
});

app.get("/edit/:id", (req, res) => {
    db.query(
        "SELECT * FROM employee WHERE id=?",
        [req.params.id],
        (err, rows) => {
            if (err || rows.length === 0) {
                res.send(header() + "Record not found");
                return;
            }
            let e = rows[0];
            let html = header();
            html += `<h2>Update employee</h2>
            <form method="post" action="/update">
                <input type="hidden" name="id" value="${e.id}">
                Name:<br><input name="name" value="${e.name}"><br>
                Address:<br><input name="address" value="${e.address}"><br>
                Age:<br><input name="age" value="${e.age}"><br>
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
        "UPDATE employee SET name=?, address=?, age=? WHERE id=?",
        [req.body.name, req.body.address, req.body.age, req.body.id],
        () => res.redirect("/")
    );
});

app.get("/delete/:id", (req, res) => {
    db.query(
        "DELETE FROM employee WHERE id=?",
        [req.params.id],
        () => res.redirect("/")
    );
});

app.listen(port, () => {
    console.log("Server: http://localhost:" + port);
});
