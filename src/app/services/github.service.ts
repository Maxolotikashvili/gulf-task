import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GithubSearchResponse } from '../models/github-repo.model';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private API_URL: string = 'https://api.github.com/search/repositories';
  public reposPerPage: number = 30;
  public urlParams!: {query: string, page: number}

  constructor(private http: HttpClient) { }

  public getSearchResult(query: string, page: number): Observable<GithubSearchResponse> {
    this.urlParams = {
      query: query,
      page: page
    }
    return this.http.get<GithubSearchResponse>(`${this.API_URL}?q=${query}&per_page=${this.reposPerPage}&page=${page}`);
  }
}
