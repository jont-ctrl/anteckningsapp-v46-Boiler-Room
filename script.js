const toggleButton = document.querySelector('#darkmode');
const noteForm = document.querySelector('#noteForm');
const titleNote = document.querySelector('#titleNote');
const descriptionNote = document.querySelector('#descriptionNote');
const statusText = document.querySelector('#statusText');
const notesHistory = document.querySelector('.notesHistory');
const searchInput = document.querySelector('#searchInput');

const main = document.querySelector('main');

let notesArray = [];

// dark/light mode
toggleButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');

  if (document.body.classList.contains('dark-theme')) {
    toggleButton.src = 'images/lightmode.png';
  } else {
    toggleButton.src = 'images/darkmode.png';
  }
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

searchInput.addEventListener('input', () => {
  renderNotes(searchInput.value);
});

// Functions

function saveNote(title, description) {
  const newNote = {
    id: Date.now(),
    title: title,
    content: description,
    timestamp: new Date().toLocaleString(),
  };

  notesArray.push(newNote);

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
  notesArray = savedNotes ? JSON.parse(savedNotes) : [];
}

function renderNotes(searchText = '') {
  // Rensa notesHistory innan rendering
  notesHistory.innerHTML = '';

  if (notesArray.length === 0) {
    statusText.textContent =
      'Inga anteckningar tillgängliga. Var god lägg till några anteckningar.';
    if (document.querySelector('.deleteAllBtn')) {
      document.querySelector('.deleteAllBtn').remove();
    }
    return;
  }

  // Filtrera anteckningar baserat på söktext
  const filteredNotes = notesArray.filter((note) => {
    return (
      note.title.toLowerCase().includes(searchText.toLowerCase()) ||
      note.content.toLowerCase().includes(searchText.toLowerCase())
    );
  });

  // Kontrollera om några anteckningar matchar sökningen
  if (filteredNotes.length === 0) {
    statusText.textContent = 'Inga anteckningar matchar din sökning.';
    return;
  } else {
    statusText.textContent = '';
  }

  // Om deleteAllBtn inte redan finns, lägg till den
  if (!document.querySelector('.deleteAllBtn')) {
    const deleteAllBtn = document.createElement('button');
    deleteAllBtn.classList.add('deleteAllBtn');
    deleteAllBtn.textContent = 'Delete All';
    // Lägg till ikon
    const icon = document.createElement('i');
    icon.classList.add('material-icons');
    icon.textContent = 'delete_forever';
    deleteAllBtn.prepend(icon);

    deleteAllBtn.addEventListener('click', () => {
      deleteAllNotes();
    });
    main.append(deleteAllBtn);
  }

  // Rendera varje anteckning i filteredNotes
  filteredNotes.forEach((element) => {
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

    // Lägg till ikon
    const icon2 = document.createElement('i');
    icon2.classList.add('material-icons');
    icon2.textContent = 'delete';
    newDeleteBtn.prepend(icon2);

    newDeleteBtn.addEventListener('click', () => {
      deleteNote(element.id);
    });

    // Lägg till anteckningen i notesHistory
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

function deleteAllNotes() {
  notesArray = [];

  saveLocalStorage('notes', notesArray);

  renderNotes();
}

// When site load, get all notes and render them
document.addEventListener('DOMContentLoaded', () => {
  loadNotesLocalStorage();
  renderNotes();
});
