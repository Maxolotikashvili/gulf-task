import { Component, inject, OnInit } from '@angular/core';
import { GithubRepo } from '../models/github-repo.model';
import { ActivatedRoute } from '@angular/router';
import { GithubService } from '../services/github.service';
import { map, Observable } from 'rxjs';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCodeFork, faExclamation } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-repo-details',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './repo-details.component.html',
  styleUrl: './repo-details.component.scss'
})
export class RepoDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private githubService = inject(GithubService);

  public repo$!: Observable<GithubRepo | undefined>;

  public icons = {
    github: faGithub,
    fork: faCodeFork,
    exclamationMark: faExclamation
  }

  constructor() { }

  ngOnInit(): void {
    this.getRepo();
  }

  private getRepo() {
    const id: string | null = this.route.snapshot.paramMap.get('id');
    const urlParams = this.githubService.urlParams;

    if (id && +id && urlParams) {
      this.repo$ = this.githubService.getSearchResult(urlParams.query, urlParams.page).pipe(
        map((response) => response.items.find((repo) => repo.id === +id)))
    }
  }
}
