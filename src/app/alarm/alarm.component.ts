import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AlarmSummary, Event } from 'src/app/_models';
import { AlarmService } from 'src/app/_services/alarm.service';
import { first } from 'rxjs/internal/operators/first';
import { NgxSpinnerService } from 'ngx-spinner';
import { EventDialogComponent } from 'src/app/list/event-dialog/event-dialog.component';
import { SearchElementDialogComponent } from 'src/app/reusable/search-element-dialog/search-element-dialog.component';
import { ListService } from 'src/app/_services';

@Component({
    selector: 'app-alarm',
    templateUrl: './alarm.component.html',
    styleUrls: ['./alarm.component.css']
})
export class AlarmComponent implements OnInit {

    private alarms: AlarmSummary[];
    private events: Event[];

    private loadingAlarmIds: number[] = [];

    eventColumns = ['name', 'start', 'status', 'action'];

    constructor(
        private spinner: NgxSpinnerService,
        public dialog: MatDialog,
        private alarmService: AlarmService,
        private listService: ListService) { }

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

    openEventDialog(index, event): void {
        const dialogRef = this.dialog.open(EventDialogComponent, {
            width: '500px',
            data: { event: event }
        });
    }

    openAddEventDialog(event): void {
        const dialogRef = this.dialog.open(SearchElementDialogComponent, {
            width: '500px',
            data: {
                event: event
            }
        });
        dialogRef.afterClosed().subscribe(list => {
            if (list) {
                this.spinner.show();
                this.listService.addEvent(list, event)
                    .pipe(first())
                    .subscribe(response => {
                        this.spinner.hide();
                    });
            }
        });
    }
}
