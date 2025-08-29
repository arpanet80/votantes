import { Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-no-page-found',
  imports: [],
  templateUrl: './no-page-found.component.html',
  styleUrl: './no-page-found.component.css'
})
export class NoPageFoundComponent implements OnInit {

  private router = inject(Router)

  ngOnInit(): void {

    this.router.events
    .pipe(
      filter(value => value instanceof NavigationEnd),
    )
    .subscribe(event => {
      window.location.reload();
      /*if (event.url === 'http://mypreviousUrl.com') {
        window.location.reload();
      }
        */

    });
  }

}
