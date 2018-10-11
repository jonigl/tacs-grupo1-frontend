import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { SearchComponent } from './search/search.component';
import { ListComponent } from './list/list.component';
import { MatDialogModule, MatMenuModule, MatListModule, MatSidenavModule, MatToolbarModule, MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatCardModule, MatTableModule, MatProgressSpinnerModule } from '@angular/material';
import { NgxMasonryModule } from 'ngx-masonry';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import { EditListDialogComponent } from './list/edit-list-dialog/edit-list-dialog.component';;
import { DeleteListDialogComponent } from './list/delete-list-dialog/delete-list-dialog.component'


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
        MatDialogModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        SearchComponent,
        ListComponent ,
        EditListDialogComponent,
        DeleteListDialogComponent
    ],
    entryComponents: [
        EditListDialogComponent,
        DeleteListDialogComponent
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
