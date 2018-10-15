import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AlarmSummary, Event, Alarm } from 'src/app/_models';
import { AlarmService } from 'src/app/_services/alarm.service';
import { first } from 'rxjs/internal/operators/first';
import { NgxSpinnerService } from 'ngx-spinner';
import { EventDialogComponent } from 'src/app/list/event-dialog/event-dialog.component';
import { SearchElementDialogComponent } from 'src/app/reusable/search-element-dialog/search-element-dialog.component';
import { ListService } from 'src/app/_services';
import { AlarmDialogComponent } from 'src/app/alarm/alarm-dialog/alarm-dialog.component';
import { DeleteDialogComponent } from '../reusable/delete-dialog/delete-dialog.component';

@Component({
    selector: 'app-alarm',
    templateUrl: './alarm.component.html',
    styleUrls: ['./alarm.component.css']
})
export class AlarmComponent implements OnInit {

    alarms: AlarmSummary[];
    private events: Map<number, Event[]> = new Map();

    private loadingAlarmIds: number[] = [];

    eventColumns = ['name', 'start', 'status', 'action'];

    constructor(
        private spinner: NgxSpinnerService,
        public dialog: MatDialog,
        private snackbar: MatSnackBar,
        private alarmService: AlarmService,
        private listService: ListService) { }

    ngOnInit() {
        this.initAlarms();
    }

    initAlarms() {
        this.spinner.show();
        this.alarmService.getToday()
            .pipe(first())
            .subscribe(page => {
                this.alarms = page.content;
                this.spinner.hide();

                if (page.total <= 0) {
                    this.snackbar.open(`You don't have any alarms.`, '', { duration: 3000 });
                }
            });
    }

    initEvents(alarm: AlarmSummary) {
        if (this.events.get(alarm.id)) {
            return;
        }

        this.loadingAlarmIds.push(alarm.id);

        this.alarmService.fetch(alarm.id)
            .pipe(first())
            .subscribe(page => {
                this.events.set(alarm.id, page.content);

                const index = this.loadingAlarmIds.indexOf(alarm.id);
                if (index !== -1) {
                    this.loadingAlarmIds.splice(index, 1);
                }
            });
    }

    isLoading(alarm: AlarmSummary) {
        return this.loadingAlarmIds.includes(alarm.id);
    }

    openAddAlarmDialog() {
        const dialogRef = this.dialog.open(AlarmDialogComponent, {
            width: '500px',
            data: { event }
        });

        dialogRef.afterClosed().subscribe(created => {
            if (created) {
                this.events.clear();
                this.initAlarms();
            }
        });
    }

    openEventDialog(index, event): void {
        const dialogRef = this.dialog.open(EventDialogComponent, {
            width: '500px',
            data: { event }
        });
    }

    openAddEventDialog(event): void {
        const dialogRef = this.dialog.open(SearchElementDialogComponent, {
            width: '500px',
            data: { event }
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

    openDeleteAlarmDialog(index, alarm: Alarm): void {
        const dialogRef = this.dialog.open(DeleteDialogComponent, {
            width: '350px',
            data: {
                name: alarm.name,
                type: 'alarm'
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.spinner.show();
                this.alarmService.delete(alarm)
                    .pipe(first())
                    .subscribe(response => {
                        this.spinner.hide();
                        this.alarms.splice(index, 1);
                        this.snackbar.open(`Alarm ${alarm.name} deleted.`, '', { duration: 3000 });
                    });
            }
        });
    }
}
