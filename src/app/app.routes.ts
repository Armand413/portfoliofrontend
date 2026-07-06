import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    },
    {
        path: 'projets/:id',
        loadComponent: () => import('./pages/project-detail/project-detail.component').then(m => m.ProjectDetailComponent),
    },
    {
        path: 'competences',
        loadComponent: () => import('./pages/admin/skills/skills.component').then(m => m.SkillsComponent),
    },

    {
        path: 'connexion',
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
    },
    {
        path: 'admin',
        canActivate: [authGuard],
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full',
            },
            {
                path: 'dashboard',
                loadComponent: () => import('./pages/admin/dashboard/dashboard.component').then(m => m.DashboardComponent),
            },
            {
                path: 'projets',
                loadComponent: () => import('./pages/admin/projects-list/projects-list.component').then(m => m.ProjectsListComponent),
            },
            {
                path: 'projets/nouveau',
                loadComponent: () => import('./pages/admin/project-form/project-form.component').then(m => m.ProjectFormComponent),
            },
            {
                path: 'projets/:id/modifier',
                loadComponent: () => import('./pages/admin/project-form/project-form.component').then(m => m.ProjectFormComponent),
            },
            {
                path: 'messages',
                loadComponent: () => import('./pages/admin/messages/messages.component').then(m => m.MessagesComponent),
            },
            {
                path: 'parametres',
                loadComponent: () => import('./pages/admin/settings/settings.component').then(m => m.SettingsComponent),
            },
        ],
    },
    {
        path: '**',
        redirectTo: '',
    },
];