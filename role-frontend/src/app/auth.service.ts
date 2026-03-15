import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  localEnv = 'http://localhost:8080/api/auth';
  prodEnv = 'https://role-management-app-production.up.railway.app/api/auth';

  private apiUrl = this.prodEnv;

  constructor(private http: HttpClient) {}

  // Register new user
  register(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { username, password });
  }

  // Login and get token
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password });
  }

  // Save token to memory
  saveToken(token: string): void {
    sessionStorage.setItem('token', token);
  }

  // Get token
  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  // Check if logged in
  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  // Logout
  logout(): void {
    sessionStorage.removeItem('token');
  }
}
