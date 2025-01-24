import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'logowanie';
  public isLoggedIn: string | null;

  constructor(private router: Router) {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') || 'false';
    this.checkLoginStatus();
  }

  checkLoginStatus(): void {
    if (this.isLoggedIn === 'true') {
      console.log("User is logged in");
      this.router.navigate(['/panel']);
    } else {
      console.log("User is not logged in");
      this.router.navigate(['/login']);
    }
  }

  login(): void {
    this.isLoggedIn = 'true';
    localStorage.setItem('isLoggedIn', 'true');
    console.log("Login successful");
    this.checkLoginStatus();
  }

  logout(): void {
    this.isLoggedIn = 'false';
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('authToken');
    console.log("Logout successful");
    this.checkLoginStatus();
  }
}
