import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  registerData = {
    login: '',
    firstname: '',
    lastname: '',
    mail: '',
    password: '',
    password_confirmation: ''
  };

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.register(this.registerData).subscribe(response => {
      console.log('Registration successful', response);
    });
  }

}
