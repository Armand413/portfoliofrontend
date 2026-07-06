import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { LoginRequest, LoginResponse, UpdateCredentialsRequest } from '../models/auth.model';
import { environment } from '../../../environments/environment';


const TOKEN_KEY = 'portfolio_token';
const USERNAME_KEY = 'portfolio_username';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private readonly apiUrl = `${environment.apiUrl}/api/auth`;
    private readonly usersUrl = `${environment.apiUrl}/api/users`;

    private platformId = inject(PLATFORM_ID);
    private isBrowser = isPlatformBrowser(this.platformId);

    isAuthenticated = signal<boolean>(this.hasToken());

    constructor(private http: HttpClient, private router: Router) { }

    login(credentials: LoginRequest): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
            tap((response) => {
                if (this.isBrowser) {
                    localStorage.setItem(TOKEN_KEY, response.token);
                    localStorage.setItem(USERNAME_KEY, response.username);
                }
                this.isAuthenticated.set(true);
            })
        );
    }

    updateCredentials(request: UpdateCredentialsRequest): Observable<LoginResponse> {
        return this.http.put<LoginResponse>(`${this.usersUrl}/me`, request).pipe(
            tap((response) => {
                if (this.isBrowser) {
                    localStorage.setItem(TOKEN_KEY, response.token);
                    localStorage.setItem(USERNAME_KEY, response.username);
                }
            })
        );
    }

    logout(): void {
        if (this.isBrowser) {
            localStorage.removeItem(TOKEN_KEY);
            localStorage.removeItem(USERNAME_KEY);
        }
        this.isAuthenticated.set(false);
        this.router.navigate(['/connexion']);
    }

    getToken(): string | null {
        return this.isBrowser ? localStorage.getItem(TOKEN_KEY) : null;
    }

    getUsername(): string | null {
        return this.isBrowser ? localStorage.getItem(USERNAME_KEY) : null;
    }

    private hasToken(): boolean {
        return this.isBrowser && !!localStorage.getItem(TOKEN_KEY);
    }
}