import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, UserRequest, RestPage } from 'src/app/_models';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) { }

    getUser(): Observable<User> {
        // Endpoint not implemented in backend.
        return this.http.get<User>(`${environment.apiUrl}/users/info`);
    }

    updateUser(user: UserRequest) {
        return this.http.patch<User>(`${environment.apiUrl}/users/info`, user);
    }

    create(user: User) {
        return this.http.post<User>(`${environment.apiUrl}/users`, user);
    }

    getAllUsers() {
        return this.http.get<RestPage<User>>(`${environment.apiUrl}/users`);
    }

    getTotalAlarms(user: User) {
        return this.http.get<any>(`${environment.apiUrl}/users/${user.id}/total_alarms`);
    }

    getTotalLists(user: User) {
        return this.http.get<any>(`${environment.apiUrl}/users/${user.id}/total_lists`);
    }
}
