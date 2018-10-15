import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../_services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar, MatDialog, MatTable, MatSort, MatTableDataSource } from '@angular/material';
import { User, List } from '../_models';
import { first } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';
import { CompareUsersListsDialogComponent } from './compare-users-lists-dialog/compare-users-lists-dialog.component';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  @ViewChild('userTable') eventTable: MatTable<Element>;
  @ViewChild(MatSort) sort: MatSort;
  users: User[];
  events: Event[];
  dataSourceUsers: MatTableDataSource<User>;
  displayedUserColumns = ['select', 'username', 'firstname', 'lastname', 'email', 'lastAccess', 'telegramUserId', 'action'];
  selection = new SelectionModel<User>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSourceUsers.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSourceUsers.data.forEach(row => this.selection.select(row));
  }

  constructor(
    private spinner: NgxSpinnerService,
    private userService: UserService,
    private snackbar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.userService.getAllUsers().pipe(first()).subscribe(page => {
      this.spinner.hide();
      this.users = page.content;
      this.dataSourceUsers = new MatTableDataSource(this.users);
      if (this.users.length > 0) {
        this.dataSourceUsers.sort = this.sort;
      } else {
        this.snackbar.open('No users found', '', { duration: 3000 });
      }
    });
  }

  applyFilterUser(filterValue: string) {
    this.dataSourceUsers.filter = filterValue.trim().toLowerCase();
  }

  showTotaLists(user: User) {
    this.userService.getTotalLists(user).pipe(first()).subscribe(response => {
      this.snackbar.open(`Total lists: ${response.totalLists}`, '', { duration: 3000 });
    });
  }

  showTotalAlarms(user: User) {
    this.userService.getTotalAlarms(user).pipe(first()).subscribe(response => {
      this.snackbar.open(`Total alarms: ${response.totalAlarms}`, '', { duration: 3000 });
    });
  }

  openDeleteListDialog(): void {
    if (this.selection.selected.length !== 2) {
      this.snackbar.open('Please select only two users', '', { duration: 3000 });
      return;
    }
    const user1: User = this.selection.selected[0];
    const user2: User = this.selection.selected[1];
    const getUser1Lists = this.userService.getUserLists(user1);
    const getUser2Lists = this.userService.getUserLists(user2);
    this.spinner.show();
    forkJoin([getUser1Lists, getUser2Lists]).subscribe(results => {
      this.spinner.hide();
      const dialogRef = this.dialog.open(CompareUsersListsDialogComponent, {
        width: '500px',
        data: {
          user1: {
            details: user1,
            lists: results[0].content
          },
          user2: {
            details: user2,
            lists: results[1].content
          }
        }
      });
    });
  }

}
