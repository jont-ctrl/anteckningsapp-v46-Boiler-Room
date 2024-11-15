const toggleButton = document.querySelector('#darkmode');
const noteForm = document.querySelector('#noteForm');
const titleNote = document.querySelector('#titleNote');
const descriptionNote = document.querySelector('#descriptionNote');
const statusText = document.querySelector('#statusText');
const notesHistory = document.querySelector('.notesHistory');

let notesArray = [];

console.log(notesArray);

// dark/light mode
toggleButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');

  if (document.body.classList.contains('dark-theme')) {
    toggleButton.src = 'images/lightmode.png';
  } else {
    toggleButton.src = 'images/darkmode.png';
  }
});

// When site load, get all notes and render them
document.addEventListener('DOMContentLoaded', () => {
  renderNotes();
});

noteForm.addEventListener('submit', (event) => {
  event.preventDefault();

  // Check no empty spaces input
  if (titleNote.value.trim() === '' || descriptionNote.value.trim() === '') {
    statusText.textContent = 'Error: note cant be empty';
    titleNote.value = '';
    descriptionNote.value = '';
  } else {
    // Runs save note function
    statusText.textContent = '';
    saveNote(titleNote.value, descriptionNote.value);
    titleNote.value = '';
    descriptionNote.value = '';
  }
});

function saveNote(title, description) {
  const newNote = {
    id: Date.now(),
    title: title,
    content: description,
    timestamp: new Date().toLocaleString(),
  };

  notesArray.push(newNote);
  console.log(notesArray);

  // Save 'notes' for key and whole notesarray as value
  saveLocalStorage('notes', notesArray);

  renderNotes();
}

function saveLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
  loadNotesLocalStorage();
}

function loadNotesLocalStorage() {
  const savedNotes = localStorage.getItem('notes');
  notesArray = JSON.parse(savedNotes);
}

function renderNotes() {
  // Resets notesHistory before rendering all items
  notesHistory.innerHTML = '';

  notesArray.forEach((element) => {
    //if (element.id)
    const newNoteDive = document.createElement('div');
    newNoteDive.classList.add('noteHistoryItem');

    const NewNoteTitle = document.createElement('h3');
    NewNoteTitle.classList.add('itemTitle');
    NewNoteTitle.textContent = element.title;

    const NewNoteContent = document.createElement('p');
    NewNoteContent.classList.add('itemContent');
    NewNoteContent.textContent = element.content;

    const NewNoteDate = document.createElement('p');
    NewNoteDate.classList.add('itemDate');
    NewNoteDate.textContent = element.timestamp;

    const NewNoteID = document.createElement('p');
    NewNoteID.classList.add('itemID');
    NewNoteID.textContent = element.id;

    const newDeleteBtn = document.createElement('button');
    newDeleteBtn.classList.add('itemDelete');
    newDeleteBtn.textContent = 'Remove';

    newDeleteBtn.addEventListener('click', () => {
      deleteNote(element.id);
    });

    notesHistory.append(newNoteDive);
    newNoteDive.append(
      NewNoteTitle,
      NewNoteContent,
      NewNoteDate,
      NewNoteID,
      newDeleteBtn
    );
  });
}

function deleteNote(id) {
  console.log('remove id: ' + id);
  // Filter out id and remove from array
  notesArray = notesArray.filter((note) => note.id !== id);

  saveLocalStorage('notes', notesArray);

  renderNotes();
}
