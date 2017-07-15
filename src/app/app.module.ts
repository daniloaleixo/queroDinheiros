import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';

import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { SpendingsModule } from './spendings/spendings.module';
import { InvestmentsModule } from './investments/investments.module';
import { SettingsModule } from './settings/settings.module';
import { HistoryModule } from './history/history.module';

import { AuthService } from './auth/auth.service';
import { LayoutService } from './shared/singletons/layout.service';
import { CurrentMonthService } from './shared/singletons/current-month.service';
import { DatabaseSnapshotService } from './shared/singletons/database-snapshot.service';

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
    SettingsModule,
    HttpModule,
    SharedModule,
    SpendingsModule,
    InvestmentsModule,
    HistoryModule,
    AuthModule
  ],
  providers: [AuthService, LayoutService, CurrentMonthService, DatabaseSnapshotService],
  bootstrap: [AppComponent]
})
export class AppModule { }
