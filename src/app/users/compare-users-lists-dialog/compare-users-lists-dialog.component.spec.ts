import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareUsersListsDialogComponent } from './compare-users-lists-dialog.component';

describe('CompareUsersListsDialogComponent', () => {
  let component: CompareUsersListsDialogComponent;
  let fixture: ComponentFixture<CompareUsersListsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompareUsersListsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareUsersListsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
