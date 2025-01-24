import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panel',
  imports: [CommonModule, FormsModule],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.css'
})
export class PanelComponent {
  constructor(private router: Router){
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if(!isLoggedIn){
      this.router.navigate(['/login']);
    }
  }
  logout(){
    localStorage.removeItem('authToken');
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }
}
