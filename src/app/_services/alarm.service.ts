import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RestPage, Alarm, AlarmSummary, Event, AlarmRequest } from 'src/app/_models';

@Injectable({
    providedIn: 'root'
})
export class AlarmService {

    constructor(private http: HttpClient) { }

    add(alarmRequest: AlarmRequest) {
        const body: any = { name: alarmRequest.name };

        if (alarmRequest.keyword) {
            body.keyword = alarmRequest.keyword;
        }

        if (alarmRequest.address) {
            body.address = alarmRequest.address;
        }

        if (alarmRequest.price) {
            body.price = alarmRequest.price;
        }

        if (alarmRequest.startDateFrom) {
            body.startDateFrom = alarmRequest.startDateFrom.toISOString();
        }

        if (alarmRequest.startDateTo) {
            body.startDateTo = alarmRequest.startDateTo.toISOString();
        }

        return this.http.post<Alarm>(`${environment.apiUrl}/alarms`, body);
    }

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
