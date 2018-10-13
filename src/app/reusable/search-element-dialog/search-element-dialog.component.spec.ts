import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchElementDialogComponent } from './search-element-dialog.component';

describe('SearchElementDialogComponent', () => {
  let component: SearchElementDialogComponent;
  let fixture: ComponentFixture<SearchElementDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchElementDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchElementDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
