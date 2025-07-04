import { Component, inject } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../interfaces/category';


@Component({
  selector: 'app-create-categories',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './create-categories.component.html',
  styleUrl: './create-categories.component.css'
})
export class CreateCategoriesComponent {
  nameAlreadyExists : boolean = false;
  nameCategorie : string = "";
  categoriesService = inject(CategoriesService);
  formGroup = new FormGroup({
    newName : new FormControl('',[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
      Validators.pattern('^[a-zA-Z0-9À-ÿ\\s-]+$') // Permet les lettres, chiffres, espaces et tirets
    ]),
    newParent : new FormControl(0)
  })
  
  get newName() {
    return this.formGroup.get('newName');
  }

  async onSubmit() {
    if (this.formGroup.invalid) return;
  
    const name = this.formGroup.value.newName??="";  
    console.log("Nom de la nouvelle catégorie :", name);

    await this.categoriesService.checkIfCategoryNameExists(name)
    .then(response=>{
      if (response.message == "La catégorie n'existe pas"){
        this.nameAlreadyExists = false;
        this.categoriesService.createNewCategory(name)
        .then(res=>console.log(res))
        return;
      }
      else{
        this.nameAlreadyExists = true;
        return;
      }
    })
    
  }

  menuOuvert = false;
  categorieAffichee: Category | null = null;
  
  basculerMenu() {
    this.menuOuvert = !this.menuOuvert;
  }
  
  choisirCategorie(categorie: Category | 0): void {
    this.menuOuvert = false;
  
    if (categorie === 0) {
      this.categorieAffichee = null;
      this.formGroup.get('newParent')?.setValue(0);
    } else {
      this.categorieAffichee = categorie;
      this.formGroup.get('newParent')?.setValue(categorie.id);
    }
  }


}
