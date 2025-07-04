import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RapiTec';
  mostrarHeader = true;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const ruta = event.urlAfterRedirects;
        this.mostrarHeader = !(ruta === '/login' || ruta === '/registro');
      }
    });
  }
}
