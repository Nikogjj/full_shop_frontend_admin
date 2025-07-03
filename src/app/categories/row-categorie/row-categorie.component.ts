import { Component, ElementRef, inject, input, ViewChild } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../interfaces/category';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-row-categorie',
  imports: [NgStyle],
  templateUrl: './row-categorie.component.html',
  styleUrl: './row-categorie.component.css'
})
export class RowCategorieComponent {
  categoriesEnfants: Category[] = [];
  categoriesService = inject(CategoriesService); 
  id = input(0);
  nom = input("");
  color = input(0.0);
  color_enfant! : number;
  infos = [
    this.id,
    this.nom,
  ]
  toggleEnfantsIsTouched = false;

  modify(rowElement: HTMLElement){
    this.categoriesService.divToModify = rowElement;
    this.categoriesService.displayDataCategorie(this.id())
  }
  delete(rowElement: HTMLElement){
    this.categoriesService.divToDelete = rowElement;
    this.categoriesService.displayDataToDelete(this.infos);
  }

  /**
   * Permet d'afficher les catégories enfants d'une catégorie
   */
  async toggleEnfants() {
    console.log(this.color())
    await this.categoriesService.getEnfantsCategories(this.id())
    .then(data => {
      this.categoriesEnfants = data;
      if (this.color() == 0.0) {
        this.color_enfant = 0.7;
      }
      else{
        this.color_enfant = this.color()/1.7;
      }
    })
    .catch(error => {
      console.error("Erreur lors de la récupération des catégories enfants :", error);
    });
    this.toggleEnfantsIsTouched= !this.toggleEnfantsIsTouched;
  }

  getCouleurBackground(): string {
    if (this.color() === 0.0) {
      return 'white';      
    }
    // blanc → bleu = rgb(255, 255, 255) → rgb(0, 0, 255)
    const r = Math.round(255 - (255 - 139) * this.color());
    const g = Math.round(255 - (255 - 69) * this.color());
    const b = Math.round(255 - (255 - 19) * this.color());
  
    return `rgb(${r}, ${g}, ${b})`;
  }

  // getFontColor(){
  //   if (this.color()==0.0) {
  //     return "black";
  //   }
  //   else{
  //     // Si la couleur est proche du blanc, on utilise une couleur de police sombre
  //     const luminance = (0.299 * (1 - this.color())) + (0.587 * (1 - this.color())) + (0.114 * 255);
  //     console.log(luminance);
  //     return luminance >  ? 'black' : 'white';
  //   }
  // }
}
