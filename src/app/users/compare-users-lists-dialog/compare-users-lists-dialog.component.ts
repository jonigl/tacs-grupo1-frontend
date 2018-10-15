import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatTable, MatSnackBar, MatSort } from '@angular/material';
import { List, Event } from 'src/app/_models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ListService } from 'src/app/_services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-compare-users-lists-dialog',
  templateUrl: './compare-users-lists-dialog.component.html',
  styleUrls: ['./compare-users-lists-dialog.component.css']
})
export class CompareUsersListsDialogComponent implements OnInit {
  @ViewChild('eventTable') eventTable: MatTable<Element>;
  @ViewChild(MatSort) sort: MatSort;
  listUser1: List;
  listUser2: List;
  events: Event[];
  dataSourceEvents: MatTableDataSource<Event>;
  displayedEventColumns = ['name', 'start', 'status'];

  constructor(
    public dialogRef: MatDialogRef<CompareUsersListsDialogComponent>,
    private _formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private listService: ListService,
    private snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  ngOnInit() {
    this.hasLists(this.data.user1);
    this.hasLists(this.data.user2);
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  hasLists(user: any) {
    if (user.lists.length === 0) {
      this.snackbar.open(`User: ${user.details.username} don't have lists`, '', { duration: 3000 });
      this.dialogRef.close();
    }
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  compareLists() {
    this.spinner.show();
    this.listService.compare(this.listUser1, this.listUser2).pipe(first()).subscribe(page => {
      this.spinner.hide();
      this.events = page.content;
      this.dataSourceEvents = new MatTableDataSource(this.events);
      if (this.events.length > 0) {
        this.dataSourceEvents.sort = this.sort;
      } else {
        this.snackbar.open('No lists found', '', { duration: 3000 });
      }
    });
  }

}
