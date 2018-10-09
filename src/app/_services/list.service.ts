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
}
