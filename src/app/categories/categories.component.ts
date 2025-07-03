import { Component, inject } from '@angular/core';
import { RowCategorieComponent } from './row-categorie/row-categorie.component';
import { CategoriesService } from '../services/categories.service';
import { ModifyCategoriesComponent } from './modify-categories/modify-categories.component';
import { CreateCategoriesComponent } from "./create-categories/create-categories.component";
import { DeleteCategoriesComponent } from './delete-categories/delete-categories.component';

@Component({
  selector: 'app-categories',
  imports: [RowCategorieComponent, ModifyCategoriesComponent, CreateCategoriesComponent,DeleteCategoriesComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  categoriesService = inject(CategoriesService);
}
