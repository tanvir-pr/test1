# Web 2 midterm sample

Practice solution for `Web-2-Midterm-1-SAMPLE`. The code follows the Web programming 2 seminar.

Replace `YOUR NAME` and `NEPTUN` at the top of both `app.js` files before a check.

## Exercise 1 (6 points)

Folder: `1-exercise`

```powershell
cd 1-exercise
npm install
node app.js
```

Open http://localhost:3000/page1

- Name text field
- City list: Budapest, Madrid, Berlin, London, Paris
- Send posts to the same URL and prints `Name:` and `City:`
- Name and Neptun code are the first line

Seminar pages: npm install is on page 24. Forms are pages 28–32. The same-URL GET and POST pattern is `exercise08.js` on pages 31–32. The `<select>` example is on page 37.

## Exercise 2 (14 points)

Folder: `2-exercise`

Create the `web2` database in XAMPP phpMyAdmin with `web2.sql`. Start MySQL first.

```powershell
cd 2-exercise
npm install
node app.js
```

Open http://localhost:4000

| Page | URL |
|---|---|
| Main list | http://localhost:4000 |
| New record | http://localhost:4000/new |
| Edit | http://localhost:4000/edit/ID |
| Delete | http://localhost:4000/delete/ID |

Seminar pages: database SQL is on pages 37–38. `npm install express` and `npm install mysql2` are on page 38. The CRUD with `/edit/ID` and `/delete/ID` is `exercise04.js` on pages 41–43. The seminar uses port 8080. This exam uses port 4000.

## Exercise 3 (5 points)

Take `mainpage.jpg` and `edit.jpg` in the browser. The address bar, the name on the page, and a working app must be visible.
