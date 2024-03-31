const express = require('express');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

app.get('/notes', (req, res) => res.json(notes, '/notes.html'));

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);