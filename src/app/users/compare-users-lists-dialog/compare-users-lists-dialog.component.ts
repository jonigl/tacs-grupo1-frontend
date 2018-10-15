import { Component, Inject, ViewChild, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSelectionList, MatListOption } from '@angular/material';
import { List } from 'src/app/_models';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-compare-users-lists-dialog',
  templateUrl: './compare-users-lists-dialog.component.html',
  styleUrls: ['./compare-users-lists-dialog.component.css']
})
export class CompareUsersListsDialogComponent implements OnInit {
  @ViewChild(MatSelectionList) user1: MatSelectionList;
  @ViewChild(MatSelectionList) user2: MatSelectionList;
  user1Lists: List[];
  user2Lists: List[];

  constructor(
    public dialogRef: MatDialogRef<CompareUsersListsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: object) {}

    ngOnInit() {
      this.user1.selectedOptions = new SelectionModel<MatListOption>(false);
      this.user2.selectedOptions = new SelectionModel<MatListOption>(false);
    }

    onNoClick(): void {
      this.dialogRef.close(false);
    }

}
