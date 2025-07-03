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
  confirmDelete() {
    
  }
}
