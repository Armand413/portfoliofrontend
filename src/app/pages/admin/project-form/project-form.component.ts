import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { AdminShellComponent } from '../../../layout/admin-shell/admin-shell.component';
import { ProjectService } from '../../../core/services/project.service';
import { ProjectRequest, ProjectCategory, ProjectImage } from '../../../core/models/project.model';

@Component({
    selector: 'app-project-form',
    standalone: true,
    imports: [FormsModule, RouterLink, AdminShellComponent],
    templateUrl: './project-form.component.html',
    styleUrl: './project-form.component.scss',
})
export class ProjectFormComponent implements OnInit {
    projectId: number | null = null;
    categories: ProjectCategory[] = ['BACKEND', 'FRONTEND', 'FULLSTACK', 'CYBERSECURITE', 'OUTIL', 'AUTRE'];

    form: ProjectRequest = {
        title: '', description: '', techStack: '', githubUrl: '', demoUrl: '', category: 'AUTRE',
    };

    images = signal<ProjectImage[]>([]);
    isSaving = signal(false);

    constructor(private route: ActivatedRoute, private router: Router, private projectService: ProjectService) { }

    ngOnInit(): void {
        const idParam = this.route.snapshot.paramMap.get('id');
        if (idParam) {
            this.projectId = Number(idParam);
            this.projectService.getById(this.projectId).subscribe((project) => {
                this.form = {
                    title: project.title, description: project.description, techStack: project.techStack,
                    githubUrl: project.githubUrl, demoUrl: project.demoUrl, category: project.category,
                };
                this.images.set(project.images);
            });
        }
    }

    onSubmit(): void {
        this.isSaving.set(true);
        const request = this.projectId
            ? this.projectService.update(this.projectId, this.form)
            : this.projectService.create(this.form);

        request.subscribe({
            next: (result) => {
                if (!this.projectId) {
                    // projet créé pour la première fois : on reste sur le formulaire en mode édition pour permettre l'upload d'images
                    this.router.navigate(['/admin/projets', result.id, 'modifier']);
                } else {
                    this.router.navigate(['/admin/projets']);
                }
            },
            error: () => this.isSaving.set(false),
        });
    }

    onFileSelected(event: Event): void {
        if (!this.projectId) return;
        const input = event.target as HTMLInputElement;
        if (!input.files?.length) return;

        this.projectService.uploadImage(this.projectId, input.files[0]).subscribe((image) => {
            this.images.update((imgs) => [...imgs, image]);
        });
    }

    getImageUrl(fileName: string): string {
        return this.projectService.getImageUrl(fileName);
    }

    onDeleteImage(imageId: number): void {
        if (!this.projectId) return;
        this.projectService.deleteImage(this.projectId, imageId).subscribe(() => {
            this.images.update((imgs) => imgs.filter((i) => i.id !== imageId));
        });
    }
}