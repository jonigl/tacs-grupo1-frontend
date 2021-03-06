import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatSnackBar, MatTable, MatDialog, MatDatepickerInputEvent, MatChip } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Event } from 'src/app/_models';
import { EventService } from 'src/app/_services/event.service';
import { first } from 'rxjs/internal/operators/first';
import { NgxSpinnerService } from 'ngx-spinner';
import { filter } from 'rxjs/internal/operators/filter';
import { EventDialogComponent } from 'src/app/list/event-dialog/event-dialog.component';
import { SearchElementDialogComponent } from 'src/app/reusable/search-element-dialog/search-element-dialog.component';
import { ListService } from 'src/app/_services';

import * as moment from 'moment';

@Component({
    selector: 'app-stats',
    templateUrl: './stats.component.html',
    styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

    @ViewChild('eventTable') eventTable: MatTable<Element>;
    @ViewChild(MatSort) sort: MatSort;

    events: Event[];

    eventCount: number;

    datasourceEvents: MatTableDataSource<Event>;

    eventColumns = ['name', 'start', 'status', 'action'];

    dateFromControl = new FormControl();
    dateToControl = new FormControl();

    dateFrom: Date = null;
    dateTo: Date = null;

    dateFilters: Map<string, Date[]>;

    constructor(
        private spinner: NgxSpinnerService,
        public dialog: MatDialog,
        private snackbar: MatSnackBar,
        private listService: ListService,
        private eventService: EventService) { }

    ngOnInit() {
        this.initDateFilters();
        this.fetchEvents();
    }

    initDateFilters() {
        const today = moment();
        const tomorrow = moment(today).add(1, 'days');
        const treeDaysBefore = moment(today).subtract(3, 'days');
        const oneWeekBefore = moment(today).subtract(1, 'weeks');
        const oneMonthBefore = moment(today).subtract(1, 'months');

        this.dateFilters = new Map();

        this.dateFilters.set('today', [today.toDate(), tomorrow.toDate()]);
        this.dateFilters.set('last3Days', [treeDaysBefore.toDate(), tomorrow.toDate()]);
        this.dateFilters.set('lastWeek', [oneWeekBefore.toDate(), tomorrow.toDate()]);
        this.dateFilters.set('lastMonth', [oneMonthBefore.toDate(), tomorrow.toDate()]);
    }

    setDateFilter(value: string) {
        if (value === 'allTime') {
            this.dateFromControl.setValue('');
            this.dateToControl.setValue('');
        } else {
            const dates = this.dateFilters.get(value);
            this.dateFromControl.setValue(dates[0]);
            this.dateToControl.setValue(dates[1]);
        }

        this.fetchEvents();
    }

    setDateFrom(event: MatDatepickerInputEvent<Date>) {
        this.dateFrom = event.value;
        this.fetchEvents();
    }

    setDateTo(event: MatDatepickerInputEvent<Date>) {
        this.dateTo = event.value;
        this.fetchEvents();
    }

    fetchEvents() {
        this.spinner.show();

        this.eventService.getRegisteredEvents(this.dateFrom, this.dateTo)
            .pipe(first())
            .subscribe(page => {
                this.events = page.content;
                this.eventCount = page.total;
                this.datasourceEvents = new MatTableDataSource(this.events);

                this.spinner.hide();

                if (this.events.length >= 0) {
                    this.datasourceEvents.sort = this.sort;
                } else {
                    this.snackbar.open('No users found', '', { duration: 3000 });
                }
            });
    }

    applyFilter(filterValue: string) {
        this.datasourceEvents.filter = filterValue.trim().toLowerCase();
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

    showTotalInterestedUsers(event: Event) {
        this.eventService.getTotalInterestedUsers(event.id)
            .pipe(first())
            .subscribe(totalUsers => {
                this.snackbar.open(
                    `Total interested users: ${totalUsers.totalUsers}`,
                    '',
                    { duration: 3000 }
                );
            });
    }
}
