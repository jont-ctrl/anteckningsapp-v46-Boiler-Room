const noteForm = document.querySelector('#noteForm');
const titleNote = document.querySelector('#titleNote');
const descriptionNote = document.querySelector('#descriptionNote');
const statusText = document.querySelector('#statusText');
const notesHistory = document.querySelector('.notesHistory');

let notesArray = [];

console.log(notesArray);

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
}

function saveLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
  loadNotesLocalStorage();
}

function loadNotesLocalStorage() {
  const savedNotes = localStorage.getItem('notes');

  notesArray = JSON.parse(savedNotes);

  renderNotes();
}

function renderNotes() {
  notesArray.forEach((element) => {
    const NewNoteTitle = document.createElement('h3');
    NewNoteTitle.textContent = element.title;
    notesHistory.append(NewNoteTitle);
    console.log(element.id);
  });
  /*   console.log(notesArray + ' bruh');
  console.table(notesArray); */
}

/* //.toLocaleString konverterar datumobjektet till en sträng i det lokala formatet
console.log(new Date().toLocaleString()); */
