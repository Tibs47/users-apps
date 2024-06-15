import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAppDataComponent } from './user-app-data.component';

describe('UserAppDataComponent', () => {
  let component: UserAppDataComponent;
  let fixture: ComponentFixture<UserAppDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAppDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserAppDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
