# 🌐 Decentralized File System


A secure, browser-based decentralized file system that enables efficient file storage and sharing with client-side encryption.


##  Key Features 

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

