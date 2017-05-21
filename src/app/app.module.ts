import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { SpendingsModule } from './spendings/spendings.module';
import { InvestmentsModule } from './investments/investments.module';
import { RouterModule } from '@angular/router';

import { appRoutes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule,
    SharedModule,
    SpendingsModule,
    InvestmentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
