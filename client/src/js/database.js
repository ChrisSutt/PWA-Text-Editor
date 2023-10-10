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
    // Open the 'jate' database
    const db = await openDB('jate', 1);

    // Begin a read-write transaction
    const tx = db.transaction('jate', 'readwrite');

    // Access the 'jate' object store within the transaction
    const store = tx.objectStore('jate');

    // Add the provided content to the object store
    const result = await store.add(content);
    console.log('Content added to the database', result);
    return result;
  } catch (error) {
    console.error('Error adding content to the database', error);
    throw error;
  }
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
    // Open the 'jate' database
    const db = await openDB('jate', 1);

    // Begin a read-only transaction
    const tx = db.transaction('jate', 'readonly');
    
    // Access the 'jate' object store within the transaction
    const store = tx.objectStore('jate');

    // Retrieve all content from the object store
    const result = await store.getAll();
    console.log('Received content from the database', result);
    return result;
  } catch (error) {
    console.error('Error retrieving content', error);
    throw error;
  }
};

// Initialize the database when the module is imported
initdb();
