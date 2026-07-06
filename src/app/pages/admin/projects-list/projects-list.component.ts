import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AdminShellComponent } from '../../../layout/admin-shell/admin-shell.component';
import { ProjectService } from '../../../core/services/project.service';
import { Project } from '../../../core/models/project.model';

@Component({
    selector: 'app-projects-list',
    standalone: true,
    imports: [CommonModule, RouterLink, AdminShellComponent],
    templateUrl: './projects-list.component.html',
    styleUrl: './projects-list.component.scss',
})
export class ProjectsListComponent implements OnInit {
    projects = signal<Project[]>([]);

    constructor(private projectService: ProjectService) { }

    ngOnInit(): void { this.loadProjects(); }

    loadProjects(): void {
        this.projectService.getAll().subscribe((data) => this.projects.set(data));
    }

    onDelete(id: number): void {
        if (!confirm('Supprimer ce projet ? Cette action est irréversible.')) return;
        this.projectService.delete(id).subscribe(() => this.loadProjects());
    }
}