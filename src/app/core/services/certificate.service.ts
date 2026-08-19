import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Certificate, CertificateRequest } from '../models/certificate.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CertificateService {
    private readonly apiUrl = `${environment.apiUrl}/api/certificates`;

    constructor(private http: HttpClient) { }

    getAll(): Observable<Certificate[]> {
        return this.http.get<Certificate[]>(this.apiUrl);
    }

    create(certificate: CertificateRequest): Observable<Certificate> {
        return this.http.post<Certificate>(this.apiUrl, certificate);
    }

    update(id: number, certificate: CertificateRequest): Observable<Certificate> {
        return this.http.put<Certificate>(`${this.apiUrl}/${id}`, certificate);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}