import { Component, OnInit } from '@angular/core';
import { EventService, EventSearchFilter } from 'src/app/_services/event.service';
import { Event } from 'src/app/_models/Event';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { SearchElementDialogComponent } from '../reusable/search-element-dialog/search-element-dialog.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ListService } from '../_services';
import { first } from 'rxjs/operators';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

    searchForm: FormGroup;
    events: Event[];

    constructor(
        private formBuilder: FormBuilder,
        private spinner: NgxSpinnerService,
        public dialog: MatDialog,
        private listService: ListService,
        private snackbar: MatSnackBar,
        private eventService: EventService) { }

    ngOnInit() {
        this.searchForm = this.formBuilder.group({
            keywordControl: ['']
        });
    }

    getControls() {
        return this.searchForm.controls;
    }

    getFilter(): EventSearchFilter {
        const filter = new EventSearchFilter();
        filter.q = this.getControls().keywordControl.value;

        return filter;
    }

    onChange() {
        if (this.getControls().keywordControl.value !== '') {
            this.spinner.show();
            const filter = this.getFilter();
            this.eventService.search(filter).subscribe(page => {
                this.spinner.hide();
                this.events = page.content;
            });
        }
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
                this.listService.addEvent(list, event).pipe(first()).subscribe(response => {
                    this.spinner.hide();
                    this.snackbar.open('Event added to ' + list.name, '', { duration: 3000 });
                });
            }
        });
    }
}
