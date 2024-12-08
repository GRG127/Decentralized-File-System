import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { v4 as uuidv4 } from 'uuid';
import pako from 'pako';
import { Upload, Loader2 } from 'lucide-react';
import { hashFile } from '../utils/crypto';
import { saveFile } from '../utils/storage';
import type { FileMetadata, FileChunk } from '../types/File';

const CHUNK_SIZE = 1024 * 1024; // 1MB chunks

interface FileUploadProps {
  onFileUploaded?: () => void;
}

export function FileUpload({ onFileUploaded }: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    try {
      setIsUploading(true);
      
      for (const file of acceptedFiles) {
        const fileHash = await hashFile(file);
        const fileId = uuidv4();
        const chunks: FileChunk[] = [];
        
        const arrayBuffer = await file.arrayBuffer();
        const compressed = pako.deflate(new Uint8Array(arrayBuffer));
        
        for (let i = 0; i < compressed.length; i += CHUNK_SIZE) {
          const chunk = compressed.slice(i, i + CHUNK_SIZE);
          const chunkId = uuidv4();
          chunks.push({
            id: chunkId,
            data: chunk,
            index: i / CHUNK_SIZE,
          });
        }
        
        const metadata: FileMetadata = {
          id: fileId,
          name: file.name,
          size: file.size,
          type: file.type,
          hash: fileHash,
          timestamp: Date.now(),
          chunks: chunks.map(c => c.id),
          owner: 'current-user',
        };
        
        await saveFile(metadata, chunks);
      }
      
      onFileUploaded?.();
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload file');
    } finally {
      setIsUploading(false);
    }
  }, [onFileUploaded]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    disabled: isUploading 
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
        isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-500'
      } ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <input {...getInputProps()} />
      {isUploading ? (
        <Loader2 className="w-12 h-12 mx-auto mb-4 text-blue-500 animate-spin" />
      ) : (
        <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
      )}
      {isUploading ? (
        <p className="text-blue-500">Uploading files...</p>
      ) : isDragActive ? (
        <p className="text-blue-500">Drop the files here...</p>
      ) : (
        <p className="text-gray-500">
          Drag 'n' drop files here, or click to select files
        </p>
      )}
    </div>
  );
}