import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { EventFilter } from 'src/app/_models/EventFilter';
import { RestPage } from 'src/app/_models';
import { Event } from 'src/app/_models/Event';

@Injectable({
    providedIn: 'root'
})
export class EventService {

    constructor(private http: HttpClient) { }

    search(filter: EventFilter, page: number = 0) {
        const params: any = { page: page, filter};

        console.log(params.toString());

        return this.http.get<RestPage<Event>>(
            `${environment.apiUrl}/events`,
            { params: params }
        );
    }
}
