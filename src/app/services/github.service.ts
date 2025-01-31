import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  API_URL: string = 'https://api.github.com/search/repositories';
  
  constructor() { }
}
