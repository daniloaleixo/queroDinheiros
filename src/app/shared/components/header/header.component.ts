import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { trigger, state, animate, transition, style  } from '@angular/core';
import { MaterializeAction, MaterializeDirective } from 'angular2-materialize';
import { LayoutService } from '../../singletons/layout.service';
import { AuthService } from '../../../auth/auth.service';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  sidenavActions;
  sidenavParams;
  currentRoute: string;

  public userInfo: firebase.User;
  menuOptions: any = [
    {
      description: 'Configurações',
      link: '/settings',
      icon: 'build'
    }
  ];

  constructor(public layout: LayoutService,
              private auth: AuthService,
              private router: Router) {
    this.currentRoute = '';
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });

    this.sidenavActions = new EventEmitter<any>();
    this.auth.user.subscribe((user: firebase.User) => this.userInfo = user);
  }

  public showSidenav(): void {
      this.sidenavActions.emit('sideNav');
  }

  public closeSideNav() {
    this.sidenavActions.emit({action: 'sideNav'});
  }

  ngOnInit() {}

}
