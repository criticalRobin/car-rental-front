import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchBarComponent } from './search-bar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Importar esto
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;
  let inputElement: DebugElement;
  let buttonElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        ReactiveFormsModule,
        BrowserAnimationsModule, // Agregar aquí
        SearchBarComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    inputElement = fixture.debugElement.query(By.css('input[matInput]'));
    buttonElement = fixture.debugElement.query(By.css('button[matSuffix]'));
  });

  it('should initialize correctly', () => {
    expect(component).toBeTruthy();
  });

  it('should show the placeholder passed as @Input', () => {
    component.placeholder = 'Buscar producto';
    fixture.detectChanges();
    const label = fixture.debugElement.query(By.css('mat-label')).nativeElement;
    expect(label.textContent).toContain('Buscar producto');
  });

  it('should emit the search event when typing in the field', (done) => {
    const testValue = 'Angular';
    component.search.subscribe((value) => {
      expect(value).toBe(testValue);
      done();
    });
    inputElement.nativeElement.value = testValue;
    inputElement.nativeElement.dispatchEvent(new Event('input'));
  });

  it('should hide the clear button if there is no text in the field', () => {
    component.searchControl.setValue('');
    fixture.detectChanges();

    expect(buttonElement).toBeFalsy();
  });
});
