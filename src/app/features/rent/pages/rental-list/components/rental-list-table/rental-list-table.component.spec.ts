import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalListTableComponent } from './rental-list-table.component';

describe('RentalListTableComponent', () => {
  let component: RentalListTableComponent;
  let fixture: ComponentFixture<RentalListTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentalListTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentalListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
