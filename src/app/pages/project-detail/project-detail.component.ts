import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PublicNavComponent } from '../../layout/public-nav/public-nav.component';
import { ProjectService } from '../../core/services/project.service';
import { Project } from '../../core/models/project.model';

@Component({
    selector: 'app-project-detail',
    standalone: true,
    imports: [CommonModule, RouterLink, PublicNavComponent],
    templateUrl: './project-detail.component.html',
    styleUrl: './project-detail.component.scss',
})
export class ProjectDetailComponent implements OnInit {
    project = signal<Project | null>(null);

    constructor(private route: ActivatedRoute, private projectService: ProjectService) { }

    ngOnInit(): void {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.projectService.getById(id).subscribe((data) => this.project.set(data));
    }

    getImageUrl(fileName: string): string {
        return this.projectService.getImageUrl(fileName);
    }
}