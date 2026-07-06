import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PublicNavComponent } from '../../layout/public-nav/public-nav.component';
import { ProjectService } from '../../core/services/project.service';
import { SkillService } from '../../core/services/skill.service';
import { ContactService } from '../../core/services/contact.service';
import { Project } from '../../core/models/project.model';
import { Skill, SkillCategory } from '../../core/models/skill.model';
import { ContactRequest } from '../../core/models/contact.model';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink, PublicNavComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
    projects = signal<Project[]>([]);
    skills = signal<Skill[]>([]);

    skillCategories: SkillCategory[] = ['LANGAGE', 'FRAMEWORK', 'SECURITE', 'OUTIL'];

    contactForm: ContactRequest = { name: '', email: '', message: '' };
    contactSuccess = signal(false);
    contactError = signal<string | null>(null);
    isSubmitting = signal(false);

    constructor(
        private projectService: ProjectService,
        private skillService: SkillService,
        private contactService: ContactService
    ) { }

    ngOnInit(): void {
        this.projectService.getAll().subscribe((data) => this.projects.set(data));
        this.skillService.getAll().subscribe((data) => this.skills.set(data));
    }

    skillsByCategory(category: SkillCategory): Skill[] {
        return this.skills().filter((s) => s.category === category);
    }

    getImageUrl(fileName: string): string {
        return this.projectService.getImageUrl(fileName);
    }

    onSubmitContact(): void {
        this.contactError.set(null);
        this.contactSuccess.set(false);
        this.isSubmitting.set(true);

        this.contactService.submit(this.contactForm).subscribe({
            next: () => {
                this.contactSuccess.set(true);
                this.contactForm = { name: '', email: '', message: '' };
                this.isSubmitting.set(false);
            },
            error: () => {
                this.contactError.set('Une erreur est survenue, réessaie plus tard.');
                this.isSubmitting.set(false);
            },
        });
    }
}