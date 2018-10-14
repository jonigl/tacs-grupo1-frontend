import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { AuthGuard } from './_guards';
import { SearchComponent } from 'src/app/search/search.component';
import { ListComponent } from './list/list.component';
import { AccountComponent } from 'src/app/account/account.component';
import { AlarmComponent } from 'src/app/alarm/alarm.component';
import { RegistrationComponent } from './registration/registration.component';
import { UsersComponent } from './users/users.component';
import { StatsComponent } from 'src/app/stats/stats.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'register', component: RegistrationComponent },
    { path: 'login', component: LoginComponent },
    { path: 'lists', component: ListComponent, canActivate: [AuthGuard] },
    { path: 'search', component: SearchComponent, canActivate: [AuthGuard] },
    { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
    { path: 'alarms', component: AlarmComponent, canActivate: [AuthGuard] },
    { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
    { path: 'stats', component: StatsComponent, canActivate: [AuthGuard] },
    // otherwise redirect to home
    { path: '**', redirectTo: '' },
];

export const routing = RouterModule.forRoot(appRoutes);
