import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminShellComponent } from '../../../layout/admin-shell/admin-shell.component';
import { AuthService } from '../../../core/services/auth.service';
import { UpdateCredentialsRequest } from '../../../core/models/auth.model';

@Component({
    selector: 'app-settings',
    standalone: true,
    imports: [FormsModule, AdminShellComponent],
    templateUrl: './settings.component.html',
    styleUrl: './settings.component.scss',
})
export class SettingsComponent {
    form: UpdateCredentialsRequest = { currentPassword: '', newUsername: '', newPassword: '' };
    successMessage = signal<string | null>(null);
    errorMessage = signal<string | null>(null);
    isSaving = signal(false);

    constructor(public authService: AuthService) { }

    onSubmit(): void {
        this.successMessage.set(null);
        this.errorMessage.set(null);
        this.isSaving.set(true);

        this.authService.updateCredentials(this.form).subscribe({
            next: () => {
                this.successMessage.set('Identifiants mis à jour avec succès.');
                this.form = { currentPassword: '', newUsername: '', newPassword: '' };
                this.isSaving.set(false);
            },
            error: (err) => {
                this.errorMessage.set(err.error?.message || 'Une erreur est survenue.');
                this.isSaving.set(false);
            },
        });
    }
}