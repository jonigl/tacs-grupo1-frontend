enum Status {
    CANCELED = 'canceled',
    LIVE = 'live',
    STARTED = 'started',
    ENDED = 'ended',
    COMPLETED = 'completed'
}

export class Event {
    id: string;
    name: string;
    description: string;
    url: string;
    start: Date;
    end: Date;
    created: Date;
    changed: Date;
    status: Status;
    currency: string;
    online_event: boolean;
}
