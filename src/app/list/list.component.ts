import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTable, MatSort, MatTableDataSource, MatDialog, _MatSortHeaderMixinBase } from '@angular/material';
import { List } from '../_models/List';
import { ListService } from '../_services/list.service';
import { first } from 'rxjs/operators';
import { EditListDialogComponent } from './edit-list-dialog/edit-list-dialog.component';
import { DeleteListDialogComponent } from './delete-list-dialog/delete-list-dialog.component';
import { NewListDialogComponent } from './new-list-dialog/new-list-dialog.component';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @ViewChild('listTable') listTable: MatTable<Element>;
  @ViewChild(MatSort) sort: MatSort;
  lists: List[];
  events: Event[];
  dataSource: MatTableDataSource<List>;
  dataSourceEvents: MatTableDataSource<Event>
  displayedListColumns = ['name', 'action'];
  displayedEventColumns = ['name', 'start','status', 'action'];
  selectedList: List;

  constructor(private spinner: NgxSpinnerService, private listService: ListService, public dialog: MatDialog) { }

  ngOnInit() {
    this.spinner.show();
    this.listService.getAllLists().pipe(first()).subscribe(page => {
      this.spinner.hide();
      this.lists = page.content;
      this.dataSource = new MatTableDataSource(this.lists);
      this.dataSource.sort = this.sort;
      this.currentList(this.lists[0]);
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  currentList(list) {
    this.selectedList = list;
    console.log(list);
    this.spinner.show();
    this.listService.getAllEvents(list).pipe(first()).subscribe(page => {
      this.spinner.hide();
      this.events = page.content;
      this.dataSourceEvents = new MatTableDataSource(this.events);
      this.dataSourceEvents.sort = this.sort;
    })
  }

  openNewDialog(): void {
    const _this: ListComponent = this;
    const dialogRef = this.dialog.open(NewListDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(name => {
      if (name) {
        const list: List = new List();
        list.name = name;
        this.spinner.show();
        this.listService.create(list).pipe(first()).subscribe(response => {
          this.spinner.hide();
          list.id = response.id;
          _this.dataSource.data.push(list);
          _this.listTable.renderRows();
        });
      }
    });
  }

  openEditDialog(index, list): void {
    const _this: ListComponent = this;
    const dialogRef = this.dialog.open(EditListDialogComponent, {
      width: '250px',
      data: { list: list }
    });

    dialogRef.afterClosed().subscribe(name => {
      if (name) {
        const listUpdated: List = new List();
        listUpdated.id = list.id;
        listUpdated.name = name;
        this.spinner.show();
        this.listService.update(listUpdated).pipe(first()).subscribe(response => {
          this.spinner.hide();
          list.name = response.name;
        });
      }
    });
  }

  openDeleteDialog(index, list): void {
    const _this: ListComponent = this;
    const dialogRef = this.dialog.open(DeleteListDialogComponent, {
      width: '250px',
      data: { list: list }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.spinner.show();
        this.listService.delete(list).pipe(first()).subscribe(response => {
          this.spinner.hide();
          _this.dataSource.data.splice(index, 1);
          _this.listTable.renderRows();
        });
      }
    });
  }

}
