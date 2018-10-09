import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/_services/event.service';
import { EventFilter } from 'src/app/_models/EventFilter';
import { Event } from 'src/app/_models/Event';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

    loading: boolean;
    events: Event[];

    constructor(private eventService: EventService) { }

    ngOnInit() {
        const filter = new EventFilter();
        filter.q = 'java';
        this.loading = true;
        this.eventService.search(filter).subscribe(page => {
            this.loading = false;
            this.events = page.content;
        });
    }
}
