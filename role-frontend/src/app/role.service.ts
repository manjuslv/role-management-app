import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface Role {
  id?: number;
  username: string;
  rolename: string;
}

@Injectable({ providedIn: 'root' })
export class RoleService {

  private apiUrl = 'https://role-management-app-production.up.railway.app/api/roles';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  // Create headers with JWT token
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
  }

  // GET /api/roles
  getAll(): Observable<Role[]> {
    return this.http.get<Role[]>(this.apiUrl, {
      headers: this.getHeaders()
    });
  }

  // POST /api/roles
  create(role: Role): Observable<Role> {
    return this.http.post<Role>(this.apiUrl, role, {
      headers: this.getHeaders()
    });
  }

  // PUT /api/roles/1
  update(id: number, role: Role): Observable<Role> {
    return this.http.put<Role>(`${this.apiUrl}/${id}`, role, {
      headers: this.getHeaders()
    });
  }

  // DELETE /api/roles/1
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }
}