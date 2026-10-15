const express = require("express");
const app = express();
const port = 3000;

// Replace these with your own name and Neptun code before the exam check
const studentName = "Tanvir Hasan";
const neptunCode = "NEPTUN";

app.use(express.urlencoded({ extended: true }));

function header() {
    return studentName + " " + neptunCode + "<br>";
}

function formPage() {
    return `
        ${header()}
        <form action="/exercise" method="POST">
            Name: <input type="text" name="name"><br>
            Address: <input type="text" name="address"><br>
            Country:
            <select name="country">
                <option value="Hungary">Hungary</option>
                <option value="Poland">Poland</option>
                <option value="Austria">Austria</option>
                <option value="Italy">Italy</option>
            </select><br>
            <button type="submit">Send</button>
        </form>
    `;
}

app.get("/exercise", (req, res) => {
    res.send(formPage());
});

app.post("/exercise", (req, res) => {
    const name = req.body.name;
    const address = req.body.address;
    const country = req.body.country;
    res.send(`
        ${header()}
        Name: ${name}<br>
        Address: ${address}<br>
        Country: ${country}<br>
    `);
});

app.listen(port, () => {
    console.log("The server started at port " + port);
});
