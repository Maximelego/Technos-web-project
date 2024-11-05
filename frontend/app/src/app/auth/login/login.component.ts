import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import AuthModel from '../../scripts/Models/AuthModel';
import { TokenPair } from '../../scripts/API/APITypes/Tokens';

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
  
  constructor(private authService: AuthService) {
  }

  async onSubmit() {
    try {
      await this.authService.login(this.loginData.login, this.loginData.password);
      // Ici, tu peux gérer la redirection ou afficher un message de succès après la connexion.
      console.log('Connexion réussie');
    } catch (error) {
      console.error('Échec de la connexion', error);
      // Gérer l'erreur, par exemple, afficher un message d'erreur à l'utilisateur.
    }
  }
}
