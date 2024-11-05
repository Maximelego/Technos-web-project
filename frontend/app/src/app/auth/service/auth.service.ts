import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import AuthModel from '../../scripts/Models/AuthModel';
import UserModel from '../../scripts/Models/UserModel';
import ErrorResponse from '../../scripts/API/Responses/ErrorResponse';
import APIResponse from '../../scripts/API/Responses/APIResponse';
import { TokenPair } from '../../scripts/API/APITypes/Tokens';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  async login(login: string, password: string): Promise<void> {
    const authModel = new AuthModel(login, password);
    const response : APIResponse<TokenPair> = await authModel.login();

    if (!response.isError()) {
      // Traiter le succès de la connexion (stockage des tokens, etc.)
    } else {
      // Gérer l'erreur
      console.error(response);
      throw new Error('Erreur de connexion');
    }
  }

  async register(userData: UserModel): Promise<void> {
    const response: undefined | ErrorResponse<undefined> = await userData.createUser();

    if (response) {
      // Gérer l'erreur d'inscription
      console.error('Erreur d\'inscription', response);
      throw new Error('Erreur d\'inscription');
    } else {
      // Inscription réussie
      console.log('Inscription réussie');
      // Tu peux éventuellement gérer la connexion immédiate après l'inscription si nécessaire
    }
  }




  async logout(): Promise<void> {
    await AuthModel.logout();
    // Optionnel : rediriger l'utilisateur après la déconnexion
  }

  async refreshTokens(): Promise<void> {
    await AuthModel.refreshTokens();
  }
}
