import { openDB, STORE_NAME } from './openDB'

// Paras: Here I did the Get All Notes function.
// It opens the DB with a "readonly" transaction and returns every note.
export async function getNotes() {
  const db = await openDB()

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly')
    const store = tx.objectStore(STORE_NAME)
    const request = store.getAll()

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}
