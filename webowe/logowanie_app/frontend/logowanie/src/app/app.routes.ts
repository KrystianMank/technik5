import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { PanelComponent } from './panel/panel.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

export const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'panel', component: PanelComponent}, // to do: sprawdzanie logowania
  {path: '', redirectTo: '/login', pathMatch:'full'},
  {path: '**', component: PagenotfoundComponent}
];
