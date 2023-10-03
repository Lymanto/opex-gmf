import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCreateRequestComponent } from './table-create-request.component';

describe('TableCreateRequestComponent', () => {
  let component: TableCreateRequestComponent;
  let fixture: ComponentFixture<TableCreateRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableCreateRequestComponent]
    });
    fixture = TestBed.createComponent(TableCreateRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
