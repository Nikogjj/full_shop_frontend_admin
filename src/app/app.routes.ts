import { Routes } from '@angular/router';
import { LoginPageComponent } from './login/login-page/login-page.component';
import { AccueilComponent } from './accueil/accueil.component';
import { CategoriesComponent } from './categories/categories.component';

export const routes: Routes = [
    // {path:"", redirectTo:"login", pathMatch:"full"},
    {path:"Login",component:LoginPageComponent},
    {path:"Accueil",component:AccueilComponent},
    {path:"Categories",component:CategoriesComponent}
];
