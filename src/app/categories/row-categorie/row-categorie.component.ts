import { Component, inject, input } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-row-categorie',
  imports: [],
  templateUrl: './row-categorie.component.html',
  styleUrl: './row-categorie.component.css'
})
export class RowCategorieComponent {
  categoriesService = inject(CategoriesService); 
  id = input(0);
  nom = input("");
  infos = [
    this.id,
    this.nom,
  ]
}
