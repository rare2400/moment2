/** Moment 2 uppgift 1 DT207G
 * Av Ramona Reinholdz
 * rare2400
 */

const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

//connect to database
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

connection.connect((err) => {
    if (err) {
        console.error("connection failed:", err);
        return;
    }
    console.log("Connected to database");
});

app.use(cors());
app.use(express.json());

//routes
app.get("/api", (req, res) => {
    res.json({ message: "Welcome to the API" });
});

app.get("/api/workexperience", (req, res) => {
    res.json({ message: "Get all work experience" });
});

app.post("/api/workexperience", (req, res) => {
    res.json({ message: "Post work experience" });
});

app.put("/api/workexperience/:id", (req, res) => {
    res.json({ message: `Update work experience data with id ${req.params.id}` });
});

app.delete("/api/workexperience/:id", (req, res) => {
        res.json({ message: "data deleted", id });
    });

//Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});