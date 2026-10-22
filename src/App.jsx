import { useEffect, useState } from 'react'
import { addNote } from './db/AddNotes'
import { getNotes } from './db/GetNotes'

// This is my simple React UI.
// One text box to add a note and a list that shows all the notes from IndexedDB.
function App() {
  const [text, setText] = useState('')
  const [notes, setNotes] = useState([])
  const [online, setOnline] = useState(navigator.onLine)

  // Here I load all notes from IndexedDB
  async function loadNotes() {
    setNotes(await getNotes())
  }

  // When the app starts I load the notes and listen for online/offline changes
  useEffect(() => {
    loadNotes()
    const update = () => setOnline(navigator.onLine)
    window.addEventListener('online', update)
    window.addEventListener('offline', update)
    return () => {
      window.removeEventListener('online', update)
      window.removeEventListener('offline', update)
    }
  }, [])

  // Here I did the add button logic, empty notes are not saved
  async function handleSubmit(e) {
    e.preventDefault()
    if (!text.trim()) return
    await addNote(text.trim())
    setText('')
    loadNotes()
  }

  return (
    <main className="app">
      <h1>Offline Notes App</h1>
      <p className={online ? 'status online' : 'status offline'}>
        {online ? 'You are Online' : 'You are Offline'}
      </p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a note..."
        />
        <button type="submit">Add Note</button>
      </form>

      <h2>All Notes</h2>
      {notes.length === 0 ? (
        <p>No notes yet.</p>
      ) : (
        <ul>
          {notes.map((note) => (
            <li key={note.id}>{note.text}</li>
          ))}
        </ul>
      )}
    </main>
  )
}

export default App
