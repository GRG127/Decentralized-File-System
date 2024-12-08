# 🌐 Decentralized File System


A secure, browser-based decentralized file system that enables efficient file storage and sharing with client-side encryption.

## ✨ Features

- 📁 Secure file upload and storage
- 🔐 Client-side encryption
- 📦 Chunk-based file handling
- 💨 File compression
- 🔄 Real-time file list updates
- 📥 Easy file download
- 🗑️ File deletion capability


## 🛠️ Tech Stack

- **Frontend Framework**: React with TypeScript
- **Styling**: Tailwind CSS
- **File Processing**: pako (compression)
- **Storage**: IndexedDB
- **Encryption**: CryptoJS
- **UI Components**: Lucide React Icons
- **Build Tool**: Vite


## 💡 Key Features Explained

### File Upload Process
1. Files are split into chunks
2. Each chunk is compressed using pako
3. Chunks are stored in IndexedDB
4. File metadata is maintained separately

### Security
- Client-side encryption using CryptoJS
- Secure hash generation for file integrity
- No server-side storage of sensitive data

### Performance
- Chunk-based processing for large files
- Efficient compression before storage
- Optimized IndexedDB operations

