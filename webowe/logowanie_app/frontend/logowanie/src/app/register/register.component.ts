import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {HttpClient, HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, HttpClientModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user = {
    username: '',
    password: ''
  };
  userRegistered: string = '';

  komunikat: boolean = false;
  isSubmited: boolean = false;

  private apiUrl = 'http://localhost:3000';
  constructor(private http:HttpClient){}

  register(){
    this.isSubmited = true;
    this.http.post<any>(`${this.apiUrl}/register`,this.user).subscribe({
      next: (response => {
        //console.log(response);
        this.komunikat = true;
      }),
      error: (error => {
        //console.error(error);
        this.komunikat = false;
      })
    });
    this.userRegistered = this.user.username;
    this.user = {username: '', password: ''};
  }
}
