import React from 'react';
import { FileListItem } from './FileListItem';
import { useFiles } from '../hooks/useFiles';
import { AlertCircle } from 'lucide-react';

export function FileList() {
  const { files, isLoading, error, deleteFile } = useFiles();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8 bg-white rounded-lg shadow">
        <div className="animate-pulse text-gray-500">Loading files...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center p-4 bg-red-50 rounded-lg">
        <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
        <p className="text-red-600">Failed to load files: {error.message}</p>
      </div>
    );
  }

  if (files.length === 0) {
    return (
      <div className="text-center p-8 bg-white rounded-lg shadow">
        <p className="text-gray-500">No files uploaded yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {files.map((file) => (
        <FileListItem 
          key={file.id} 
          file={file} 
          onDelete={deleteFile}
        />
      ))}
    </div>
  );
}