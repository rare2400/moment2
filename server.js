/** Moment 2 uppgift 1 DT207G
 * Av Ramona Reinholdz
 * rare2400
 */

//import packages
const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

//create connection to database using .env variables
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

//connect to database with error and success logging
connection.connect((err) => {
    if (err) {
        console.error("connection failed:", err);
        return;
    }
    console.log("Connected to database");
});

//middlewares - CORS and parse JSON-requests
app.use(cors());
app.use(express.json());

//route to test API
app.get("/api", (req, res) => {
    res.json({ message: "Welcome to the API" });
});

//GET-route to get all work experience data from database
app.get("/api/workexperience", (req, res) => {
    //get all work experience data
    connection.query(`SELECT companyName, jobTitle, location, startDate, endDate, description
        FROM workexperience;`, (err, results) => {
        if (err) {
            res.status(500).json({ error: "Something went wrong: " + err });
            return;
        }

        //validate results to make sure there is data
        console.log(results);
        if (results.length === 0) {
            res.status(404).json({ message: "No work experiences found" });
            return;
        } else {
            //if there is data, send it back
            res.json({ message: "All work experiences", results });
        }
    });
});

//POST-route to add work experience data to the cv database
app.post("/api/workexperience", (req, res) => {
});

//PUT-route to update work experience data by id
app.put("/api/workexperience/:id", (req, res) => {
    res.json({ message: `Update work experience data with id ${req.params.id}` });
});

//DELETE-route to delete work experience data by id
app.delete("/api/workexperience/:id", (req, res) => {
        res.json({ message: "data deleted", id });
    });

//Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});