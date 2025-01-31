import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GithubSearchResponse } from '../models/github-repo.model';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private API_URL: string = 'https://api.github.com/search/repositories';
  
  constructor(private http: HttpClient) { }

  public getSearchResult(query: string): Observable<GithubSearchResponse> {
    return this.http.get<GithubSearchResponse>(`${this.API_URL}?q=${query}`);
  }
}
