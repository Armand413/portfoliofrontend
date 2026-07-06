import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminShellComponent } from '../../../layout/admin-shell/admin-shell.component';
import { SkillService } from '../../../core/services/skill.service';
import { Skill, SkillCategory, SkillRequest } from '../../../core/models/skill.model';

@Component({
    selector: 'app-skills',
    standalone: true,
    imports: [CommonModule, FormsModule, AdminShellComponent],
    templateUrl: './skills.component.html',
    styleUrl: './skills.component.scss',
})
export class SkillsComponent implements OnInit {
    skills = signal<Skill[]>([]);
    categories: SkillCategory[] = ['LANGAGE', 'FRAMEWORK', 'BASE_DE_DONNEES', 'OUTIL', 'SECURITE', 'AUTRE'];

    editingId: number | null = null;
    form: SkillRequest = this.emptyForm();

    constructor(private skillService: SkillService) { }

    ngOnInit(): void {
        this.loadSkills();
    }

    loadSkills(): void {
        this.skillService.getAll().subscribe((data) => this.skills.set(data));
    }

    emptyForm(): SkillRequest {
        return { name: '', category: 'AUTRE', level: 3, displayOrder: 0 };
    }

    onEdit(skill: Skill): void {
        this.editingId = skill.id;
        this.form = {
            name: skill.name,
            category: skill.category,
            level: skill.level,
            displayOrder: skill.displayOrder,
        };
    }

    onCancelEdit(): void {
        this.editingId = null;
        this.form = this.emptyForm();
    }

    onSubmit(): void {
        const request = this.editingId
            ? this.skillService.update(this.editingId, this.form)
            : this.skillService.create(this.form);

        request.subscribe(() => {
            this.loadSkills();
            this.onCancelEdit();
        });
    }

    onDelete(id: number): void {
        if (!confirm('Supprimer cette compétence ?')) return;
        this.skillService.delete(id).subscribe(() => this.loadSkills());
    }
}