export interface FileMetadata {
  id: string;
  name: string;
  size: number;
  type: string;
  hash: string;
  timestamp: number;
  chunks: string[];
  owner: string;
}

export interface FileChunk {
  id: string;
  data: Uint8Array;
  index: number;
}