import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import UserModel from '../../scripts/Models/UserModel';
import { UserInCreateType } from '../../scripts/API/APITypes/Users';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(private authService: AuthService,private snackBar: MatSnackBar, private router: Router) {}


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

    try {
      await this.authService.register(userModel);
      this.snackBar.open('Connexion réussie', 'Fermer', { duration: 3000 });
      this.router.navigate(['/login']);
    } catch (error) {
      this.snackBar.open('Échec de l\'inscription', 'Fermer', { duration: 3000 });
    }
  }


}
