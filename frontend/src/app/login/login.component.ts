import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage = '';
  isLoading = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }
  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const credentials = this.loginForm.value;
      this.authService.login(credentials).subscribe(
        response => {
          this.isLoading = false;
          this.snackBar.open('Connexion réussie', 'Fermer', {
            duration: 3000
          });
          this.router.navigate(['/accueil']);
        },
        error => {
          this.isLoading = false;
          this.snackBar.open("Échec de la connexion. Veuillez vérifier vos informations.", 'Fermer', {
            duration: 3000
          });
        }
      );
    }
  }
}
