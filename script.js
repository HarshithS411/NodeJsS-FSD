const notesList = document.getElementById('notes-list');
const noteForm = document.getElementById('note-form');
const noteTitle = document.getElementById('note-title');
const noteContent = document.getElementById('note-content');

// Function to fetch and display notes
async function fetchNotes() {
  try {
    const response = await fetch('http://localhost:5000/notes');
    const notes = await response.json();
    renderNotes(notes);
  } catch (error) {
    console.error('Error fetching notes:', error);
  }
}

// Function to render notes
function renderNotes(notes) {
  notesList.innerHTML = ''; // Clear previous notes
  if (notes.length === 0) {
    notesList.innerHTML = '<p>No notes found.</p>';
  } else {
    notes.forEach((note, index) => {
      const noteDiv = document.createElement('div');
      noteDiv.classList.add('note');
      noteDiv.innerHTML = `
        <h3>${note.title}</h3>
        <p>${note.content}</p>
        <button onclick="deleteNote(${index})">Delete</button>
      `;
      notesList.appendChild(noteDiv);
    });
  }
}

// Function to add a new note
async function addNote(event) {
  event.preventDefault(); // Prevent form submission
  const newNote = {
    title: noteTitle.value,
    content: noteContent.value,
  };
  try {
    await fetch('http://localhost:5000/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newNote),
    });
    noteTitle.value = ''; // Clear input fields
    noteContent.value = '';
    fetchNotes(); // Refresh notes list
  } catch (error) {
    console.error('Error adding note:', error);
  }
}

// Function to delete a note
async function deleteNote(id) {
  try {
    await fetch(`http://localhost:5000/notes/${id}`, {
      method: 'DELETE',
    });
    fetchNotes(); // Refresh notes list
  } catch (error) {
    console.error('Error deleting note:', error);
  }
}

// Event listener for the form
noteForm.addEventListener('submit', addNote);

// Fetch notes on page load
fetchNotes();
