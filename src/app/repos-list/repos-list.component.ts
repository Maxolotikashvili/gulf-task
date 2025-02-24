import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GithubService } from '../services/github.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, finalize, map, Observable, Subject, Subscription, switchMap, takeUntil, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { GithubRepo, GithubSearchResponse } from '../models/github-repo.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { LoaderComponent } from "../loader/loader.component";
import { TotalPagesPipe } from '../pipes/total-pages.pipe';

@Component({
  selector: 'app-repos-list',
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FontAwesomeModule, LoaderComponent, TotalPagesPipe],
  templateUrl: './repos-list.component.html',
  styleUrl: './repos-list.component.scss'
})
export class ReposListComponent implements OnInit, OnDestroy {
  private githubService = inject(GithubService);

  private destroy$: Subject<void> = new Subject();

  public searchControl: FormControl = new FormControl('');
  public githubReposList: GithubRepo[] = [];
  public githubReposListPerPage!: GithubRepo[];
  public totalNumberOfGitRepos: number = 0;
  public totalShowedRepos: number = 0;
  public maxReposPerPage: number = 0;
  public prefferedReposPerPage: number = 30;
  public selectedPage: number = 1;
  public isIncompleteResult: boolean = false;
  public isLoading: boolean = false;
  public isError: boolean = false;
  public displayFormat: 'card' | 'tabular' = 'card';

  public icons = {
    magnifyingGlass: faMagnifyingGlass,
    github: faGithub
  }

  constructor() { }

  ngOnInit(): void {
    this.searchForReposBySearchInputChange();
  }

  public searchForReposBySearchInputChange() {
    this.searchControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      filter((value) => value.trim() !== ''),
      tap(() => this.isLoading = true),
      switchMap((value) => this.getSearchResults(value)),
      takeUntil(this.destroy$)
    )
    .subscribe({
      next: (response) => {
        this.handleGithubResponse(response);
      },

      error: (error) => {
        console.error(error);
        this.isError = true;
      }
    })
  }

  public handleGithubResponse(response: GithubSearchResponse) {
    this.githubReposList = response.items;
    this.githubReposListPerPage = response.items;
    this.isIncompleteResult = response.incomplete_results;
    this.totalNumberOfGitRepos = response.total_count;
    this.maxReposPerPage = this.githubService.reposPerPage;

    this.updateSelectedNumberOfReposPerPage(this.prefferedReposPerPage);
  }

  public getSearchResults(value?: string) {
    const searchInputValue = value ? value : this.searchControl.value;
    return this.githubService.getSearchResult(searchInputValue, this.selectedPage).pipe(
      finalize(() => this.isLoading = false)
    );
  }

  public updateSelectedNumberOfReposPerPage(value: number) {
    this.prefferedReposPerPage = value;
    this.githubReposListPerPage = this.githubReposList.slice(0, this.prefferedReposPerPage);
    this.calculateTotalShownRepos()
  }

  public calculateTotalShownRepos() {
    const prefferedNumberOfReposPerPage: number = this.prefferedReposPerPage || this.maxReposPerPage;
    this.totalShowedRepos = (this.selectedPage - 1) * this.maxReposPerPage + prefferedNumberOfReposPerPage;
  }

  public navigateToPages(state: 'next' | 'prev') {
    const page = state === 'next' ? 1 : -1;
    this.selectedPage += page;
    this.isLoading = true;
    this.getSearchResults().pipe(takeUntil(this.destroy$)).subscribe({
      next: (res) => {
        this.handleGithubResponse(res);
      },
      error: (error) => {
        console.error(error);
        this.isError = true
      }
    })
  }

  public trackById(index: number, repo: GithubRepo) {
    return repo.id;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
