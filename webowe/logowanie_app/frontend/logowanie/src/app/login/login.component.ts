import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user = {
    username: '',
    password: ''
  }
  komunikat: boolean = false;
  isSubmited: boolean =false;

  private apiUrl = 'http://localhost:3000';
  constructor(private http:HttpClient, private router: Router){}

  login(){
    this.isSubmited = true;
    this.http.post<any>(`${this.apiUrl}/login`, this.user).subscribe({
      next: (response => {
        this.komunikat = true;
        localStorage.setItem('authToken',response.authToken);
        localStorage.setItem('isLoggedIn','true');

        setTimeout(() => {
          this.router.navigate(['/panel']);
        }, 2000);
      }),
      error: (error => {
        this.komunikat = false;
      })
    });
  }
}
