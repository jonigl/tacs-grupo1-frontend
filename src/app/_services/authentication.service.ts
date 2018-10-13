import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json');
        return this.http.post<any>(`${environment.apiUrl}/login`, { username: username, password: password }, { headers: headers })
            .pipe(map(res => {
                // login successful if there's a jwt token in the response
                if (res.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(res));
                }
                return res;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    isLoggedIn() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            return true;
        }
        return false;
    }

    getToken() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            return currentUser.token;
        }
        return null;
    }

    whichRole() {
        const myRawToken = this.getToken();
        if (myRawToken === null) {
            return null;
        }
        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(myRawToken);
        return decodedToken.roles;
    }

    getExpiration() {
        const helper = new JwtHelperService();
        const myRawToken = this.getToken();
        return helper.getTokenExpirationDate(myRawToken);
    }

    isExpired() {
        const helper = new JwtHelperService();
        const myRawToken = this.getToken();
        return helper.isTokenExpired(myRawToken);

    }

    isAdmin() {
        const roles = this.whichRole();
        if (roles === null) {
            return false;
        }
        return roles.includes('ROLE_ADMIN');
    }

    isUser() {
        const roles = this.whichRole();
        if (roles === null) {
            return false;
        }
        return roles.includes('ROLE_USER');
    }
}
