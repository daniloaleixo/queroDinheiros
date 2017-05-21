import { Routes } from '@angular/router';
import { ViewInvestmentsComponent } from './investments/view-investments/view-investments.component';
import { AddSpendingComponent } from './spendings/add-spending/add-spending.component';
import { ViewSpendingsComponent } from './spendings/view-spendings/view-spendings.component';
import { LoginPageComponent } from './auth/login-page/login-page.component';

export const appRoutes: Routes = [
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
		path: 'login',
		component: LoginPageComponent
	}
];