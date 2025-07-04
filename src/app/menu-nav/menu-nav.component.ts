import { Component, input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-nav',
  imports: [],
  templateUrl: './menu-nav.component.html',
  styleUrl: './menu-nav.component.css'
})
export class MenuNavComponent {
  name = input("");
  img_url = input("");
  router = new Router();

  navToPage(){
    this.router.navigate([this.name()]);
  }
}
