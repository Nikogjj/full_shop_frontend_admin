import { Routes } from '@angular/router';
import { LoginPageComponent } from './login/login-page/login-page.component';
import { AccueilComponent } from './accueil/accueil.component';
import { CategoriesComponent } from './categories/categories.component';

export const routes: Routes = [
    // {path:"", redirectTo:"login", pathMatch:"full"},
    {path:"login",component:LoginPageComponent},
    {path:"accueil",component:AccueilComponent},
    {path:"categories",component:CategoriesComponent}
];
