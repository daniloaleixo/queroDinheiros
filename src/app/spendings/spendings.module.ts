import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddSpendingComponent } from './add-spending/add-spending.component';
import { ViewSpendingsComponent } from './view-spendings/view-spendings.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AddSpendingComponent, ViewSpendingsComponent]
})
export class SpendingsModule { }
