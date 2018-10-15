import {MediaMatcher} from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, ViewChild } from '@angular/core';
import { AuthenticationService } from './_services';
import { MatSidenav } from '@angular/material';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css'],
    providers: [AuthenticationService]
})

export class AppComponent implements OnDestroy {
    @ViewChild('snav') snav: MatSidenav;
    mobileQuery: MediaQueryList;
    private _mobileQueryListener: () => void;

    constructor(
        public authenticationService: AuthenticationService,
        changeDetectorRef: ChangeDetectorRef,
        media: MediaMatcher
    ) {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }

}
