import { Routes, RouterModule } from '@angular/router';
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
    { path: 'register', component: RegistrationComponent },
    { path: 'login',    component: LoginComponent },
    { path: 'lists',    component: ListComponent,    canActivate: [AuthGuard], data: { permission: { only: ['ROLE_USER'] } } },
    { path: 'search',   component: SearchComponent,  canActivate: [AuthGuard], data: { permission: { only: ['ROLE_USER'] } } },
    { path: 'account',  component: AccountComponent, canActivate: [AuthGuard], data: { permission: { only: ['ROLE_USER'] } } },
    { path: 'alarms',   component: AlarmComponent,   canActivate: [AuthGuard], data: { permission: { only: ['ROLE_USER'] } } },
    { path: 'users',    component: UsersComponent,   canActivate: [AuthGuard], data: { permission: { only: ['ROLE_ADMIN'] } } },
    { path: 'stats',    component: StatsComponent,   canActivate: [AuthGuard], data: { permission: { only: ['ROLE_ADMIN'] } } },
    // otherwise redirect to login
    { path: '**', redirectTo: 'login' },
];

export const routing = RouterModule.forRoot(appRoutes);
