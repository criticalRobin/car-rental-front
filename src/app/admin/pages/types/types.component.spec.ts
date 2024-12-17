import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TypesVehiclesComponent } from './types.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { MatDialogModule } from '@angular/material/dialog';
import { of } from 'rxjs';
import { TypeService } from './services/types.service';

describe('TypesVehiclesComponent', () => {
  let component: TypesVehiclesComponent;
  let fixture: ComponentFixture<TypesVehiclesComponent>;
  let mockTypeService: jasmine.SpyObj<TypeService>;

  beforeEach(waitForAsync(() => {
    mockTypeService = jasmine.createSpyObj('TypeService', [
      'getTypes',
      'addType',
      'updateType',
      'deleteType',
    ]);

    const mockTypes = [
      { typeId: 1, name: 'SUV', description: 'Vehículo Deportivo Utilitario' },
      { typeId: 2, name: 'Sedán', description: 'Vehículo de tamaño medio' },
    ];
    mockTypeService.getTypes.and.returnValue(of(mockTypes));

    TestBed.configureTestingModule({
      imports: [
        TypesVehiclesComponent, 
        SearchBarComponent,
        PaginatorComponent,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        MatDialogModule,
      ],
      providers: [{ provide: TypeService, useValue: mockTypeService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypesVehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render search bar', () => {
    const searchBar = fixture.nativeElement.querySelector('app-search-bar');
    expect(searchBar).toBeTruthy();
  });

  it('should render button to add types', () => {
    const addButton = fixture.nativeElement.querySelector('.add-type-button');
    expect(addButton).toBeTruthy();
    expect(addButton.textContent).toContain('Agregar Tipo');
  });

  it('should load the initial data of the vehicle types', () => {
    expect(component.types.length).toBe(2);
    expect(component.types[0].name).toBe('SUV');
  });
});
