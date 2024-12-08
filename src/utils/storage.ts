import { openDB } from 'idb';
import type { FileMetadata, FileChunk } from '../types/File';

const DB_NAME = 'decentralized-fs';
const DB_VERSION = 1;

export async function initDB() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      db.createObjectStore('files', { keyPath: 'id' });
      db.createObjectStore('chunks', { keyPath: 'id' });
      db.createObjectStore('blockchain', { keyPath: 'hash' });
    },
  });
}

export async function saveFile(metadata: FileMetadata, chunks: FileChunk[]) {
  const db = await initDB();
  const tx = db.transaction(['files', 'chunks'], 'readwrite');
  
  await tx.objectStore('files').put(metadata);
  
  for (const chunk of chunks) {
    await tx.objectStore('chunks').put(chunk);
  }
  
  await tx.done;
}

export async function getFile(id: string): Promise<FileMetadata | undefined> {
  const db = await initDB();
  return db.get('files', id);
}

export async function getChunk(id: string): Promise<FileChunk | undefined> {
  const db = await initDB();
  return db.get('chunks', id);
}