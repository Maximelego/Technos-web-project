import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import UserModel from '../../scripts/Models/UserModel';
import { UserInCreateType } from '../../scripts/API/APITypes/Users';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  registerData: UserInCreateType = {
    login: '',
    mail: '',
    firstname: '',
    lastname: '',
    password: '',
    password_confirmation: '',
  };

  constructor(private authService: AuthService) {}

  
  async onSubmit() {
    const userModel = new UserModel({
      id: 0, // ou une valeur par défaut, selon ton implémentation
      login: this.registerData.login,
      mail: this.registerData.mail,
      firstname: this.registerData.firstname,
      lastname: this.registerData.lastname,
      password: this.registerData.password,
      password_confirmation: this.registerData.password_confirmation,
    });
    if(this.registerData.password != null){

    }
    

    try {
      await this.authService.register(userModel);
      // Ici, tu peux gérer la redirection ou afficher un message de succès après l'inscription.
      console.log('Inscription réussie');
    } catch (error) {
      console.error('Échec de l\'inscription', error);
      // Gérer l'erreur, par exemple, afficher un message d'erreur à l'utilisateur.
    }
  }

  
}
