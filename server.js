const express = require("express");
const path = require("path");
const fs = require("fs");
const uuid = require("./helpers/uuid");
const fsUtils = require("./helpers/fsUtils");

const PORT = process.env.PORT || 3001;

// creates an express server that runs on PORT
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use will automatically load index.html inside "public"
app.use(express.static("public"));

app.get("/", (req, res) => {
    console.log("Inside the notes route");
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

// - - - HTML Routes - - - sends HTML code in string form
// __dirname -> Current working directory --> Develop/
// path.join --> Will join __dirname + /public/notes.html --> ../Develop/public/notes.html

app.get("/notes", (req, res) => {
    console.log("Inside the notes route");
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// - - - API Routes - - -

// API GET route to return all saved notes as JSON
app.get("/api/notes", (req, res) => {
    console.log("db.json file read successfully");
    res.sendFile(path.join(__dirname, "/db/db.json"));
});

// API POST route to receive a new note to save on the req body
app.post("/api/notes", (req, res) => {
    // Log that post was received
    console.log("post received!");

    // Save new note to req body
    const { title, text, note_id } = req.body;

    // Append it to db.json file
    if (title && text) {
        const newNote = {
            title,
            text,
        };

        console.log(newNote);

        console.log("Attempting to write note!");

        // how do I add it to the db.json file?
        fsUtils.readAndAppend("./db/db.json", newNote);

        // Return new note to client
        const response = {
            status: "success",
            body: newNote,
        };
        console.log(response);
        res.status(201).json(response);
    } else {
        res.status(500).json("Error in posting note.");
    }
});

// API PUT route to update the data

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);
