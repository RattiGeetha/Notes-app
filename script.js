
const addNoteBtn = document.getElementById("addnotebutton");
const noteInput = document.getElementById("noteInput");
const notesList = document.getElementById("notesList");
let notes = JSON.parse(localStorage.getItem("notes")) || [];
let editIndex = null; 

function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function renderNotes() {
  notesList.innerHTML = ""; 
  notes.forEach((note, index) => {
    const li = document.createElement("li");
    li.textContent = note;
    const actionsDiv = document.createElement("div");
    actionsDiv.classList.add("note-actions");

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("edit-btn");
    editBtn.onclick = () => {
      noteInput.value = note;
      editIndex = index;
      addNoteBtn.textContent = "Update";
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.onclick = () => {
      notes.splice(index, 1);  
      saveNotes();              
      renderNotes();           
    };

    actionsDiv.appendChild(editBtn);
    actionsDiv.appendChild(deleteBtn);
    li.appendChild(actionsDiv);
    notesList.appendChild(li);
  });
}

function addNote() {
  const noteText = noteInput.value.trim();
  if (noteText === "") return; 

  if (editIndex !== null) {
    notes[editIndex] = noteText;
    editIndex = null;
    addNoteBtn.textContent = "Add"; 
  } else {
    notes.push(noteText);
  }
  saveNotes();
  renderNotes();
  noteInput.value = ""; 
}
addNoteBtn.addEventListener("click", addNote);
noteInput.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    addNote();
  }
});
renderNotes();
