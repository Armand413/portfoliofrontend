import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Skill, SkillRequest } from '../models/skill.model';
import { environment } from '../../../environnements/environnement';
@Injectable({ providedIn: 'root' })
export class SkillService {
    private readonly apiUrl = '${environment.apiUrl}/api/skills';

    constructor(private http: HttpClient) { }

    getAll(): Observable<Skill[]> {
        return this.http.get<Skill[]>(this.apiUrl);
    }

    getById(id: number): Observable<Skill> {
        return this.http.get<Skill>(`${this.apiUrl}/${id}`);
    }

    create(skill: SkillRequest): Observable<Skill> {
        return this.http.post<Skill>(this.apiUrl, skill);
    }

    update(id: number, skill: SkillRequest): Observable<Skill> {
        return this.http.put<Skill>(`${this.apiUrl}/${id}`, skill);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}