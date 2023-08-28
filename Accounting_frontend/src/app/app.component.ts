import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [HttpClient]
})
export class AppComponent {
  public url: string = '';

  constructor(router: Router) {
    this.url = router.url;

    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.url = event.url;
      }
    });
  }

  public isActive(url: string): boolean {
    return this.url.indexOf(url) >= 0;
  }
}
