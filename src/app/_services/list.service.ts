import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { RestPage, List, Event, EventId } from '../_models';
import { EventDialogComponent } from '../list/event-dialog/event-dialog.component';

@Injectable({ providedIn: 'root' })
export class ListService {
    constructor(private http: HttpClient) { }

    getAllLists() {
        return this.http.get<RestPage<List>>(`${environment.apiUrl}/lists`);
    }

    getAllEvents(list: List) {
        return this.http.get<RestPage<Event>>(`${environment.apiUrl}/lists/${list.id}/events`);
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

    deleteEvent(list: List, event: Event) {
        return this.http.delete<Event>(`${environment.apiUrl}/lists/${list.id}/events/${event.id}`);
    }

    addEvent(list: List, event: Event) {
        const eventId: EventId = { id : event.id };
        return this.http.post<Event>(`${environment.apiUrl}/lists/${list.id}/events/`, eventId);
    }

}
