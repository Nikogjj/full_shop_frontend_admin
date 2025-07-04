import { Component, ElementRef, inject, input, ViewChild } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../interfaces/category';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-row-categorie',
  imports: [],
  templateUrl: './row-categorie.component.html',
  styleUrl: './row-categorie.component.css'
})
export class RowCategorieComponent {
  categoriesEnfants: Category[] = [];
  categoriesService = inject(CategoriesService); 
  id = input(0);
  nom = input("");
  infos = [
    this.id,
    this.nom,
  ]
  toggleEnfantsIsTouched = false;

  modify(){
    this.categoriesService.displayDataCategorie(this.id())
  }
  delete() {
    this.categoriesService.displayDataToDelete(this.infos);
  }

}
