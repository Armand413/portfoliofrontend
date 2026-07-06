import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
    selector: 'app-admin-shell',
    standalone: true,
    imports: [RouterLink, RouterLinkActive],
    templateUrl: './admin-shell.component.html',
    styleUrl: './admin-shell.component.scss',
})
export class AdminShellComponent {
    constructor(private authService: AuthService) { }
    logout(): void { this.authService.logout(); }
}