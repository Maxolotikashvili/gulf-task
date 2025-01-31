import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GithubService } from '../services/github.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, finalize, switchMap, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { GithubRepo } from '../models/github-repo.model';

@Component({
  selector: 'app-repos-list',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './repos-list.component.html',
  styleUrl: './repos-list.component.scss'
})
export class ReposListComponent implements OnInit {
  public searchControl: FormControl = new FormControl('');
  public isLoading!: boolean;
  public githubReposList!: GithubRepo[];

  constructor(private githubService: GithubService) { }

  ngOnInit(): void {
    this.listenToSearchControlChanges();
  }

  public listenToSearchControlChanges() {
    this.searchControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      filter((value) => value.trim() !== ''),
      tap(() => this.isLoading = true),
      switchMap((value) => this.githubService.getSearchResult(value).pipe(
        finalize(() => this.isLoading = false)
      ))
    )
      .subscribe((response) => {
        console.log(response);
        this.githubReposList = response.items;
      })
  }
}
