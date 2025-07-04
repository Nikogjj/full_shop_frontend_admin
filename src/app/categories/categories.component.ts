import { Component, inject } from '@angular/core';
import { RowCategorieComponent } from './row-categorie/row-categorie.component';
import { CategoriesService } from '../services/categories.service';
import { ModifyCategoriesComponent } from './modify-categories/modify-categories.component';
import { CreateCategoriesComponent } from "./create-categories/create-categories.component";
import { DeleteCategoriesComponent } from './delete-categories/delete-categories.component';
import { Category } from '../interfaces/category';

@Component({
  selector: 'app-categories',
  imports: [RowCategorieComponent, ModifyCategoriesComponent, CreateCategoriesComponent,DeleteCategoriesComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  categoriesService = inject(CategoriesService);
  isSearchBarActive = false;
  timerRecherche!: ReturnType<typeof setTimeout> | null;
  resultatsSearch : Category[] | null = null;


  searchCategories(event : KeyboardEvent){
    const input = event.target as HTMLInputElement;
    const valeur: string = input.value;

    // reset le timer si un timer existe pour ne pas 
    // surcharger de fecth mon backend 
    if (this.timerRecherche) {
      clearTimeout(this.timerRecherche);
    }
    // si la valeur est vide on désactive la 
    // barre de recherche et on vide les résultats
    if (valeur === '') {
      this.isSearchBarActive = false;
      this.resultatsSearch = null;
      return;
    }
    // On lance une recherche avec un délai de 300ms 
    // si la barre de recherche n'est pasvide
    this.timerRecherche = setTimeout(() => {
      if (valeur === '') {
        this.resultatsSearch = [];
        return;
      }

    this.categoriesService.searchCategoriesByName(valeur)
    .then(response=>{
      console.log(response);
      this.resultatsSearch = response.categories;
    })
    .catch(error => {
      console.error('Erreur lors de la recherche :', error);
    });
    },300)
    this.isSearchBarActive = true;
  }
}
