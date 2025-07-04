import { Component, inject, output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
  msgError : string = "";

  formGroup = new FormGroup({
    newName : new FormControl("",[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
      Validators.pattern('^[a-zA-Z0-9À-ÿ\\s-]+$') // Permet les lettres, chiffres, espaces et tirets
    ]),
  })

  get newName(){
    return this.formGroup.get('newName');
  }

  async onSubmit(){
    if (this.formGroup.invalid) {
      return
    }
    
    let newName : string;
    newName = this.formGroup.value.newName?? "";

    const categoryModifiedId = this.categoriesService.categoryModified.id;
    console.log(newName, categoryModifiedId);
    
    await this.categoriesService.checkIfCategoryNameExists(newName)
    .then(response => async () => {
      console.log("La catégorie existe déjà");
      if (response.message == "La catégorie n'existe pas") {
        this.msgError = "";
      }
      else{
        this.msgError = response.message;
      }
    })
    await this.categoriesService.modifyCategorie(categoryModifiedId,newName)
    .then(response => {
      if (response.message == "La catégorie a bien été mise à jour") {
        this.categoriesService.allCategories.forEach((categorie,i) => {
          if (categorie.id === response.categorie.id) {
            this.categoriesService.allCategories[i] = response.categorie;
          }
        });
        this.categoriesService.toogleModifyIsTouched();
      }
      else{
        this.msgError = response.message;
      }
    })
  }
}