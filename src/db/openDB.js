// Paras: Here I open (or create) the IndexedDB database called "NotesDB".
// Inside it I create one object store called "notes" to keep all the notes.

const DB_NAME = 'NotesDB'
const DB_VERSION = 1
export const STORE_NAME = 'notes'

export function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    // Paras: This only runs the first time (or when version changes),
    // so here I did the object store creation with an auto increment id.
    request.onupgradeneeded = () => {
      const db = request.result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true })
      }
    }

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}
