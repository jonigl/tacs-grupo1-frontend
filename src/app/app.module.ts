import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// used to create fake backend
// import { fakeBackendProvider } from './_helpers';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { LoginComponent } from './login';
import { SearchComponent } from './search/search.component';
import { ListComponent } from './list/list.component';
import { NgxMasonryModule } from 'ngx-masonry';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccountComponent } from './account/account.component';
import { TelegramWidgetComponent } from './telegram-widget/telegram-widget.component';
import {
    MatSelectModule,
    MatTooltipModule,
    MatDialogModule,
    MatMenuModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatBadgeModule,
    MatChipsModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatStepperModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EditListDialogComponent } from './list/edit-list-dialog/edit-list-dialog.component';
import { DeleteDialogComponent } from './reusable/delete-dialog/delete-dialog.component';
import { NewListDialogComponent } from './list/new-list-dialog/new-list-dialog.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { EventDialogComponent } from './list/event-dialog/event-dialog.component';
import { SearchElementDialogComponent } from './reusable/search-element-dialog/search-element-dialog.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { AlarmComponent } from './alarm/alarm.component';
import { AccountSavedSnackBarComponent } from './account/account-saved-snack-bar/account-saved-snack-bar.component';
import { RegistrationComponent } from './registration/registration.component';
import { UsersComponent } from './users/users.component';
import { StatsComponent } from 'src/app/stats/stats.component';
import { AlarmDialogComponent } from 'src/app/alarm/alarm-dialog/alarm-dialog.component';
import { CompareUsersListsDialogComponent } from './users/compare-users-lists-dialog/compare-users-lists-dialog.component';
import { CdkStepperModule } from '@angular/cdk/stepper';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        routing,
        BrowserAnimationsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        FormsModule,
        NgxMasonryModule,
        MatMenuModule,
        FlexLayoutModule,
        MatDialogModule,
        MatTooltipModule,
        NgxSpinnerModule,
        MatSelectModule,
        MatExpansionModule,
        MatBadgeModule,
        MatChipsModule,
        MatProgressBarModule,
        MatSnackBarModule,
        MatDatepickerModule,
        MatNativeDateModule,
        NgxMatSelectSearchModule,
        MatCheckboxModule,
        MatStepperModule
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        SearchComponent,
        ListComponent,
        AccountComponent,
        TelegramWidgetComponent,
        EditListDialogComponent,
        DeleteDialogComponent,
        NewListDialogComponent,
        EventDialogComponent,
        SearchElementDialogComponent,
        AlarmComponent,
        AccountSavedSnackBarComponent,
        RegistrationComponent,
        UsersComponent,
        StatsComponent,
        AlarmDialogComponent,
        CompareUsersListsDialogComponent
    ],
    entryComponents: [
        EditListDialogComponent,
        DeleteDialogComponent,
        NewListDialogComponent,
        EventDialogComponent,
        SearchElementDialogComponent,
        AccountSavedSnackBarComponent,
        AlarmDialogComponent,
        CompareUsersListsDialogComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        // fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
