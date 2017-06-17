import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header/header.component';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from './layout/loading/loading.component';
import { MaterializeModule } from 'angular2-materialize';
import { UtilsService } from './services/utils.service';
import { SpendingsService } from '../spendings/spendings.service';
import { BackgroundTasksService } from './services/background-tasks.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterializeModule
  ],
  declarations: [HeaderComponent, LoadingComponent],
  exports: [HeaderComponent, LoadingComponent],
  providers: [UtilsService, SpendingsService, BackgroundTasksService]
})
export class SharedModule { }
