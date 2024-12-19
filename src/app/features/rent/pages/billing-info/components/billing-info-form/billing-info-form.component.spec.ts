import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingInfoFormComponent } from './billing-info-form.component';

describe('BillingInfoFormComponent', () => {
  let component: BillingInfoFormComponent;
  let fixture: ComponentFixture<BillingInfoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillingInfoFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillingInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
