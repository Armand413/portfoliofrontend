import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AdminShellComponent } from '../../../layout/admin-shell/admin-shell.component';
import { ProjectService } from '../../../core/services/project.service';
import { SkillService } from '../../../core/services/skill.service';
import { ContactService } from '../../../core/services/contact.service';
import { Contact } from '../../../core/models/contact.model';
import { Project } from '../../../core/models/project.model';
import { AuthService } from '../../../core/services/auth.service';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule, RouterLink, AdminShellComponent],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
    projects = signal<Project[]>([]);
    skillsCount = signal(0);
    messages = signal<Contact[]>([]);

    constructor(
        private projectService: ProjectService,
        private skillService: SkillService,
        private contactService: ContactService,
        public authService: AuthService
    ) { }

    ngOnInit(): void {
        this.projectService.getAll().subscribe((data) => this.projects.set(data));
        this.skillService.getAll().subscribe((data) => this.skillsCount.set(data.length));
        this.contactService.getAll().subscribe((data) => this.messages.set(data));
    }

    unreadCount(): number {
        return this.messages().filter((m) => !m.read).length;
    }
}