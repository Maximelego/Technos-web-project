import { Component } from '@angular/core';
import { AuthService } from './auth/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private authService: AuthService, private router: Router) {}
  title = 'app';

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
