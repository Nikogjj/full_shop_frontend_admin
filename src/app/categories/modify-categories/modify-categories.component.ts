import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-modify-categories',
  imports: [FormsModule],
  templateUrl: './modify-categories.component.html',
  styleUrl: './modify-categories.component.css'
})
export class ModifyCategoriesComponent {
  categoriesService = inject(CategoriesService);
  bold="bold";
  ngDropdown = 1;
}
