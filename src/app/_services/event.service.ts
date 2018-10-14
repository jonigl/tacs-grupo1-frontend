import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RestPage, Event, TotalUsers } from 'src/app/_models';

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

    getRegisteredEvents(
        from: Date = null,
        to: Date = null,
        page: number = 0,
        size: number = 50) {

            const params: any = { page, size };
            if (from) {
                params.from = from;
            }
            if (to) {
                params.to = to;
            }

            return this.http.get<RestPage<Event>>(
                `${environment.apiUrl}/events/registered_events`,
                { params }
            );
    }

    getTotalInterestedUsers(event_id: string) {
        const params: any = { event_id };
        return this.http.get<TotalUsers>(
            `${environment.apiUrl}/events/${event_id}/total_users`,
            { params }
        );
    }
}
