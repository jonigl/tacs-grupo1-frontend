import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTable, MatSort, MatTableDataSource, MatDialog, _MatSortHeaderMixinBase } from '@angular/material';
import { List } from '../_models/List';
import { ListService } from '../_services/list.service';
import { first } from 'rxjs/operators';
import { EditListDialogComponent } from './edit-list-dialog/edit-list-dialog.component';
import { DeleteListDialogComponent } from './delete-list-dialog/delete-list-dialog.component';
import { NewListDialogComponent } from './new-list-dialog/new-list-dialog.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @ViewChild('listTable') listTable: MatTable<Element>;
  @ViewChild(MatSort) sort: MatSort;
  lists: List[];
  dataSource: MatTableDataSource<List>;
  displayedColumns = ['name', 'action'];
  loading = false;

  constructor(private listService: ListService, public dialog: MatDialog) { }

  ngOnInit() {
    this.listService.getAll().pipe(first()).subscribe(page => {
      this.lists = page.content;
      this.dataSource = new MatTableDataSource(this.lists);
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getEvents(list) {
    console.log(list);
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
        this.loading = true;
        this.listService.create(list).pipe(first()).subscribe(response => {
          this.loading = false;
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
        this.loading = true;
        this.listService.update(listUpdated).pipe(first()).subscribe(response => {
          this.loading = false;
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
        this.loading = true;
        this.listService.delete(list).pipe(first()).subscribe(response => {
          this.loading = false;
          _this.dataSource.data.splice(index, 1);
          _this.listTable.renderRows();
        });
      }
    });
  }

}
