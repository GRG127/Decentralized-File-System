import React, { useState } from 'react';
import { FileText, Download, Trash2, Loader2 } from 'lucide-react';
import type { FileMetadata } from '../types/File';
import { downloadFile } from '../utils/fileOperations';

interface FileListItemProps {
  file: FileMetadata;
  onDelete: (id: string) => Promise<void>;
}

export function FileListItem({ file, onDelete }: FileListItemProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      await downloadFile(file);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download file');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await onDelete(file.id);
    } catch (error) {
      console.error('Delete failed:', error);
      alert('Failed to delete file');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
      <div className="flex items-center space-x-4">
        <FileText className="w-8 h-8 text-blue-500" />
        <div>
          <h3 className="font-medium">{file.name}</h3>
          <div className="flex space-x-4 text-sm text-gray-500">
            <span>{new Date(file.timestamp).toLocaleString()}</span>
            <span>{(file.size / 1024 / 1024).toFixed(2)} MB</span>
          </div>
        </div>
      </div>
      
      <div className="flex space-x-2">
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="p-2 text-gray-500 hover:text-blue-500 transition-colors disabled:opacity-50"
        >
          {isDownloading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Download className="w-5 h-5" />
          )}
        </button>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="p-2 text-gray-500 hover:text-red-500 transition-colors disabled:opacity-50"
        >
          {isDeleting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Trash2 className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
}