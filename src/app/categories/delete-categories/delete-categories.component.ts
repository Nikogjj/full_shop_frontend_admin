import { Component, inject } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-delete-categories',
  imports: [],
  templateUrl: './delete-categories.component.html',
  styleUrl: './delete-categories.component.css'
})
export class DeleteCategoriesComponent {
  categoriesService = inject(CategoriesService);
  confirmDelete(){
    this.categoriesService.deleteCategory()
    .then(response => {
      if (response.message == "La catégorie a bien été supprimée") {
        this.categoriesService.toggleDeleteIsTouched();
        this.categoriesService.allCategories.forEach((categorie,i) => {
          if (response.id == categorie.id) {
            this.categoriesService.allCategories.splice(i, 1);
          }
        });
      }
    })
  }
}
