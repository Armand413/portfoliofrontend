import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact, ContactRequest } from '../models/contact.model';
import { environment } from '../../../environnements/environnement';

@Injectable({ providedIn: 'root' })
export class ContactService {
    private readonly apiUrl = `${environment.apiUrl}/api/contacts`;

    constructor(private http: HttpClient) { }

    submit(contact: ContactRequest): Observable<Contact> {
        return this.http.post<Contact>(this.apiUrl, contact);
    }

    getAll(): Observable<Contact[]> {
        return this.http.get<Contact[]>(this.apiUrl);
    }

    markAsRead(id: number): Observable<Contact> {
        return this.http.patch<Contact>(`${this.apiUrl}/${id}/read`, {});
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}