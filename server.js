const express = require("express");
const path = require("path");
const db = require("./db/db.json");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3001;

const prevNotes = [];

// middleware for get requests: serves up the index.html from the public folder automatically
app.use(express.static("public"));

// middleware for post requests: parses application/json and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// when a get request is sent to the notes route, return this file to the server.
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "public/notes.html"))
);

// send back the previously stored notes on the db.json file
app.get("/api/notes", (req, res) => {
    console.info(`${req.method} request received to get notes`);
    
    // send notes to the client
    
    return res.json(db);
    

});



// post request to api/notes and console.logs post request received.
app.post('/api/notes', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received`);
  
    // Prepare a response object to send back to the client
    let response;
  
    // Check if there is anything in the response body
    if (req.body && req.body.title) {
      response = {
        status: 'success',
        data: req.body,
      };
      res.json(`Your note, ${req.body.title}, has been added!`);
    } else {
      res.json('Note must contain a title and text.');
    }
  
    // Log the response body to the console
    console.log('note', req.body);
    const data = req.body
    

    console.log('db', db)
    console.log('data type', typeof data)
    db.push(data)

    db.map((note, index) => {
            note.id = index + 1});
    console.log('data', data)
    

    // fs.appendFileSync('db/db.json', JSON.stringify(prevNotes));


  });



// console.logs verification that app is listening/express is running and provides link to page.
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);



// to do: link returned responses (previous notes) to db.json file.

// Use fs.readFile() method to read the file
// fs.readFile('demo.txt', (err, data) => {
//     console.log(data);
//  })