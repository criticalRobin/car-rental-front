import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalStatusTableComponent } from './rental-status-table.component';

describe('RentalStatusTableComponent', () => {
  let component: RentalStatusTableComponent;
  let fixture: ComponentFixture<RentalStatusTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentalStatusTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentalStatusTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
