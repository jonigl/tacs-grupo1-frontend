import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSelectionList, MatListOption } from '@angular/material';
import { List } from 'src/app/_models';
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
  listUser1: List;
  listUser2: List;

  constructor(
    public dialogRef: MatDialogRef<CompareUsersListsDialogComponent>,
    private _formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private listService: ListService,
    @Inject(MAT_DIALOG_DATA) public data: object) { }

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  compareLists() {
    this.spinner.show();
    this.listService.compare(this.listUser1, this.listUser2).pipe(first()).subscribe(response => {
      this.spinner.hide();
    });
  }

}
