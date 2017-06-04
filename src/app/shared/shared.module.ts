import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header/header.component';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from './layout/loading/loading.component';
import { MaterializeModule } from 'angular2-materialize';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterializeModule
  ],
  declarations: [HeaderComponent, LoadingComponent],
  exports: [HeaderComponent, LoadingComponent]
})
export class SharedModule { }
