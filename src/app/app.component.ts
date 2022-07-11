import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  public subscription?: Subscription;

  constructor( private router: Router ) {}

  ngOnInit() {
    localStorage.clear();
    this.router.navigate(['login-test']);
  }

  ngOnDestroy() {
      this.subscription!.unsubscribe();
  }

}