
export interface FileItem {
  id: string;
  name: string;
  type: 'png' | 'jpg' | 'jpeg' | 'json' | 'xml' | 'txt' | 'mp4';
  content: string; // base64 for png/jpg/jpeg/mp4, string for json/xml/txt
  addedBy: string;
  timestamp: string;
}

export interface Folder {
  id: string;
  name: string;
  files: FileItem[];
}

export interface Repository {
  id: string;
  name: string;
  folders: Folder[];
}

