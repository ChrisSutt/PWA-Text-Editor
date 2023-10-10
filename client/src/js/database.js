// Importing the openDB function from the 'idb' library
import { openDB } from 'idb';

// Function to initialize the database
const initdb = async () =>
  openDB('jate', 1, {
    // Database upgrade function
    upgrade(db) {
      // Check if the 'jate' object store already exists
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }

      // Create the 'jate' object store with auto-incrementing keys
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Function to add content to the database
export const putDb = async (content) => {
  console.log('PUT to the database');

  // Open the 'jate' database
  const contactDb = await openDB('jate', 1);

  // Start a read-write transaction
  const tx = contactDb.transaction('jate', 'readwrite');

  // Get the 'jate' object store
  const store = tx.objectStore('jate');

  // Put (update or insert) data into the object store
  const request = store.put({ id: 1, value: content });

  // Wait for the operation to complete
  const result = await request;
  console.log('data saved to the database', result);
};

// Function to retrieve content from the database
export const getDb = async () => {
  console.log('GET from the database');

  // Open the 'jate' database
  const contactDb = await openDB('jate', 1);

  // Start a read-only transaction
  const tx = contactDb.transaction('jate', 'readonly');

  // Get the 'jate' object store
  const store = tx.objectStore('jate');

  // Retrieve all data from the object store
  const request = store.getAll();

  // Wait for the operation to complete
  const result = await request;
  console.log('result.value', result);

  // Return the retrieved value (or undefined if no data is found)
  return result?.value;
};

// Initialize the database when the module is imported
initdb();
