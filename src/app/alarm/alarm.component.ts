import { Component, OnInit } from '@angular/core';
import { AlarmSummary, Event } from 'src/app/_models';
import { AlarmService } from 'src/app/_services/alarm.service';
import { first } from 'rxjs/internal/operators/first';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector: 'app-alarm',
    templateUrl: './alarm.component.html',
    styleUrls: ['./alarm.component.css']
})
export class AlarmComponent implements OnInit {

    private alarms: AlarmSummary[];
    private events: Event[];

    private loadingAlarmIds: number[] = [];

    constructor(
        private spinner: NgxSpinnerService,
        private alarmService: AlarmService) { }

    ngOnInit() {
        this.spinner.show();
        this.alarmService.getToday()
            .pipe(first())
            .subscribe(page => {
                this.alarms = page.content;
                this.spinner.hide();
            });
    }

    initEvents(alarm: AlarmSummary) {
        if (this.events) {
            return;
        }

        this.loadingAlarmIds.push(alarm.id);

        this.alarmService.fetch(alarm.id)
            .pipe(first())
            .subscribe(page => {
                this.events = page.content;

                const index = this.loadingAlarmIds.indexOf(alarm.id);
                if (index !== -1) {
                    this.loadingAlarmIds.splice(index, 1);
                }
            });
    }

    isLoading(alarm: AlarmSummary) {
        return this.loadingAlarmIds.includes(alarm.id);
    }
}
