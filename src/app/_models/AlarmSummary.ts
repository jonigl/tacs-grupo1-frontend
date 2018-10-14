import { EventFilter } from 'src/app/_models';

export class AlarmSummary {

    id: number;
    name: string;
    total_events_matched: number;
    filter: EventFilter;
}
