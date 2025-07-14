
export interface FileItem {
  id: string;
  name: string;
  type: 'png' | 'jpg' | 'jpeg' | 'json' | 'xml';
  content: string; // base64 for png/jpg/jpeg, string for json/xml
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

