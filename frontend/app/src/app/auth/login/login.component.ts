import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import AuthModel from '../../scripts/Models/AuthModel';
import { TokenPair } from '../../scripts/API/APITypes/Tokens';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginData = {
    login: '',
    password: '',
  };
  
  constructor(private authService: AuthService, private snackBar: MatSnackBar, private router: Router) {
  }

  async onSubmit() {
    try {
      await this.authService.login(this.loginData.login, this.loginData.password);
      this.snackBar.open('Connexion réussie', 'Fermer', { duration: 3000 });
      this.router.navigate(['/dashboard']);

    } catch (error) {
      this.snackBar.open('Échec de la connexion: Login ou password est incorrect ', 'Fermer', { duration: 3000 });
    }
  }
}
