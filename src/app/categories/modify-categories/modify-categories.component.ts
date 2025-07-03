import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-modify-categories',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './modify-categories.component.html',
  styleUrl: './modify-categories.component.css'
})
export class ModifyCategoriesComponent {
  categoriesService = inject(CategoriesService);
  bold="bold";

  formGroup = new FormGroup({
    newName : new FormControl(''),
    newParent : new FormControl(0)
  })

  async onSubmit(){
    let newName : string;
    newName = this.formGroup.value.newName?? "";
    let newParent : number;
    newParent = this.formGroup.value.newParent?? 0;
    console.log("newName : " + newName);
    console.log("newParent : " + newParent);
    const categoryModifiedId = this.categoriesService.categoryModified.id;
    console.log("ID de la catégorie modifiée : " + categoryModifiedId);
    await this.categoriesService.modifyCategorie(categoryModifiedId,newName,newParent)
    .then( response => {
      console.log("DEUXIEME THEN : ",response);
    }) 
  }
}