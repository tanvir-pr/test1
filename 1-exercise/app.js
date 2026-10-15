const express = require("express");
const app = express();
const port = 3000;

// Replace these with your own name and Neptun code before the exam check
const studentName = "YOUR NAME";
const neptunCode = "NEPTUN";

app.use(express.urlencoded({ extended: true }));

function header() {
    return studentName + " " + neptunCode + "<br>";
}

function formPage() {
    return `
        ${header()}
        <form action="/page1" method="POST">
            Name: <input type="text" name="name"><br>
            City:
            <select name="city">
                <option value="Budapest">Budapest</option>
                <option value="Madrid">Madrid</option>
                <option value="Berlin">Berlin</option>
                <option value="London">London</option>
                <option value="Paris">Paris</option>
            </select><br>
            <button type="submit">Send</button>
        </form>
    `;
}

app.get("/page1", (req, res) => {
    res.send(formPage());
});

app.post("/page1", (req, res) => {
    const name = req.body.name;
    const city = req.body.city;
    res.send(`
        ${header()}
        Name: ${name}<br>
        City: ${city}<br>
    `);
});

app.listen(port, () => {
    console.log("The server started at port " + port);
});
