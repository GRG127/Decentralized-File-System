import { useState, useEffect } from 'react';
import type { FileMetadata } from '../types/File';
import { initDB } from '../utils/storage';

export function useFiles() {
  const [files, setFiles] = useState<FileMetadata[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadFiles();
  }, []);

  async function loadFiles() {
    try {
      setIsLoading(true);
      setError(null);
      const db = await initDB();
      const allFiles = await db.getAll('files');
      setFiles(allFiles);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load files'));
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteFile(id: string) {
    try {
      const db = await initDB();
      const file = await db.get('files', id);
      
      if (!file) {
        throw new Error('File not found');
      }

      const tx = db.transaction(['files', 'chunks'], 'readwrite');
      
      // Delete file metadata
      await tx.objectStore('files').delete(id);
      
      // Delete all associated chunks
      for (const chunkId of file.chunks) {
        await tx.objectStore('chunks').delete(chunkId);
      }
      
      await tx.done;
      
      setFiles(files => files.filter(f => f.id !== id));
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to delete file');
    }
  }

  return {
    files,
    isLoading,
    error,
    deleteFile,
    refreshFiles: loadFiles
  };
}