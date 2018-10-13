import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSort, MatTable, MatTableDataSource } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { first } from 'rxjs/operators';
import { List, Event } from '../_models';
import { ListService } from '../_services/list.service';
import { EditListDialogComponent } from './edit-list-dialog/edit-list-dialog.component';
import { NewListDialogComponent } from './new-list-dialog/new-list-dialog.component';
import { DeleteDialogComponent } from '../reusable/delete-dialog/delete-dialog.component';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @ViewChild('listTable') listTable: MatTable<Element>;
  @ViewChild('eventTable') eventTable: MatTable<Element>;
  @ViewChild(MatSort) sort: MatSort;
  lists: List[];
  events: Event[];
  dataSourceLists: MatTableDataSource<List>;
  dataSourceEvents: MatTableDataSource<Event>
  displayedListColumns = ['name', 'action'];
  displayedEventColumns = ['name', 'start','status', 'action'];
  selectedList: List;

  constructor(
    private spinner: NgxSpinnerService, 
    private listService: ListService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.spinner.show();
    this.listService.getAllLists().pipe(first()).subscribe(page => {
      this.spinner.hide();
      this.lists = page.content;
      this.dataSourceLists = new MatTableDataSource(this.lists);
      this.dataSourceLists.sort = this.sort;
      this.currentList(this.lists[0]);
    });
  }

  applyFilter(filterValue: string) {
    this.dataSourceLists.filter = filterValue.trim().toLowerCase();
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
      width: '350'
    });

    dialogRef.afterClosed().subscribe(name => {
      if (name) {
        const list: List = new List();
        list.name = name;
        this.spinner.show();
        this.listService.create(list).pipe(first()).subscribe(response => {
          this.spinner.hide();
          list.id = response.id;
          _this.dataSourceLists.data.push(list);
          _this.listTable.renderRows();
        });
      }
    });
  }

  openEditDialog(index, list): void {
    const _this: ListComponent = this;
    const dialogRef = this.dialog.open(EditListDialogComponent, {
      width: '350',
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

  openDeleteListDialog(index, list): void {
    const _this: ListComponent = this;
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '350px',
      data: { 
        name: list.name,
        type: 'list'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.spinner.show();
        this.listService.delete(list).pipe(first()).subscribe(response => {
          this.spinner.hide();
          _this.dataSourceLists.data.splice(index, 1);
          _this.listTable.renderRows();
        });
      }
    });
  }

  openDeleteEventDialog(index, event): void {
    const _this: ListComponent = this;
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '350px',
      data: { 
        name: event.name,
        type: 'event'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.spinner.show();
        this.listService.deleteEvent(this.selectedList, event).pipe(first()).subscribe(response => {
          this.spinner.hide();
          _this.dataSourceEvents.data.splice(index, 1);
          _this.eventTable.renderRows();
        });
      }
    });
  }

}
