import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { SpendingsModule } from './spendings/spendings.module';
import { InvestmentsModule } from './investments/investments.module';
import { AuthModule } from './auth/auth.module';
import { HomeComponent } from './home.component';
import { AuthService } from './auth/auth.service';
import { LayoutService } from './shared/layout/layout.service';

import { appRoutes } from './app.routes';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { MaterializeModule } from 'angular2-materialize';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    MaterializeModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    SharedModule,
    SpendingsModule,
    InvestmentsModule,
    AuthModule
  ],
  providers: [AuthService, LayoutService],
  bootstrap: [AppComponent]
})
export class AppModule { }
