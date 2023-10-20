import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBudgetTableComponent } from './view-budget-table.component';

describe('ViewBudgetTableComponent', () => {
  let component: ViewBudgetTableComponent;
  let fixture: ComponentFixture<ViewBudgetTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewBudgetTableComponent]
    });
    fixture = TestBed.createComponent(ViewBudgetTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
