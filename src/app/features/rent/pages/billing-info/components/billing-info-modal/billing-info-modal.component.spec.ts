import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingInfoModalComponent } from './billing-info-modal.component';

describe('BillingInfoModalComponent', () => {
  let component: BillingInfoModalComponent;
  let fixture: ComponentFixture<BillingInfoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillingInfoModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillingInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
