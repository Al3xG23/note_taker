const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// GET Route for retrieving all notes
notes.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});


// POST Route for posting a new note
notes.post('/', (req, res) => {
    console.info(`${req.method} request received to add note`);
    console.log(req.body);

    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            text_id: uuid(),
        };

        readAndAppend(newNote, './db/db.json');
        res.json('Note added!');
    } else {
        res.error("Error in adding note");
    }
});

module.exports = notes;