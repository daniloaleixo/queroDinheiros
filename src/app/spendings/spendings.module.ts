import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddSpendingComponent } from './add-spending/add-spending.component';
import { ViewSpendingsComponent } from './view-spendings/view-spendings.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MyDatePickerModule } from 'mydatepicker';

import { MdProgressSpinnerModule, MdCardModule } from '@angular/material';

import { ServerCommService } from '../shared/services/server-comm.service';
import { SpendingsService } from './spendings.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    BrowserModule,
    MyDatePickerModule,
    MdProgressSpinnerModule,
    MdCardModule
  ],
  declarations: [AddSpendingComponent, ViewSpendingsComponent],
  providers: [ServerCommService, SpendingsService]
})
export class SpendingsModule { }
