const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Root Route (Optional, in case you want to serve index.html manually)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

let notes = [];

// Get all notes
app.get('/notes', (req, res) => {
  res.json(notes);
});

// Add a new note
app.post('/notes', (req, res) => {
    const note = req.body;
    notes.push(note);
    console.log('Notes:', notes); // Log current notes
    res.status(201).json(note);
});
  

// Delete a note
app.delete('/notes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  notes = notes.filter((_, index) => index !== id);
  res.status(204).send();
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
