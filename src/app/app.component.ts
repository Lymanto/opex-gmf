import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'opex-gmf';
  public currentUrl: string = '';
  constructor(private router: Router) {}
  ngOnInit() {
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((navEnd: NavigationEnd) => {
        this.currentUrl = '/' + navEnd.urlAfterRedirects.split('/')[1];
        console.log(this.currentUrl);
      });
  }
}
