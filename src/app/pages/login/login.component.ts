import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { LoginRequest } from '../../core/models/auth.model';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
})
export class LoginComponent {
    credentials: LoginRequest = { username: '', password: '' };
    errorMessage = signal<string | null>(null);
    isLoading = signal(false);

    constructor(private authService: AuthService, private router: Router) { }

    onSubmit(): void {
        this.errorMessage.set(null);
        this.isLoading.set(true);

        this.authService.login(this.credentials).subscribe({
            next: () => {
                this.router.navigate(['/admin/dashboard']);
            },
            error: () => {
                this.errorMessage.set('Nom d\'utilisateur ou mot de passe incorrect.');
                this.isLoading.set(false);
            },
        });
    }
}