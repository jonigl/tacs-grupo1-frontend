import { Component, OnInit, ViewChild, OnDestroy, Inject, AfterViewInit } from '@angular/core';
import { MatSelect, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ListService } from 'src/app/_services';
import { NgxSpinnerService } from 'ngx-spinner';
import { first, takeUntil, take } from 'rxjs/operators';
import { List, Event } from 'src/app/_models';
import { FormControl } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';

@Component({
  selector: 'app-search-element-dialog',
  templateUrl: './search-element-dialog.component.html',
  styleUrls: ['./search-element-dialog.component.css']
})
export class SearchElementDialogComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('listSelect') listSelect: MatSelect;
  lists: List[];
  // https://stackblitz.com/github/bithost-gmbh/ngx-mat-select-search-example
  /** control for the selected list */
  listCtrl: FormControl = new FormControl();
  /** control for the MatSelect filter keyword */
  listFilterCtrl: FormControl = new FormControl();
  /** list of lists filtered by search keyword */
  filteredLists: ReplaySubject<List[]> = new ReplaySubject<List[]>(1);
  /** Subject that emits when the component has been destroyed. */
  private _onDestroy = new Subject<void>();


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private listService: ListService,
    public dialogRef: MatDialogRef<SearchElementDialogComponent>,
    private spinner: NgxSpinnerService,
    ) { }

  ngOnInit() {
    this.spinner.show();
    this.listService.getAllLists().pipe(first()).subscribe(page => {
      this.spinner.hide();
      this.lists = page.content;
      // load the initial bank list
      this.filteredLists.next(this.lists.slice());
    });

    // listen for search field value changes
    this.listFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterLists();
      });
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  setInitialValue() {
    this.filteredLists
    .pipe(take(1), takeUntil(this._onDestroy))
    .subscribe(() => {
      // setting the compareWith property to a comparison function
      // triggers initializing the selection according to the initial value of
      // the form control (i.e. _initializeSelection())
      // this needs to be done after the filtereLists are loaded initially
      // and after the mat-option elements are available
      this.listSelect.compareWith = (a: List, b: List) => a.name === b.name;
    });
  }

  private filterLists() {
    if (!this.lists) {
      return;
    }
    // get the search keyword
    let search = this.listFilterCtrl.value;
    if (!search) {
      this.filteredLists.next(this.lists.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredLists.next(
      this.lists.filter(list => list.name.toLowerCase().indexOf(search) > -1)
    );
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onEnter() {
    // this.dialogRef.close(this.name);
  }

}
