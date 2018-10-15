import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../_services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private router: Router,
                private authenticationService: AuthenticationService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const userRole: string = this.authenticationService.whichRole();
        const permission = route.data.permission;
        let canActivate: boolean;

        if (!permission) {
            throw new Error('Permissions is not setup!');
        }
        if (!permission.only.length) {
            throw new Error('Roles are not setup!');
        }

        canActivate = userRole ? permission.only.includes(userRole[0]) : false;

        if (!canActivate) {
            // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        }
        // logged in so return true
        return canActivate;
    }
}
