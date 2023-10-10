import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  try {
    const db = await dbPromise;

    const tx = tb.transaction('jate', 'readwrite');

    const store = tx.objectStore('jate');

    const result = await store.add(content);
    console.log('Content added to thje database', result);
    return result;
  } catch (error) {
    console.error('Error adding content to the database', error);
    throw error;
  }
};
// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => console.error('getDb not implemented');

initdb();
