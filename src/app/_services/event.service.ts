import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RestPage, Event } from 'src/app/_models';

export class EventSearchFilter {
    q: string | null;
    from: Date | null;
    to: Date | null;
    address: string | null;
    price: string | null;
}

@Injectable({
    providedIn: 'root'
})
export class EventService {

    constructor(private http: HttpClient) { }

    search(filter: EventSearchFilter, page: number = 0) {
        const params: any = Object.assign({ page: page }, filter);
        return this.http.get<RestPage<Event>>(
            `${environment.apiUrl}/events`,
            { params: params }
        );
    }

}
