import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Repository } from '../models/content.model';

@Injectable({
  providedIn: 'root'
})
export class ContentApiService {
  private readonly baseUrl = 'http://backbase.com/contentservices-public/client-api';

  constructor(private http: HttpClient) {}

  // List all repositories
  getRepositories(): Observable<Repository[]> {
    // The OpenAPI spec does not provide a GET /repositories endpoint, so this is a placeholder.
    // If available, replace with the correct endpoint.
    return this.http.get<Repository[]>(`${this.baseUrl}/repositories`);
  }

  // Get a single repository by ID
  getRepository(repositoryId: string): Observable<Repository> {
    return this.http.get<Repository>(`${this.baseUrl}/repositories/${repositoryId}`);
  }

  // Create one or more repositories
  // Accepts RepositoryCreate[] (not the frontend Repository type)
  createRepositories(repos: any[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/repositories`, repos);
  }

  // Delete a repository
  deleteRepository(repositoryId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/repositories/${repositoryId}`);
  }
} 