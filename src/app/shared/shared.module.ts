import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from './components/loading/loading.component';
import { MaterializeModule } from 'angular2-materialize';
import { UtilsService } from './services/utils.service';
import { SpendingsService } from '../spendings/spendings.service';
import { BackgroundTasksService } from './services/background-tasks.service';
import { GoogleChartsDirective } from './directives/google-charts.directive';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterializeModule
  ],
  declarations: [HeaderComponent, LoadingComponent, GoogleChartsDirective],
  exports: [HeaderComponent, LoadingComponent, GoogleChartsDirective],
  providers: [UtilsService, SpendingsService, BackgroundTasksService]
})
export class SharedModule { }
