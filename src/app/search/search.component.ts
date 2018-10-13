import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/_services/event.service';
import { EventFilter } from 'src/app/_models/EventFilter';
import { Event } from 'src/app/_models/Event';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

    searchForm: FormGroup;
    searchFormControl = new FormControl('');

    loading: boolean;
    events: Event[];

    constructor(
        private formBuilder: FormBuilder,
        private spinner: NgxSpinnerService,
        private eventService: EventService) { }

    ngOnInit() {
        this.searchForm = this.formBuilder.group({
            keywordControl: ['']
        });
    }

    getControls() {
        return this.searchForm.controls;
    }

    getFilter(): EventFilter {
        const filter = new EventFilter();
        filter.q = this.getControls().keywordControl.value;

        return filter;
    }

    onChange() {
        if (this.getControls().keywordControl.value !== '') {
            this.spinner.show();
            let filter = this.getFilter();
            this.eventService.search(filter).subscribe(page => {
                this.spinner.hide();
                this.events = page.content;
            });
        }
    }
}
