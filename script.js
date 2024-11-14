const noteForm = document.querySelector('#noteForm');
const titleNote = document.querySelector('#titleNote');
const descriptionNote = document.querySelector('#descriptionNote');
const statusText = document.querySelector('#statusText');

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

  saveLocalStorage(newNote.id, newNote);
}

function saveLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/* //.toLocaleString konverterar datumobjektet till en sträng i det lokala formatet
console.log(new Date().toLocaleString()); */
