import { openDB, STORE_NAME } from './openDB'

// Paras: Here I did the Add Note function.
// It opens the DB, starts a "readwrite" transaction and saves the note.
export async function addNote(text) {
  const db = await openDB()

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite')
    const store = tx.objectStore(STORE_NAME)

    // Paras: I save the text and the time it was created
    const request = store.add({ text, createdAt: new Date().toISOString() })

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}
