import React from 'react';
import { FileUpload } from './components/FileUpload';
import { FileList } from './components/FileList';
import { Database, Share2 } from 'lucide-react';
import { useFiles } from './hooks/useFiles';

function App() {
  const { refreshFiles } = useFiles();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <Share2 className="w-8 h-8 text-blue-500" />
            <h1 className="text-2xl font-bold text-gray-900">
              Decentralized File System
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid gap-8">
          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Database className="w-6 h-6 mr-2" />
              Upload Files
            </h2>
            <FileUpload onFileUploaded={refreshFiles} />
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Your Files</h2>
            <FileList />
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;