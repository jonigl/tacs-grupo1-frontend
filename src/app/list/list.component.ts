import { Component, OnInit } from '@angular/core';
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

  constructor(private listService: ListService) {}

  ngOnInit() {
    this.listService.getAll().pipe(first()).subscribe(page => {
      this.lists = page.content;
      console.log(page);
  });
  }

}
