import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RestPage, Alarm, AlarmSummary, Event } from 'src/app/_models';

@Injectable({
    providedIn: 'root'
})
export class AlarmService {

    constructor(private http: HttpClient) { }

    getAll(page: number = 0, size: number = 50) {
        const params: any = { page, size };
        return this.http.get<RestPage<Alarm>>(
            `${environment.apiUrl}/alarms`,
            { params }
        );
    }

    fetch(alarmId: number, page: number = 0) {
        const params: any = { page };
        return this.http.get<RestPage<Event>>(
            `${environment.apiUrl}/alarms/${alarmId}/fetch`,
            { params }
        );
    }

    getToday(page: number = 0, size: number = 50) {
        const params: any = { page, size };
        return this.http.get<RestPage<AlarmSummary>>(
            `${environment.apiUrl}/alarms/today`,
            { params }
        );
    }
}
