import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'totalPages'
})
export class TotalPagesPipe implements PipeTransform {

  transform(totalNumberOfGitRepos: number, maxReposPerPage: number): number {
    return Math.ceil(totalNumberOfGitRepos / maxReposPerPage);
  }
}
