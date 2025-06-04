import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { MenuComponent } from '../../menu/menu.component';

@Component({
  selector: 'app-home-page',
  imports: [HeaderComponent,MenuComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
