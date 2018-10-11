import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { List } from '../_models/List';
import { ListService } from '../_services/list.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  lists: List[];
  dataSource: MatTableDataSource<List>;
  displayedColumns = ['name', 'action'];

  @ViewChild(MatSort) sort: MatSort;

  constructor(private listService: ListService) {}

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

}
