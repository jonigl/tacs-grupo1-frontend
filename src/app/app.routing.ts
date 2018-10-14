import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { AuthGuard } from './_guards';
import { SearchComponent } from 'src/app/search/search.component';
import { ListComponent } from './list/list.component';
import { AccountComponent } from 'src/app/account/account.component';
import { AlarmComponent } from 'src/app/alarm/alarm.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'lists', component: ListComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'search', component: SearchComponent, canActivate: [AuthGuard] },
    { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
    { path: 'alarms', component: AlarmComponent, canActivate: [AuthGuard] },
    // otherwise redirect to home
    { path: '**', redirectTo: '' },
];

export const routing = RouterModule.forRoot(appRoutes);
