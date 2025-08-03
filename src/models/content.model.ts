// Legacy models for backward compatibility
export interface FileItem {
  id: string;
  name: string;
  type: 'png' | 'jpg' | 'jpeg' | 'json' | 'xml' | 'txt' | 'mp4' | 'pdf';
  content: string; // base64 for png/jpg/jpeg/mp4/pdf, string for json/xml/txt
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

// New Content Services API Models
export interface Document {
  id: string;
  path: string;
  repositoryId: string;
  type: string;
  versionLabel?: string;
  creationDate: string;
  lastModificationDate: string;
  createdBy?: string;
  lastModifiedBy?: string;
  name?: string;
  title?: string;
  description?: string;
  contentStreamLength?: number;
  contentStreamMimeType?: string;
  contentStreamFileName?: string;
  contentStreamId?: string;
  changeToken?: string;
  isLatestVersion?: boolean;
  isMajorVersion?: boolean;
  isLatestMajorVersion?: boolean;
  isPrivateWorkingCopy?: boolean;
  isImmutable?: boolean;
  isExactAcl?: boolean;
  aclInherited?: boolean;
  properties?: { [key: string]: any };
}

export interface QueryRequest {
  ids?: string[];
  paths?: string[];
  repositories?: string[];
  loadContentForTypes?: string[];
}

export interface SearchRequest {
  searchTerm: string;
  paths?: string[];
  repositories?: string[];
  properties?: { [key: string]: string };
}

export interface ApiRepository {
  id: string;
  name: string;
  description?: string;
  rootFolderId?: string;
  capabilities?: { [key: string]: any };
}

// Extended models for dashboard display
export interface DashboardDocument extends Document {
  displayName: string;
  fileType: string;
  isFolder: boolean;
  isFile: boolean;
  iconPath: string;
  size?: string;
  lastModified?: string;
}

export interface DashboardFolder {
  id: string;
  name: string;
  path: string;
  repositoryId: string;
  repositoryName: string;
  documentCount: number;
  lastModified: string;
}

export interface DashboardFile {
  id: string;
  name: string;
  path: string;
  repositoryId: string;
  repositoryName: string;
  folderName: string;
  folderPath: string;
  type: string;
  size: string;
  lastModified: string;
  createdBy: string;
  iconPath: string;
}

