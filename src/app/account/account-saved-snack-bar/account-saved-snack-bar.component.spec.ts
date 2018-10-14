import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSavedSnackBarComponent } from './account-saved-snack-bar.component';

describe('AccountSavedSnackBarComponent', () => {
  let component: AccountSavedSnackBarComponent;
  let fixture: ComponentFixture<AccountSavedSnackBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountSavedSnackBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSavedSnackBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
