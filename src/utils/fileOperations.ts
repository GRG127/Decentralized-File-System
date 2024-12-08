import pako from 'pako';
import { getFile, getChunk } from './storage';
import type { FileMetadata } from '../types/File';

export async function downloadFile(metadata: FileMetadata) {
  try {
    // Get all chunks
    const chunkPromises = metadata.chunks.map(id => getChunk(id));
    const chunks = await Promise.all(chunkPromises);

    // Combine chunks
    const totalLength = chunks.reduce((sum, chunk) => sum + chunk!.data.length, 0);
    const combinedArray = new Uint8Array(totalLength);
    
    let offset = 0;
    for (const chunk of chunks) {
      if (!chunk) throw new Error('Chunk not found');
      combinedArray.set(chunk.data, offset);
      offset += chunk.data.length;
    }

    // Decompress data
    const decompressed = pako.inflate(combinedArray);
    
    // Create and download blob
    const blob = new Blob([decompressed], { type: metadata.type });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = metadata.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Download failed:', error);
    throw error;
  }
}