import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImageUploadModalComponent } from './image-upload-modal.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('ImageUploadModalComponent', () => {
  let component: ImageUploadModalComponent;
  let fixture: ComponentFixture<ImageUploadModalComponent>;
  let httpTestingController: HttpTestingController;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<ImageUploadModalComponent>>;

  beforeEach(async () => {
    const dialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule, ImageUploadModalComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: { vehicleId: 1, images: [] } },
      ],
    }).compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(ImageUploadModalComponent);
    component = fixture.componentInstance;
    dialogRefSpy = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<ImageUploadModalComponent>>;
    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with provided vehicleId and images', () => {
    expect(component.vehicleId).toBe(1);
    expect(component.images).toEqual([]);
  });

  it('should update the form when files are selected', () => {
    const fileInput = fixture.debugElement.query(By.css('#fileUpload')).nativeElement;
    const mockFile = new File(['test'], 'test.png', { type: 'image/png' });
    const event = { target: { files: [mockFile] } };

    fileInput.dispatchEvent(new Event('change'));
    component.onFileChange(event);

    expect(component.imageForm.value.files).toEqual([mockFile]);
  });

  it('should upload images when "uploadImage" is called', () => {
    const mockFile = new File(['test'], 'test.png', { type: 'image/png' });
    component.imageForm.patchValue({ files: [mockFile] });

    component.uploadImage();

    const req = httpTestingController.expectOne(`https://proyecto-alquiler-vehiculos.onrender.com/vehicles/${component.vehicleId}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.has('Authorization')).toBeTrue();

    req.flush({}); // Simula respuesta exitosa
    expect(dialogRefSpy.close).toHaveBeenCalledWith(true);
  });

  it('should not upload images if no files are selected', () => {
    spyOn(window, 'alert');
    component.uploadImage();
    expect(window.alert).toHaveBeenCalledWith('Por favor, selecciona al menos una imagen.');
  });

  it('should delete an image when "deleteImage" is called', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(window, 'alert');
    const mockImage = { imageId: 1, imageUrl: 'url1' };
    component.images = [mockImage];

    component.deleteImage(1);

    const req = httpTestingController.expectOne(`https://proyecto-alquiler-vehiculos.onrender.com/vehicles/images/1`);
    expect(req.request.method).toBe('DELETE');

    req.flush({}); // Simula respuesta exitosa
    expect(component.images).toEqual([]);
    expect(window.alert).toHaveBeenCalledWith('Imagen eliminada exitosamente.');
  });

  it('should not delete an image if confirmation is canceled', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    component.images = [{ imageId: 1, imageUrl: 'url1' }];

    component.deleteImage(1);
    httpTestingController.expectNone(`https://proyecto-alquiler-vehiculos.onrender.com/vehicles/images/1`);
    expect(component.images.length).toBe(1);
  });

  it('should close the dialog when "close" is called', () => {
    component.close();
    expect(dialogRefSpy.close).toHaveBeenCalledWith(true);
  });
});
