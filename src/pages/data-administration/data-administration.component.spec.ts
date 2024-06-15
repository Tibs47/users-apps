import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataAdministrationComponent } from './data-administration.component';

describe('DataAdministrationComponent', () => {
  let component: DataAdministrationComponent;
  let fixture: ComponentFixture<DataAdministrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataAdministrationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataAdministrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
