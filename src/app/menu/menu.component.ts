import { Component } from '@angular/core';
import { MenuNavComponent } from '../menu-nav/menu-nav.component';
import { MenuNav } from '../interfaces/menu-nav';

@Component({
  selector: 'app-menu',
  imports: [MenuNavComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  tab_men_nav : MenuNav[] = [
    { name : "Accueil", img_url : "home.svg"},
    { name : "Categories", img_url : "categories.svg"},
    { name : "Produits", img_url : "products.svg"},
    { name: "Utilisateurs", img_url: "user.svg"},
    { name : "Commandes", img_url : "orders.svg"},
    { name : "Tableau de bord", img_url : "dashboard.svg"},
  ]
}
