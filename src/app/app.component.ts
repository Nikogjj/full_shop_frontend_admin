import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LoginPageComponent } from "./login/login-page/login-page.component";
import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';
import { MenuPhoneComponent } from './menu-phone/menu-phone.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginPageComponent,MenuComponent,MenuPhoneComponent,HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend_admin';
  router = new Router ();
  tailleEcran = document.body.clientWidth;
  getUrl(){
    return this.router.url;
  }
  listenWindowWidthChange(){
    addEventListener("resize", () => {
      this.tailleEcran = document.body.clientWidth;
    });
    return this.tailleEcran;
  }
}
