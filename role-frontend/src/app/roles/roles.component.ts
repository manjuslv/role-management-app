import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RoleService, Role } from '../role.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent implements OnInit {

  roles: Role[] = [];
  form: Role = { username: '', rolename: '' };
  editingId: number | null = null;

  constructor(
    private roleService: RoleService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadRoles();
  }

  loadRoles() {
    this.roleService.getAll().subscribe(data => {
      this.roles = data;
    });
  }

  save() {
    if (this.editingId) {
      this.roleService.update(this.editingId, this.form).subscribe(() => {
        this.loadRoles();
        this.reset();
      });
    } else {
      this.roleService.create(this.form).subscribe(() => {
        this.loadRoles();
        this.reset();
      });
    }
  }

  edit(role: Role) {
    this.editingId = role.id!;
    this.form = { ...role };
  }

  delete(id: number) {
    this.roleService.delete(id).subscribe(() => {
      this.loadRoles();
    });
  }

  reset() {
    this.form = { username: '', rolename: '' };
    this.editingId = null;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}