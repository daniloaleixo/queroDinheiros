import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [HeaderComponent, LoadingComponent],
  exports: [HeaderComponent, LoadingComponent]
})
export class SharedModule { }
