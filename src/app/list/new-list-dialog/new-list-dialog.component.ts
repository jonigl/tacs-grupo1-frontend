import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';


@Component({
  selector: 'app-new-list-dialog',
  templateUrl: './new-list-dialog.component.html',
  styleUrls: ['./new-list-dialog.component.css']
})
export class NewListDialogComponent {

  constructor(public dialogRef: MatDialogRef<NewListDialogComponent>) {}

    onNoClick(): void {
      this.dialogRef.close();
    }

}
