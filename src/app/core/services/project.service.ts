import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project, ProjectRequest, ProjectImage } from '../models/project.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProjectService {
    private readonly apiUrl = `${environment.apiUrl}/api/projects`;

    constructor(private http: HttpClient) { }

    getAll(): Observable<Project[]> {
        return this.http.get<Project[]>(this.apiUrl);
    }

    getById(id: number): Observable<Project> {
        return this.http.get<Project>(`${this.apiUrl}/${id}`);
    }

    getByCategory(category: string): Observable<Project[]> {
        return this.http.get<Project[]>(`${this.apiUrl}/category/${category}`);
    }

    create(project: ProjectRequest): Observable<Project> {
        return this.http.post<Project>(this.apiUrl, project);
    }

    update(id: number, project: ProjectRequest): Observable<Project> {
        return this.http.put<Project>(`${this.apiUrl}/${id}`, project);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    getImages(projectId: number): Observable<ProjectImage[]> {
        return this.http.get<ProjectImage[]>(`${this.apiUrl}/${projectId}/images`);
    }

    uploadImage(projectId: number, file: File): Observable<ProjectImage> {
        const formData = new FormData();
        formData.append('file', file);
        return this.http.post<ProjectImage>(`${this.apiUrl}/${projectId}/images`, formData);
    }

    deleteImage(projectId: number, imageId: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${projectId}/images/${imageId}`);
    }

    getImageUrl(fileName: string): string {
        return `${environment.apiUrl}/images/${fileName}`;
    }
}