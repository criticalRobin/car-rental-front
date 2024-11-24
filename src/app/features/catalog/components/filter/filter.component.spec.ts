import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FilterComponent } from './filter.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterComponent, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit brandChanged event on brand change', () => {
    spyOn(component.brandChanged, 'emit');
    const brandInput = fixture.debugElement.query(
      By.css('input[matInput][placeholder="Marca"]')
    ).nativeElement;
    brandInput.value = 'Toyota';
    brandInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.brandChanged.emit).toHaveBeenCalledWith('Toyota');
  });

  it('should reset all filters and emit cleanedFiltersEvent on cleanFilters call', () => {
    spyOn(component.cleanedFiltersEvent, 'emit');
    component.selectedBrand = 'Toyota';
    component.minRate = 50;
    component.maxRate = 100;
    component.airConditioning = true;
    component.numberOfDoors = 4;
    component.fuelType = component.fuelTypes[0];
    component.transmissionType = component.transmissionTypes[0];

    component.cleanFilters();
    fixture.detectChanges();

    expect(component.cleanedFiltersEvent.emit).toHaveBeenCalled();
    expect(component.selectedBrand).toBe('');
    expect(component.minRate).toBe(0);
    expect(component.maxRate).toBe(0);
    expect(component.airConditioning).toBeNull();
    expect(component.numberOfDoors).toBe(0);
    expect(component.fuelType).toBeNull();
    expect(component.transmissionType).toBeNull();
  });
});
