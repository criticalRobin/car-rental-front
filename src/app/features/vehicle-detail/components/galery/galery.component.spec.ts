import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GaleryComponent } from './galery.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('GaleryComponent', () => {
  let component: GaleryComponent;
  let fixture: ComponentFixture<GaleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GaleryComponent, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(GaleryComponent);
    component = fixture.componentInstance;
    const images: string[] = ['image1', 'image2', 'image3'];
    fixture.componentRef.setInput('images', images);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
