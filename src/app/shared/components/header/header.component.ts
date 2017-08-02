import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { trigger, state, animate, transition, style  } from '@angular/core';
import { MaterializeAction, MaterializeDirective } from 'angular2-materialize';
import { LayoutService } from '../../singletons/layout.service';
import { AuthService } from '../../../auth/auth.service';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  sidenavActions;
  sidenavParams;
  currentRoute: string;

  public userInfo: firebase.User;
  menuOptions: any = [
    {
      description: 'Home',
      link: '/',
      icon: 'home'
    },
    {
      description: 'Histórico',
      link: '/history',
      icon: 'query_builder'
    },
    {
      description: 'Configurações',
      link: '/settings',
      icon: 'build'
    }
  ];

  tabsOptions: any = [
    {
      description: 'Adicionar',
      link: '/spendings/add',
      icon: ''
    },
    {
      description: 'Gastos',
      link: '/spendings/view',
      icon: ''
    },
    {
      description: 'Investimentos',
      link: '/investments/view',
      icon: ''
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
