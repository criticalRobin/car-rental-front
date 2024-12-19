import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginatorComponent } from './paginator.component';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('PaginatorComponent', () => {
  let component: PaginatorComponent;
  let fixture: ComponentFixture<PaginatorComponent>;
  let prevButton: DebugElement;
  let nextButton: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatIconModule, PaginatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    prevButton = fixture.debugElement.query(By.css('button:first-of-type'));
    nextButton = fixture.debugElement.query(By.css('button:last-of-type'));
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct page and total pages', () => {
    component.length = 50;
    component.pageSize = 10;
    component.currentPage = 1;
    fixture.detectChanges();

    const spanElement = fixture.debugElement.query(By.css('span')).nativeElement;
    expect(spanElement.textContent.trim()).toBe('Página 2 de 5');
  });

  it('should emit the new page number when navigating to the next page', (done) => {
    component.length = 50;
    component.pageSize = 10;
    component.currentPage = 0;
    fixture.detectChanges();

    component.pageChange.subscribe((page) => {
      expect(page).toBe(1);
      done();
    });

    nextButton.triggerEventHandler('click', null);
  });

  it('should emit the new page number when navigating to the previous page', (done) => {
    component.length = 50;
    component.pageSize = 10;
    component.currentPage = 2;
    fixture.detectChanges();

    component.pageChange.subscribe((page) => {
      expect(page).toBe(1);
      done();
    });

    prevButton.triggerEventHandler('click', null);
  });

  it('should disable the previous button on the first page', () => {
    component.currentPage = 0;
    fixture.detectChanges();

    expect(prevButton.nativeElement.disabled).toBeTrue();
  });

  it('should disable the next button on the last page', () => {
    component.length = 50;
    component.pageSize = 10;
    component.currentPage = 4; // Last page
    fixture.detectChanges();

    expect(nextButton.nativeElement.disabled).toBeTrue();
  });

  it('should not emit pageChange if the new page is invalid', () => {
    const spy = spyOn(component.pageChange, 'emit');

    component.changePage(-1); // Invalid page
    expect(spy).not.toHaveBeenCalled();

    component.changePage(100); // Invalid page
    expect(spy).not.toHaveBeenCalled();
  });
});
