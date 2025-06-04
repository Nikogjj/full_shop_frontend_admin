import { Routes } from '@angular/router';
import { LoginPageComponent } from './login/login-page/login-page.component';
import { HomePageComponent } from './home/home-page/home-page.component';

export const routes: Routes = [
    // {path:"", redirectTo:"login", pathMatch:"full"},
    {path:"login",component:LoginPageComponent},
    {path:"home",component:HomePageComponent}
];
