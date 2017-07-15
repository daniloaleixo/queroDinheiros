import { Routes } from '@angular/router';
import { ViewInvestmentsComponent } from './investments/view-investments/view-investments.component';
import { AddSpendingComponent } from './spendings/add-spending/add-spending.component';
import { ViewSpendingsComponent } from './spendings/view-spendings/view-spendings.component';
import { LoginPageComponent } from './auth/login-page/login-page.component';
import { SettingsComponent } from './settings/settings.component';
import { HistoryComponent } from './history/history.component';
import { HomeComponent } from './home.component';

export const appRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: '',
				redirectTo: 'spendings/add',
				pathMatch: 'full'
			},
			{
				path: 'spendings/add',
				component: AddSpendingComponent
			},
			{
				path: 'spendings/view',
				component: ViewSpendingsComponent
			},
			{
				path: 'investments/view',
				component: ViewInvestmentsComponent
			},
			{
				path: 'settings',
				component: SettingsComponent
			},
			{
				path: 'history',
				component: HistoryComponent
			}
		],
		component: HomeComponent
	},
	{
		path: 'login',
		component: LoginPageComponent
	},
	{
		path: '',
		redirectTo: 'spendings/add',
		pathMatch: 'full'
	}
];
