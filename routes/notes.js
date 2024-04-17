const notes = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');
const notesData = require('../db/db.json');

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

// Delete Route for deleting a note
notes.delete('/:text_id', (req, res) => {
    const noteId = req.params.text_id
    readFromFile('./db/db.json').then((data) => {
        const parseData = JSON.parse(data)
        const newData = parseData.filter((note) => note.text_id !== noteId)
        return newData
    }).then((newNoteData) => writeToFile('./db/db.json', newNoteData)).then((deletedData) => { res.json(deletedData + 'Note deleted!') })
});
//     notesData.destroy({
//         where: {
//             text_id: req.params.text_id,
//         },
//     })
//         .then((deletedNote) => {
//             res.json(deletedNote + 'Note deleted!')
//         })
//         .catch((err) => res.json(err));
// });

module.exports = notes;