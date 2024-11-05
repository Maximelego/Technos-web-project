import { Component } from '@angular/core';
import { AuthService } from '../../../app/auth/service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
  loginData = { mail: '', password: '' };

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.login(this.loginData.mail, this.loginData.password).subscribe(response => {
      console.log('Login successful', response);
    });
  }


}
