/** Moment 2 uppgift 1 DT207G
 * Av Ramona Reinholdz
 * rare2400
 */

//load .env file and import mysql
require("dotenv").config();
const mysql = require('mysql');

//connect to database with variables from the .env file
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

//connecting to database
connection.connect((err) => {
    if (err) {
        //error logging
        console.error("connection to database failed:", err);
        return;
    }
    //success logging
    console.log("Connected to database");
});

//create database if it doesn't exist already
connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_DATABASE}`, (err, results) => {
    //error-handling
    if (err) throw err;

    //log if success
    console.log("Database created" + results);
});

//create table for workexperience in the database
connection.query(`CREATE TABLE IF NOT EXISTS workexperience (
    id INT AUTO_INCREMENT PRIMARY KEY,
    companyName VARCHAR(50) NOT NULL,
    jobTitle VARCHAR(30) NOT NULL,
    location VARCHAR(20) NOT NULL,
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    description TEXT NOT NULL
);`, (err, results) => {
    if (err) throw err;

    console.log("Table workexperience created" + results);
});