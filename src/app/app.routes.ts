import { Routes } from '@angular/router';
import { ReposListComponent } from './repos-list/repos-list.component';
import { RepoDetailsComponent } from './repo-details/repo-details.component';

export const routes: Routes = [
    {
        path: 'repos-list',
        component: ReposListComponent
    },

    {
        path: 'repo-details/:id',
        component: RepoDetailsComponent
    },

    {
        path: '',
        redirectTo: 'repos-list',
        pathMatch: 'full'
    }
];
