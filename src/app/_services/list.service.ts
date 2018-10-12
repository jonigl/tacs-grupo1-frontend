import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { RestPage, List } from '../_models';

@Injectable({ providedIn: 'root' })
export class ListService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<RestPage<List>>(`${environment.apiUrl}/lists`);
    }

    create(list: List) {
        return this.http.post<List>(`${environment.apiUrl}/lists`, list);
    }

    delete(list: List) {
        return this.http.delete<List>(`${environment.apiUrl}/lists/${list.id}`);
    }

    update(list: List) {
        return this.http.put<List>(`${environment.apiUrl}/lists/${list.id}`, list);
    }
}
