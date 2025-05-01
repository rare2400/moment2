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
    connection.query(`SELECT id, companyName, jobTitle, location, DATE_FORMAT(startDate, '%Y-%m-%d') AS startDate, DATE_FORMAT(endDate, '%Y-%m-%d') AS endDate, description
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
    //get data from request body
    const { companyName, jobTitle, location, startDate, endDate, description } = req.body;

    //error handling
    let errors = {
        message: "",
        detail: "",
        https_response: {

        }
    };

    //check if all fields are filled
    if (!companyName || !jobTitle || !location || !startDate || !endDate || !description) {
        //error messages
        errors.message = "Not all fields are filled";
        errors.detail = "Fill in all fields";

        //response code
        errors.https_response.message = "Bad request";
        errors.https_response.status = 400;

        //send error response
        res.status(400).json({ errors });
        return;
    }

    //add work-experience to database
    connection.query(`INSERT INTO workexperience(companyName, jobTitle, location, startDate, endDate, description) VALUES (?, ?, ?, ?, ?, ?)`,
        [companyName, jobTitle, location, startDate, endDate, description], (err, results) => {
            if (err) {
                //database-errors
                res.status(500).json({ error: "Something went wrong: " + err });
                return;
            }

            //logg inserted data
            console.log("Fråga skapas: " + results);

            //added object-data
            let newWorkExperience = {
                id: results.insertId,
                companyName, 
                jobTitle, 
                location, 
                startDate, 
                endDate, 
                description
            };

            //logging new data
            res.json({ message: "data added", newWorkExperience });
        });
});

//GET-route to get work experience data by id
app.get("/api/workexperience/:id", (req, res) => {
    //get id from URL-parameter
    const id = req.params.id;

    //get work experience data by id
    connection.query(`SELECT id, companyName, jobTitle, location, DATE_FORMAT(startDate, '%Y-%m-%d') AS startDate, DATE_FORMAT(endDate, '%Y-%m-%d') AS endDate, description
        FROM workexperience WHERE id = ?`, [id], (err, results) => {
        if (err) {
            //database-errors
            res.status(500).json({ error: "Something went wrong: " + err });
            return;
        }

        //logg selected data
        console.log("Fråga hämtas: " + results);

        //check if any rows were affected
        if (results.length === 0) {
            //if not, send 404 error
            res.status(404).json({ message: "No work experience found with that id" });
            return;
        }

        //if there is data, send it back
        res.json({ result: results[0] });
    });
});

//PUT-route to update work experience data by id
app.put("/api/workexperience/:id", (req, res) => {
    //get id from URL-parameter
    const id = req.params.id;
    const { companyName, jobTitle, location, startDate, endDate, description } = req.body;

    //error handling for all fields
    if (!companyName || !jobTitle || !location || !startDate || !endDate || !description) {
        res.status(400).json({ message: "Not all fields are filled" });
        return;
    }

    //update the work experience data in the database
    connection.query(`UPDATE workexperience SET companyName = ?, jobTitle = ?, location = ?, startDate = ?, endDate = ?, description = ? WHERE id = ?`,
        [companyName, jobTitle, location, startDate, endDate, description, id], (err, results) => {
            if (err) {
                //database-errors
                res.status(500).json({ error: "Something went wrong: " + err });
                return;
            }

            //logg updated data
            console.log("Fråga uppdateras: " + results);


            //check if any rows were affected
            if (results.affectedRows === 0) {
                //if not, send 404 error
                res.status(404).json({ message: "No work experience found with that id" });
                return;
            }

            res.json({ message: "data updated", id });
        });
});

//DELETE-route to delete work experience data by id
app.delete("/api/workexperience/:id", (req, res) => {
    const id = req.params.id;

    //SQL-query to delete data by id
    connection.query(`DELETE FROM workexperience WHERE id = ?`, [id], (err, results) => {
        if (err) {
            //database-errors
            res.status(500).json({ error: "Something went wrong: " + err });
            return;
        }

        //logg deleted data
        console.log("Fråga tas bort: " + results);

        //check if any rows were affected
        if (results.affectedRows === 0) {
            //if not, send errormessage
            res.status(404).json({ message: "No work experience found with that id" });
            return;
        }

        //logg deleted data
        res.json({ message: "data deleted", id });
    });
});

//Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});